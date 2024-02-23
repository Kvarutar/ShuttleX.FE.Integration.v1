import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import TimeIcon from '../../BrandBook/Icons/TimeIcon';
import TextInput from '../../BrandBook/TextInput';
import { type DatePickerProps } from './props';

const TimePicker = ({ style, placeholder, onTimeSelect, formatTime }: DatePickerProps): JSX.Element => {
  const [time, setTime] = useState<Date | null>();
  const [isVisible, setIsVisible] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (!selectedTime) {
      setIsTimeSelected(false);
      return;
    }
    setIsTimeSelected(true);

    const currentTime: Date = selectedTime;

    setIsVisible(false);

    if (event.type === 'set') {
      setTime(currentTime);
      onTimeSelect(currentTime);
    }
  };

  const showDatepicker = () => setIsVisible(true);

  const formatSelectedTime = (): string => {
    if (time) {
      return formatTime(time);
    }
    return '';
  };

  return (
    <Pressable style={[styles.datePickerContainer, style]} onPress={showDatepicker}>
      <TextInput value={formatSelectedTime()} editable={false} placeholder={placeholder} />
      <TimeIcon style={styles.calendarIcon} />
      {isVisible && (
        <DateTimePicker
          value={isTimeSelected && time ? time : new Date()}
          mode="time"
          display="clock"
          is24Hour={false}
          onChange={onChange}
        />
      )}
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
