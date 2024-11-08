export default function AccentButton({
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        `inline-flex shadow items-center py-2 px-3 bg-green-700 border-green-700 text-zinc-100 border
        hover:bg-green-800
        hover:ring-2 hover:ring-green-700 hover:ring-offset-2 hover:ring-offset-inherit
        border-transparent rounded-full text-xs tracking-widest transition ease-in-out duration-150 
        ${disabled && 'opacity-25'} ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
