import { Combobox as Combo } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { usePopper } from 'react-popper';

/**
 * @param options [{id, name}]
 */
function Combobox({ value, selectedItem, onChange, options = [], className }) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
  });

  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combo
      value={selectedItem}
      by="id"
      onChange={onChange}
      defaultValue={value}
      as="div"
      className={
        'w-full border border-zinc-300 bg-zinc-200 text-zinc-700 rounded-full inline-flex items-center' +
        className
      }
      ref={setReferenceElement}
    >
      <Combo.Input
        className="flex-1 py-2 bg-transparent border-none rounded-md focus:ring-0"
        onChange={(e) => setQuery(e.target.value)}
        displayValue={(option) => option.name}
      />
      <Combo.Button onClick={() => setQuery('')}>
        <ChevronDownIcon className="h-5 mr-3" />
      </Combo.Button>

      <Combo.Options
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-30 py-1 overflow-auto border rounded-lg shadow bg-zinc-100 border-zinc-300"
      >
        {query.length > 0 && (
          <Combo.Option
            value={{ id: null, name: query }}
            className="px-3 py-1 text-sm leading-5 text-left transition duration-150 ease-in-out cursor-pointer focus:outline-none hover:bg-zinc-200"
          >
            Tambahkan "{query}"
          </Combo.Option>
        )}

        {filteredOptions.map((option) => (
          <Combo.Option
            key={option.id}
            value={option}
            className="px-3 py-1 text-sm leading-5 text-left transition duration-150 ease-in-out cursor-pointer hover:bg-zinc-200 focus:outline-none"
          >
            {option.name}
          </Combo.Option>
        ))}
      </Combo.Options>
    </Combo>
  );
}

export default Combobox;
