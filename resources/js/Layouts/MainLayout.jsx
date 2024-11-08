import { Head } from '@inertiajs/react';

import Navbar from './Parts/Navbar';

function MainLayout({ children, maxWidthClass = 'max-w-screen-xl' }) {
  return (
    <div
      className="flex flex-col w-full h-screen bg-bottom bg-cover text-zinc-700 bg-zinc-300"
      style={{
        backgroundImage: 'url("/images/backgrounds/layered-waves-haikei.svg")',
      }}
    >
      <Navbar />

      <div
        className={`flex flex-col w-full h-screen gap-0 mx-auto overflow-hidden md:gap-5 md:flex-row ${maxWidthClass}`}
      >
        {children}
      </div>

      <footer className="w-full px-3 py-1 text-xs text-zinc-300">
        <div className="max-w-screen-xl mx-auto">
          Developed & maintained by{' '}
          <a href="https://github.com/rdhermawan" target="_blank">
            @rdhermawan
          </a>
        </div>
      </footer>
    </div>
  );
}

function Sidebar({ children, title }) {
  return (
    <>
      <Head title={title} />

      <aside className="px-3 pt-3 pb-0 space-y-2 md:space-y-4 shrink-0 md:w-[280px] md:py-5">
        <h1 className="text-base font-bold md:text-xl text-zinc-700">
          {title}
        </h1>
        <>{children}</>
      </aside>
    </>
  );
}

function Content({ children }) {
  return (
    <main className="flex flex-col flex-1 px-3 py-5 mt-3 mb-1 space-y-3 overflow-auto border-t border-b md:mt-5 border-zinc-200 shrink-0">
      {children}
    </main>
  );
}

MainLayout.Sidebar = Sidebar;
MainLayout.Content = Content;

export default MainLayout;
