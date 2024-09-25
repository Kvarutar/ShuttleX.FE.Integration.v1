import DateTimePicker, {
  type AndroidNativeProps,
  type DateTimePickerEvent,
  type IOSNativeProps,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform } from 'react-native';

import { useTheme } from '../../../../core/themes/v2/themeContext';
import { DatePickerDisplay, type DatePickerProps } from '../props';

const DatePicker = ({
  display = DatePickerDisplay.Calendar,
  onDateSelect,
  maximumDate,
  minimumDate,
}: DatePickerProps): JSX.Element => {
  const { colors, themeMode } = useTheme();

  const [date, setDate] = useState<Date | null>(null);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) {
      setIsDateSelected(false);
      return;
    }

    setIsDateSelected(true);

    if (event.type === 'set') {
      setDate(selectedDate);
      onDateSelect(selectedDate);
    }
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

  return Platform.OS === 'ios' ? (
    <DateTimePicker {...props} {...iosTheme} display="spinner" />
  ) : (
    <DateTimePicker {...props} />
  );
};

export default DatePicker;
