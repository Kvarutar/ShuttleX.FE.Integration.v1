import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import Text from '../../../atoms/Text';
import RoundCheckIcon1 from '../../../icons/RoundCheckIcon1';
import AlertV1 from '../Alert/V1';
import { type AlertDescendantProps } from '../Alert/V1/props';
import { type RideHasFinishedAlertProps } from './props';

const RideHasFinishedAlertWithoutI18n = ({
  name,
  style,
  ...props
}: RideHasFinishedAlertProps & AlertDescendantProps) => {
  const { t } = useTranslation();

  return (
    <AlertV1 style={[styles.container, style]} {...props}>
      <RoundCheckIcon1 />
      <Text style={styles.text}>{t('RideHasFinishedAlert_description', { name })}</Text>
    </AlertV1>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  text: {
    flexShrink: 1,
  },
});

const RideHasFinishedAlert = (props: RideHasFinishedAlertProps & AlertDescendantProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <RideHasFinishedAlertWithoutI18n {...props} />
  </I18nextProvider>
);

export default RideHasFinishedAlert;
