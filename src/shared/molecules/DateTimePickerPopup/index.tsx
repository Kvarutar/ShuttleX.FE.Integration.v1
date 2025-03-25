import { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/themeContext';
import { formatDate, formatTime } from '../../../utils/index';
import Button from '../../atoms/Button';
import { ButtonShadows, ButtonShapes, ButtonSizes } from '../../atoms/Button/types';
import Text from '../../atoms/Text';
import CloseIcon from '../../icons/CloseIcon';
import BottomWindowWithGesture from '../BottomWindowWithGesture/index';
import DateTimePicker from '../DateTimePicker/index';
import { DateTimePickerDisplay, DateTimePickerMode } from '../DateTimePicker/types';
import { type DatePickerPopupProps } from './types';

const DatePickerPopupWithoutI18n = ({ onVisibilityChange, isVisible, onDateSelected }: DatePickerPopupProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDateStep, setIsDateStep] = useState(true);

  const computedStyles = StyleSheet.create({
    closeButton: {
      backgroundColor: colors.errorColorWithOpacity,
    },
    firstText: {
      color: colors.textQuadraticColor,
    },
  });

  useEffect(() => {
    onDateSelected({ date: new Date(), time: new Date() });
  }, [onDateSelected]);

  const onConfirm = () => {
    if (Platform.OS === 'android') {
      onDateSelected({ date, time });
      onVisibilityChange(false);
    }

    if (isDateStep) {
      setIsDateStep(false);
    } else {
      onDateSelected({ date, time });
      onVisibilityChange(false);
    }
  };

  const onClose = () => {
    if (Platform.OS === 'android') {
      onVisibilityChange(false);
    }

    if (isDateStep) {
      onVisibilityChange(false);
    } else {
      setIsDateStep(true);
    }
  };

  const buttonsContainer = (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onClose} style={[styles.closeButton, computedStyles.closeButton]}>
        <CloseIcon style={styles.closeIcon} color={colors.errorColor} />
      </TouchableOpacity>
      <Button
        withCircleModeBorder
        shadow={ButtonShadows.Strong}
        onPress={onConfirm}
        shape={ButtonShapes.Circle}
        size={ButtonSizes.L}
        innerSpacing={8}
        text={t('DatePickerPopup_confirm')}
      />
    </View>
  );

  const iosDateBlock = (
    <>
      <View style={styles.centerContainer}>
        <Text style={[styles.firstText, computedStyles.firstText]}>{t('DatePickerPopup_advanceBooking')}</Text>
        <Text style={styles.secondText}>{t(isDateStep ? 'DatePickerPopup_pickDate' : 'DatePickerPopup_pickTime')}</Text>
      </View>

      <Animated.View key={`${isDateStep}`} exiting={FadeOut} entering={FadeIn}>
        <DateTimePicker
          defaultValue={isDateStep ? date : null}
          mode={isDateStep ? DateTimePickerMode.Date : DateTimePickerMode.Time}
          minimumDate={new Date()}
          onValueSelect={isDateStep ? setDate : setTime}
        />
      </Animated.View>

      {buttonsContainer}
    </>
  );

  const androidDateBlock = (
    <>
      <Text style={[styles.firstText, computedStyles.firstText]}>{t('DatePickerPopup_advanceBooking')}</Text>

      <View style={styles.androidDateTimePickerWrapper}>
        <View style={styles.androidDateTimePickerContainer}>
          <Text style={styles.firstText}> {t('DatePickerPopup_pickDate')}</Text>
          <DateTimePicker
            display={DateTimePickerDisplay.Calendar}
            mode={DateTimePickerMode.Date}
            minimumDate={new Date()}
            onValueSelect={setDate}
            androidOptions={{
              placeholder: formatDate(new Date()),
              format: formatDate,
            }}
          />
        </View>
        <View style={styles.androidDateTimePickerContainer}>
          <Text style={styles.firstText}> {t('DatePickerPopup_pickTime')}</Text>
          <DateTimePicker
            mode={DateTimePickerMode.Time}
            minimumDate={new Date()}
            onValueSelect={setTime}
            androidOptions={{
              placeholder: formatTime(new Date()),
              format: formatTime,
            }}
          />
        </View>
      </View>

      {buttonsContainer}
    </>
  );

  return (
    <BottomWindowWithGesture
      withShade
      opened={isVisible}
      setIsOpened={onVisibilityChange}
      withHiddenPartScroll={false}
      hiddenPart={Platform.OS === 'ios' ? iosDateBlock : androidDateBlock}
    />
  );
};

const DatePickerPopup = (props: DatePickerPopupProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <DatePickerPopupWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  //header
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstText: {
    fontFamily: 'Inter Medium',
    lineHeight: 36,
    textAlign: 'center',
  },
  secondText: {
    fontFamily: 'Inter Medium',
    fontSize: 21,
    lineHeight: 21,
  },

  //buttons
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
    marginRight: 96,
  },
  closeButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
  },
  closeIcon: {
    width: 17,
    height: 17,
  },

  //android
  androidDateTimePickerWrapper: {
    marginTop: 8,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  androidDateTimePickerContainer: {
    flexBasis: '48%',
    alignItems: 'center',
  },
});

export default DatePickerPopup;
