import AccentButton from '@/Components/AccentButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { getYears } from '@/helpers/datetime';
import MainLayout from '@/Layouts/MainLayout';
import { Switch } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Head, router, usePage } from '@inertiajs/react';
import { debounce, indexOf } from 'lodash';
import { DateTime, Info } from 'luxon';
import { useEffect, useMemo, useRef, useState } from 'react';
import { utils, writeFile } from 'xlsx';

import Form from './Form';
import ScheduleCard from './ScheduleCard';
import DelegationCard from './DelegationCard';
import OfficialDropdown from './OfficialDropdown';
import Loader from '@/Components/Loader';

export default function Index({ request }) {
  const { auth } = usePage().props;

  const [search, setSearch] = useState('');

  const [hasDateFilter, setHasDateFilter] = useState(
    (request.month && request.year) || false
  );
  const [selectedMonth, setSelectedMonth] = useState(
    request.month || DateTime.now().month
  );
  const [selectedYear, setSelectedYear] = useState(
    request.year || DateTime.now().year
  );

  const [page, setPage] = useState({
    data: [],
  });

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

  const [selectedOfficial, setSelectedOfficial] = useState(
    parseInt(request?.official) || 1
  );

  const placements = [
    '@bupati',
    '@wabup',
    '@sekda',
    '@stafahli1',
    '@stafahli2',
    '@stafahli3',
    '@ast1',
    '@ast2',
    '@ast3',
  ];
  const placement = indexOf(placements, auth.placement) + 1;
  const canEdit = selectedOfficial === placement || auth.can.edit.official;

  const visitRef = useRef();

  const debounceVisitRef = useMemo(() => {
    return debounce(() => visitRef.current?.(), 500);
  }, []);

  const fetchPage = () => {
    router.reload({
      data: {
        search,
        official: selectedOfficial,
        month: hasDateFilter ? selectedMonth : '',
        year: hasDateFilter ? selectedYear : '',
      },
      only: ['schedules'],
      onSuccess: ({ props }) =>
        setPage({
          ...page,
          data: props.schedules,
        }),
    });
  };

  useEffect(() => {
    visitRef.current = fetchPage;
  }, [fetchPage]);

  useEffect(() => {
    setPage({ data: [] });
    debounceVisitRef();
  }, [selectedOfficial]);

  useEffect(() => {
    debounceVisitRef();
  }, [search, hasDateFilter, selectedMonth, selectedYear]);

  const exportToExcel = () => {
    const rows = page.data.map((item) => ({
      kegiatan: item.description,
      tempat: item.place,
      tanggal: DateTime.fromISO(item.start_at).toFormat('hh-MM-yy_HH:mm'),
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
    <MainLayout maxWidthClass="max-w-screen-2xl">
      <MainLayout.Sidebar>
        <Head title="Jadwal Pimpinan" />
        <div className="flex flex-row justify-between gap-2 md:flex-col">
          <h1 className="text-base font-bold md:text-xl text-zinc-700">
            Jadwal Pimpinan
          </h1>

          <div className="flex flex-wrap gap-1 md:text-lg">
            <OfficialDropdown
              selectedOfficial={selectedOfficial}
              setSelectedOfficial={setSelectedOfficial}
            />
          </div>
        </div>

        <div className="flex flex-row gap-2">
          {canEdit && (
            <PrimaryButton onClick={() => openForm()} className="py-1 text-xs">
              Tambah
            </PrimaryButton>
          )}

          <AccentButton onClick={() => exportToExcel()}>
            Unduh Data
          </AccentButton>
        </div>

        <div className="inline-flex items-center w-full px-3 space-x-1 rounded bg-zinc-200 focus-within:ring-1 focus-within:ring-rose-700">
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ketik kegiatan, lokasi..."
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
      </MainLayout.Sidebar>

      <MainLayout.Content>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full md:w-2/3 shrink-0">
            <h3 className="mb-2 font-bold">Hadir</h3>
            <div className="space-y-2">
              {page.data?.length ? (
                page.data
                  ?.filter(({ delegation }) => delegation === null)
                  .map((schedule) => (
                    <ScheduleCard
                      schedule={schedule}
                      key={schedule.id}
                      fetchPage={fetchPage}
                      openForm={openForm}
                      selectedOfficial={selectedOfficial}
                    />
                  ))
              ) : (
                <div className="w-full py-20">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          {selectedOfficial < 4 && (
            <div>
              <h3 className="mb-2 font-bold">Delegasi</h3>
              <div className="space-y-2">
                {page.data
                  ?.filter(({ delegation }) => delegation !== null)
                  .map((schedule) => (
                    <DelegationCard
                      schedule={schedule}
                      key={schedule.id}
                      reload={fetchPage}
                      openForm={openForm}
                    />
                  ))}
              </div>
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
          selectedOfficial={selectedOfficial}
        />
      )}
    </MainLayout>
  );
}
