import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, within, act } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';
import { ReactElement } from 'react';

import {
  setupMockHandlerCreation,
  setupMockHandlerDeletion,
  setupMockHandlerUpdatingForRepeat,
} from '../__mocks__/handlersUtils';
import App from '../App';
import { Event } from '../types';

const setup = (element: ReactElement) => {
  const user = userEvent.setup();

  return { ...render(<ChakraProvider>{element}</ChakraProvider>), user }; // ? Med: 왜 ChakraProvider로 감싸는지 물어보자
};

// TODO : 반복이벤트 제어 구현필요
const saveRepeatSchedule = async (user: UserEvent, form: Omit<Event, 'id'>) => {
  const { title, date, startTime, endTime, location, description, category } = form;

  await user.click(screen.getAllByText('일정 추가')[0]);

  await user.type(screen.getByLabelText('제목'), title);
  await user.type(screen.getByLabelText('날짜'), date);
  await user.type(screen.getByLabelText('시작 시간'), startTime);
  await user.type(screen.getByLabelText('종료 시간'), endTime);
  await user.type(screen.getByLabelText('설명'), description);
  await user.type(screen.getByLabelText('위치'), location);
  await user.selectOptions(screen.getByLabelText('카테고리'), category);

  await user.click(screen.getByLabelText('반복 설정'));
  expect(screen.getByLabelText('반복 설정')).toBeChecked();
  await user.selectOptions(screen.getByLabelText('반복 유형'), 'daily');
  await user.clear(screen.getByLabelText('반복 간격'));
  await user.type(screen.getByLabelText('반복 간격'), '1');

  await user.type(screen.getByLabelText('반복 종료일'), '2025-03-20');

  await user.click(screen.getByTestId('event-submit-button'));
};

describe('반복 일정 CRUD', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date('2025-02-11'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it('반복 일정을 추가하면, 해당 일정의 모든 반복 일정이 추가되어야 한다.', async () => {
    setupMockHandlerCreation();

    const { user } = setup(<App />);

    const eventList = within(screen.getByTestId('event-list'));
    await saveRepeatSchedule(user, {
      title: '반복 회의',
      date: '2024-10-15',
      startTime: '14:00',
      endTime: '15:00',
      description: '프로젝트 진행 상황 논의',
      location: '회의실 A',
      category: '업무',
      repeat: {
        interval: 1,
        type: 'daily',
        endDate: '2025-3-20',
      },
      notificationTime: 10,
    });

    expect(eventList.getAllByText('반복 회의')).toHaveLength(28);
  });

  it('반복 일정을 수정하면, 해당 일정만 수정되어야 한다', async () => {
    const mockEvents: Event[] = [
      {
        title: '반복 회의',
        date: '2025-01-07',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '85',
      },
      {
        title: '반복 회의',
        date: '2025-01-08',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '86',
      },
      {
        title: '반복 회의',
        date: '2025-01-09',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '87',
      },
      {
        title: '반복 회의',
        date: '2025-01-10',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '88',
      },
      {
        title: '반복 회의',
        date: '2025-01-11',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '89',
      },
      {
        title: '반복 회의',
        date: '2025-01-12',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '90',
      },
      {
        title: '반복 회의',
        date: '2025-01-13',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '91',
      },
      {
        title: '반복 회의',
        date: '2025-01-14',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '92',
      },
      {
        title: '반복 회의',
        date: '2025-01-15',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '93',
      },
      {
        title: '반복 회의',
        date: '2025-01-16',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '94',
      },
      {
        title: '반복 회의',
        date: '2025-01-17',
        startTime: '14:00',
        endTime: '15:00',
        description: '프로젝트 진행 상황 논의',
        location: '회의실 A',
        category: '업무',
        notificationTime: 10,
        repeat: { type: 'daily', interval: 1, endDate: '2025-03-20' },
        id: '95',
      },
    ];
    vi.setSystemTime(new Date('2025-01-05'));
    const { user } = setup(<App />);

    setupMockHandlerUpdatingForRepeat(mockEvents);
    await saveRepeatSchedule(user, {
      title: '반복 회의',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '15:00',
      description: '프로젝트 진행 상황 논의',
      location: '회의실 A',
      category: '업무',
      repeat: {
        interval: 1,
        type: 'daily',
        endDate: '2025-03-20',
      },
      notificationTime: 10,
    });

    const eventList = within(screen.getByTestId('event-list'));

    screen.debug(screen.getByTestId('event-list'));

    const editIcon = screen.getByLabelText('Edit event');

    await user.click(editIcon);

    await user.clear(screen.getByLabelText('제목'));
    await user.type(screen.getByLabelText('제목'), '수정된 회의');

    await user.click(screen.getByTestId('event-submit-button'));

    expect(eventList.queryAllByText('반복 회의')).toHaveLength(14);
    expect(eventList.queryAllByText('수정된 회의')).toHaveLength(1);
  });

  it('반복 일정을 삭제하면, 해당 일정만 삭제되어야 한다', async () => {
    const { user } = setup(<App />);

    setupMockHandlerDeletion();

    const eventList = within(screen.getByTestId('event-list'));

    const deleteIcon = eventList.getByLabelText('Delete event');

    await user.click(deleteIcon);

    expect(eventList.queryAllByText('반복 회의')).toHaveLength(14);
  });
});
