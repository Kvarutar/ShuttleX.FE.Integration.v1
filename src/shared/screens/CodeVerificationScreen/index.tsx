import { forwardRef, useImperativeHandle, useRef } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { minToMilSec } from '../../../utils';
import { type Nullable } from '../../../utils/typescript';
import Button from '../../atoms/Button/v2';
import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import BottomWindow from '../../molecules/BottomWindow';
import HeaderWithTwoTitles from '../../molecules/HeaderWithTwoTitles';
import CustomKeyboardAvoidingView from '../../molecules/KeyboardAvoidingView';
import SafeAreaView from '../../molecules/SafeAreaView';
import Content from './Content';
import { type ContentRef } from './Content/types';
import TitleWithCloseButton from './TitleWithCloseButton';
import { type CodeVerificationScreenProps, type CodeVerificationScreenRef } from './types';

const CodeVerificationScreenWithoutI18n = forwardRef<CodeVerificationScreenRef, CodeVerificationScreenProps>(
  (
    {
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
      titleText,
      onSupportButtonPress,
      underButtonText,
      underButtonPressableText,
      onPressUnderButtonText,
    },
    ref,
  ): JSX.Element => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const contentRef = useRef<Nullable<ContentRef>>(null);

    useImperativeHandle(ref, () => ({
      refresh: () => {
        contentRef.current?.refresh();
      },
    }));

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
          <SafeAreaView>
            <View style={styles.container} pointerEvents={isBlocked ? 'none' : undefined}>
              <TitleWithCloseButton
                title={titleText ?? t('CodeVerification_title')}
                onBackButtonPress={onBackButtonPress}
              />
              <Content
                ref={contentRef}
                time={minToMilSec(3)}
                headerFirstText={headerFirstText}
                headerSecondText={headerSecondText}
                onButtonPress={onAgainButtonPress}
                onCodeChange={onCodeChange}
                isError={isError}
                underButtonText={underButtonText}
                underButtonPressableText={underButtonPressableText}
                onPressUnderButtonText={onPressUnderButtonText}
              />
            </View>
          </SafeAreaView>
        </CustomKeyboardAvoidingView>
        {isBlocked && (
          <Modal transparent>
            <BottomWindow children={bannedElement} withShade />
          </Modal>
        )}
      </>
    );
  },
);

const CodeVerificationScreen = forwardRef<CodeVerificationScreenRef, CodeVerificationScreenProps>((props, ref) => (
  <I18nextProvider i18n={i18nIntegration}>
    <CodeVerificationScreenWithoutI18n {...props} ref={ref} />
  </I18nextProvider>
));

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
