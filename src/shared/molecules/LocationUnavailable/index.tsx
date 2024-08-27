import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useThemeV1 } from '../../../core/themes/v1/themeContext';
import Blur from '../../atoms/Blur';
import ButtonV1 from '../../atoms/Button/V1';
import Text from '../../atoms/Text';
import BottomWindow from '../BottomWindow';
import { type LocationUnavailableProps } from './props';

const LocationUnavailableWithoutI18n = ({ reason, onButtonPress }: LocationUnavailableProps) => {
  const { colors } = useThemeV1();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    title: { color: colors.errorColor },
  });

  let title = '';
  let subtitle = '';

  switch (reason) {
    case 'permission_denied': {
      title = t('LocationUnavailable_permissionDeniedTitle');
      subtitle = t('LocationUnavailable_permissionDeniedSubtitle');
      break;
    }
    case 'location_disabled': {
      title = t('LocationUnavailable_locationDisabledTitle');
      subtitle = t('LocationUnavailable_locationDisabledSubtitle');
      break;
    }
    case 'accuracy_reduced': {
      title = t('LocationUnavailable_accuracyReducedTitle');
      subtitle = t('LocationUnavailable_accuracyReducedSubtitle');
      break;
    }
  }

  return (
    <>
      <Blur />
      <BottomWindow windowStyle={styles.container}>
        <Text style={[styles.title, computedStyles.title]}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <ButtonV1
          containerStyle={styles.button}
          text={t('LocationUnavailable_settingsButton')}
          onPress={onButtonPress}
        />
      </BottomWindow>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter Medium',
    fontSize: 18,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    alignSelf: 'stretch',
  },
});

const LocationUnavailable = (props: LocationUnavailableProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <LocationUnavailableWithoutI18n {...props} />
  </I18nextProvider>
);

export default LocationUnavailable;
