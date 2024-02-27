import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
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

  const props = {
    maximumDate: maximumDate,
    minimumDate: minimumDate,
    value: isDateSelected && date ? date : new Date(),
    onChange: onChange,
    display: display,
  };

  const { colors } = useTheme();
  const computedStyles = StyleSheet.create({
    modal: {
      borderColor: colors.borderColor,
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

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
      {isVisible &&
        (Platform.OS === 'ios' ? (
          <Modal transparent>
            <View style={styles.modalContainer}>
              <View style={[styles.modal, computedStyles.modal]}>
                <DateTimePicker {...props} display="inline" />
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker {...props} />
        ))}
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
});

export default DatePicker;
