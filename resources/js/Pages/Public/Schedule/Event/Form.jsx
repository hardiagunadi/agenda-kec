import Combobox from '@/Components/Combobox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import PublicLayout from '@/Layouts/PublicLayout';
import { RadioGroup } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { filter, startsWith } from 'lodash';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import {
  LoadCanvasTemplateNoReload,
  loadCaptchaEnginge,
  validateCaptcha,
} from 'react-simple-captcha';

export default function Form({ schedule }) {
  const { places } = usePage().props;

  const placeOptions = places.map(({ id, name, capacity }) => ({
    id,
    name: `${name} - max ${capacity}`,
  }));

  const [date, setDate] = useState(
    schedule
      ? DateTime.fromISO(schedule.start_at).toFormat('yyyy-MM-dd')
      : DateTime.now().toFormat(`yyyy-MM-dd`)
  );
  const [startAt, setStartAt] = useState(
    schedule ? DateTime.fromISO(schedule.start_at).toFormat('HH:mm') : '08:00'
  );
  const [endAt, setEndAt] = useState(
    schedule ? DateTime.fromISO(schedule.end_at).toFormat('HH:mm') : '12:00'
  );
  const [session, setSession] = useState(schedule ? '0' : '1');

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

  const { data, setData, post, put, errors, setError, processing, transform } =
    useForm({
      customer: schedule?.customer || '',
      phone: schedule?.phone || '',
      organization: schedule?.organization || '',
      start_at: schedule ? DateTime.fromISO(schedule.start_at).toSQL() : '',
      end_at: schedule ? DateTime.fromISO(schedule.end_at).toSQL() : '',
      participants: schedule?.participants || 0,
      place: schedule?.place
        ? filter(placeOptions, (item) =>
            startsWith(item.name, schedule?.place)
          )[0]
        : '',
      description: schedule?.description || '',
      note: schedule?.note || '',
      is_reschedule: schedule || false,
      captcha: '',
    });

  useEffect(() => {
    loadCaptchaEnginge(6, 'silver', 'black', 'lower');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (booked.status != 'ok')
      return toast.error(`terjadi kesalahan, pastikan jadwal tidak bentrok.`, {
        id: 'booked',
      });

    const start_at = `${date} ${startAt}`;
    const end_at = `${date} ${endAt}`;

    if (DateTime.fromSQL(startAt) > DateTime.fromSQL(endAt))
      return setError('time', 'cek ulang waktu');

    const validCaptcha = validateCaptcha(data.captcha);

    if (!validCaptcha) {
      setData('captcha', '');
      return setError('captcha', 'Captcha error, silahkan ulangi.');
    }

    setError('captcha', '');

    transform((data) => ({
      ...data,
      start_at,
      end_at,
      place: data.place?.name?.slice(0, data.place.name.lastIndexOf('-')),
    }));

    if (!schedule) return post(route('public.createEventSchedule'));

    return put(route('public.updateEventSchedule', schedule.id));
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
    if (!data?.place?.name) return;

    if (data.place.name == 'Belum Ditentukan') return;

    const timestamp = DateTime.now().toISO();

    axios
      .get(
        route('api.getEventByPlaceAndTime', {
          place:
            data.place?.name?.slice(0, data.place.name.lastIndexOf('-')) || '',
          start_at: `${date} ${startAt}`,
          end_at: `${date} ${endAt}`,
        })
      )
      .then(({ status, data }) => {
        if (status == 204)
          return setBooked({
            timestamp,
            status: 'ok',
          });

        if (data?.id == schedule?.id)
          return setBooked({
            timestamp,
            status: 'ok',
          });

        return setBooked({
          timestamp,
          status: 'conflict',
          message: data.description,
        });
      })
      .catch(({ code }) => {
        setBooked({ timestamp, message: code, status: 'error' });
      });
  }, [data.place, date, startAt, endAt, session]);

  return (
    <PublicLayout>
      <Head title="Formulir Permohonan Pinjam Pakai Ruang Rapat" />

      <div className="max-w-xl px-5 py-10 mx-auto mb-5 bg-zinc-100 sm:mt-5">
        <h1 className="mb-5 text-xl text-zinc-700">
          Form Permohonan Pinjam Pakai Ruangan
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
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
                <div className="flex flex-row md:gap-1 text-xs md:text-sm">
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

            <div>
              <InputLabel forinput="note" value="Catatan" />
              <TextInput
                id="note"
                name="note"
                value={data.note}
                onChange={(e) => setData('note', e.target.value)}
                className="w-full"
                placeholder="cth. sound, transit, meja bundar, prasmanan"
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

      <Toaster />
    </PublicLayout>
  );
}
