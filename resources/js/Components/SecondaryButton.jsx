export default function SecondaryButton({
  type = 'button',
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      className={
        `inline-flex shadow items-center py-2 px-3 bg-zinc-300 text-zinc-700 border
        hover:bg-zinc-400
        hover:ring-2 hover:ring-zinc-400 hover:ring-offset-2 hover:ring-offset-inherit
        border-transparent rounded-full text-xs tracking-widest transition ease-in-out duration-150 
        ${disabled && 'opacity-25'} ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
