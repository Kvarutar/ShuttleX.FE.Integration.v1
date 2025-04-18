import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../../../core/locales/i18n';
import { useTheme } from '../../../../../core/themes/themeContext';
import Button from '../../../../atoms/Button';
import { SquareButtonModes } from '../../../../atoms/Button/types';
import Text from '../../../../atoms/Text';
import { type ChangeNamePopUpButtonsProps, type ChangeNamePopUpProps } from './types';

const windowSizes = Dimensions.get('window');

const ChangePopUpWithoutI18n = ({ isContractor }: ChangeNamePopUpProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    wrapper: {
      height: windowSizes.height / 2,
    },
    changeText: {
      color: colors.textTitleColor,
    },
    explainText: {
      color: colors.textSecondaryColor,
    },
  });
  return (
    <View style={computedStyles.wrapper}>
      <View style={styles.textsStyle}>
        <Text style={[styles.changeText, computedStyles.changeText]}>{t('AccountChangePopUp_change')}</Text>
        <Text style={styles.descriptText}>{t('AccountChangePopUp_question')}</Text>
        {isContractor && (
          <Text style={[styles.explainText, computedStyles.explainText]}>{t('AccountChangePopUp_explanation')}</Text>
        )}
      </View>
    </View>
  );
};

const ChangePopUpButtonsWithoutI18n = ({ setAnswer, setIsPopUpVisible }: ChangeNamePopUpButtonsProps) => {
  const { t } = useTranslation();

  const handleButtonPress = (answer: boolean) => {
    setAnswer(answer);
    setIsPopUpVisible(false);
  };

  return (
    <View style={styles.buttonsStyle}>
      <Button
        text={t('AccountChangePopUp_yes')}
        containerStyle={styles.button}
        onPress={() => handleButtonPress(true)}
      />
      <Button
        mode={SquareButtonModes.Mode2}
        text={t('AccountChangePopUp_no')}
        containerStyle={styles.button}
        onPress={() => handleButtonPress(false)}
      />
    </View>
  );
};
const ChangeNamePopUp = (props: ChangeNamePopUpProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <ChangePopUpWithoutI18n {...props} />
  </I18nextProvider>
);

const ChangeNamePopUpButtons = (props: ChangeNamePopUpButtonsProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <ChangePopUpButtonsWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    flex: 1,
  },
  textsStyle: {
    gap: 14,
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter Bold',
  },
  descriptText: {
    fontSize: 34,
    fontFamily: 'Inter Bold',
    lineHeight: 34,
    letterSpacing: -1.53,
  },
  explainText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 3,
  },
  buttonsStyle: {
    gap: 7,
    flexDirection: 'row',
  },
});
export { ChangeNamePopUp, ChangeNamePopUpButtons };
