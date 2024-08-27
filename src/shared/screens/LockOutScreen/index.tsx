import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ButtonV1, ButtonV1Modes, Text, Timer, TimerModes, useThemeV1 } from 'shuttlex-integration';

import i18nIntegration from '../../../core/locales/i18n';
import { type LockOutScreenProps } from './props';

const LockOutScreenWithoutI18n = ({
  onRequestCodeAgain,
  onContactSupport,
  lockoutEndTimestamp,
  onAfterCountdownEnds,
  isLockedOut,
}: LockOutScreenProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useThemeV1();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerDummy} />
        <Text style={[styles.headerTitle]}>{t('LockOut_headerTitle')}</Text>
        <Timer
          initialDate={new Date(lockoutEndTimestamp)}
          onAfterCountdownEnds={onAfterCountdownEnds}
          startColor={colors.secondaryGradientStartColor}
          endColor={colors.secondaryGradientEndColor}
          mode={TimerModes.Mini}
        />
      </View>

      <View style={styles.body}>
        <Text style={[styles.codeText]}>{t('LockOut_description')}</Text>
        <View style={styles.buttonsContainer}>
          <ButtonV1 mode={ButtonV1Modes.Mode3} text={t('LockOut_supportButton')} onPress={onContactSupport} />
          <ButtonV1
            mode={ButtonV1Modes.Mode2}
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
