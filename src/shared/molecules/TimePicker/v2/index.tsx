import DateTimePicker, {
  type AndroidNativeProps,
  type DateTimePickerEvent,
  type IOSNativeProps,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';

import { type TimePickerProps } from '../props';

const TimePicker = ({ onTimeSelect, minimumTime }: TimePickerProps): JSX.Element => {
  const [time, setTime] = useState<Date | null>(null);

  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setTime(selectedTime);
      onTimeSelect(selectedTime);
    }
  };

  const props: IOSNativeProps | AndroidNativeProps = {
    minimumDate: minimumTime,
    value: time ? time : new Date(),
    display: 'clock',
    is24Hour: false,
    onChange: onChange,
    mode: 'time',
  };

  return <DateTimePicker {...props} display="spinner" />;
};

export default TimePicker;
