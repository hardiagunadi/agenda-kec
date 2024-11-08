import { Link } from '@inertiajs/react';

export default function Links() {
  return (
    <div className="flex flex-col">
      <Link href={route('users')}>Pengguna</Link>
      <Link href={route('users')}>Kendaraan</Link>
      <Link href={route('settings.places')}>Tempat</Link>
    </div>
  );
}
