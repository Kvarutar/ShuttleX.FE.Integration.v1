import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Slider from 'react-native-slide-to-unlock';

import i18nIntegration from '../../../../core/locales/i18n';
import { defaultShadow } from '../../../../core/themes/shadows';
import { useThemeV1 } from '../../../../core/themes/v1/themeContext';
import ButtonV1 from '../../../atoms/Button/v1/index';
import { ButtonV1Modes } from '../../../atoms/Button/v1/props';
import Text from '../../../atoms/Text';
import ArrowIcon from '../../../icons/ArrowIcon';
import { SwipeButtonModes, type SwipeButtonProps } from '../props';

const SwipeButtonWithoutI18n = ({ onSwipeEnd, mode, text }: SwipeButtonProps): JSX.Element => {
  const { colors, themeMode } = useThemeV1();

  const shadowProps = defaultShadow(colors.weakShadowColor);
  const { t } = useTranslation();

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
      <Slider
        onEndReached={() => onSwipeEnd()}
        containerStyle={{ ...computedStyles.slider, ...styles.slider }}
        sliderElement={
          <ButtonV1
            style={styles.button}
            mode={mode === SwipeButtonModes.Confirm ? ButtonV1Modes.Mode1 : ButtonV1Modes.Mode3}
          >
            <ArrowIcon />
          </ButtonV1>
        }
      >
        <Text style={[computedStyles.text, styles.text]}>{text ?? t('SwipeButton_buttonHint')}</Text>
      </Slider>
    </Shadow>
  );
};

const SwipeButtonV1 = ({ onSwipeEnd, mode, text }: SwipeButtonProps) => (
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
  },
  slider: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
});

export default SwipeButtonV1;
