import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useThemeV1 } from '../../../core/themes/v1/themeContext';
import Text from '../../atoms/Text';
import LowSignalIcon from '../../icons/LowSignalIcon';
import Alert from './Alert';
import { type AlertDescendantProps } from './Alert/props';

const InternetDisconnectedAlertWithoutI18n = ({ style, ...props }: AlertDescendantProps) => {
  const { colors } = useThemeV1();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    alertContainer: {
      backgroundColor: colors.errorColor,
    },
    text: {
      color: colors.backgroundPrimaryColor,
    },
  });

  return (
    <Alert style={[computedStyles.alertContainer, style]} {...props}>
      <View style={styles.container}>
        <LowSignalIcon style={styles.icon} />
        <Text style={[styles.text, computedStyles.text]}>{t('InternetDisconnectedAlert_description')}</Text>
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 8,
    marginBottom: 6,
    alignSelf: 'flex-end',
  },
  text: {
    fontFamily: 'Inter Medium',
  },
});

const InternetDisconnectedAlert = (props: AlertDescendantProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <InternetDisconnectedAlertWithoutI18n {...props} />
  </I18nextProvider>
);

export default InternetDisconnectedAlert;
