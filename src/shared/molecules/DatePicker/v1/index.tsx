import DateTimePicker, {
  type AndroidNativeProps,
  type DateTimePickerEvent,
  type IOSNativeProps,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { useTheme } from '../../../../core/themes/themeContext';
import Modal from '../../../atoms/Modal';
import TextInputV1 from '../../../atoms/TextInput/v1';
import CalendarIcon from '../../../icons/CalendarIcon';
import { DatePickerDisplay, type DatePickerPropsV1 } from '../props';

const DatePickerV1 = ({
  style,
  inputDatePickerStyle,
  display = DatePickerDisplay.Calendar,
  onDateSelect,
  error,
  placeholder,
  maximumDate,
  minimumDate,
  formatDate,
}: DatePickerPropsV1): JSX.Element => {
  const { colors, themeMode } = useTheme();

  const [date, setDate] = useState<Date | null>(null);
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

  let iosTheme: Omit<IOSNativeProps, 'value'> = {};
  if (Platform.OS === 'ios' && themeMode !== 'light') {
    // TODO: Later better create here switch case
    // If ios version at least 14
    if (Number(Platform.Version.toString().split('.')[0]) >= 14) {
      iosTheme = { themeVariant: 'dark' };
    } else {
      iosTheme = { textColor: colors.textPrimaryColor };
    }
  }

  return (
    <Pressable style={[styles.datePickerContainer, style]} onPress={showDatepicker}>
      <TextInputV1
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
            <DateTimePicker {...props} {...iosTheme} display="inline" />
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

export default DatePickerV1;
