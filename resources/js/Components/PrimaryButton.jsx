export default function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        `inline-flex shadow items-center py-2 px-3 bg-rose-700 border-rose-700 text-zinc-100 border
        hover:bg-rose-800
        hover:ring-2 hover:ring-rose-700 hover:ring-offset-2 hover:ring-offset-inherit
        border-transparent rounded-full text-xs tracking-widest transition ease-in-out duration-150 
        ${disabled && 'opacity-25'} ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
