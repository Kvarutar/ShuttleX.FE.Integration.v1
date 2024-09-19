import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import i18nIntegration from '../../../../core/locales/i18n';
import { defaultShadow } from '../../../../core/themes/shadows';
import { useTheme } from '../../../../core/themes/v2/themeContext';
import Text from '../../../atoms/Text';
import ArrowIcon from '../../../icons/ArrowIcon';
import SliderWithCustomGesture from '../../SliderWithCustomGesture';
import { SwipeButtonModes, type SwipeButtonProps } from '../props';

const SwipeButtonWithoutI18n = ({ onSwipeEnd, mode, text, containerStyle }: SwipeButtonProps): JSX.Element => {
  const { colors } = useTheme();

  const shadowProps = defaultShadow(colors.weakShadowColor);
  const { t } = useTranslation();
  const modeIsConfirm = mode === SwipeButtonModes.Confirm;

  const computedStyles = StyleSheet.create({
    text: {
      color: colors.textSecondaryColor,
    },
    slider: {
      backgroundColor: modeIsConfirm ? colors.primaryColor : colors.errorColorWithOpacity,
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
        <Text style={[computedStyles.text, styles.text, !modeIsConfirm && { color: colors.errorColor }]}>
          {text ?? t('SwipeButton_buttonHint')}
        </Text>
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
    borderRadius: 24,
  },
  text: {
    marginLeft: 62,
    fontSize: 17,
    fontFamily: 'Inter Bold',
  },
  slider: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
});

export default SwipeButton;
