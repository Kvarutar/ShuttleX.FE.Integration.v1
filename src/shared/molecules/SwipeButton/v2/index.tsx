import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import i18nIntegration from '../../../../core/locales/i18n';
import { defaultShadow } from '../../../../core/themes/shadows';
import { useTheme } from '../../../../core/themes/v2/themeContext';
import Text from '../../../atoms/Text';
import ArrowIcon from '../../../icons/ArrowIcon';
import SliderWithCustomGesture from '../../SliderWithCustomGesture';
import { type SwipeButtonProps } from '../props';

const SwipeButtonWithoutI18n = ({ onSwipeEnd, mode, text, containerStyle }: SwipeButtonProps): JSX.Element => {
  const { colors, themeMode } = useTheme();

  const shadowProps = defaultShadow(colors.weakShadowColor);
  const { t } = useTranslation();

  const backgroundColors = {
    confirm: colors.primaryColor,
    decline: colors.errorColorWithOpacity,
    finish: colors.errorColor,
  };

  // TODO: Remove conditions when we know how to change colors by theme
  // There're conditionaly colors while not known how to change button colors by theme
  const textColors = {
    confirm: themeMode === 'dark' ? colors.textTertiaryColor : colors.textPrimaryColor,
    decline: colors.errorColor,
    finish: themeMode === 'light' ? colors.textTertiaryColor : colors.textPrimaryColor,
  };

  const computedStyles = StyleSheet.create({
    text: {
      color: textColors[mode],
    },
    slider: {
      backgroundColor: backgroundColors[mode],
    },
    button: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  return (
    <Shadow stretch {...shadowProps}>
      <SliderWithCustomGesture
        onSwipeEnd={onSwipeEnd}
        containerStyle={[computedStyles.slider, containerStyle]}
        sliderElement={
          <Pressable style={[styles.button, computedStyles.button]}>
            <ArrowIcon />
          </Pressable>
        }
      >
        <Text style={[computedStyles.text, styles.text]}>{text ?? t('SwipeButton_buttonHint')}</Text>
      </SliderWithCustomGesture>
    </Shadow>
  );
};

const SwipeButton = ({ onSwipeEnd, mode, text }: SwipeButtonProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <SwipeButtonWithoutI18n onSwipeEnd={onSwipeEnd} mode={mode} text={text} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 38,
    borderRadius: 36,
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Inter Bold',
    fontSize: 17,
  },
});

export default SwipeButton;
