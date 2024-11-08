import Card from '@/Components/Card';
import Tooltip from '@/Components/Tooltip';
import {
  CalendarIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';
import humanizeDuration from 'humanize-duration';
import { DateTime } from 'luxon';
import { useState } from 'react';

import Delegation from './Delegation';
import { usePage } from '@inertiajs/react';
import { indexOf } from 'lodash';

export default function ScheduleCard({
  schedule,
  fetchPage,
  selectedOfficial,
  openForm,
}) {
  const dateTime = DateTime.fromISO(schedule.start_at);
  const date = dateTime.toFormat('cccc, dd MMM yy');
  const time = dateTime.toFormat('T');

  const { auth } = usePage().props;

  const placements = [
    '@bupati',
    '@wabup',
    '@sekda',
    '@stafahli1',
    '@stafahli2',
    '@stafahli3',
    '@ast1',
    '@ast2',
    '@ast3',
  ];

  const placement = indexOf(placements, auth.placement) + 1;
  const canEdit = schedule.official === placement || auth.can.edit.official;

  const updatedAt = DateTime.fromISO(schedule.updated_at);
  const entryDuration = humanizeDuration(DateTime.now().diff(updatedAt), {
    language: 'id',
    largest: 1,
    units: ['y', 'mo', 'd', 'h', 'm', 's'],
    round: true,
  });

  const [entryHasHover, setEntryHasHover] = useState(null);
  const [entryRefElement, setEntryRefelement] = useState(null);

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
        <div className="w-full md:w-2/5 shrink-0">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="h-3" />
            <div>{date}</div>
          </div>
          <div className="flex items-center space-x-1">
            <MapPinIcon className="h-3" />
            <div>
              {time} · {schedule.place}
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/5 shrink-0">
          catatan:
          <div>{schedule.note || 'tidak ada catatan'}</div>
        </div>
      </Card.Content>

      <Card.Footer>
        {canEdit && (
          <>
            {selectedOfficial < 4 && (
              <Delegation
                reload={fetchPage}
                delegation={schedule.delegation}
                id={schedule.id}
                selectedOfficial={selectedOfficial}
              />
            )}
          </>
        )}

        <div className="flex items-center ml-auto space-x-2">
          <div className="text-zinc-600">
            {schedule.user} ·{' '}
            <span
              onMouseEnter={() => setEntryHasHover(true)}
              onMouseLeave={() => setEntryHasHover(false)}
              ref={setEntryRefelement}
            >
              entri {entryDuration} lalu
            </span>
            {entryHasHover && (
              <Tooltip
                text={updatedAt.toFormat('EEEE dd MMMM yy HH:mm')}
                ref={entryRefElement}
              />
            )}
          </div>

          {canEdit && (
            <button
              onClick={() => openForm(schedule)}
              className="hover:text-rose-700"
              // onMouseEnter={() => setEditHasHover(true)}
              // onMouseLeave={() => setEditHasHover(false)}
              // ref={setEditRefElement}
            >
              <PencilIcon className="h-4" />
              {/* {editHasHover && <Tooltip text="Ubah" ref={editRefElement} />} */}
            </button>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
}
