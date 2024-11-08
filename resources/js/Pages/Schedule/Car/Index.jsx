import AccentButton from '@/Components/AccentButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { getYears } from '@/helpers/datetime';
import MainLayout from '@/Layouts/MainLayout';
import { Switch } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { DateTime, Info } from 'luxon';
import { useEffect, useMemo, useRef, useState } from 'react';
import { utils, writeFile } from 'xlsx';

import Form from './Form';
import ScheduleCard from './ScheduleCard';
import Loader from '@/Components/Loader';

export default function Index({ drivers, cars, pagination, request }) {
  const [search, setSearch] = useState(request.search || '');

  const [hasDateFilter, setHasDateFilter] = useState(
    (request.month && request.year) || false
  );
  const [selectedMonth, setSelectedMonth] = useState(
    request.month || DateTime.now().month
  );
  const [selectedYear, setSelectedYear] = useState(
    request.year || DateTime.now().year
  );

  const [page, setPage] = useState({ ...pagination, data: [] });

  const [showingForm, setShowingForm] = useState(false);
  const [formData, setFormData] = useState(null);

  const openForm = (formData) => {
    setFormData(formData);
    setShowingForm(true);
  };

  const closeForm = () => {
    setShowingForm(false);
    setTimeout(() => {
      setFormData(null);
    }, 500);
  };

  const visitRef = useRef();

  const fetchPage = () => {
    router.reload({
      data: {
        search,
        month: hasDateFilter ? selectedMonth : '',
        year: hasDateFilter ? selectedYear : '',
      },
      only: ['schedules'],
      onSuccess: ({ props }) => setPage({ ...page, data: props.schedules }),
    });
  };

  const debounceVisitRef = useMemo(() => {
    return debounce(() => visitRef.current?.(), 500);
  }, []);

  useEffect(() => {
    visitRef.current = fetchPage;
  }, [fetchPage]);

  useEffect(() => {
    debounceVisitRef();
  }, [search, hasDateFilter, selectedMonth, selectedYear]);

  const exportToExcel = () => {
    const rows = page.data.map((item) => ({
      pemohon: item.customer,
      telepon: item.phone,
      badan_instansi_dinas: item.organization,
      kegiatan: item.description,
      tujuan: item.place,
      berangkat_dari: item.from,
      berangkat: DateTime.fromISO(item.start_at).toFormat('hh-MM-yy_HH:mm'),
      pulang: DateTime.fromISO(item.end_at).toFormat('hh-MM-yy_HH:mm'),
      kendaraan: item.car,
      pengemudi: item.driver,
      status: item.status_text,
      catatan: item.note,
    }));

    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, 'Rekap');

    writeFile(
      workbook,
      `E_Agenda_Rekap_Kendaraan_${DateTime.now().toFormat(
        'yyMMddHHmmss'
      )}.xlsx`,
      {
        compression: true,
      }
    );
  };

  return (
    <MainLayout>
      <MainLayout.Sidebar title="Jadwal Kendaraan">
        <div className="flex flex-row gap-2">
          <PrimaryButton onClick={() => openForm()} className="py-1 text-xs">
            Tambah
          </PrimaryButton>

          <AccentButton onClick={() => exportToExcel()}>
            Unduh Data
          </AccentButton>
        </div>

        <div className="inline-flex items-center w-full px-3 space-x-1 rounded bg-zinc-200 border-zinc-200 focus-within:ring-1 focus-within:ring-rose-700">
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="cari kendaraan, pengemudi, dll..."
            className="flex-1 px-0 text-sm border-none shadow-none focus:ring-transparent"
          />

          {search.length > 0 ? (
            <XMarkIcon
              className="h-4 cursor-pointer hover:text-rose-700"
              onClick={() => setSearch('')}
            />
          ) : (
            <MagnifyingGlassIcon className="h-4" />
          )}
        </div>

        <div className="flex flex-row items-center h-8 gap-3">
          <Switch
            onChange={() => setHasDateFilter(!hasDateFilter)}
            className={`${
              hasDateFilter ? 'bg-rose-700' : 'bg-zinc-200'
            } shrink-0 relative inline-flex h-7 w-12 items-center rounded-full`}
          >
            <span
              className={`${
                hasDateFilter ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-5 w-5 transform rounded-full bg-zinc-300 transition`}
            />
          </Switch>

          {hasDateFilter ? (
            <div className="flex flex-row w-full gap-1">
              <select
                name="selectedMonth"
                id="selectedMonth"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="flex-1 py-1 text-sm border rounded-full shadow-sm border-zinc-300 ring-zinc-700 focus:border-rose-700 focus:ring-rose-700 bg-zinc-100 text-zinc-700"
              >
                {Info.months('long').map((item, index) => (
                  <option key={index} value={index + 1}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                name="selectedYear"
                id="selectedYear"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="py-1 text-sm border rounded-full shadow-sm border-zinc-300 ring-zinc-700 focus:border-rose-700 focus:ring-rose-700 bg-zinc-100 text-zinc-700"
              >
                {getYears().map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="text-sm">filter waktu nonaktif</div>
          )}
        </div>

        <div className="hidden md:block">
          <h3 className="mb-1 text-lg font-bold">Pengemudi</h3>
          <div className="flex flex-wrap gap-1 text-xs">
            {[{ id: '0', name: 'Tanpa Pengemudi' }]
              .concat(drivers)
              .map((driver) => (
                <div
                  key={driver.id}
                  className={`px-1 py-[1px] md:py-1 rounded shadow cursor-pointer whitespace-nowrap hover:bg-rose-700 hover:text-zinc-100 ${
                    search === driver.name
                      ? 'bg-rose-700 text-zinc-100'
                      : 'bg-zinc-100'
                  }`}
                  onClick={() => setSearch(driver.name)}
                >
                  {driver.name}
                </div>
              ))}
          </div>
        </div>

        <div className="hidden md:block">
          <h3 className="text-lg font-bold">Kendaraan</h3>
          <div className="flex flex-wrap gap-1 text-xs">
            {[{ id: '0', reg_number: 'Belum Ditentukan' }]
              .concat(cars)
              .map((car) => (
                <div
                  key={car.id}
                  className={`px-1 py-[1px] md:py-1 rounded shadow cursor-pointer whitespace-nowrap hover:bg-rose-700 hover:text-zinc-100 ${
                    search === car.reg_number
                      ? 'bg-rose-700 text-zinc-100'
                      : 'bg-zinc-100'
                  }`}
                  onClick={() => setSearch(car.reg_number)}
                >
                  {car.reg_number}
                </div>
              ))}
          </div>
        </div>

        <div className="hidden md:block">
          <h3 className="mb-1 text-lg font-bold">Status</h3>
          <div className="flex flex-wrap gap-1 text-xs">
            {['pending', 'disetujui', 'ditolak', 'batal'].map((item) => (
              <div
                key={item}
                className={`px-1 py-[1px] md:py-1 rounded shadow cursor-pointer whitespace-nowrap hover:bg-rose-700  hover:text-zinc-100 ${
                  search === item ? 'bg-rose-700 text-zinc-100' : 'bg-zinc-100'
                }`}
                onClick={() => setSearch(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </MainLayout.Sidebar>

      <MainLayout.Content>
        <div className="space-y-2">
          {page.data?.length ? (
            page.data?.map((schedule) => (
              <ScheduleCard
                schedule={schedule}
                key={schedule.id}
                fetchPage={fetchPage}
                openForm={openForm}
              />
            ))
          ) : (
            <div className="w-full py-20">
              <Loader />
            </div>
          )}
        </div>
      </MainLayout.Content>

      {showingForm && (
        <Form
          active={showingForm}
          close={closeForm}
          formData={formData}
          reload={fetchPage}
        />
      )}
    </MainLayout>
  );
}
