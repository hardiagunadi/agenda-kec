import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth, schedules }) {
  const { official } = schedules;

  const [stats, setStats] = useState({});

  const populateOfficialStats = () => {
    const stat = official.reduce(
      (acc, cur) => {
        if (cur.official == 1) acc.bupati += 1;
        if (cur.official == 2) acc.wabup += 1;
        if (cur.official == 3) acc.sekda += 1;

        return acc;
      },
      {
        bupati: 0,
        wabup: 0,
        sekda: 0,
      }
    );

    setStats(stat);
  };

  useEffect(() => {
    populateOfficialStats();
  }, []);

  return (
    <MainLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <MainLayout.Content>
        <div className="">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="flex flex-row gap-10">
                <div className="flex flex-col flex-1 gap-5">
                  <div className="px-5 py-3">
                    <div
                      className="h-64 bg-no-repeat bg-contain"
                      style={{
                        backgroundImage:
                          'url("/images/artworks/people-discussing.svg")',
                      }}
                    ></div>
                    <h3 className="font-bold">Kegiatan Hari Ini</h3>
                  </div>

                  <div className="px-5 py-3 bg-zinc-100">
                    <h3 className="font-bold">Jadwal Kendaraan</h3>
                    <div>3 Unit dalam Perjalanan Dinas</div>
                    <div>1 Unit siap digunakan</div>
                  </div>
                </div>

                <div className="w-1/3 bg-zinc-100">
                  <div className="px-5 py-3 bg-zinc-100">
                    <h3 className="font-bold">Agenda Pimpinan Hari Ini</h3>

                    <div>
                      <div>{stats.bupati} Kegiatan Bupati</div>
                    </div>

                    <div>
                      <div>{stats.wabup} Kegiatan Wakil Bupati</div>
                    </div>

                    <div>
                      <div>{stats.sekda} Kegiatan Sekretaris Daerah</div>
                    </div>

                    <Link href={route('officialSchedules')}>
                      selengkapnya...
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout.Content>
    </MainLayout>
  );
}
