import moment from 'moment';

export function getAgoTimeInSeconds(startTime: string): number {
  const seconds = (new Date().getTime() - new Date(startTime).getTime()) / 1000;
  return seconds;
}

export function secondsToMinAndSeconds(s: number): string {
  return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s;
}

export function isNotExpiredTimeFromNow(expireIn: number | string) {
  const expireDate = new Date(Number(expireIn));
  return expireDate > new Date();
}

export function getTodayDate() {
  var date = new Date();
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();

  var today = dd + '/' + mm + '/' + yyyy;

  return today;
}

export function getStartDate() {
  var date = new Date();

  var lastday = new Date(date);
  lastday.setDate(date.getDate() - 7);
  var dd = String(lastday.getDate()).padStart(2, '0');
  var mm = String(lastday.getMonth() + 1).padStart(2, '0');
  var yyyy = lastday.getFullYear();

  var last = dd + '/' + mm + '/' + yyyy;

  return last;
}

export function isTimeZoneDiffer(selectedTimeZone: string): boolean {
  var date = new Date();
  const currentTimeZone = moment(date).format('Z');
  selectedTimeZone = moment()
    .tz(selectedTimeZone)
    .format('Z');
  return currentTimeZone !== selectedTimeZone;
}
