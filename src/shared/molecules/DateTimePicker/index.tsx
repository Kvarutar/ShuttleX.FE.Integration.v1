import CommunityDateTimePicker, {
  type AndroidNativeProps,
  type DateTimePickerEvent,
  type IOSNativeProps,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import TextInput from '../../atoms/TextInput/v2';
import CalendarIcon from '../../icons/CalendarIcon';
import TimeIcon from '../../icons/TimeIcon';
import { DateTimePickerDisplay, DateTimePickerMode, type DateTimePickerProps } from './types';

const DateTimePicker = ({
  maximumDate,
  minimumDate,
  onValueSelect,
  androidOptions,
  display = DateTimePickerDisplay.Spinner,
  mode = DateTimePickerMode.Date,
  defaultValue = null,
}: DateTimePickerProps) => {
  const { colors, themeMode } = useTheme();

  const [value, setValue] = useState<Date | null>(defaultValue);
  const [isVisible, setIsVisible] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const isModeDate = mode === DateTimePickerMode.Date;

  const onChange = (event: DateTimePickerEvent, selectedValue?: Date) => {
    if (!selectedValue) {
      setIsDateSelected(false);
      return;
    }

    setIsDateSelected(true);
    setIsVisible(false);

    if (event.type === 'set' && selectedValue) {
      setValue(selectedValue);
      onValueSelect(selectedValue);
    }
  };

  const props: IOSNativeProps | AndroidNativeProps = {
    maximumDate: maximumDate,
    minimumDate: minimumDate,
    value: value ?? new Date(),
    onChange: onChange,
    mode: mode,
  };

  let iosTheme: Omit<IOSNativeProps, 'value'> = { textColor: colors.textPrimaryColor };
  if (Number(Platform.Version.toString().split('.')[0]) >= 14) {
    iosTheme = { themeVariant: themeMode === 'dark' ? 'dark' : 'light' };
  }

  const formatSelectedValue = (): string => {
    if (isDateSelected && value && androidOptions?.format) {
      return androidOptions.format(value);
    }
    return '';
  };

  if (Platform.OS === 'android') {
    return (
      <Pressable style={[styles.container, androidOptions?.style]} onPress={() => setIsVisible(true)}>
        <TextInput
          error={androidOptions?.error}
          inputStyle={androidOptions?.inputPickerStyle}
          placeholder={androidOptions?.placeholder}
          value={formatSelectedValue()}
          editable={false}
        />
        {isModeDate ? (
          <CalendarIcon style={styles.icon} />
        ) : (
          <TimeIcon style={styles.icon} color={colors.textSecondaryColor} />
        )}
        {isVisible && <CommunityDateTimePicker {...props} display={isModeDate ? display : 'clock'} />}
      </Pressable>
    );
  }

  return <CommunityDateTimePicker {...props} {...iosTheme} display={display} />;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
});

export default DateTimePicker;
