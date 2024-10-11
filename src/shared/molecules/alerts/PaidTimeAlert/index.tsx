import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import Text from '../../../atoms/Text';
import WarningIcon from '../../../icons/WarningIcon';
import AlertV1 from '../Alert/V1';
import { type AlertDescendantProps } from '../Alert/V1/props';
import { type PaidTimeAlertProps } from './props';

const PaidTimeAlertWithoutI18n = ({ currency, style, ...props }: PaidTimeAlertProps & AlertDescendantProps) => {
  const { t } = useTranslation();

  return (
    <AlertV1 style={[styles.container, style]} {...props}>
      <WarningIcon style={styles.icon} />
      <Text numberOfLines={1} style={styles.text}>
        {t('PaidTimeAlert_description', { currency })}
      </Text>
    </AlertV1>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    flexShrink: 1,
  },
});

const PaidTimeAlert = (props: PaidTimeAlertProps & AlertDescendantProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <PaidTimeAlertWithoutI18n {...props} />
  </I18nextProvider>
);

export default PaidTimeAlert;
