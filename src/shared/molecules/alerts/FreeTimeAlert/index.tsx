import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import Text from '../../../atoms/Text';
import ClockIcon2 from '../../../icons/ClockIcon2';
import Alert from '../Alert';
import { type AlertDescendantProps, AlertRunsOn } from '../Alert/props';
import { type FreeTimeAlertProps } from './props';

const FreeTimeAlertWithoutI18n = ({ runsOn, time, style, ...props }: FreeTimeAlertProps & AlertDescendantProps) => {
  const { t } = useTranslation();

  const timeTranslations: Record<FreeTimeAlertProps['time']['type'], string> = {
    minutes: t('minute', { count: time.number }),
    seconds: t('second', { count: time.number }),
  };

  return (
    <Alert style={[styles.container, style]} {...props}>
      <ClockIcon2 />
      <Text style={styles.text}>
        {t(
          runsOn === AlertRunsOn.Passenger
            ? 'FreeTimeAlert_passengerDescription'
            : 'FreeTimeAlert_contractorDescription',
          {
            time: timeTranslations[time.type],
          },
        )}
      </Text>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  text: {
    flexShrink: 1,
  },
});

const FreeTimeAlert = (props: FreeTimeAlertProps & AlertDescendantProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <FreeTimeAlertWithoutI18n {...props} />
  </I18nextProvider>
);

export default FreeTimeAlert;
