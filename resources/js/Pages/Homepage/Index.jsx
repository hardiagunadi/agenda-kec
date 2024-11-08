import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export default function Index() {
  const [qrSchedule, setQrSchedule] = useState('/images/wonosobo.png');
  const [qrEvent, setQrEvent] = useState('/images/wonosobo.png');
  const [qrCar, setQrCar] = useState('/images/wonosobo.png');

  useEffect(() => {
    QRCode.toDataURL(route('public.event.schedules'), {
      margin: 2,
      width: 128,
      version: 4,
    }).then((data) => setQrSchedule(data));

    QRCode.toDataURL(route('public.createEventSchedule'), {
      margin: 2,
      width: 128,
      version: 4,
    }).then((data) => setQrEvent(data));

    QRCode.toDataURL(route('public.createCarSchedule'), {
      margin: 2,
      width: 128,
      version: 4,
    }).then((data) => setQrCar(data));
  }, []);

  return (
    <PublicLayout>
      <Head title="Selamat Datang" />

      <div
        className="w-full h-[650px] py-5 bg-cover bg-no-repeat bg-center flex flex-row items-center"
        style={{ backgroundImage: 'url("/images/places/mangoen-1.jpg")' }}
      >
        <div className="text-zinc-700 md:w-[720px] mx-auto px-5 md:px-20 bg-zinc-100 bg-opacity-90 py-10 rounded">
          <h1 className="text-5xl font-bold">E-AGENDA</h1>
          <div>Bagian Umum Setda Wonosobo</div>
        </div>
      </div>

      <div
        className="w-full pt-40 pb-16 bg-orange-300 bg-cover"
        style={{
          backgroundImage:
            'url("/images/backgrounds/layered-waves-haikei-rose-orange.svg")',
        }}
        id="layanan"
      >
        <div className="flex flex-col max-w-screen-md gap-5 mx-auto text-center">
          <h2 className="text-2xl font-bold text-zinc-800">
            Layanan Daring Bagian Umum
          </h2>

          <div className="flex flex-col items-center gap-2 p-5 mx-auto rounded w-fit bg-zinc-100 bg-opacity-90">
            <div
              className="w-32 h-32 bg-contain rounded"
              style={{ backgroundImage: `url(${qrSchedule})` }}
            ></div>

            <Link
              href={route('public.event.schedules')}
              className="px-8 py-3 font-bold bg-green-700 rounded-full shadow text-zinc-100"
            >
              Lihat Jadwal Kegiatan
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center gap-10 py-5 md:flex-row">
            <div className="flex flex-col items-center gap-2 p-5 rounded bg-zinc-100 bg-opacity-90">
              <div
                className="w-32 h-32 bg-contain rounded"
                style={{ backgroundImage: `url(${qrEvent})` }}
              ></div>

              <Link
                href={route('public.createEventSchedule')}
                className="px-8 py-3 font-bold rounded-full shadow bg-rose-700 text-zinc-100"
              >
                Pinjam Pakai Ruang Rapat
              </Link>
            </div>

            <div className="flex flex-col items-center gap-2 p-5 rounded bg-zinc-100 bg-opacity-90">
              <div
                className="w-32 h-32 bg-contain rounded"
                style={{ backgroundImage: `url(${qrCar})` }}
              ></div>

              <Link
                href={route('public.createCarSchedule')}
                className="px-8 py-3 font-bold rounded-full shadow bg-rose-700 text-zinc-100"
              >
                Pinjam Pakai Kendaraan
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="px-5 pt-40 pb-16 bg-cover bg-zinc-100"
        style={{
          backgroundImage:
            'url("/images/backgrounds/layered-waves-haikei-orange-zinc.svg")',
        }}
        id="informasi"
      >
        <div className="max-w-screen-md mx-auto ">
          <h2 className="mb-2 text-2xl font-bold text-center">
            Bagian Umum Sekretariat Daerah
          </h2>
          <div>
            "Melaksanakan penyiapan pelaksanaan kebijakan dan pemantauan dan
            evaluasi di bidang tata usaha pimpinan, staf ahli dan kepegawaian,
            keuangan, rumah tangga dan perlengkapan."
          </div>
          <div className="mt-2 text-sm text-right text-zinc-500">
            - Pasal 35 ayat (1) huruf a Perbup Wonosobo Nomor 10 Tahun 2022
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
