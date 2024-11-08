import { Link } from '@inertiajs/react';

export default function Reservation() {
  return (
    <div>
      <div className="space-y-3">
        <div className="flex rounded-lg text-gray-800">
          <Image src="/images/backgrounds/1.jpg" />
          <div className="flex-1 py-3">
            <div className="bg-white h-full flex flex-col items-start justify-center rounded-r-lg py-3 px-6 space-y-5">
              <h3 className="text-2xl uppercase font-black">
                Peminjaman Tempat
              </h3>

              <div className="space-x-5">
                <button className="px-5 py-2 rounded-full bg-rose-700 text-white">
                  <Link href="/">E-Agenda</Link>
                </button>

                <button className="px-5 py-2 rounded-full ">
                  <Link href="/">Non Dinas</Link>
                </button>

                <button className="px-5 py-2 rounded-full">
                  <Link href="/">Informasi</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex rounded-lg text-gray-800">
          <div className="flex-1 py-3">
            <div className="bg-white h-full flex flex-col items-end justify-center rounded-l-lg py-3 px-6 space-y-5">
              <h3 className="text-2xl uppercase font-black">
                Penggunaan Gamelan
              </h3>

              <div className="space-x-5">
                <button className="px-5 py-2 rounded-full">
                  <Link href="/">Informasi</Link>
                </button>

                <button className="px-5 py-2 rounded-full bg-rose-700 text-white">
                  <Link href="/">Ajukan Permohonan</Link>
                </button>
              </div>
            </div>
          </div>
          <Image src="/images/backgrounds/1.jpg" />
        </div>

        <div className="flex rounded-lg text-gray-800">
          <Image src="/images/backgrounds/1.jpg" />
          <div className="flex-1 py-3">
            <div className="bg-white h-full flex flex-col items-start justify-center rounded-r-lg py-3 px-6 space-y-5">
              <h3 className="text-2xl uppercase font-black">
                Peminjaman Kendaraan
              </h3>

              <div className="space-x-5">
                <button className="px-5 py-2 rounded-full bg-rose-700 text-white">
                  <Link href={route('public.createCarSchedule')}>
                    Ajukan Permohonan
                  </Link>
                </button>

                <button className="px-5 py-2 rounded-full">
                  <Link href="/">Informasi</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Image({ src }) {
  return (
    <div
      style={{ backgroundImage: `url("${src}")` }}
      className="h-48 w-64 rounded-lg bg-cover"
    />
  );
}
