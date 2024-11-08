import Card from '@/Components/Card';
import Tooltip from '@/Components/Tooltip';
import { toDateTime } from '@/helpers/datetime';
import {
  BriefcaseIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import humanizeDuration from 'humanize-duration';
import { DateTime } from 'luxon';
import { useState } from 'react';

import Status from './Status';
import Publish from './Publish';

export default function ScheduleCard({ schedule, fetchPage, openForm }) {
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
      <Card.Header>
        <span>{schedule.car}</span>
        <span className="font-normal"> • {schedule.driver}</span>
      </Card.Header>

      <Card.Content>
        <div className="md:w-1/2 shrink-0">
          <div className="flex items-center">
            <ClockIcon className="w-3 h-3 mr-2 text-center" />
            <div>
              {toDateTime(schedule.start_at)} - {toDateTime(schedule.end_at)}
            </div>
          </div>

          <div className="flex items-center">
            <MapPinIcon className="w-3 h-3 mr-2 text-center" />

            <div>
              {schedule.place} dari {schedule.from}
            </div>
          </div>

          <div className="flex items-center">
            <BriefcaseIcon className="w-3 h-3 mr-2 text-center" />
            <div>{schedule.organization}</div>
          </div>

          <div className="flex items-center">
            <UserIcon className="w-3 h-3 mr-2 text-center" />
            <div>
              <span>{schedule.customer} • </span>
              <a
                href={`http://wa.me/${schedule.phone}`}
                target="_blank"
                className="underline"
              >
                {schedule.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-300 md:border-transparent">
          <div className="text-base font-bold">{schedule.description}</div>
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
            className="mr-2 text-xs text-zinc-500 md:text-right"
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

          <Publish schedule={schedule} />
        </div>
      </Card.Footer>
    </Card>
  );
}
