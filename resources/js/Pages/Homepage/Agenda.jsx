import { UserIcon } from '@heroicons/react/24/solid';

export default function Agenda() {
  return (
    <div>
      <h2 className="text-4xl uppercase font-black mt-5 mb-5">
        # Setda Hari Ini
      </h2>
      <div>
        <div className="space-y-3">
          <Example2 />
          <Example />
          <Example2 />
          <Example />
        </div>
      </div>
    </div>
  );
}

function Example() {
  return (
    <div className="w-fit bg-white rounded-lg text-gray-700 px-5 py-2">
      <div className="border-b border-gray-300 mb-1 pb-1">
        Kunjungan Kerja Kabupaten Banjarnegara
      </div>
      <div className="text-sm">
        10.30 di <span className="font-bold uppercase">Pendopo Bupati</span>
      </div>
      <div className="lowercase tracking-tighter text-sm">
        {'@Bagian Umum'.replace(/\s/g, '')}
      </div>
    </div>
  );
}

function Example2() {
  return (
    <div className="w-fit bg-white rounded-lg text-gray-700 px-5 py-2">
      <div className="border-b border-gray-300 mb-1 pb-1">
        Kunjungan Kerja Kabupaten Banjarnegara. KSdfi
      </div>
      <div className="text-sm">
        16.45 di{' '}
        <span className="font-bold uppercase">Ruang Soerjohadikusumo</span>
      </div>
      <div className="lowercase tracking-tighter text-sm">
        {'@DPMPTSP'.replace(/\s/g, '')}
      </div>
    </div>
  );
}
