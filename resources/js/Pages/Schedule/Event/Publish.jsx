import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import Tooltip from '@/Components/Tooltip';
import Receipt from '@/Handout/Receipt';
import { PrinterIcon } from '@heroicons/react/24/solid';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DateTime } from 'luxon';
import { useState } from 'react';

export default function Print({ schedule }) {
  const [type, setType] = useState(null);

  const [handoverHasHover, setHandoverHasHover] = useState(false);
  const [handoverRef, setHandoverRef] = useState(null);

  const [receiptHasHover, setReceiptHasHover] = useState(false);
  const [receiptRef, setReceiptRef] = useState(null);

  const openDialog = (type) => {
    setType(type);
  };

  const closeDialog = () => {
    setType(null);
  };

  return (
    <>
      <>
        <PrinterIcon
          className="h-4 cursor-pointer"
          onClick={() => openDialog(1)}
          onMouseEnter={() => setReceiptHasHover(true)}
          onMouseLeave={() => setReceiptHasHover(false)}
          ref={setReceiptRef}
        />

        {receiptHasHover && <Tooltip text="Unduh Bukti" ref={receiptRef} />}
      </>

      {/* <>
        <DocumentIcon
          className="h-4 cursor-pointer"
          onClick={() => openDialog(2)}
          onMouseEnter={() => setHandoverHasHover(true)}
          onMouseLeave={() => setHandoverHasHover(false)}
          ref={setHandoverRef}
        />

        {handoverHasHover && <Tooltip text="Unduh BAST" ref={handoverRef} />}
      </> */}

      {type && <Dialog type={type} close={closeDialog} schedule={schedule} />}
    </>
  );
}

function Dialog({ type, close, schedule }) {
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
                  <Receipt schedule={schedule} />
                ) : (
                  <Handover schedule={schedule} />
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
