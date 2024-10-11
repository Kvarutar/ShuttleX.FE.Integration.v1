import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useThemeV1 } from '../../../core/themes/v1/themeContext';
import Text from '../../atoms/Text';
import WarningIcon from '../../icons/WarningIcon';
import AlertV1 from './Alert/V1';
import { type AlertDescendantProps } from './Alert/V1/props';

const SecondRideAlertWithoutI18n = ({ style, ...props }: AlertDescendantProps) => {
  const { t } = useTranslation();
  const { colors } = useThemeV1();

  return (
    <AlertV1 style={[styles.container, style]} {...props}>
      <WarningIcon style={styles.icon} color={colors.warningColor} />
      <Text style={styles.text}>{t('SecondRideAlert_description')}</Text>
    </AlertV1>
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
