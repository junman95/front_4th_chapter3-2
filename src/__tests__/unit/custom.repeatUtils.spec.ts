import { RepeatData } from '../../types';
import { generateEvents, generateRecurringDates } from '../../utils/repeatUtils';

describe('custom.repeatUtils > generateRecurringDates 테스트', () => {
  beforeEach(() => {
    vi.setSystemTime('2025-01-01');
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it('일단위로 매일 반복되는 날짜를 생성한다.', () => {
    const dates = generateRecurringDates({
      type: 'daily',
      interval: 1,
      startDate: '2025-01-01',
      endDate: '2025-02-28',
    });

    const currentDate = new Date();
    const endDate = new Date('2025-02-28');

    const diffTime =
      Math.abs(endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

    const expectDates = Array.from({ length: diffTime }).map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + index);
      return date;
    });

    expect(dates).toHaveLength(diffTime);
    expect(dates).toEqual(expectDates);
  });

  it('일단위 인터벌이 있는 매일 반복되는 날짜를 생성한다.', () => {
    const query: RepeatData = {
      type: 'daily',
      interval: 5,
      startDate: '2025-01-01',
      endDate: '2025-02-28',
    };
    const dates = generateRecurringDates(query);

    const currentDate = new Date();
    const endDate = new Date('2025-02-28');

    const diffTime = Math.ceil(
      (Math.abs(endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) + 1) /
        query.interval
    );

    const expectDates = Array.from({ length: diffTime }).map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + index * query.interval);
      return date;
    });

    expect(dates).toHaveLength(diffTime);
    expect(dates).toEqual(expectDates);
  });

  it('주단위로 매주 반복되는 날짜를 생성한다.', () => {
    const repeat: RepeatData = {
      type: 'weekly',
      interval: 1,
      startDate: '2025-01-01',
      endDate: '2025-02-28',
    };
    const dates = generateRecurringDates(repeat);

    const currentDate = new Date();
    const endDate = new Date('2025-02-28');

    const diffTime = Math.ceil(
      (Math.abs(endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) + 1) /
        (7 * repeat.interval)
    );

    const expectDates = Array.from({ length: diffTime }).map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + index * 7 * repeat.interval);
      return date;
    });

    expect(dates).toHaveLength(diffTime);
    expect(dates).toEqual(expectDates);
  });

  it('주단위 인터벌이 있는 매주 반복되는 날짜를 생성한다.', () => {
    const repeat: RepeatData = {
      type: 'weekly',
      interval: 2,
      startDate: '2025-01-01',
      endDate: '2025-02-28',
    };
    const dates = generateRecurringDates(repeat);

    const currentDate = new Date();
    const endDate = new Date('2025-02-28');

    const diffTime = Math.ceil(
      (Math.abs(endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) + 1) /
        (7 * repeat.interval)
    );

    const expectDates = Array.from({ length: diffTime }).map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + index * 7 * repeat.interval);
      return date;
    });

    expect(dates).toHaveLength(diffTime);
    expect(dates).toEqual(expectDates);
  });

  it('월단위로 매월 반복되는 날짜를 생성한다.', () => {
    const repeat: RepeatData = {
      type: 'monthly',
      interval: 1,
      startDate: '2025-01-01',
      endDate: '2025-03-28',
    };
    const dates = generateRecurringDates(repeat);

    const currentDate = new Date();
    const endDate = new Date('2025-03-28');

    const diffTime = Math.ceil(
      Math.abs(endDate.getMonth() - currentDate.getMonth()) / repeat.interval + 1
    );

    const expectDates = Array.from({ length: diffTime }).map((_, index) => {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() + index);
      return date;
    });

    expect(dates).toHaveLength(diffTime);
    expect(dates).toEqual(expectDates);
  });

  it('월단위 인터벌이 있는 매월 반복되는 날짜를 생성한다.', () => {
    const repeat: RepeatData = {
      type: 'monthly',
      interval: 1,
      startDate: '2025-01-01',
      endDate: '2025-05-28',
    };
    const dates = generateRecurringDates(repeat);

    const currentDate = new Date();
    const endDate = new Date('2025-05-28');

    const diffTime = Math.ceil(
      Math.abs(endDate.getMonth() - currentDate.getMonth()) / repeat.interval + 1
    );

    const expectDates = Array.from({ length: diffTime }).map((_, index) => {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() + index * repeat.interval);
      return date;
    });

    expect(dates).toHaveLength(diffTime);
    expect(dates).toEqual(expectDates);
  });

  it('29일 혹은 30일 혹은 31일이 없는 달에 대한 처리를 한다.(월의 가장 마지막 날로 생성해야한다)', () => {
    const repeat: RepeatData = {
      type: 'monthly',
      interval: 1,
      startDate: '2025-01-31',
      endDate: '2025-04-30',
    };
    const dates = generateRecurringDates(repeat);

    const expectDates = [new Date('2025-01-31'), new Date('2025-02-28'), new Date('2025-03-31')];

    // expect(dates).toHaveLength(diffTime);
    expect(dates).toEqual(expectDates);
  });
});

describe('custom.repeatUtils > generateEvents 테스트', () => {
  it('일단위 반복일정을 생성한다.', () => {
    const events = generateEvents({
      title: '일단위 반복일정',
      date: '2025-01-01',
      startTime: '09:00',
      endTime: '10:00',
      description: '일단위 반복일정입니다.',
      location: '서울',
      category: '일정',
      repeat: {
        type: 'daily',
        interval: 1,
        endDate: '2025-01-10',
      },
      notificationTime: 10,
    });

    expect(events).toHaveLength(10);
    events.forEach((event, index) => {
      expect(event.date).toBe(new Date('2025-01-0' + (index + 1)).toISOString());
    });
  });

  it('주단위 반복일정을 생성한다.', () => {
    const events = generateEvents({
      title: '주단위 반복일정',
      date: '2025-01-01',
      startTime: '09:00',
      endTime: '10:00',
      description: '주단위 반복일정입니다.',
      location: '서울',
      category: '일정',
      repeat: {
        type: 'weekly',
        interval: 1,
        endDate: '2025-01-31',
      },
      notificationTime: 10,
    });

    expect(events).toHaveLength(5);
    events.forEach((event, index) => {
      expect(event.date).toBe(new Date('2025-01-0' + (index * 7 + 1)).toISOString());
    });
  });

  it('월단위 반복일정을 생성한다.', () => {
    const events = generateEvents({
      title: '월단위 반복일정',
      date: '2025-01-01',
      startTime: '09:00',
      endTime: '10:00',
      description: '월단위 반복일정입니다.',
      location: '서울',
      category: '일정',
      repeat: {
        type: 'monthly',
        interval: 1,
        endDate: '2025-03-31',
      },
      notificationTime: 10,
    });

    expect(events).toHaveLength(3);
    events.forEach((event, index) => {
      expect(event.date).toBe(new Date('2025-0' + (index + 1) + '-01').toISOString());
    });
  });

  it('년단위 반복일정을 생성한다.', () => {
    const events = generateEvents({
      title: '년단위 반복일정',
      date: '2024-01-01',
      startTime: '09:00',
      endTime: '10:00',
      description: '년단위 반복일정입니다.',
      location: '서울',
      category: '일정',
      repeat: {
        type: 'yearly',
        interval: 1,
        endDate: '2025-12-31',
      },
      notificationTime: 10,
    });

    expect(events).toHaveLength(2);
    const expectedEventsDates = ['2024-01-01', '2025-01-01'];
    const eventsDates = events.map((event) => new Date(event.date).toISOString().split('T')[0]);
    expect(eventsDates).toEqual(expectedEventsDates);
  });
});
