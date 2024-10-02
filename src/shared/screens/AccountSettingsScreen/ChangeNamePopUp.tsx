import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import Button from '../../atoms/Button/v2';
import { SquareButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import { type ChangeNamePopUpProps } from './props';

const windowSizes = Dimensions.get('window');

const ChangePopUpWithoutI18n = ({ setIsAnswerYes, setIsPopUp }: ChangeNamePopUpProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    wrapper: {
      height: windowSizes.height / 2 - 20,
    },
    changeText: {
      color: colors.textTitleColor,
    },
    explainText: {
      color: colors.textSecondaryColor,
    },
  });
  return (
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      <View style={styles.textsStyle}>
        <Text style={[styles.changeText, computedStyles.changeText]}>{t('AccountChangePopUp_change')}</Text>
        <Text style={styles.descriptText}>{t('AccountChangePopUp_question')}</Text>
        <Text style={[styles.explainText, computedStyles.explainText]}>{t('AccountChangePopUp_explanation')}</Text>
      </View>

      <View style={styles.buttonsStyle}>
        <Button
          text={t('AccountChangePopUp_yes')}
          containerStyle={styles.button}
          onPress={() => {
            setIsAnswerYes(true);
            setIsPopUp(false);
          }}
        />
        <Button
          mode={SquareButtonModes.Mode2}
          text={t('AccountChangePopUp_no')}
          containerStyle={styles.button}
          onPress={() => {
            setIsAnswerYes(false);
            setIsPopUp(false);
          }}
        />
      </View>
    </View>
  );
};

const ChangeNamePopUp = (props: ChangeNamePopUpProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <ChangePopUpWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
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
    width: '70%',
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
export default ChangeNamePopUp;
