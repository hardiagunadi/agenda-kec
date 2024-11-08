import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import { getYears } from '@/helpers/datetime';
import PublicLayout from '@/Layouts/PublicLayout';
import { Switch } from '@headlessui/react';
import {
  BriefcaseIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';
import { debounce, filter } from 'lodash';
import { DateTime, Info } from 'luxon';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Index({ request }) {
  const [page, setPage] = useState({ data: [] });

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

  const visitRef = useRef();

  const fetchData = () => {
    router.reload({
      data: {
        search,
        month: hasDateFilter ? selectedMonth : '',
        year: hasDateFilter ? selectedYear : '',
      },
      only: ['schedules'],
      onSuccess: ({ props }) => {
        const schedules = filter(props.schedules, ({ status }) => status < 3);
        setPage({ ...page, data: schedules });
      },
    });
  };

  const debounceVisitRef = useMemo(() => {
    return debounce(() => visitRef.current?.(), 500);
  }, []);

  useEffect(() => {
    visitRef.current = fetchData;
  }, [fetchData]);

  useEffect(() => {
    debounceVisitRef();
  }, [search, hasDateFilter, selectedMonth, selectedYear]);

  return (
    <PublicLayout>
      <Head title="Jadwal Kegiatan" />

      <div className="max-w-screen-lg px-5 py-5 mx-auto rounded shadow md:my-10 bg-zinc-200">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex flex-col w-full gap-3 md:w-1/3 shrink-0">
            <div className="flex flex-row items-center justify-between gap-3 md:items-start md:flex-col">
              <h3 className="font-bold">Jadwal Kegiatan</h3>

              <Link href={route('public.createEventSchedule')}>
                <PrimaryButton className="py-1 text-xs">
                  Reservasi Sekarang
                </PrimaryButton>
              </Link>
            </div>

            <div className="inline-flex items-center w-full px-3 space-x-1 rounded bg-zinc-100 border-zinc-100 focus-within:ring-1 focus-within:ring-rose-700">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="cari tempat, kegiatan..."
                className="flex-1 px-0 text-sm bg-transparent border-none shadow-none focus:ring-transparent"
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
                  hasDateFilter ? 'bg-rose-700' : 'bg-zinc-100'
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
                  'Pendopo Wakil Bupati',
                  'Lainnya',
                ].map((item) => (
                  <div
                    key={item}
                    className={`px-1 py-[1px] rounded shadow cursor-pointer whitespace-nowrap hover:bg-rose-700 hover:text-zinc-100 ${
                      search === item
                        ? 'bg-rose-700 text-zinc-100'
                        : 'bg-zinc-100'
                    }`}
                    onClick={() => setSearch(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full space-y-2 overflow-y-auto h-[500px]">
            {page.data.map((schedule, index) => (
              <ScheduleCard key={index} schedule={schedule} />
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

function ScheduleCard({ schedule }) {
  return (
    <Card>
      <Card.Header>{schedule.description}</Card.Header>

      <Card.Content>
        <div className="flex flex-col flex-1 text-sm">
          <div className="flex items-center">
            <div className="flex items-center w-5 mr-2 shrink-0">
              <MapPinIcon className="h-3" />
            </div>
            <div>{schedule.place}</div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center w-5 mr-2 shrink-0">
              <ClockIcon className="h-3" />
            </div>
            <div>
              {DateTime.fromISO(schedule.start_at).toFormat(
                'cccc, dd MMMM yy HH:mm'
              )}
              {DateTime.fromISO(schedule.end_at).toFormat(' - HH:mm')}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center w-5 mr-2 shrink-0">
              <BriefcaseIcon className="h-3" />
            </div>
            <div>{schedule.organization}</div>
          </div>
        </div>
      </Card.Content>

      <Card.Footer>
        <div className="flex flex-row items-center gap-1">
          <div
            className={`inline-flex items-center px-1 space-x-1 text-xs lowercase border rounded-full ${
              schedule.status == 1
                ? ' border-orange-700 text-orange-700'
                : ' border-green-700 text-green-700'
            }`}
          >
            {schedule.status_text}
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}
