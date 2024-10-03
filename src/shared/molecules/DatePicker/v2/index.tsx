import DateTimePicker, {
  type AndroidNativeProps,
  type DateTimePickerEvent,
  type IOSNativeProps,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform } from 'react-native';

import { useTheme } from '../../../../core/themes/v2/themeContext';
import { type DatePickerProps } from '../props';

const DatePicker = ({ onDateSelect, maximumDate, minimumDate }: DatePickerProps): JSX.Element => {
  const { colors, themeMode } = useTheme();

  const [date, setDate] = useState<Date | null>(null);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
      onDateSelect(selectedDate);
    }
  };

  const props: IOSNativeProps | AndroidNativeProps = {
    maximumDate: maximumDate,
    minimumDate: minimumDate,
    value: date ? date : new Date(),
    onChange: onChange,
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
    <DateTimePicker {...props} display="spinner" />
  );
};

export default DatePicker;
