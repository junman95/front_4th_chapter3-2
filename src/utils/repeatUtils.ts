import { Event, EventForm, RepeatData } from '../types';

const generateEvents = <T extends Event | EventForm>(eventDataWithRepeat: T): T[] => {
  const { repeat, ...eventData } = eventDataWithRepeat;
  const dates = generateRecurringDates({ ...repeat, startDate: eventData.date });
  const events: T[] = Array.from({ length: dates.length });

  return events.map((_, index) => {
    return { ...eventData, repeat, date: dates[index].toISOString() } as T;
  });
};

const generateRecurringDates = ({
  type: repeatType,
  interval,
  startDate: startDateString,
  endDate: endDateString = '2025-06-30',
}: RepeatData) => {
  const today = new Date(startDateString); // 시작 날짜
  const endDate = new Date(endDateString); // 종료 날짜
  const dates: Date[] = [];

  let currentDate = new Date(today);
  const targetDay = currentDate.getDate();

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate)); // 현재 날짜 저장

    if (repeatType === 'daily') {
      currentDate.setDate(currentDate.getDate() + interval);
    } else if (repeatType === 'weekly') {
      currentDate.setDate(currentDate.getDate() + interval * 7);
    } else if (repeatType === 'monthly') {
      const targetMonth = currentDate.getMonth() + interval;
      const lastDayOfMonth = getLastDayOfMonth(currentDate.getFullYear(), targetMonth);
      if (endDate.getMonth() === targetMonth && endDate.getDate() < targetDay) {
        break;
      }
      if (targetDay > lastDayOfMonth) {
        currentDate.setDate(getLastDayOfMonth(currentDate.getFullYear(), targetMonth));
        currentDate.setMonth(targetMonth);
      } else {
        currentDate.setMonth(targetMonth);
        currentDate.setDate(targetDay);
      }
    } else if (repeatType === 'yearly') {
      const targetYear = currentDate.getFullYear() + interval;
      const newDate = new Date(currentDate);
      newDate.setFullYear(targetYear);

      // 📌 윤년 체크 및 해당 월 마지막 날 보정
      const lastDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
      if (newDate.getDate() > lastDayOfMonth) {
        newDate.setDate(lastDayOfMonth);
      }

      currentDate = newDate;
    }
  }

  return dates;
};

function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export { generateEvents, generateRecurringDates };
