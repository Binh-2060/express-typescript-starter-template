import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const FormatDatetime = (date: any) => {
  if (date) {
    return dayjs
      .tz(new Date(date), 'Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss');
  }
  return dayjs.tz(new Date(), 'Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
};

export const GetCurrentDate = () => {
  return dayjs.tz(new Date(), 'Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
};
