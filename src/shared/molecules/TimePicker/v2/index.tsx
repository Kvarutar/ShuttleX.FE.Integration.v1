import DateTimePicker, {
  type AndroidNativeProps,
  type DateTimePickerEvent,
  type IOSNativeProps,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform } from 'react-native';

import { type TimePickerProps } from '../props';

const TimePicker = ({ onTimeSelect }: TimePickerProps): JSX.Element => {
  const [time, setTime] = useState<Date | null>(null);
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (!selectedTime) {
      setIsTimeSelected(false);
      return;
    }
    setIsTimeSelected(true);

    const currentTime: Date = selectedTime;

    if (event.type === 'set') {
      setTime(currentTime);
      onTimeSelect(currentTime);
    }
  };

  const props: IOSNativeProps | AndroidNativeProps = {
    value: isTimeSelected && time ? time : new Date(),
    display: 'clock',
    is24Hour: false,
    onChange: onChange,
    mode: 'time',
  };

  return Platform.OS === 'ios' ? (
    <DateTimePicker {...props} display="spinner" />
  ) : (
    <DateTimePicker {...props} display="clock" />
  );
};

export default TimePicker;
