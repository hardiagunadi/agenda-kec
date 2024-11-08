import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';

export default function Footer() {
  return (
    <footer
      className="w-full text-zinc-200 pt-28 pb-10 bg-cover bg-[center_top_-1px] bg-rose-700"
      style={{
        backgroundImage:
          'url("/images/backgrounds/layered-waves-haikei-footer.svg")',
      }}
    >
      <div>
        <div className="flex flex-col justify-between max-w-screen-lg gap-10 px-10 pt-20 pb-10 mx-auto mb-10 border-b border-opacity-50 md:flex-row border-rose-200">
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-bold">
              Sekretariat Daerah Kabupaten Wonosobo
            </h3>

            <div className="inline-flex items-center">
              <MapPinIcon className="w-4 mr-4 shrink-0" />
              <div>
                Jalan Soekarno-Hatta Nomor 2-4 Wonosobo, Jawa Tengah 56311
              </div>
            </div>

            <div className="inline-flex items-center">
              <PhoneIcon className="w-4 mr-4 shrink-0" />
              <div>(0286) 321345</div>
            </div>

            <div className="inline-flex items-center">
              <EnvelopeIcon className="w-4 mr-4 shrink-0" />
              <a href="mailto:setda@wonosobokab.go.id?subject=Panda Wonosobo">
                setda@wonosobokab.go.id
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-bold">Tautan Terkait</h3>
            <a
              href="https://website.wonosobokab.go.id/"
              target="_blank"
              className="block"
            >
              Website Pemerintah Daerah Wonosobo
            </a>
            <a
              href="https://ppidsetda.wonosobokab.go.id/"
              target="_blank"
              className="block"
            >
              PPID Setda
            </a>
            <a
              href="https://skm.wonosobokab.go.id/"
              target="_blank"
              className="block"
            >
              SKM Wonosobo
            </a>
          </div>
        </div>

        <div className="pb-3 mx-auto text-center x-5 md:flex-row">
          <div>
            <div>
              &copy; {new Date().getFullYear()}{' '}
              <span className="font-bold">Bagian Umum Setda Wonosobo</span>
            </div>
            <div className="text-sm">
              Developed & maintained by:{' '}
              <a href="https://github.com/rdhermawan" target="_blank">
                @rdhermawan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
