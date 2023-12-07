import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { dateOfBirthDateFormat } from '../../../core/consts/date.consts';
import CalendarIcon from '../../BrandBook/Icons/CalendarIcon';
import TextInput from '../../BrandBook/TextInput';
import { DatePickerDisplay, type DatePickerProps } from './props';

const DatePicker = ({ style, display = DatePickerDisplay.Calendar }: DatePickerProps): JSX.Element => {
  const [date, setDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) {
      return;
    }

    const currentDate: Date = selectedDate;

    setIsVisible(false);

    if (event?.type === 'dismissed') {
      setDate(date);
    } else {
      setDate(currentDate);
    }
  };

  const showDatepicker = () => {
    setIsVisible(true);
  };

  const formatDate = (): string => format(date, dateOfBirthDateFormat);

  return (
    <Pressable style={[styles.datePickerContainer, style]} onPress={showDatepicker}>
      <TextInput value={formatDate()} editable={false} />
      <CalendarIcon style={styles.calendarIcon} />
      {isVisible && <DateTimePicker value={date} display={display} onChange={onChange} />}
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

export default DatePicker;
