import { act, renderHook } from '@testing-library/react';

import { useRepeatControl } from '../../hooks/useRepeatControl';

describe('useRepeatControl', () => {
  it('일정 반복 여부를 설정할 수 있다.', () => {
    const { result } = renderHook(() => useRepeatControl());

    act(() => {
      result.current.setIsRepeating(true);
    });

    expect(result.current.isRepeating).toBe(true);
  });

  it('일정 반복 유형을 설정할 수 있다.', () => {
    const { result } = renderHook(() => useRepeatControl());

    act(() => {
      result.current.setRepeatType('weekly');
    });

    expect(result.current.repeatType).toBe('weekly');

    act(() => {
      result.current.setRepeatType('monthly');
    });

    expect(result.current.repeatType).toBe('monthly');

    act(() => {
      result.current.setRepeatType('yearly');
    });

    expect(result.current.repeatType).toBe('yearly');
  });

  // TDD - util에서 처리하도록 변경
  // it('반복유형이 월별이고, 31일이 없는 월일 경우 해당월의 마지막날로 설정한다.', () => {
  //   const { result } = renderHook(() => useRepeatControl());

  //   act(() => {
  //     result.current.setRepeatType('monthly');
  //     result.current.setRepeatInterval(1);
  //   });
  // });

  it('일정 반복 간격을 설정할 수 있다.', () => {
    const { result } = renderHook(() => useRepeatControl());

    act(() => {
      result.current.setRepeatInterval(5);
    });

    expect(result.current.repeatInterval).toBe(5);

    act(() => {
      result.current.setRepeatInterval(10);
    });
  });

  it('일정 반복 종료일을 설정할 수 있다.', () => {
    const { result } = renderHook(() => useRepeatControl());

    act(() => {
      result.current.setRepeatEndDate('2021-12-31');
    });

    expect(result.current.repeatEndDate).toBe('2021-12-31');
  });

  // TDD
  it('반복종료일은 2025년 6월 30일 까지 설정할 수 있다.', () => {
    const { result } = renderHook(() => useRepeatControl());

    act(() => {
      result.current.setRepeatEndDate('2025-07-01');
    });

    expect(result.current.repeatEndDate).toBe('2025-06-30');
  });
});
