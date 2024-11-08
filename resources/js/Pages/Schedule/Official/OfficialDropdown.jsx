import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';
import { find } from 'lodash';
import { useState } from 'react';
import { usePopper } from 'react-popper';

export default function OfficialDropdown({
  selectedOfficial,
  setSelectedOfficial,
}) {
  const { officials } = usePage().props;

  const official = find(officials, { id: selectedOfficial }).name;

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
  });

  return (
    <Menu>
      <Menu.Button
        ref={setReferenceElement}
        className="inline-flex items-center space-x-1 text-sm md:text-base"
      >
        <div>👨‍💼 {official}</div> <ChevronDownIcon className="h-4" />
      </Menu.Button>
      <Menu.Items
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-30 flex flex-col py-1 overflow-auto rounded-lg shadow bg-zinc-100 text-zinc-700"
      >
        {officials.map((item) => (
          <Menu.Item
            key={item.id}
            as="button"
            className="px-3 py-1 text-sm leading-5 text-left transition duration-150 ease-in-out hover:bg-zinc-300 focus:outline-none focus:bg-gray-100 hover:text-zinc-700"
            onClick={() => setSelectedOfficial(item.id)}
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
