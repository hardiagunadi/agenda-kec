import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import Footer from './Parts/Footer';

export default function PublicLayout({ children }) {
  const { auth } = usePage().props;

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="sticky top-0 z-50 px-2 py-1">
        <div className="flex flex-row justify-between max-w-screen-xl px-5 mx-auto rounded bg-zinc-100 opacity-80">
          <div className="flex gap-5">
            <Link
              href={route('homepage')}
              className="flex items-center text-lg"
            >
              <img src="/images/wonosobo.png" className="py-2 h-14 md:mr-2" />
              <div className="hidden font-bold md:block md:mr-5">E-AGENDA</div>
            </Link>

            <div className="inline-flex items-center gap-5 font-bold">
              <Link href="/#layanan">Layanan</Link>
              <Link href="/#informasi">Informasi</Link>
            </div>

            <div className="items-center hidden gap-5 font-bold md:inline-flex">
              <a href="https://ppidsetda.wonosobokab.go.id/" target="_blank">
                PPID Setda
              </a>
              <a href="https://skm.wonosobokab.go.id/" target="_blank">
                SKM Wonosobo
              </a>
            </div>
          </div>

          <Link href={route('login')} className="inline-flex items-center">
            <ArrowRightOnRectangleIcon className="h-5 mr-1" />
            <div className="hidden md:block">
              {!auth.user ? 'Login' : 'Beranda'}
            </div>
          </Link>
        </div>
      </div>

      <div>{children}</div>

      <Footer />
    </div>
  );
}
