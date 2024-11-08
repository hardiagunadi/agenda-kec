import { forwardRef, useState } from 'react';
import { usePopper } from 'react-popper';

export default forwardRef(function Tooltip({ text = '!tooltip' }, ref) {
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(ref, popperElement, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 3],
        },
      },
    ],
  });

  return (
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      <div className="p-1 text-xs rounded bg-zinc-700 text-zinc-100">
        {text}
      </div>
    </div>
  );
});
