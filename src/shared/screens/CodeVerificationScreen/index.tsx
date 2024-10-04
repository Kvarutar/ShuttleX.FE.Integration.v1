import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { minToMilSec } from '../../../utils';
import Button from '../../atoms/Button/v2';
import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import BottomWindow from '../../molecules/BottomWindow';
import HeaderWithTwoTitles from '../../molecules/HeaderWithTwoTitles';
import CustomKeyboardAvoidingView from '../../molecules/KeyboardAvoidingView';
import Content from './Content';
import TitleWithCloseButton from './TitleWithCloseButton';
import { type CodeVerificationScreenProps } from './types';

const CodeVerificationScreenWithoutI18n = ({
  headerFirstText,
  headerSecondText,
  onBackButtonPress,
  onAgainButtonPress,
  onCodeChange,
  isError,
  isBlocked,
  lockOutTime,
  lockOutTimeForText,
  onBannedAgainButtonPress,
  onSupportButtonPress,
}: CodeVerificationScreenProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    bannedTitle: {
      color: colors.textTitleColor,
    },
    supportButton: {
      color: colors.textPrimaryColor,
    },
  });

  const bannedElement = (
    <>
      <Text style={[styles.bannedTitle, computedStyles.bannedTitle]}>{t('CodeVerification_bannedTitle')}</Text>
      <HeaderWithTwoTitles
        firstTextStyle={styles.firstBannedHeaderText}
        secondTextStyle={styles.secondBannedHeaderText}
        firstTitle={t('CodeVerification_bannedFirstText', { time: lockOutTimeForText })}
        secondTitle={t('CodeVerification_bannedSecondText')}
      />
      <Button
        style={styles.bannedAgainButton}
        circleMode6Time={lockOutTime}
        shape={ButtonShapes.Circle}
        mode={CircleButtonModes.Mode6}
        size={ButtonSizes.L}
        onPress={onBannedAgainButtonPress}
        text={t('CodeVerification_againButton')}
      />
      <Button
        textStyle={[styles.supportButton, computedStyles.supportButton]}
        onPress={onSupportButtonPress}
        text={t('CodeVerification_supportButton')}
      />
    </>
  );

  return (
    <>
      <CustomKeyboardAvoidingView>
        <View style={styles.container} pointerEvents={isBlocked ? 'none' : undefined}>
          <TitleWithCloseButton title={t('CodeVerification_title')} onBackButtonPress={onBackButtonPress} />
          <Content
            time={minToMilSec(3)}
            headerFirstText={headerFirstText}
            headerSecondText={headerSecondText}
            onButtonPress={onAgainButtonPress}
            onCodeChange={onCodeChange}
            isError={isError}
          />
        </View>
      </CustomKeyboardAvoidingView>
      {isBlocked && <BottomWindow children={bannedElement} withShade />}
    </>
  );
};

const CodeVerificationScreen = (props: CodeVerificationScreenProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <CodeVerificationScreenWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannedTitle: {
    fontFamily: 'Inter Bold',
    fontSize: 14,
    marginBottom: 14,
  },
  firstBannedHeaderText: {
    marginBottom: 8,
  },
  secondBannedHeaderText: {
    fontFamily: 'Inter Medium',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 32,
  },
  bannedAgainButton: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  supportButton: {
    fontSize: 17,
  },
});

export default CodeVerificationScreen;
