import AccentButton from '@/Components/AccentButton';
import Card from '@/Components/Card';
import Loader from '@/Components/Loader';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { getYears } from '@/helpers/datetime';
import MainLayout from '@/Layouts/MainLayout';
import { Switch } from '@headlessui/react';
import {
  BriefcaseIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import { DateTime, Info } from 'luxon';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { utils, writeFile } from 'xlsx';

import Form from './Form';
import ScheduleCard from './ScheduleCard';

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

  const [page, setPage] = useState({ data: [] });

  const [showingEventKab, setShowingEventKab] = useState(true);
  const [eventKab, setEventKab] = useState([]);

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

  useEffect(() => {
    const today = DateTime.now().toISODate();
    const nextYear = DateTime.now().plus({ years: 1 }).toISODate();

    axios
      .get(
        `https://agenda.wonosobokab.go.id/api/jadwal-kegiatan?lokasi=3&date_start=${today}&date_end=${nextYear}`
      )
      .then(({ data }) => {
        const results = data.results.sort(
          (a, b) => new Date(a.tanggal_mulai) - new Date(b.tanggal_mulai)
        );
        setEventKab(results);
      })
      .catch((err) => console.log(err));
  }, []);

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
      tempat: item.place,
      mulai: DateTime.fromISO(item.start_at).toFormat('hh-MM-yy_HH:mm'),
      selesai: DateTime.fromISO(item.end_at).toFormat('hh-MM-yy_HH:mm'),
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

  const colors = [
    '#be123c',
    '#a21caf',
    '#6d28d9',
    '#1d4ed8',
    '#0e7490',
    '#4d7c0f',
    '#b45309',
  ];

  return (
    <MainLayout maxWidthClass="max-w-screen-2xl">
      <MainLayout.Sidebar title="Jadwal Kegiatan">
        <div className="flex flex-row gap-2">
          {auth.can.edit.schedule && (
            <PrimaryButton onClick={() => openForm()} className="py-1 text-xs">
              Tambah
            </PrimaryButton>
          )}

          <AccentButton onClick={() => exportToExcel()}>
            Unduh Data
          </AccentButton>
        </div>

        <div>
          <div className="inline-flex items-center w-full px-3 space-x-1 rounded bg-zinc-200 focus-within:ring-1 focus-within:ring-rose-700">
            <TextInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="cari kegiatan, lokasi, peminjam..."
              className="flex-1 px-0 text-sm border-none shadow-transparent focus:ring-transparent"
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

        <div className="">
          <h3 className="hidden mb-1 text-lg font-bold md:block">Lokasi</h3>

          <div className="flex flex-wrap gap-1 text-xs">
            {[
              'Mangoen',
              'Tjokro',
              'Kerto',
              'Soerjo',
              'Pendopo Bupati',
              'Halaman Pendopo Bupati',
            ].map((item) => (
              <div
                key={item}
                className={`px-1 py-[1px] md:py-1 rounded shadow cursor-pointer whitespace-nowrap bg-opacity-50 hover:bg-rose-700 hover:text-zinc-100 ${
                  search === item
                    ? 'bg-rose-700 text-zinc-100 bg-opacity-100'
                    : 'bg-zinc-100'
                }`}
                onClick={() => setSearch(item)}
              >
                {item}
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
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2 space-y-2">
            <h3 className="font-bold">Agenda Setda</h3>
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

          <div className="md:w-1/2 space-y-2">
            <h3 className="font-bold">Agenda Kabupaten</h3>
            {eventKab.map((item, index) => (
              // <div key={index}>{item.nama_kegiatan}</div>
              <Card
                key={index}
                color={colors[DateTime.fromISO(item.tanggal_mulai).weekday - 1]}
              >
                <Card.Header>{item.nama_kegiatan}</Card.Header>
                <Card.Content>
                  <div className="flex flex-col flex-1 text-sm">
                    <div className="flex items-center">
                      <div className="flex items-center w-5 mr-2 shrink-0">
                        <MapPinIcon className="h-3" />
                      </div>
                      <div>{item.ruangan}</div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center w-5 mr-2 shrink-0">
                        <ClockIcon className="h-3" />
                      </div>
                      <div>
                        {DateTime.fromISO(item.tanggal_mulai).toFormat(
                          'cccc, dd MMMM yy HH:mm'
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center w-5 mr-2 shrink-0">
                        <BriefcaseIcon className="h-3" />
                      </div>
                      <div>
                        {item.opd_penyelenggara} • {item.jumlah_undangan}{' '}
                        peserta
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
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

      <Toaster />
    </MainLayout>
  );
}
