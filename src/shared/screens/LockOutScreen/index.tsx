import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import Button from '../../atoms/Button';
import { SquareButtonModes } from '../../atoms/Button/types';
import Text from '../../atoms/Text';
import { type LockOutScreenProps } from './props';

const LockOutScreenWithoutI18n = ({
  onRequestCodeAgain,
  onContactSupport,
  // Removed on Task-remove-timer-v1
  // lockoutEndTimestamp,
  // onAfterCountdownEnds,
  isLockedOut,
}: LockOutScreenProps): JSX.Element => {
  const { t } = useTranslation();
  // Removed on Task-remove-timer-v1
  // const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerDummy} />
        <Text style={[styles.headerTitle]}>{t('LockOut_headerTitle')}</Text>
        {/* Removed on Task-remove-timer-v1 */}
        {/* Here was a TimerV1, but this component (LockOutScreen) is not in use for now.
        TODO: Check if this component is needed or remove it */}
        {/* <TimerV1
          initialDate={new Date(lockoutEndTimestamp)}
          onAfterCountdownEnds={onAfterCountdownEnds}
          startColor={colors.secondaryGradientStartColor}
          endColor={colors.secondaryGradientEndColor}
          mode={TimerV1Modes.Mini}
        /> */}
      </View>

      <View style={styles.body}>
        <Text style={[styles.codeText]}>{t('LockOut_description')}</Text>
        <View style={styles.buttonsContainer}>
          {/* Changed to lastest Button version in Task-remove-button-v1 */}
          {/* TODO: Check this buttons by desing when add this screen */}
          <Button mode={SquareButtonModes.Mode3} text={t('LockOut_supportButton')} onPress={onContactSupport} />
          <Button
            mode={SquareButtonModes.Mode2}
            text={t('LockOut_requestButton')}
            onPress={onRequestCodeAgain}
            disableShadow={isLockedOut}
            disabled={isLockedOut}
          />
        </View>
      </View>
    </View>
  );
};

const LockOutScreen = (props: LockOutScreenProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <LockOutScreenWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Inter Medium',
    fontSize: 18,
  },
  codeText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Inter Medium',
    marginTop: 64,
  },
  timerText: {
    marginVertical: 20,
    textAlign: 'center',
  },
  headerDummy: {
    width: 50,
  },
  buttonsContainer: {
    gap: 24,
  },
});

export default LockOutScreen;
