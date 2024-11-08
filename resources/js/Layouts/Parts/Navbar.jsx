import Dropdown from '@/Components/Dropdown';
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { useState } from 'react';

function MenuSection({ text }) {
  return (
    <div className="px-3 uppercase text-[10px] mt-2 text-zinc-400">{text}</div>
  );
}

function MenuItem({ href, text }) {
  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <Link className={`${active && 'bg-zinc-300'} px-3 py-1`} href={href}>
          {text}
        </Link>
      )}
    </HeadlessMenu.Item>
  );
}

function Menu() {
  const { auth } = usePage().props;

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [-20, -2] } }],
  });

  return (
    <HeadlessMenu>
      {({ open }) => (
        <>
          <HeadlessMenu.Button
            as="div"
            ref={setReferenceElement}
            className={`${
              open && 'border-zinc-300'
            } flex items-center cursor-pointer w-48 border border-transparent hover:border-zinc-300 px-1 py-1 text-sm rounded`}
          >
            <Bars3Icon className="h-6" />
            <div className="flex-1 ml-1">Menu</div>
            {open ? (
              <ChevronUpIcon className="h-3" />
            ) : (
              <ChevronDownIcon className="h-3" />
            )}
          </HeadlessMenu.Button>

          <HeadlessMenu.Items
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="z-50 flex flex-col w-48 pt-2 pb-1 text-sm border-b border-l border-r rounded-b outline-none bg-zinc-100 border-zinc-300"
          >
            <MenuItem href={route('dashboard')} text="🚪 Dasbor" />

            <MenuSection text="Jadwal" />
            <MenuItem href={route('officialSchedules')} text="👨‍💼 Pimpinan" />
            <MenuItem href={route('eventSchedules')} text="📅 Kegiatan" />
            <MenuItem href={route('carSchedules')} text="🚗 Kendaraan" />

            <MenuSection text="Lainnya" />
            {auth.can.view.settings && (
              <MenuItem href={route('settings')} text="⚙️ Pengaturan" />
            )}
            <MenuItem href={route('users')} text="📖 Panduan" />
            <MenuItem href={route('users')} text="📚 SOP dan SP" />
          </HeadlessMenu.Items>
        </>
      )}
    </HeadlessMenu>
  );
}

export default function Navbar() {
  const { props } = usePage();
  const user = props.auth.user;

  return (
    <nav className="sticky top-0 z-40 w-full shadow bg-opacity-80 bg-zinc-100">
      <div className="flex flex-row items-center justify-between max-w-screen-xl px-5 py-1 mx-auto">
        <div className="flex flex-row items-center space-x-5">
          <Link href="/" className="flex items-center text-lg">
            <img src="/images/wonosobo.png" className="h-12 py-1 sm:mr-2" />
            <div className="hidden font-bold sm:block">E-AGENDA</div>
          </Link>

          <Menu />
        </div>

        <Dropdown>
          <Dropdown.Button>
            <div className="flex items-center space-x-1">
              <UserCircleIcon className="h-7" />
              <div className="hidden text-sm sm:block">{user.email}</div>
            </div>
          </Dropdown.Button>
          <Dropdown.Items>
            <Dropdown.Item disabled>{user.name}</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item href={route('profile.edit')}>Profil</Dropdown.Item>
            <Dropdown.Item href={route('logout')} method="post">
              Logout
            </Dropdown.Item>
          </Dropdown.Items>
        </Dropdown>
      </div>
    </nav>
  );
}
