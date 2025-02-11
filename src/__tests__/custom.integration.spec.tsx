import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, within, act } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { ReactElement } from 'react';

import {
  setupMockHandlerCreation,
  setupMockHandlerDeletion,
  setupMockHandlerUpdating,
} from '../__mocks__/handlersUtils';
import App from '../App';
import { server } from '../setupTests';
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

    const eventList = within(screen.getByTestId('event-list'));
    expect(eventList.getAllByText('반복 회의')).toHaveLength(15);
  });

  it('반복 일정을 수정하면, 해당 일정만 수정되어야 한다', async () => {
    const { user } = setup(<App />);

    setupMockHandlerUpdating();

    const eventList = within(screen.getByTestId('event-list'));

    const editIcon = eventList.getByLabelText('Edit event');

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
