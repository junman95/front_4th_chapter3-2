import { useEffect, useState } from 'react';

import { Event, RepeatType } from '../types';

const useRepeatControl = (repeat?: Event['repeat']) => {
  const [isRepeating, setIsRepeating] = useState(repeat ? repeat.type !== 'none' : false);
  const [repeatType, setRepeatType] = useState<RepeatType>(repeat?.type || 'none');
  const [repeatInterval, setRepeatInterval] = useState(repeat?.interval || 1);
  const [repeatEndDate, setRepeatEndDate] = useState(repeat?.endDate || '');

  useEffect(() => {
    if (new Date(repeatEndDate) > new Date('2025-06-30')) {
      setRepeatEndDate('2025-06-30');
    }
  }, [repeatEndDate]);

  const resetRepeat = () => {
    setIsRepeating(false);
    setRepeatType('none');
    setRepeatInterval(1);
    setRepeatEndDate('');
  };

  const editEventRepeat = (event: Event) => {
    setIsRepeating(event.repeat.type !== 'none');
    setRepeatType(event.repeat.type);
    setRepeatInterval(event.repeat.interval);
    setRepeatEndDate(event.repeat.endDate || '');
  };

  return {
    isRepeating,
    setIsRepeating,
    repeatType,
    setRepeatType,
    repeatInterval,
    setRepeatInterval,
    repeatEndDate,
    setRepeatEndDate,
    resetRepeat,
    editEventRepeat,
  };
};

export { useRepeatControl };
