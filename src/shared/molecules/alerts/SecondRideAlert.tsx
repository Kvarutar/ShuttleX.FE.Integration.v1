import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/themeContext';
import Text from '../../atoms/Text';
import WarningIcon from '../../icons/WarningIcon';
import Alert from './Alert';
import { type AlertDescendantProps } from './Alert/props';

const SecondRideAlertWithoutI18n = ({ style, ...props }: AlertDescendantProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Alert style={[styles.container, style]} {...props}>
      <WarningIcon style={styles.icon} color={colors.warningColor} />
      <Text style={styles.text}>{t('SecondRideAlert_description')}</Text>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    flexShrink: 1,
  },
});

const SecondRideAlert = (props: AlertDescendantProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <SecondRideAlertWithoutI18n {...props} />
  </I18nextProvider>
);

export default SecondRideAlert;
