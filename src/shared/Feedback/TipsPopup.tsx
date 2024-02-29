import React, { useRef, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import i18nIntegration from '../../core/locales/i18n';
import Bar from '../Bar';
import { BarModes } from '../Bar/types';
import Button from '../BrandBook/Button';
import Text from '../BrandBook/Text';
import TextInput from '../BrandBook/TextInput';
import { TextInputInputMode, type TextInputRef } from '../BrandBook/TextInput/props';
import Popup from '../Popup';
import { type TipsPopupProps } from './props';

const parseNumber = (str: string): number => Number(str.replace(/[^0-9.]+/g, ''));
const fadeAnimationDuration = 200;

const TipsPopupWithoutI18n = ({ onClosePopup, addTip, tipsVariants }: TipsPopupProps) => {
  const { t } = useTranslation();
  const [inputedTipAmount, setInputedTipAmount] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [tipsOptions, setTipsOptions] = useState(new Array<boolean>(tipsVariants.length).fill(false));

  const inputRef = useRef<TextInputRef>(null);

  const onTipOptionSelect = (tipIndex: number) => {
    setTipsOptions(state => state.map((_, index) => index === tipIndex));

    inputRef.current?.blur();
    setInputedTipAmount('');
    setSelectedOption(tipsVariants[tipIndex] ?? null);
  };

  const tipsOptionsItem = tipsOptions.map((isActive, index) => (
    <Pressable onPress={() => onTipOptionSelect(index)} key={index}>
      <Bar style={styles.option} mode={isActive ? BarModes.Active : BarModes.Default}>
        <Text>${tipsVariants[index]}</Text>
      </Bar>
    </Pressable>
  ));

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const onAddTips = () => {
    if (inputedTipAmount) {
      addTip(parseNumber(inputedTipAmount));
    } else if (selectedOption) {
      addTip(selectedOption);
    }
    onClosePopup();
  };

  const onChangeText = (text: string) => {
    setInputedTipAmount(prevText => {
      if (selectedOption) {
        setSelectedOption(null);
      }
      // Если текст стирают
      if (text.length < prevText.length) {
        if (text.length === 1) {
          return '';
        }
        return USDollar.format(parseNumber(text));
      }

      const lastSymbol = text[text.length - 1];
      // Если пользователь пытается поставить вторую точку
      if (lastSymbol === '.' && prevText.includes('.')) {
        return prevText;
      }
      // Если пользователь пытается поставить точку или ноль в конце
      if (lastSymbol === '.' || (lastSymbol === '0' && text.includes('.'))) {
        return text;
      }

      //если пользователь пытается ввести больше 2-х знаков после запятой
      const decimalStartAt = text.indexOf('.');

      if (decimalStartAt !== -1) {
        const decimals = text.split('.');
        if (decimals[1] && decimals[1].length > 2) {
          return prevText;
        }
      }

      return USDollar.format(parseNumber(text));
    });

    setTipsOptions(state => state.fill(false));
  };

  return (
    <Popup onCloseButtonPress={onClosePopup} bottomWindowStyle={styles.popup}>
      <Text style={styles.title}>{t('Feedback_TipsPopup_title')}</Text>
      <View style={styles.options}>
        {tipsOptionsItem}
        <TextInput
          style={styles.input}
          containerStyle={styles.inputContainer}
          ref={inputRef}
          inputMode={TextInputInputMode.Numeric}
          placeholder={USDollar.format(0)}
          value={inputedTipAmount}
          onChangeText={onChangeText}
        />
      </View>
      {(Boolean(inputedTipAmount) || selectedOption) && (
        <Animated.View
          entering={FadeIn.duration(fadeAnimationDuration)}
          exiting={FadeOut.duration(fadeAnimationDuration)}
        >
          <Button text={t('Feedback_TipsPopup_addTipsButton')} onPress={onAddTips} />
        </Animated.View>
      )}
    </Popup>
  );
};

const TipsPopup = (props: TipsPopupProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <TipsPopupWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  popup: {
    gap: 30,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter Medium',
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
    gap: 16,
  },
  option: {
    padding: 14,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 53,
    paddingHorizontal: 14,
  },
});

export default TipsPopup;
