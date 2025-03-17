import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/themeContext';
import Text from '../../atoms/Text';
import LowSignalIcon from '../../icons/LowSignalIcon';
import AlertV1 from './Alert/V1';
import { type AlertDescendantProps } from './Alert/V1/props';

const InternetDisconnectedAlertWithoutI18n = ({ style, ...props }: AlertDescendantProps) => {
  const { colors } = useTheme();
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
    <AlertV1 style={[computedStyles.alertContainer, style]} {...props}>
      <View style={styles.container}>
        <LowSignalIcon style={styles.icon} />
        <Text style={[styles.text, computedStyles.text]}>{t('InternetDisconnectedAlert_description')}</Text>
      </View>
    </AlertV1>
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
