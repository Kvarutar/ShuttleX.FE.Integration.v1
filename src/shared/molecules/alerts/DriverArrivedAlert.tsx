import { I18nextProvider, useTranslation } from 'react-i18next';
import { Image, StyleSheet } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import Text from '../../atoms/Text';
import AlertV1 from './Alert/V1';
import { type AlertDescendantProps } from './Alert/V1/props';

const DriverArrivedAlertWithoutI18n = ({ style, ...props }: AlertDescendantProps) => {
  const { t } = useTranslation();

  return (
    <AlertV1 style={[styles.container, style]} {...props}>
      <Image source={require('../../../assets/img/TeslaModelS.png')} style={styles.img} />
      <Text style={styles.text}>{t('DriverArrivedAlert_description')}</Text>
    </AlertV1>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 32,
  },
  img: {
    height: 60,
    width: 93,
  },
  text: {
    flexShrink: 1,
  },
});

const DriverArrivedAlert = (props: AlertDescendantProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <DriverArrivedAlertWithoutI18n {...props} />
  </I18nextProvider>
);

export default DriverArrivedAlert;
