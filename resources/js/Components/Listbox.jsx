import { Listbox as List } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { usePopper } from 'react-popper';

export default function Listbox({ value, onChange, options = [], className }) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
  });

  return (
    <List
      value={value}
      by="id"
      onChange={onChange}
      defaultValue={value}
      as="div"
      className={
        'w-full border border-zinc-800 bg-zinc-900 text-zinc-300 rounded-full inline-flex items-center' +
        className
      }
      ref={setReferenceElement}
    >
      <List.Button className="flex flex-row justify-between flex-1 py-2 border-none rounded-md focus:ring-0">
        <div className="px-3">{value.name}</div>
        <ChevronDownIcon className="h-5 mr-3" />
      </List.Button>

      <List.Options
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-30 py-1 overflow-auto border rounded-lg shadow bg-zinc-800 border-zinc-700 text-zinc-300"
      >
        {options.map((option) => (
          <List.Option
            key={option.id}
            value={option}
            className="px-3 py-1 text-sm leading-5 text-left transition duration-150 ease-in-out cursor-pointer hover:bg-zinc-100 focus:outline-none focus:bg-gray-100 hover:text-zinc-700"
          >
            {option.name}
          </List.Option>
        ))}
      </List.Options>
    </List>
  );
}
