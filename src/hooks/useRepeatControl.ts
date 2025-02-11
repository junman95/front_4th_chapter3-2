import { useState } from 'react';

import { Event, RepeatType } from '../types';

const useRepeatControl = (repeat?: Event['repeat']) => {
  const [isRepeating, setIsRepeating] = useState(repeat?.type !== 'none');
  const [repeatType, setRepeatType] = useState<RepeatType>(repeat?.type || 'none');
  const [repeatInterval, setRepeatInterval] = useState(repeat?.interval || 1);
  const [repeatEndDate, setRepeatEndDate] = useState(repeat?.endDate || '');

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
