import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Form({ active, close, reload, activeData }) {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const { data, setData, post, put, reset, errors, processing } = useForm({
    name: activeData?.name || '',
    capacity: activeData?.capacity || 0,
    note: activeData?.note || '',
  });

  const handleClose = () => {
    setTimeout(() => {
      setDeleteConfirmed(false);
      reset();
    }, 500);
    close();
  };

  const handleSuccess = () => {
    reload();
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!activeData)
      return post(route('settings.places.create'), {
        onSuccess: () => handleSuccess(),
      });

    return put(route('settings.places.update', activeData.id), {
      onSuccess: () => handleSuccess(),
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();

    if (!deleteConfirmed) return setDeleteConfirmed(true);

    return router.delete(route('settings.places.delete', id), {
      onSuccess: () => handleSuccess(),
    });
  };

  return (
    <Modal show={active} onClose={handleClose}>
      <div className="px-5 space-y-10 sm:py-5">
        <form onSubmit={handleSubmit}>
          <div className="w-full space-y-4">
            <div className="w-full">
              <InputLabel forinput="name" value="Nama Tempat" />
              <TextInput
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full"
              />
              <InputError message={errors.name} />
            </div>

            <div className="w-full">
              <InputLabel forinput="capacity" value="Kapasitas Max" />
              <TextInput
                id="capacity"
                name="capacity"
                type="number"
                min="0"
                value={data.capacity}
                onChange={(e) => setData('capacity', e.target.value)}
                className="w-full"
              />
              <InputError message={errors.capacity} />
            </div>

            <div className="w-full">
              <InputLabel forinput="note" value="Catatan" />
              <TextInput
                id="note"
                name="note"
                value={data.note}
                onChange={(e) => setData('note', e.target.value)}
                className="w-full"
              />
              <InputError message={errors.note} />
            </div>
          </div>

          <div className="mt-5 space-x-3">
            <SecondaryButton onClick={handleClose}>Batal</SecondaryButton>
            <PrimaryButton type="submit" disabled={processing}>
              {processing ? 'Diproses...' : 'Simpan'}
            </PrimaryButton>
          </div>

          {activeData && (
            <div className="flex flex-row items-center gap-3 pt-3 mt-3 border-t border-zinc-200">
              <DangerButton onClick={(e) => handleDelete(e, activeData.id)}>
                {!deleteConfirmed ? 'Hapus' : 'Lanjutkan!'}
              </DangerButton>

              {deleteConfirmed && (
                <div className="text-sm text-zinc-700">
                  Penghapusan data bersifat permanen, lanjutkan dengan
                  hati-hati!
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
}
