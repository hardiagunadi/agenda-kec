export default function InputLabel({
  value,
  className = '',
  children,
  ...props
}) {
  return (
    <label
      {...props}
      className={
        `block font-medium text-sm text-zinc-500 pl-2 mb-1 ` + className
      }
    >
      {value ? value : children}
    </label>
  );
}
