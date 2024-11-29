import { forwardRef, useImperativeHandle, useRef } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { minToMilSec } from '../../../utils';
import { type Nullable } from '../../../utils/typescript';
import CustomKeyboardAvoidingView from '../../molecules/KeyboardAvoidingView';
import SafeAreaView from '../../molecules/SafeAreaView';
import TemporaryLockoutPopup from '../../molecules/TemporaryLockoutPopup';
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
    const contentRef = useRef<Nullable<ContentRef>>(null);

    useImperativeHandle(ref, () => ({
      refresh: () => {
        contentRef.current?.refresh();
      },
    }));

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
            <TemporaryLockoutPopup
              lockOutTimeText={lockOutTimeForText}
              onSupportButtonPress={onSupportButtonPress}
              lockOutTime={lockOutTime}
              onBannedAgainButtonPress={onBannedAgainButtonPress}
            />
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
});

export default CodeVerificationScreen;
