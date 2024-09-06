import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import { useThemeV1 } from '../../../../core/themes/v1/themeContext';
import ButtonV1 from '../../../atoms/Button/v1/index';
import { ButtonV1Modes } from '../../../atoms/Button/v1/props';
import Text from '../../../atoms/Text';
import ClockIcon2 from '../../../icons/ClockIcon2';
import Alert from '../Alert';
import { type AlertDescendantProps } from '../Alert/props';
import { type PlannedTripAlertProps } from './props';

const PlannedTripAlertWithoutI18n = ({
  date,
  locale,
  onCancelPress,
  style,
  ...props
}: PlannedTripAlertProps & AlertDescendantProps) => {
  const { colors } = useThemeV1();
  const { t } = useTranslation();

  return (
    <Alert style={[styles.container, style]} {...props}>
      <View style={styles.titleContainer}>
        <ClockIcon2 color={colors.iconSecondaryColor} />
        <Text>
          {t('PlannedTripAlert_description', {
            time: date.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric' }),
          })}
        </Text>
      </View>
      <ButtonV1 mode={ButtonV1Modes.Mode4} text={t('PlannedTripAlert_cancelButton')} onPress={onCancelPress} />
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
});

const PlannedTripAlert = (props: PlannedTripAlertProps & AlertDescendantProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <PlannedTripAlertWithoutI18n {...props} />
  </I18nextProvider>
);

export default PlannedTripAlert;
