import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';

import { dateOfBirthDateFormat } from '../../../core/consts/date.consts';
import i18nIntegration from '../../../core/locales/i18n';
import CalendarIcon from '../../BrandBook/Icons/CalendarIcon';
import TextInput from '../../BrandBook/TextInput';
import { DatePickerDisplay, type DatePickerProps } from './props';

const DatePickerWithoutI18n = ({
  style,
  display = DatePickerDisplay.Calendar,
  getDate,
}: DatePickerProps): JSX.Element => {
  const [maximumDate, setMaximumDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [isFirstSelect, setIsFirstSelect] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const tempDate = new Date();
    tempDate.setFullYear(tempDate.getFullYear() - 18);
    setMaximumDate(tempDate);
    setDate(tempDate);
  }, []);

  useEffect(() => {
    if (isFirstSelect && date !== maximumDate) {
      getDate(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstSelect, date, maximumDate]);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) {
      return;
    }

    const currentDate: Date = selectedDate;

    setIsVisible(false);

    if (event?.type !== 'dismissed') {
      if (!isFirstSelect) {
        setIsFirstSelect(true);
      }
      setDate(currentDate);
    }
  };

  const showDatepicker = () => {
    setIsVisible(true);
  };

  const formatDate = (): string => {
    if (isFirstSelect) {
      return format(date, dateOfBirthDateFormat);
    }
    return '';
  };

  return (
    <Pressable style={[styles.datePickerContainer, style]} onPress={showDatepicker}>
      <TextInput placeholder={t('DatePicker_placeholder')} value={formatDate()} editable={false} />
      <CalendarIcon style={styles.calendarIcon} />
      {isVisible && <DateTimePicker maximumDate={maximumDate} value={date} display={display} onChange={onChange} />}
    </Pressable>
  );
};

const DatePicker = (props: DatePickerProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <DatePickerWithoutI18n {...props} />
  </I18nextProvider>
);

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
