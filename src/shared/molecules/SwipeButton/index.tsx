import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Slider from 'react-native-slide-to-unlock';

import i18nIntegration from '../../../core/locales/i18n';
import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { Button } from '../../atoms/Button';
import { SquareButtonModes } from '../../atoms/Button/V2/props';
import Text from '../../atoms/Text';
import ArrowIcon from '../../icons/ArrowIcon';
import { SwipeButtonModes, type SwipeButtonProps } from './props';

const SwipeButtonWithoutI18n = ({ onSwipeEnd, mode, text }: SwipeButtonProps): JSX.Element => {
  const { colors } = useTheme();

  const shadowProps = defaultShadow(colors.weakShadowColor);
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    text: {
      color: mode === SwipeButtonModes.Confirm ? colors.textPrimaryColor : colors.errorColor,
    },
    slider: {
      backgroundColor: mode === SwipeButtonModes.Confirm ? colors.primaryColor : colors.errorColorWithOpacity,
    },
  });

  return (
    <Shadow stretch {...shadowProps}>
      <Slider
        onEndReached={() => onSwipeEnd()}
        containerStyle={{ ...computedStyles.slider, ...styles.slider }}
        sliderElement={
          <Button
            style={styles.button}
            //TODO: Add button mode with white background
            mode={SquareButtonModes.Mode2}
          >
            <ArrowIcon />
          </Button>
        }
      >
        <Text style={[computedStyles.text, styles.text]}>{text ?? t('SwipeButton_buttonHint')}</Text>
      </Slider>
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
    paddingHorizontal: 24,
    borderRadius: 28,
  },
  text: {
    marginLeft: 62,
  },
  slider: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 28,
  },
});

export default SwipeButton;
