import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import {
  LoadCanvasTemplateNoReload,
  loadCaptchaEnginge,
  validateCaptcha,
} from 'react-simple-captcha';

export default function Form({ schedule }) {
  const { data, setData, post, put, errors, setError, processing, transform } =
    useForm({
      customer: schedule?.customer || '',
      phone: schedule?.phone || '',
      organization: schedule?.organization || '',
      start_at: schedule?.start_at
        ? DateTime.fromISO(schedule.start_at).toFormat(`yyyy-MM-dd'T'HH:mm`)
        : DateTime.now().toFormat(`yyyy-MM-dd'T'06:00`),
      end_at: schedule?.end_at
        ? DateTime.fromISO(schedule.end_at).toFormat(`yyyy-MM-dd'T'HH:mm`)
        : DateTime.now().plus({ days: 1 }).toFormat(`yyyy-MM-dd'T'16:00`),
      from: schedule?.from || 'Wonosobo',
      place: schedule?.place || '',
      description: schedule?.description || '',
      note: schedule?.note || '',
      car: schedule?.car || null,
      driver: schedule?.driver || null,
      captcha: '',
    });

  useEffect(() => {
    loadCaptchaEnginge(6, 'silver', 'black', 'lower');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validCaptcha = validateCaptcha(data.captcha);

    if (!validCaptcha) {
      setData('captcha', '');
      return setError('captcha', 'Captcha error, silahkan ulangi.');
    }

    setError('captcha', '');

    transform((data) => ({
      ...data,
    }));

    if (!schedule) return post(route('public.createCarSchedule'));

    return put(route('public.updateCarSchedule', schedule.id));
  };

  return (
    <PublicLayout>
      <Head title="Formulir Permohonan Pinjam Pakai Kendaraan" />

      <div className="max-w-xl px-5 py-10 mx-auto mb-5 bg-zinc-100 sm:mt-5">
        <h1 className="mb-5 text-xl font-bold text-zinc-700">
          Form Permohonan Pinjam Pakai Kendaraan
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="w-full">
                <InputLabel forinput="customer" value="Nama Lengkap" />
                <TextInput
                  id="customer"
                  name="customer"
                  value={data.customer}
                  onChange={(e) => setData('customer', e.target.value)}
                  className="w-full"
                  required
                />
                <InputError message={errors.customer} />
              </div>

              <div className="md:w-2/5">
                <InputLabel forinput="phone" value="Telepon/HP (pribadi)" />
                <TextInput
                  id="phone"
                  name="phone"
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  className="w-full"
                  required
                />
                <InputError message={errors.phone} />
              </div>
            </div>

            <div>
              <InputLabel
                forinput="organization"
                value="Instansi/Unit Organisasi"
              />
              <TextInput
                id="organization"
                name="organization"
                value={data.organization}
                onChange={(e) => setData('organization', e.target.value)}
                className="w-full"
                required
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
                <InputLabel forinput="from" value="Dari" />
                <TextInput
                  id="from"
                  name="from"
                  value={data.from}
                  onChange={(e) => setData('from', e.target.value)}
                  className="w-full"
                  required
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
                  className="w-full"
                  required
                />
                <InputError message={errors.place} />
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
                  className="w-full"
                  required
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
                  className="w-full"
                  required
                />
                <InputError message={errors.end_at} />
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

            <div>
              <InputLabel forinput="captcha" value="Verifikasi Captcha" />
              <div className="flex flex-row items-center gap-3">
                <LoadCanvasTemplateNoReload />
                <TextInput
                  id="captcha"
                  name="captcha"
                  value={data.captcha}
                  onChange={(e) => setData('captcha', e.target.value)}
                  className="w-full"
                  minLength={6}
                  maxLength={6}
                  required
                  autoComplete="off"
                />
              </div>
              <InputError message={errors.captcha} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 mt-5 space-x-3 border-t border-zinc-300">
            <div className="text-sm text-zinc-700">
              *dengan mengirim formulir ini, saya menyetujui Syarat dan
              Ketentuan{' '}
            </div>
            <PrimaryButton type="submit" disabled={processing}>
              {processing ? 'Diproses...' : 'Kirim'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </PublicLayout>
  );
}
