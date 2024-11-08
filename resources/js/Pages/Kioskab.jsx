import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
// import '../../css/clock.css';

export default function Kioskabb() {
  const apiID = '659f4d36abf4552874623676';
  const apiKey = 'c4cfb6e6a76dac48472b26';

  const [quotes, setQuotes] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [clock, setClock] = useState(DateTime.now().toFormat('HH.mm'));
  const [temp, setTemp] = useState(null);

  const fetchQuote = () => {
    axios
      .get('https://quoteskuy-65d4.vercel.app/api/quotes?category=motivasi', {
        headers: {
          'X-API-ID': apiID,
          'X-API-KEY': apiKey,
        },
      })
      .then(({ data }) => setQuotes(data.data.quotes))
      .catch((err) => console.log(err));
  };

  const fetchData = () => {
    const today = DateTime.now().toISODate();
    axios
      .get(
        `https://agenda.wonosobokab.go.id/api/jadwal-kegiatan?lokasi=3&date_start=${today}&date_end=${today}`
      )
      .then(({ data }) => {
        const results = data.results.sort(
          (a, b) => new Date(a.tanggal_mulai) - new Date(b.tanggal_mulai)
        );
        setSchedules(results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    fetchQuote();

    const clockInterval = setInterval(
      () => setClock(DateTime.now().toFormat('HH.mm')),
      60000
    );

    const dataInterval = setInterval(() => fetchData(), 60000);

    const quoteInterval = setInterval(() => fetchQuote(), 10800000);

    return function cleanup() {
      clearInterval(clockInterval);
      clearInterval(dataInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <>
      <Head title="Kiosk" />

      <div
        className="h-screen w-full overflow-hidden flex flex-col bg-cover bg-gray-100 text-gray-700"
        style={{
          backgroundImage: "url('/images/backgrounds/ttten.svg')",
        }}
      >
        <div className="flex flex-row items-center justify-between py-5 px-10">
          <div className="flex flex-row items-center gap-10">
            <img src="/images/wonosobo.png" alt="" className="h-20" />
            <div className="text-4xl font-bold">Sugeng Rawuh 🙏</div>
          </div>

          <div className="flex flex-row items-center gap-10">
            {/* <div className="">{temp}°C</div> */}
            <div className="font-bold text-4xl tracking-tight">{clock}</div>
            <img src="/images/soj.png" alt="" className="h-20" />
          </div>
        </div>

        <div className="flex-1 mx-5 my-3 px-5 space-y-4">
          {schedules.map((item, index) => (
            <div
              key={index}
              className="bg-neutral-200 bg-opacity-80 py-3 px-5 rounded-2xl flex flex-row items-center"
            >
              <div className="w-4/5 shrink-0">
                <div className="text-4xl font-bold">{item.nama_kegiatan}</div>
                <div>
                  {item.ruangan} • PD: {item.opd_penyelenggara}
                </div>
              </div>
              <div className="flex flex-col flex-1 space-y-1">
                <div className="flex flex-row">
                  <div className="w-10">⏰</div>
                  <div>
                    {DateTime.fromISO(item.tanggal_mulai).toFormat('HH:mm')}
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="w-10">👨‍👩‍👧‍👦</div>
                  <div>{item.jumlah_undangan}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-5">
          <div className="flex flex-col bg-yellow-300 justify-center bg-opacity-90 flex-1 my-5 py-3 px-10 rounded-tr-full rounded-br-full">
            <div className="text-lg font-bold leading-5">{quotes.quote}</div>
            <div className="text-small italic">~ {quotes.author}</div>
          </div>

          <div className="flex flex-row items-center gap-1 py-3 px-10 my-5">
            <img src="/images/berakhlak_cr.png" alt="" className="h-8" />
            <img src="/images/bangga_mb.png" alt="" className="h-10" />
          </div>
        </div>
      </div>
    </>
  );
}
