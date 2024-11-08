import { Menu } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { usePopper } from 'react-popper';

export default function Delegation({ id, reload, selectedOfficial }) {
  const allOfficials = [
    'Wakil Bupati',
    'Sekretaris Daerah',
    'Staf Ahli I',
    'Staf Ahli II',
    'Staf Ahli III',
    'Asisten I',
    'Asisten II',
    'Asisten III',
  ];

  const targetOfficials =
    selectedOfficial > 1 ? allOfficials.slice(2) : allOfficials;

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
  });

  const handleClick = (target) => {
    router.patch(
      route('officialSchedules.delegate', id),
      { delegation: target },
      { onSuccess: () => reload() }
    );
  };

  return (
    <Menu>
      <Menu.Button
        className="inline-flex items-center px-1 space-x-1 text-xs lowercase border rounded-full border-zinc-500"
        ref={setReferenceElement}
      >
        <div>delegasi</div>
        <ChevronRightIcon className="h-3" />
      </Menu.Button>

      <Menu.Items
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-30 flex flex-col py-1 overflow-auto border rounded-lg shadow-lg bg-zinc-100 border-zinc-300"
      >
        {targetOfficials?.map((official) => (
          <Menu.Item
            key={official}
            as="button"
            className="px-3 py-1 text-sm leading-5 text-left transition duration-150 ease-in-out hover:bg-zinc-200 focus:outline-none"
            onClick={() => handleClick(official)}
          >
            {official}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
