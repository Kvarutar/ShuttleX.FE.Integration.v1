import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import CalendarIcon from '../../BrandBook/Icons/CalendarIcon';
import TextInput from '../../BrandBook/TextInput';
import { DatePickerDisplay, type DatePickerProps } from './props';

const DatePicker = ({
  style,
  inputDatePickerStyle,
  display = DatePickerDisplay.Calendar,
  onDateSelect,
  error,
  placeholder,
  maximumDate,
  minimumDate,
  formatDate,
}: DatePickerProps): JSX.Element => {
  const [date, setDate] = useState<Date | null>();
  const [isVisible, setIsVisible] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) {
      setIsDateSelected(false);
      return;
    }

    setIsDateSelected(true);
    setIsVisible(false);

    if (event.type === 'set') {
      setDate(selectedDate);
      onDateSelect(selectedDate);
    }
  };

  const showDatepicker = () => {
    setIsVisible(true);
  };

  const formatSelectedDate = (): string => {
    if (isDateSelected && date) {
      return formatDate(date);
    }
    return '';
  };

  return (
    <Pressable style={[styles.datePickerContainer, style]} onPress={showDatepicker}>
      <TextInput
        error={error}
        style={inputDatePickerStyle}
        placeholder={placeholder}
        value={formatSelectedDate()}
        editable={false}
      />
      <CalendarIcon style={styles.calendarIcon} />
      {isVisible && (
        <DateTimePicker
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          value={isDateSelected && date ? date : new Date()}
          display={display}
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

export default DatePicker;
