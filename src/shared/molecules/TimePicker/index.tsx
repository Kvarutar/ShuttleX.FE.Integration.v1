import DateTimePicker, {
  type AndroidNativeProps,
  type DateTimePickerEvent,
  type IOSNativeProps,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';

import Modal from '../../atoms/Modal';
import TextInput from '../../atoms/TextInput';
import TimeIcon from '../../icons/TimeIcon';
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

  const props: IOSNativeProps | AndroidNativeProps = {
    value: isTimeSelected && time ? time : new Date(),
    display: 'clock',
    is24Hour: false,
    onChange: onChange,
    mode: 'time',
  };

  return (
    <Pressable style={[styles.datePickerContainer, style]} onPress={showDatepicker}>
      <TextInput value={formatSelectedTime()} editable={false} placeholder={placeholder} />
      <TimeIcon style={styles.calendarIcon} />
      {isVisible &&
        (Platform.OS === 'ios' ? (
          <Modal>
            <DateTimePicker {...props} display="spinner" />
          </Modal>
        ) : (
          <DateTimePicker {...props} display="clock" />
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

export default TimePicker;
