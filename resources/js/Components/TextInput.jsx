import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
  {
    type = 'text',
    className = '',
    isFocused = false,
    disabled = false,
    ...props
  },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      className={`border border-zinc-300  ring-zinc-700 focus:border-rose-700 focus:ring-rose-700  rounded-full shadow-sm  
        ${
          disabled
            ? ' bg-zinc-300 text-zinc-400 '
            : ' bg-zinc-200 text-zinc-700 '
        }
        ${className}
      `}
      ref={input}
    />
  );
});
