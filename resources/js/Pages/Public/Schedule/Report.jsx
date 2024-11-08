import AccentButton from '@/Components/AccentButton';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Permit from '@/Handout/Permit';
import Receipt from '@/Handout/Receipt';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DateTime } from 'luxon';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export default function Report({ type = 3, id, schedule }) {
  const [qrReport, setQrReport] = useState('/images/wonosobo.png');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isModalPermitOpen, setIsModalPermitOpen] = useState(false);

  const [reportUrl, setReportUrl] = useState(route('homepage'));
  const [editUrl, setEditUrl] = useState(route('homepage'));

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openModalPermit = () => setIsModalPermitOpen(true);
  const closeModalPermit = () => setIsModalPermitOpen(false);

  useEffect(() => {
    if (type == 2) setEditUrl(route('public.editEventSchedule', id));
    if (type == 3) setEditUrl(route('public.editCarSchedule', id));
  }, []);

  useEffect(() => {
    if (type == 2) setReportUrl(route('public.reportEventSchedule', id));
    if (type == 3) setReportUrl(route('public.reportCarSchedule', id));
  }, []);

  useEffect(() => {
    QRCode.toDataURL(reportUrl, {
      margin: 2,
      width: 128,
    }).then((data) => setQrReport(data));
  }, [editUrl]);

  return (
    <PublicLayout>
      <Head title="Selesai" />

      <div className="flex flex-col items-center justify-center my-10 h-96">
        <div className="flex flex-col items-center max-w-lg gap-5 px-16 py-5 mx-auto rounded shadow-lg bg-zinc-200">
          <div className="text-lg font-bold uppercase">Selesai</div>

          <div className="w-full">
            <div>Entri permohonan berhasil.</div>

            <table>
              <tbody>
                <tr>
                  <td>Kegiatan</td>
                  <td>:</td>
                  <td>{schedule.description}</td>
                </tr>
                <tr>
                  <td>Tanggal</td>
                  <td>:</td>
                  <td>
                    {DateTime.fromISO(schedule.start_at).toFormat(
                      'cccc, dd MMMM yyyy'
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td>{schedule.status_text}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            className="w-32 h-32 bg-contain rounded"
            style={{ backgroundImage: `url(${qrReport})` }}
          />

          <div className="flex flex-row gap-3">
            <a href={editUrl}>
              <PrimaryButton>Ubah Permohonan</PrimaryButton>
            </a>

            <AccentButton onClick={openDialog}>Tiket Entri</AccentButton>

            {type == 2 && schedule.status == 2 && (
              <AccentButton onClick={openModalPermit}>Surat Ijin</AccentButton>
            )}
          </div>

          {type == 2 && (
            <div className="text-sm">
              Surat Ijin Penggunaan dapat diunduh setelah Petugas memberikan
              persetujuan (status = disetujui).
            </div>
          )}

          {type == 3 && (
            <div className="text-sm">
              Berita Acara Serah Terima (BAST) akan disampaikan bersamaan dengan
              serah terima kendaraan.
            </div>
          )}
        </div>

        {isModalPermitOpen && (
          <ModalPermit
            active={isModalPermitOpen}
            close={closeModalPermit}
            schedule={schedule}
          />
        )}

        {isDialogOpen && (
          <Dialog
            type={type}
            active={isDialogOpen}
            close={closeDialog}
            schedule={schedule}
          />
        )}
      </div>
    </PublicLayout>
  );
}

function ModalPermit({ active, close, schedule }) {
  return (
    <Modal show={active} onClose={close}>
      <div className="px-10 py-5 gap-3 flex flex-col items-center">
        <div
          className="bg-contain h-48 bg-no-repeat w-full bg-center"
          style={{
            backgroundImage: "url('/images/artworks/storyset-text-files.svg')",
          }}
        />

        <div className="flex flex-row gap-3">
          <SecondaryButton onClick={close}>Batal</SecondaryButton>

          <PDFDownloadLink
            document={<Permit schedule={schedule} />}
            fileName={`e_agenda_-${schedule.id.substr(
              0,
              4
            )}_${DateTime.now().toFormat('dd-MM-yy_HH-mm')}`}
            className="inline-flex items-center px-3 py-2 text-xs tracking-widest transition duration-150 ease-in-out border border-transparent rounded-full shadow bg-rose-700 border-rose-700 text-zinc-100 hover:bg-rose-800 hover:ring-2 hover:ring-rose-700 hover:ring-offset-2 hover:ring-offset-inherit"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'menyiapkan...' : 'Unduh'
            }
          </PDFDownloadLink>
        </div>
      </div>
    </Modal>
  );
}

function Dialog({ type, active, close, schedule }) {
  return (
    <>
      <Modal show={active} onClose={close}>
        <div className="px-10 py-5 space-y-3">
          <div>Permohonan sedang diproses, tunggu sebentar.</div>

          <div className="flex flex-row gap-3">
            <SecondaryButton onClick={close}>Batal</SecondaryButton>

            <PDFDownloadLink
              document={<Receipt schedule={schedule} type={type} />}
              fileName={`e_agenda_-${schedule.id.substr(
                0,
                4
              )}_${DateTime.now().toFormat('dd-MM-yy_HH-mm')}`}
              className="inline-flex items-center px-3 py-2 text-xs tracking-widest transition duration-150 ease-in-out border border-transparent rounded-full shadow bg-rose-700 border-rose-700 text-zinc-100 hover:bg-rose-800 hover:ring-2 hover:ring-rose-700 hover:ring-offset-2 hover:ring-offset-inherit"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'menyiapkan...' : 'Unduh'
              }
            </PDFDownloadLink>
          </div>
        </div>
      </Modal>
    </>
  );
}
