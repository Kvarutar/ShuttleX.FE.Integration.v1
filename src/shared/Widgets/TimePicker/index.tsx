import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { twelveHourTimeFormat } from '../../../core/consts/time.consts';
import TimeIcon from '../../BrandBook/Icons/TimeIcon';
import TextInput from '../../BrandBook/TextInput';
import { type DatePickerProps } from './props';

const TimePicker = ({ style }: DatePickerProps): JSX.Element => {
  const [time, setTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (!selectedTime) {
      return;
    }

    const currentTime: Date = selectedTime;

    setIsVisible(false);

    if (event?.type === 'dismissed') {
      setTime(time);
    } else {
      setTime(currentTime);
    }
  };

  const showDatepicker = () => setIsVisible(true);

  const formatDate = (): string => format(time, twelveHourTimeFormat);

  return (
    <Pressable style={[styles.datePickerContainer, style]} onPress={showDatepicker}>
      <TextInput value={formatDate()} editable={false} />
      <TimeIcon style={styles.calendarIcon} />
      {isVisible && <DateTimePicker value={time} mode="time" display="clock" is24Hour={false} onChange={onChange} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    alignSelf: 'stretch',
  },
  calendarIcon: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
});

export default TimePicker;
