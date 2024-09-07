import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import Text from '../../../atoms/Text';
import LimeYellowCheck1 from '../../../icons/LimeYellowCheck1';
import Alert from '../Alert';
import { type AlertDescendantProps } from '../Alert/props';
import { type RideHasFinishedAlertProps } from './props';

const RideHasFinishedAlertWithoutI18n = ({
  name,
  style,
  ...props
}: RideHasFinishedAlertProps & AlertDescendantProps) => {
  const { t } = useTranslation();

  return (
    <Alert style={[styles.container, style]} {...props}>
      <LimeYellowCheck1 />
      <Text style={styles.text}>{t('RideHasFinishedAlert_description', { name })}</Text>
    </Alert>
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
