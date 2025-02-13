import { RepeatData } from '../../types';
import { generateRecurringDates } from '../../utils/repeatUtils';

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
  it('일단위 반복일정을 생성한다.', () => {});

  it('주단위 반복일정을 생성한다.', () => {});

  it('월단위 반복일정을 생성한다.', () => {});

  it('년단위 반복일정을 생성한다.', () => {});
});
