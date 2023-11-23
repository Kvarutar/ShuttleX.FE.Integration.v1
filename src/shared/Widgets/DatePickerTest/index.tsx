import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import CalendarIcon from '../../BrandBook/Icons/CalendarIcon';
import TextInput from '../../BrandBook/TextInput';

const DatePickerTest = (): JSX.Element => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) {
      return;
    }

    const currentDate: Date = selectedDate;

    setShow(false);

    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }

    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <Pressable style={styles.datePickerContainer} onPress={showDatepicker}>
      <TextInput value={date.toDateString()} editable={false} placeholder="Date of Birth" />
      <CalendarIcon style={styles.calendarIcon} />
      {show && (
        <DateTimePicker testID="dateTimePicker" value={date} display="calendar" is24Hour={true} onChange={onChange} />
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

export default DatePickerTest;
