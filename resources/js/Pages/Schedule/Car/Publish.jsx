import Tooltip from '@/Components/Tooltip';
import { DocumentIcon, PrinterIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Dialog from './Dialog';

export default function Publish({ schedule }) {
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

      <>
        <DocumentIcon
          className="h-4 cursor-pointer"
          onClick={() => openDialog(2)}
          onMouseEnter={() => setHandoverHasHover(true)}
          onMouseLeave={() => setHandoverHasHover(false)}
          ref={setHandoverRef}
        />

        {handoverHasHover && <Tooltip text="Unduh BAST" ref={handoverRef} />}
      </>

      {type && <Dialog type={type} close={closeDialog} schedule={schedule} />}
    </>
  );
}
