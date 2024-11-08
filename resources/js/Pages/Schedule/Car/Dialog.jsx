import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import Handover from '@/Handout/Handover';
import Receipt from '@/Handout/Receipt';
import { usePage } from '@inertiajs/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { find } from 'lodash';
import { DateTime } from 'luxon';

export default function Dialog({ type, close, schedule }) {
  const { cars } = usePage().props;

  return (
    <>
      <Modal show={type ? true : false} onClose={close}>
        <div className="px-10 py-5 space-y-3">
          <div>Permohonan sedang diproses, tunggu sebentar.</div>

          <div className="flex flex-row gap-3">
            <SecondaryButton onClick={close}>Batal</SecondaryButton>

            <PDFDownloadLink
              document={
                type == 1 ? (
                  <Receipt schedule={schedule} type={3} />
                ) : (
                  <Handover
                    schedule={schedule}
                    car={find(cars, { reg_number: schedule.car })}
                  />
                )
              }
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
