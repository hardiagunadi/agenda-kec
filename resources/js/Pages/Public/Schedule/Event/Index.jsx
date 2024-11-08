import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import PublicLayout from '@/Layouts/PublicLayout';
import { getColor } from '@/helpers/colors';
import { getYears } from '@/helpers/datetime';
import { Switch } from '@headlessui/react';
import {
  BriefcaseIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';
import { DateTime, Info } from 'luxon';
import { useEffect, useState } from 'react';

import _ from 'lodash';

export default function Index({}) {
  const [dateFilterVisible, setDateFilterVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(DateTime.now().month);
  const [selectedYear, setSelectedYear] = useState(DateTime.now().year);
  const [search, setSearch] = useState('');

  const [data, setData] = useState([]);

  const fetchData = () => {
    const start = dateFilterVisible
      ? DateTime.fromObject({
          day: '01',
          month: selectedMonth,
          year: selectedYear,
        })
          .startOf('month')
          .toISODate()
      : DateTime.now().toISODate();

    const end = dateFilterVisible
      ? DateTime.fromObject({
          day: '01',
          month: selectedMonth,
          year: selectedYear,
        })
          .endOf('month')
          .toISODate()
      : DateTime.now().plus({ years: '3' }).toISODate();

    axios
      .get(
        `https://agenda.wonosobokab.go.id/api/jadwal-kegiatan?lokasi=3&date_start=${start}&date_end=${end}`
      )
      .then(({ data }) => {
        const results = data.results.sort(
          (a, b) => new Date(a.tanggal_mulai) - new Date(b.tanggal_mulai)
        );
        setData(results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [dateFilterVisible, selectedMonth, selectedYear]);

  return (
    <PublicLayout>
      <Head title="Jadwal Kegiatan" />

      <div className="max-w-screen-lg px-5 py-5 flex flex-col gap-3 mx-auto rounded shadow md:my-10 bg-zinc-200">
        <div className="flex flex-row items-center justify-between gap-3 w-full">
          <h3 className="font-bold">Jadwal Kegiatan</h3>

          {/* <Link href={route('public.createEventSchedule')}>
            <PrimaryButton className="py-1 text-xs">
              Reservasi Sekarang
            </PrimaryButton>
          </Link> */}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="flex flex-row items-center gap-3 h-[30px]">
            <Switch
              onChange={() => setDateFilterVisible(!dateFilterVisible)}
              className={`shrink-0 relative inline-flex h-7 w-12 items-center rounded-full bg-white`}
            >
              <span
                className={`${
                  dateFilterVisible
                    ? 'translate-x-6 bg-rose-700'
                    : 'translate-x-1 bg-zinc-300'
                } inline-block h-5 w-5 transform rounded-full transition ease-in-out`}
              />
            </Switch>

            {dateFilterVisible ? (
              <div className="flex flex-row gap-1">
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
              <div className="text-sm">tampilkan penyaring waktu</div>
            )}
          </div>

          <div className="inline-flex items-center w-64 px-3 space-x-1 rounded bg-zinc-200 ring-1  ring-white focus-within:ring-1 focus-within:ring-rose-700">
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

        <div className="flex flex-col gap-2">
          {data.length ? (
            data.map((item, index) => {
              const normalize = (str) => _.toLower(_.deburr(str));

              const includesValue = (val, obj) => {
                const search = normalize(val);
                return _.some(obj, (v) => normalize(v).includes(search));
              };

              const isMatch = includesValue(search, {
                kegiatan: item.nama_kegiatan,
                ruangan: item.ruangan,
                opd: item.opd_penyelenggara,
              });

              return (
                <div className={isMatch ? '' : 'hidden'} key={index}>
                  <Card
                    color={getColor(
                      DateTime.fromISO(item.tanggal_mulai).weekday - 1
                    )}
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
                </div>
              );
            })
          ) : (
            <div>
              <iframe
                src="/images/travolta.gif"
                width="480"
                height="204"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
