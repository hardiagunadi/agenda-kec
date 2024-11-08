import { Menu } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { router, usePage } from '@inertiajs/react';
import { find } from 'lodash';
import { useState } from 'react';

export default function Status({ id, status, reload }) {
  const { statuses: statusesOriginal } = usePage().props;
  const statuses = statusesOriginal.slice(0, -1);

  const colors = [
    'text-yellow-700 border-yellow-700',
    'text-green-700 border-green-700',
    'text-rose-700 border-rose-700',
    'text-zinc-700 border-zinc-700',
  ];

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
  });

  const statusText = find(statuses, { id: status }).name;

  const handleClick = (status) => {
    router.patch(
      route('carSchedules.setStatus', id),
      { status },
      { onSuccess: () => reload() }
    );
  };

  return (
    <Menu>
      <Menu.Button
        className={`
            ${colors[status - 1]}
            text-xs lowercase border rounded-full px-1 inline-flex items-center space-x-1
          `}
        ref={setReferenceElement}
      >
        <div>{statusText}</div>
        <ChevronDownIcon className="h-3" />
      </Menu.Button>

      <Menu.Items
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-40 flex flex-col py-1 overflow-auto border rounded-lg shadow-lg bg-zinc-100 border-zinc-300"
      >
        {statuses?.map((status) => (
          <Menu.Item
            key={status.id}
            as="button"
            className="px-3 py-1 text-sm leading-5 text-left transition duration-150 ease-in-out hover:bg-zinc-200 focus:outline-none"
            onClick={() => handleClick(status.id)}
          >
            {status.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
