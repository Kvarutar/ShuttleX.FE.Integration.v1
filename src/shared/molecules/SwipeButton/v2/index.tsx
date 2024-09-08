import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import i18nIntegration from '../../../../core/locales/i18n';
import { defaultShadow } from '../../../../core/themes/shadows';
import { useTheme } from '../../../../core/themes/v2/themeContext';
import ButtonV1 from '../../../atoms/Button/v1/index';
import { ButtonV1Modes } from '../../../atoms/Button/v1/props';
import Text from '../../../atoms/Text';
import ArrowIcon from '../../../icons/ArrowIcon';
import SliderWithCustomGesture from '../../SliderWithCustomGesture';
import { SwipeButtonModes, type SwipeButtonProps } from '../props';

const SwipeButtonWithoutI18n = ({ onSwipeEnd, mode, text, containerStyle }: SwipeButtonProps): JSX.Element => {
  const { colors, themeMode } = useTheme();

  const shadowProps = defaultShadow(colors.weakShadowColor);
  const { t } = useTranslation();
  const modeIsConfirm = mode === SwipeButtonModes.Confirm;

  const computedStyles = StyleSheet.create({
    text: {
      color: colors.textSecondaryColor,
    },
    slider: {
      backgroundColor: themeMode === 'light' ? colors.backgroundPrimaryColor : colors.backgroundSecondaryColor,
    },
  });

  return (
    <Shadow stretch {...shadowProps}>
      <SliderWithCustomGesture
        onSwipeEnd={onSwipeEnd}
        containerStyle={[computedStyles.slider, containerStyle]}
        sliderElement={
          <ButtonV1 style={styles.button} mode={modeIsConfirm ? ButtonV1Modes.Mode1 : ButtonV1Modes.Mode3}>
            <ArrowIcon />
          </ButtonV1>
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
    height: 48,
    paddingHorizontal: 38,
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
