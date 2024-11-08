import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm, usePage } from '@inertiajs/react';
import { DateTime } from 'luxon';
import { useState } from 'react';

export default function Form({
  active,
  close,
  formData,
  reload,
  selectedOfficial,
}) {
  const { auth, officials } = usePage().props;

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const { data, setData, post, put, reset, errors, processing, transform } =
    useForm({
      official: formData?.official || selectedOfficial,
      description: formData?.description || '',
      start_at: formData?.start_at
        ? DateTime.fromISO(formData.start_at).toFormat(`yyyy-MM-dd'T'HH:mm`)
        : DateTime.now().toFormat(`yyyy-MM-dd'T'09:00`),
      place: formData?.place || '',
      note: formData?.note || '',
      user: formData?.user || auth.user.id,
    });

  const handleSuccess = () => {
    reload();
    handleClose();
  };

  const handleClose = () => {
    setTimeout(() => {
      setDeleteConfirmed(false);
      reset();
    }, 500);
    close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    transform((data) => ({
      ...data,
    }));

    if (!formData)
      return post(route('officialSchedules.store'), {
        onSuccess: () => handleSuccess(),
      });

    return put(route('officialSchedules.update', formData.id), {
      onSuccess: () => handleSuccess(),
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();

    if (!deleteConfirmed) return setDeleteConfirmed(true);

    return router.delete(route('officialSchedules.delete', id), {
      onSuccess: () => handleSuccess(),
    });
  };

  return (
    <>
      <Modal show={active} onClose={handleClose}>
        <div className="p-6 space-y-10">
          <form onSubmit={handleSubmit}>
            <div className="w-full space-y-4">
              <div>
                <InputLabel forinput="description" value="Kegiatan" />
                <TextInput
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="w-full"
                  required
                />
                <InputError message={errors.description} />
              </div>

              <div>
                <InputLabel forinput="place" value="Tempat" />
                <TextInput
                  id="place"
                  name="place"
                  value={data.place}
                  onChange={(e) => setData('place', e.target.value)}
                  required
                  className="w-full"
                  autoComplete="true"
                />
                <InputError message={errors.place} />
              </div>

              <div className="flex flex-row gap-3">
                <div className="w-full">
                  <InputLabel forinput="start_at" value="Waktu" />
                  <TextInput
                    id="start_at"
                    name="start_at"
                    value={data.start_at}
                    onChange={(e) => setData('start_at', e.target.value)}
                    type="datetime-local"
                    required
                    className="w-full"
                  />
                  <InputError message={errors.start_at} />
                </div>

                <div className="md:w-1/5">
                  <InputLabel forinput="official" value="Kode" />
                  <TextInput
                    id="official"
                    name="official"
                    value={data.official}
                    readOnly
                    disabled
                    className="w-full"
                  />
                  <InputError message={errors.official} />
                </div>
              </div>

              <div>
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

            {formData && (
              <div className="flex flex-row items-center gap-3 pt-3 mt-3 border-t border-zinc-200">
                <DangerButton onClick={(e) => handleDelete(e, formData.id)}>
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
    </>
  );
}
