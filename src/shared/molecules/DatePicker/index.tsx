import DateTimePicker, {
  type AndroidNativeProps,
  type DateTimePickerEvent,
  type IOSNativeProps,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';

import Modal from '../../atoms/Modal';
import TextInput from '../../atoms/TextInput';
import CalendarIcon from '../../icons/CalendarIcon';
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

  const props: IOSNativeProps | AndroidNativeProps = {
    maximumDate: maximumDate,
    minimumDate: minimumDate,
    value: isDateSelected && date ? date : new Date(),
    onChange: onChange,
    display: display,
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
      {isVisible &&
        (Platform.OS === 'ios' ? (
          <Modal>
            <DateTimePicker {...props} display="inline" />
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
});

export default DatePicker;
