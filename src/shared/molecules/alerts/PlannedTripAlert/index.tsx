import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import { useTheme } from '../../../../core/themes/themeContext';
import Button from '../../../atoms/Button';
import { SquareButtonModes } from '../../../atoms/Button/types';
import Text from '../../../atoms/Text';
import ClockIcon2 from '../../../icons/ClockIcon2';
import AlertV1 from '../Alert/V1';
import { type AlertDescendantProps } from '../Alert/V1/props';
import { type PlannedTripAlertProps } from './props';

const PlannedTripAlertWithoutI18n = ({
  date,
  locale,
  onCancelPress,
  style,
  ...props
}: PlannedTripAlertProps & AlertDescendantProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <AlertV1 style={[styles.container, style]} {...props}>
      <View style={styles.titleContainer}>
        <ClockIcon2 color={colors.iconSecondaryColor} />
        <Text>
          {t('PlannedTripAlert_description', {
            time: date.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric' }),
          })}
        </Text>
      </View>
      {/* Changed to lastest Button version in Task-remove-button-v1 */}
      {/* TODO: Check this buttons by desing when add this screen */}
      <Button mode={SquareButtonModes.Mode4} text={t('PlannedTripAlert_cancelButton')} onPress={onCancelPress} />
    </AlertV1>
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
