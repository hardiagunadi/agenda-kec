import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Delete({
  path,
  id,
  textTitle,
  textConfirmation,
  textNotes,
}) {
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);
  const { processing, reset, delete: destroy } = useForm();

  const confirmDeletion = () => {
    setConfirmingDeletion(true);
  };

  const closeModal = () => {
    setConfirmingDeletion(false);
    reset();
  };

  const proceedDeletion = (e) => {
    e.preventDefault();
    destroy(route(path, id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    });
  };

  return (
    <>
      <DangerButton onClick={confirmDeletion}>Hapus {textTitle}</DangerButton>

      <Modal show={confirmingDeletion} onClose={closeModal}>
        <form onSubmit={proceedDeletion} className="p-6">
          {textConfirmation && (
            <h2 className="text-lg font-medium text-gray-900">
              {textConfirmation}
            </h2>
          )}

          {textNotes && (
            <p className="mt-1 text-sm text-gray-600">{textNotes}</p>
          )}

          <div className="flex justify-end mt-6">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <DangerButton className="ml-3">Hapus</DangerButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
