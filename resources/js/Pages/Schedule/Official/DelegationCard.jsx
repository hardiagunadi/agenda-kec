import Card from '@/Components/Card';
import {
  CalendarIcon,
  ChevronLeftIcon,
  InformationCircleIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { router } from '@inertiajs/react';
import { DateTime } from 'luxon';

export default function DelegationCard({ schedule, reload }) {
  const dateTime = DateTime.fromISO(schedule.start_at);
  const date = dateTime.toFormat('cccc, dd MMM yy');
  const time = dateTime.toFormat('T');

  function undelegate(id) {
    router.patch(
      route('officialSchedules.delegate', id),
      { delegation: null },
      {
        onSuccess: () => reload(),
      }
    );
  }

  return (
    <Card>
      <Card.Header>{schedule.description}</Card.Header>

      <Card.Content>
        <div className="text-sm">
          <div className="flex items-center space-x-1">
            <UserCircleIcon className="h-3" />
            <div>{schedule.delegation}</div>
          </div>

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

          <div className="flex items-center space-x-1">
            <InformationCircleIcon className="h-3" />
            <div>{schedule.note || 'tidak ada catatan'}</div>
          </div>
        </div>
      </Card.Content>

      <Card.Footer>
        <div
          onClick={() => undelegate(schedule.id)}
          className="inline-flex items-center px-1 space-x-1 text-xs lowercase border rounded-full cursor-pointer border-zinc-500"
        >
          <ChevronLeftIcon className="h-3" />
          <div>batal delegasi</div>
        </div>
      </Card.Footer>
    </Card>
  );
}
