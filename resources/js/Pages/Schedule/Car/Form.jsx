import Combobox from '@/Components/Combobox';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm, usePage } from '@inertiajs/react';
import { concat, find } from 'lodash';
import { DateTime } from 'luxon';
import { useState } from 'react';

export default function Form({ active, close, formData, reload }) {
  const { auth, cars, drivers } = usePage().props;
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const carOptions = concat(
    { id: 'Belum Ditentukan', name: 'Belum Ditentukan' },
    cars.map(({ reg_number }) => ({
      id: reg_number,
      name: reg_number,
    }))
  );

  const driverOptions = concat(
    { id: 'Tanpa Pengemudi', name: 'Tanpa Pengemudi' },
    drivers.map(({ name }) => ({
      id: name,
      name,
    }))
  );

  const { data, setData, post, put, reset, errors, processing, transform } =
    useForm({
      customer: formData?.customer || '',
      organization: formData?.organization || '',
      phone: formData?.phone || '',
      car: find(carOptions, { name: formData?.car || 'Belum Ditentukan' }),
      description: formData?.description || '',
      driver: find(driverOptions, {
        name: formData?.driver || 'Tanpa Pengemudi',
      }),
      start_at: formData?.start_at
        ? DateTime.fromISO(formData.start_at).toFormat(`yyyy-MM-dd'T'HH:mm`)
        : DateTime.now().toFormat(`yyyy-MM-dd'T'06:00`),
      end_at: formData?.end_at
        ? DateTime.fromISO(formData.end_at).toFormat(`yyyy-MM-dd'T'HH:mm`)
        : DateTime.now().plus({ days: 1 }).toFormat(`yyyy-MM-dd'T'16:00`),
      note: formData?.note || '',
      from: formData?.from || 'Wonosobo',
      place: formData?.place || '',
      status: formData?.status || 2,
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
      driver: data.driver.name,
      car: data.car.name,
    }));

    if (!formData)
      return post(route('carSchedules.store'), {
        onSuccess: () => handleSuccess(),
      });

    return put(route('carSchedules.update', formData.id), {
      onSuccess: () => handleSuccess(),
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();

    if (!deleteConfirmed) return setDeleteConfirmed(true);

    return router.delete(route('carSchedules.delete', id), {
      onSuccess: () => handleSuccess(),
    });
  };

  return (
    <>
      <Modal show={active} onClose={handleClose}>
        <div className="p-6 space-y-10">
          <form onSubmit={handleSubmit}>
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="w-full">
                  <InputLabel forinput="customer" value="Peminjam" />
                  <TextInput
                    id="customer"
                    name="customer"
                    value={data.customer}
                    onChange={(e) => setData('customer', e.target.value)}
                    required
                    className="w-full"
                  />
                  <InputError message={errors.customer} />
                </div>

                <div className="md:w-2/5">
                  <InputLabel forinput="phone" value="Telepon" />
                  <TextInput
                    id="phone"
                    name="phone"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className="w-full"
                  />
                  <InputError message={errors.phone} />
                </div>
              </div>

              <div>
                <InputLabel forinput="organization" value="Instansi/OPD" />
                <TextInput
                  id="organization"
                  name="organization"
                  value={data.organization}
                  onChange={(e) => setData('organization', e.target.value)}
                  className="w-full"
                />
                <InputError message={errors.organization} />
              </div>

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

              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex-1">
                  <InputLabel forinput="car" value="Kendaraan" />
                  <Combobox
                    value={data.car}
                    onChange={(value) => setData('car', value)}
                    options={carOptions}
                    className="w-full"
                  />
                  <InputError message={errors.role} />
                </div>

                <div className="flex-1">
                  <InputLabel forinput="driver" value="Pengemudi" />
                  <Combobox
                    value={data.driver}
                    onChange={(value) => setData('driver', value)}
                    options={driverOptions}
                    className="w-full"
                  />
                  <InputError message={errors.role} />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex-1">
                  <InputLabel forinput="start_at" value="Mulai" />
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

                <div className="flex-1">
                  <InputLabel forinput="end_at" value="Sampai" />
                  <TextInput
                    id="end_at"
                    name="end_at"
                    value={data.end_at}
                    onChange={(e) => setData('end_at', e.target.value)}
                    type="datetime-local"
                    required
                    className="w-full"
                  />
                  <InputError message={errors.end_at} />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex-1">
                  <InputLabel forinput="from" value="Dari" />
                  <TextInput
                    id="from"
                    name="from"
                    value={data.from}
                    onChange={(e) => setData('from', e.target.value)}
                    required
                    className="w-full"
                  />
                  <InputError message={errors.from} />
                </div>

                <div className="flex-1">
                  <InputLabel forinput="place" value="Tujuan" />
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
