import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import Button from '../../atoms/Button';
import BigHeader from '../BigHeader';
import BottomWindow from '../BottomWindow';
import { type LocationUnavailableProps } from './props';

const LocationUnavailableWithoutI18n = ({ reason, onButtonPress }: LocationUnavailableProps) => {
  const { t } = useTranslation();

  let firstHeaderTitle = '';
  let secondHeaderTitle = '';
  let description = '';

  switch (reason) {
    case 'permission_denied': {
      firstHeaderTitle = t('LocationUnavailable_permissionDeniedFirstTitle');
      secondHeaderTitle = t('LocationUnavailable_permissionDeniedSecondTitle');
      description = t('LocationUnavailable_permissionDeniedDescription');
      break;
    }
    case 'location_disabled': {
      firstHeaderTitle = t('LocationUnavailable_locationDisabledFirstTitle');
      secondHeaderTitle = t('LocationUnavailable_locationDisabledSecondTitle');
      description = t('LocationUnavailable_locationDisabledDescription');
      break;
    }
    case 'accuracy_reduced': {
      firstHeaderTitle = t('LocationUnavailable_accuracyReducedFirstTitle');
      secondHeaderTitle = t('LocationUnavailable_accuracyReducedSecondTitle');
      description = t('LocationUnavailable_accuracyReducedDescription');
      break;
    }
  }

  return (
    <BottomWindow withShade>
      <BigHeader
        windowTitle={t('LocationUnavailable_windowTitle')}
        firstHeaderTitle={firstHeaderTitle}
        secondHeaderTitle={secondHeaderTitle}
        description={description}
      />
      <Button containerStyle={styles.button} text={t('LocationUnavailable_settingsButton')} onPress={onButtonPress} />
    </BottomWindow>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 90,
  },
});

const LocationUnavailable = (props: LocationUnavailableProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <LocationUnavailableWithoutI18n {...props} />
  </I18nextProvider>
);

export default LocationUnavailable;
