import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
  const { auth } = usePage().props;

  return (
    <div className="sticky top-0 max-w-screen-2lg px-20 mx-auto py-3 bg-transparent">
      <div className="bg-white border border-gray-100 shadow-md px-10 py-3 rounded-2xl text-rose-950 inline-flex w-full gap-10 justify-between">
        <div className="inline-flex gap-10">
          <div>Panda Wonosobo</div>
          <div className="inline-flex gap-5">
            <div>Pinjam Tempat</div>
            <div>Informasi</div>
            <div>SKM</div>
          </div>
        </div>

        <Link href={route('login')} className="inline-flex items-center">
          <ArrowRightOnRectangleIcon className="h-5 mr-1" />
          <div>{!auth.user ? 'Login' : 'Beranda'}</div>
        </Link>
      </div>
    </div>
  );
}
