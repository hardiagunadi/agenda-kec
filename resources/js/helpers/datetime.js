import { DateTime } from 'luxon';

export function getYears() {
  const thisYear = DateTime.now().year;

  let years = [];
  for (let i = thisYear - 5; i <= thisYear + 5; i++) {
    years.push(i);
  }
  return years;
}

export function toDate(isoFormat) {
  return DateTime.fromISO(isoFormat).toFormat('dd MMM yy');
}

export function toDateTime(isoFormat) {
  return DateTime.fromISO(isoFormat).toFormat('dd MMM yy HH:mm');
}

export function toDateTimeInput(isoFormat) {
  const date = DateTime.fromISO(isoFormat);
  return date.toFormat('yyyy-MM-dd') + 'T' + date.toFormat('T');
}

export function toHtmlInput(moment = 'now') {
  const now = DateTime.now();
  const tomorrow = now.plus({ days: 1 });

  if (moment == 'tomorrow')
    return tomorrow.toFormat('yyyy-MM-dd') + 'T' + tomorrow.toFormat('T');

  return now.toFormat('yyyy-MM-dd') + 'T' + now.toFormat('T');
}

export function nowToHtmlInput() {
  return (
    DateTime.now().toFormat('yyyy-MM-dd') + 'T' + DateTime.now().toFormat('T')
  );
}
