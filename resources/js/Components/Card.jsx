function Card({ children, color }) {
  return (
    <div
      className="px-4 py-2 space-y-2 rounded-lg shadow bg-opacity-90 bg-zinc-100 text-sm border-l-4"
      style={{ borderLeftColor: color }}
    >
      {children}
    </div>
  );
}

function Header({ children }) {
  return <div className="font-bold leading-5 text-base">{children}</div>;
}

function Content({ children }) {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0">
      {children}
    </div>
  );
}

function Footer({ children }) {
  return (
    <div className="flex justify-between pt-1 border-t text-xs">{children}</div>
  );
}

Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;

export default Card;
