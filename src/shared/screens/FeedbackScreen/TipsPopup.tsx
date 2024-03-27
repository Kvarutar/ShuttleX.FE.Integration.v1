import React, { useRef, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import i18nIntegration from '../../../core/locales/i18n';
import Bar from '../../atoms/Bar';
import { BarModes } from '../../atoms/Bar/types';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import TextInput from '../../atoms/TextInput';
import { TextInputInputMode, type TextInputRef } from '../../atoms/TextInput/props';
import Popup from '../../molecules/Popup';
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

  const onAddTips = () => {
    if (inputedTipAmount) {
      addTip(parseNumber(inputedTipAmount));
    } else if (selectedOption) {
      addTip(selectedOption);
    }
    onClosePopup();
  };

  const onChangeText = (text: string) => {
    setInputedTipAmount(() => {
      if (selectedOption) {
        setSelectedOption(null);
      }
      return text;
    });
    setTipsOptions(state => state.fill(false));
  };

  return (
    <Popup onCloseButtonPress={onClosePopup} bottomWindowStyle={styles.popup}>
      <Text style={styles.title}>{t('Feedback_TipsPopup_title')}</Text>
      <View style={styles.options}>
        {tipsOptionsItem}
        <TextInput
          inputMode={TextInputInputMode.Money}
          placeholder="0"
          value={inputedTipAmount}
          onChangeText={onChangeText}
          style={styles.input}
          containerStyle={styles.inputContainer}
          ref={inputRef}
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
