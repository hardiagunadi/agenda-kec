import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { DateTime } from 'luxon';
import { Transition } from '@headlessui/react';

export default function Kiosk({ schedules }) {
  return (
    <>
      <Head title="Kiosk" />

      <div
        className="h-screen w-full overflow-hidden flex flex-col py-5 px-5 gap-5 bg-cover"
        style={{
          backgroundImage:
            "url('/images/backgrounds/blurry-gradient-ro-haikei.svg')",
        }}
      >
        <div className="flex-1 flex flex-row gap-5 overflow-hidden">
          <Content schedules={schedules} />

          <Aside />
        </div>

        <RunningText />
      </div>
    </>
  );
}

function Content({ schedules }) {
  return (
    <div className="w-full bg-zinc-100 bg-opacity-70 rounded-lg shadow-lg py-3 px-5 flex flex-col overflow-hidden">
      <h3 className="font-bold uppercase text-xl">Kegiatan Hari Ini</h3>

      <div className="flex flex-col gap-3 mt-3 overflow-y-scroll no-scrollbar">
        {schedules.map((schedule, index) => (
          <Card key={index} schedule={schedule} />
        ))}
      </div>
    </div>
  );
}

function Card({ schedule }) {
  const startAt = DateTime.fromISO(schedule.start_at).toFormat('HH:mm');
  const endAt = DateTime.fromISO(schedule.end_at).toFormat('HH:mm');

  return (
    <div className="w-full bg-zinc-100 bg-opacity-50 rounded-lg shadow-lg px-5 py-3 space-y-1">
      <div className="font-bold uppercase text-3xl">{schedule.description}</div>
      <div className="inline-flex gap-5">
        <div>
          {startAt} - {endAt}
        </div>
        <div>•</div>
        <div>{schedule.place}</div>
        <div>•</div>
        <div>{schedule.organization}</div>
        {schedule.participants > 0 && (
          <>
            <div>•</div>
            <div>{schedule.participants} peserta</div>
          </>
        )}
      </div>
    </div>
  );
}

function Aside() {
  const [qrBook, setQrBook] = useState('/images/wonosobo.png');

  useEffect(() => {
    QRCode.toDataURL(route('public.createEventSchedule'), {
      margin: 2,
      width: 128,
    }).then((data) => setQrBook(data));
  }, []);

  return (
    <div className="w-1/4 flex flex-col gap-5 justify-between">
      <div className="w-full py-5">
        <div
          className="w-full h-48 bg-no-repeat bg-contain bg-center"
          style={{
            backgroundImage: "url('/images/wonosobo.png')",
          }}
        />
        {/* <div className="text-center leading-3 mt-3">
          <div className="text-xl uppercase font-bold">Wonosobo</div>
          <div>the Soul of Java</div>
        </div> */}
      </div>

      {/* <div className="bg-zinc-100 bg-opacity-70 rounded-lg shadow-lg py-3 px-5 flex-1">
        <h3 className="font-bold uppercase text-xl">Informasi</h3>
      </div> */}

      <div className="x-5 flex flex-col items-center">
        <img src={qrBook} alt="QR Reservasi" className="shadow-lg" />
        <div className="text-xs mt-2 italic flex flex-col items-center">
          <div className="bg-zinc-100 bg-opacity-70 py-[2px] px-2 rounded w-fit">
            pindai untuk permohonan, atau kunjungi
          </div>
          <div className="bg-zinc-100 bg-opacity-70 py-[2px] px-2 rounded w-fit">
            {route('public.createEventSchedule')}
          </div>
        </div>
      </div>
    </div>
  );
}

function RunningText() {
  const news = [
    'Wonosobo Hebat',
    'Setda Maer',
    'Cancut Taliwondo, Nyengkuyung Wonosobo Raharjo',
  ];

  const duration = 10000;

  const [counter, setCounter] = useState(0);

  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);

      const timeOut = setTimeout(() => {
        setShow(true);
        clearTimeout(timeOut);
      }, 100);

      setCounter((prevCounter) => {
        if (prevCounter + 1 >= news.length) return 0;
        return prevCounter + 1;
      });
    }, duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-row gap-3 items-center py-1">
      <div className="flex-1 bg-zinc-100 bg-opacity-70 to-zinc-200 text-xl uppercase tracking-wide font-bold h-14 py-3 px-5 rounded-lg shadow-lg flex flex-row items-center">
        <div className="flex flex-row items-center gap-3 shadow-lg rounded-full">
          <img src="/images/soj.png" alt="" className="h-20" />
        </div>

        <Transition
          appear={true}
          show={show}
          enter="transition-opacity duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="ml-3 flex-1"
        >
          {show && news[counter]}
        </Transition>

        <div className="flex flex-row items-center gap-1 rounded-full">
          <img src="/images/berakhlak_cr.png" alt="" className="h-8" />
          <img src="/images/bangga_mb.png" alt="" className="h-10" />
        </div>
      </div>
    </div>
  );
}
