import { Link as InertiaLink, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { usePopper } from 'react-popper';

export default function Sidebar() {
  const { props, url } = usePage();
  const user = props.auth.user;

  return (
    <nav className="z-20 flex flex-col px-1 py-5 bg-zinc-200 w-52">
      <Link
        active={url === '/dashboard'}
        href={route('dashboard')}
        text="🐼 Dashboard"
      />

      <Separator text="Jadwal" />
      <Link
        href={route('officialSchedules')}
        active={url.startsWith('/jadwal/pimpinan')}
        text="👨‍💼 Pimpinan"
      />
      <Link href="/" text="📅 Kegiatan" />
      <Link
        active={url.startsWith('/jadwal/kendaraan')}
        href={route('carSchedules')}
        text="🚗 Kendaraan"
      />

      <Separator text="Lain-lain" />
      <Link href="/" text="🌏 e-Agenda" />

      {user.role == 1 && (
        <>
          <Separator text="Pengaturan" />
          <Link
            active={url.startsWith('/users')}
            href={route('users')}
            text="👪 Pengguna"
          />
          <Link href="/" text="👔 Tempat" />
          <Link href="/" text="🚗 Kendaraan" />
          <Link href="/" text="😎 Pengemudi" />
        </>
      )}

      <Trademark />
    </nav>
  );
}

function Trademark() {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top-start',
    modifiers: [{ name: 'offset', options: { offset: [35, -55] } }],
  });
  const [popperVisible, setPopperVisible] = useState(false);

  return (
    <div
      className="mt-auto text-xs text-center text-zinc-500 px-3"
      ref={setReferenceElement}
    >
      <div className="border-b border-zinc-300 pb-1 mb-1">
        &copy; {new Date().getFullYear()} Bag Umum Setda Wsb
      </div>
      <div className="text-center">
        Developed & maintained by:
        <a
          href="https://github.com/rdhermawan"
          target="_blank"
          onMouseOver={() => setPopperVisible(true)}
          onMouseOut={() => setPopperVisible(false)}
        >
          <div>@rdhermawan</div>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {popperVisible && (
              <div className="text-xl origin-bottom-right animate-wave">👋🏼</div>
            )}
          </div>
        </a>
      </div>
    </div>
  );
}

function Link({ href, text, active }) {
  return (
    <InertiaLink
      href={href}
      className={`px-3 py-2 mb-1 text-sm rounded-full text-zinc-700 hover:text-zinc-300 hover:bg-rose-700 hover:shadow
      ${active && 'font-bold text-rose-700'}
      `}
    >
      {text}
    </InertiaLink>
  );
}

function Separator({ text }) {
  return (
    <div className="pb-1 mx-3 mt-5 mb-1 text-xs font-bold tracking-widest uppercase border-b text-zinc-500 border-zinc-300">
      {text}
    </div>
  );
}
