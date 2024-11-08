import humanizeDuration from 'humanize-duration';
import Status from './Status';
import Card from '@/Components/Card';
import { DateTime } from 'luxon';
import { useState } from 'react';
import {
  BriefcaseIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
} from '@heroicons/react/24/solid';
import Tooltip from '@/Components/Tooltip';
import Publish from './Publish';
import { usePage } from '@inertiajs/react';

export default function ScheduleCard({ schedule, fetchPage, openForm }) {
  const { auth } = usePage().props;

  const updatedAt = DateTime.fromISO(schedule.updated_at);
  const bookingDuration = humanizeDuration(DateTime.now().diff(updatedAt), {
    language: 'id',
    largest: 1,
    units: ['y', 'mo', 'd', 'h', 'm', 's'],
    round: true,
  });

  const [bookingHasHover, setBookingHasHover] = useState(null);
  const [bookingRefElement, setBookingRefElement] = useState(null);

  const [editHasHover, setEditHasHover] = useState(null);
  const [editRefElement, setEditRefElement] = useState(null);

  const [receiptHasHover, setReceiptHasHover] = useState(null);
  const [receiptRefElement, setReceiptRefElement] = useState(null);

  const colors = [
    '#be123c',
    '#a21caf',
    '#6d28d9',
    '#1d4ed8',
    '#0e7490',
    '#4d7c0f',
    '#b45309',
  ];

  const colorCode = DateTime.fromISO(schedule.start_at).weekday - 1;

  return (
    <Card color={colors[colorCode]}>
      <Card.Header>{schedule.description}</Card.Header>

      <Card.Content>
        <div className="flex flex-col flex-1 text-sm">
          <div className="flex items-center">
            <div className="flex items-center w-5 mr-2 shrink-0">
              <MapPinIcon className="h-3" />
            </div>
            <div>{schedule.place}</div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center w-5 mr-2 shrink-0">
              <ClockIcon className="h-3" />
            </div>
            <div>
              {DateTime.fromISO(schedule.start_at).toFormat(
                'cccc, dd MMMM yy HH:mm'
              )}{' '}
              -{DateTime.fromISO(schedule.end_at).toFormat('HH:mm')}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center w-5 mr-2 shrink-0">
              <BriefcaseIcon className="h-3" />
            </div>
            <div>
              {schedule.organization} • {schedule.participants} peserta
            </div>
          </div>

          {schedule.phone && (
            <div className="flex items-center">
              <div className="flex items-center w-5 mr-2 shrink-0">
                <PhoneIcon className="h-3" />
              </div>
              <div>
                <a
                  href={`http://wa.me/62${schedule.phone.substring(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {schedule.phone}
                </a>{' '}
                • {schedule.customer}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-baseline text-sm border-t md:w-1/2 md:px-2 md:border-l md:border-t-0 shrink-0">
          <div>{schedule.note}</div>
        </div>
      </Card.Content>

      <Card.Footer>
        <div className="flex flex-row items-center gap-1">
          <Status
            id={schedule.id}
            status={schedule.status}
            reload={fetchPage}
          />

          {schedule.is_reschedule ? (
            <div className="inline-flex items-center px-1 space-x-1 text-xs lowercase border rounded-full border-cyan-700 text-cyan-700">
              Reschedule
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div
            className="hidden mr-2 text-xs text-zinc-500 md:text-right md:block"
            onMouseEnter={() => setBookingHasHover(true)}
            onMouseLeave={() => setBookingHasHover(false)}
            ref={setBookingRefElement}
          >
            booking {bookingDuration} lalu
            {bookingHasHover && (
              <Tooltip
                text={updatedAt.toFormat('EEEE dd MMMM yy HH:mm')}
                ref={bookingRefElement}
              />
            )}
          </div>

          {auth.can.edit.schedule && (
            <button
              onClick={() => openForm(schedule)}
              className="hover:text-rose-700"
              onMouseEnter={() => setEditHasHover(true)}
              onMouseLeave={() => setEditHasHover(false)}
              ref={setEditRefElement}
            >
              <PencilIcon className="h-4" />
              {editHasHover && <Tooltip text="Ubah" ref={editRefElement} />}
            </button>
          )}

          <Publish schedule={schedule} />
        </div>
      </Card.Footer>
    </Card>
  );
}
