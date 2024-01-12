import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import WarningIcon from '../../../BrandBook/Icons/WarningIcon';
import Text from '../../../BrandBook/Text';
import Alert from '../Alert';
import { type AlertDescendantProps } from '../Alert/props';
import { type PaidTimeAlertProps } from './props';

const PaidTimeAlertWithoutI18n = ({ currency, style, ...props }: PaidTimeAlertProps & AlertDescendantProps) => {
  const { t } = useTranslation();

  return (
    <Alert style={[styles.container, style]} {...props}>
      <WarningIcon style={styles.icon} />
      <Text numberOfLines={1} style={styles.text}>
        {t('PaidTimeAlert_description', { currency })}
      </Text>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
