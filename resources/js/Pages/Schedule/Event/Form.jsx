import Combobox from '@/Components/Combobox';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { RadioGroup } from '@headlessui/react';
import { router, useForm, usePage } from '@inertiajs/react';
import { concat, find } from 'lodash';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Form({ active, close, formData, reload }) {
  const { places } = usePage().props;
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const placeOptions = concat(
    { id: 'Belum Ditentukan', name: 'Belum Ditentukan' },
    places.map(({ name }) => ({
      id: name,
      name,
    }))
  );

  const [date, setDate] = useState(
    formData
      ? DateTime.fromISO(formData.start_at).toFormat('yyyy-MM-dd')
      : DateTime.now().toFormat(`yyyy-MM-dd`)
  );
  const [startAt, setStartAt] = useState(
    formData ? DateTime.fromISO(formData.start_at).toFormat('HH:mm') : '08:00'
  );
  const [endAt, setEndAt] = useState(
    formData ? DateTime.fromISO(formData.end_at).toFormat('HH:mm') : '12:00'
  );
  const [session, setSession] = useState(formData ? '9' : '1');

  const [booked, setBooked] = useState({ status: 'init' });

  useEffect(() => {
    if (session == 1) {
      setStartAt('08:00');
      setEndAt('12:00');
    }

    if (session == 2) {
      setStartAt('13:00');
      setEndAt('16:00');
    }

    if (session == 3) {
      setStartAt('19:00');
      setEndAt('22:00');
    }
  }, [session]);

  const {
    data,
    setData,
    post,
    put,
    reset,
    errors,
    setError,
    processing,
    transform,
  } = useForm({
    customer: formData?.customer || '',
    organization: formData?.organization || '',
    phone: formData?.phone || '',
    description: formData?.description || '',
    start_at: formData ? DateTime.fromISO(formData.start_at).toSQL() : '',
    end_at: formData ? DateTime.fromISO(formData.end_at).toSQL() : '',
    note: formData?.note || '',
    place: find(placeOptions, {
      name: formData?.place || 'Belum Ditentukan',
    }),
    status: formData?.status || 2,
    participants: formData?.participants || 0,
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

    if (booked.status != 'ok')
      return toast.error(`terjadi kesalahan, pastikan jadwal tidak bentrok.`, {
        id: 'booked',
      });

    if (DateTime.fromSQL(startAt) > DateTime.fromSQL(endAt))
      return setError('time', 'cek ulang waktu');

    if (!formData)
      return post(route('eventSchedules.store'), {
        onSuccess: () => handleSuccess(),
      });

    return put(route('eventSchedules.update', formData.id), {
      onSuccess: () => handleSuccess(),
    });
  };

  useEffect(() => {
    setData({
      ...data,
      start_at: `${date} ${startAt}`,
      end_at: `${date} ${endAt}`,
    });
  }, [startAt, endAt]);

  const handleDelete = (e, id) => {
    e.preventDefault();

    if (!deleteConfirmed) return setDeleteConfirmed(true);

    return router.delete(route('eventSchedules.delete', id), {
      onSuccess: () => handleSuccess(),
    });
  };

  const checkIfBooked = () => {
    if (booked.status == 'init') return;

    if (booked.status == 'ok')
      return toast.success('dapat digunakan', { id: 'booked' });

    if (booked.status == 'conflict')
      return toast.error(`sudah dibooking: ${booked.message}`, {
        id: 'booked',
      });

    return toast.error('terjadi kesalahan', { id: 'booked' });
  };

  useEffect(() => {
    checkIfBooked();
  }, [booked]);

  useEffect(() => {
    toast.dismiss();

    if (!data?.place?.name) return;

    if (data.place.name == 'Belum Ditentukan') return;

    const timestamp = DateTime.now().toISO();

    axios
      .get(
        route('api.getEvent', {
          tempat: data.place?.name,
          mulai: `${date} ${startAt}`,
          sampai: `${date} ${endAt}`,
        })
      )
      .then(({ status, data }) => {
        if (status == 204) {
          setBooked({
            timestamp,
            status: 'ok',
          });
          return toast.success('dapat digunakan', { id: 'booked' });
        }

        if (data?.data.id == formData?.id) {
          setBooked({
            timestamp,
            status: 'ok',
          });
          return toast.success('dapat digunakan', { id: 'booked' });
        }

        if (status == 200) {
          setBooked({
            timestamp,
            status: 'conflict',
            message: data.data.description,
          });
          return toast.error(`sudah dibooking: ${data.data.description}`, {
            id: 'booked',
          });
        }
      })

      .catch((error) => {
        console.log(error);
        setBooked({ timestamp, message: error.code, status: 'error' });
        return toast.error('terjadi kesalahan', { id: 'booked' });
      });

    //   .get(
    //     route('api.getEventByPlaceAndTime', {
    //       place: data.place?.name || '',
    //       start_at: `${date} ${startAt}`,
    //       end_at: `${date} ${endAt}`,
    //     })
    //   )
    //   .then(({ status, data }) => {
    //     if (status == 204) {
    //       setBooked({
    //         timestamp,
    //         status: 'ok',
    //       });
    //       return toast.success('dapat digunakan', { id: 'booked' });
    //     }

    //     if (data?.id == formData?.id) {
    //       setBooked({
    //         timestamp,
    //         status: 'ok',
    //       });
    //       return toast.success('dapat digunakan', { id: 'booked' });
    //     }

    //     setBooked({
    //       timestamp,
    //       status: 'conflict',
    //       message: data.description,
    //     });

    //     return toast.error(`sudah dibooking: ${data.description}`, {
    //       id: 'booked',
    //     });
    //   })
    //   .catch(({ code }) => {
    //     setBooked({ timestamp, message: code, status: 'error' });
    //     return toast.error('terjadi kesalahan', { id: 'booked' });
    //   });
  }, [data.place, date, startAt, endAt, session]);

  return (
    <>
      <Modal show={active} onClose={handleClose}>
        <div className="px-5 space-y-10 sm:py-5">
          <form onSubmit={handleSubmit}>
            <div className="w-full space-y-4">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="w-full">
                  <InputLabel forinput="place" value="Tempat" />
                  <Combobox
                    value={data.place}
                    onChange={(value) => setData('place', value)}
                    options={placeOptions}
                    className="w-full"
                  />
                  <InputError message={errors.place} />
                </div>

                <div className="md:w-2/5">
                  <InputLabel forinput="participants" value="Jml Peserta" />
                  <TextInput
                    id="participants"
                    name="participants"
                    type="number"
                    min="0"
                    value={data.participants}
                    onChange={(e) => setData('participants', e.target.value)}
                    className="w-full"
                  />
                  <InputError message={errors.participants} />
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-3">
                  <div className="w-full">
                    <InputLabel forinput="date" value="Tanggal" />
                    <TextInput
                      id="date"
                      name="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full"
                    />
                    <InputError message={errors.time} />
                  </div>

                  <div className="w-1/2 shrink-0">
                    <InputLabel forinput="startAt" value="Jam" />
                    <div className="flex flex-row items-center gap-3">
                      <TextInput
                        id="startAt"
                        name="startAt"
                        type="time"
                        value={startAt}
                        onChange={(e) => setStartAt(e.target.value)}
                        disabled={session < 9}
                        className="flex-1"
                        required
                      />
                      <TextInput
                        id="endAt"
                        name="endAt"
                        type="time"
                        value={endAt}
                        onChange={(e) => setEndAt(e.target.value)}
                        disabled={session < 9}
                        className="flex-1"
                        max="23:59"
                        required
                      />
                    </div>
                  </div>
                </div>

                <RadioGroup
                  value={session}
                  onChange={setSession}
                  className="mt-2"
                >
                  <div className="flex flex-row text-xs md:gap-1 md:text-sm">
                    <RadioGroup.Option value="1">
                      {({ checked }) => (
                        <span
                          className={`
                          md:px-3 px-1 py-1 rounded-full cursor-pointer text-zinc-700
                          ${checked ? 'bg-rose-200' : ''}
                            `}
                        >
                          Pagi (8-12)
                        </span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="2">
                      {({ checked }) => (
                        <span
                          className={`
                          md:px-3 px-1 py-1 rounded-full cursor-pointer text-zinc-700
                          ${checked ? 'bg-rose-200' : ''}
                      `}
                        >
                          Siang (13-16)
                        </span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="3">
                      {({ checked }) => (
                        <span
                          className={`
                          md:px-3 px-1 py-1 rounded-full cursor-pointer text-zinc-700
                          ${checked ? 'bg-rose-200' : ''}
                      `}
                        >
                          Malam (19-21)
                        </span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="9">
                      {({ checked }) => (
                        <span
                          className={`
                          md:px-3 px-1 py-1 rounded-full cursor-pointer text-zinc-700
                          ${checked ? 'bg-rose-200' : ''}
                      `}
                        >
                          Custom
                        </span>
                      )}
                    </RadioGroup.Option>
                  </div>
                </RadioGroup>
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
                <div className="w-full">
                  <InputLabel forinput="customer" value="Nama Lengkap" />
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
                <InputLabel
                  forinput="organization"
                  value="Instansi/OPD/Organisasi/Komunitas"
                />
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
