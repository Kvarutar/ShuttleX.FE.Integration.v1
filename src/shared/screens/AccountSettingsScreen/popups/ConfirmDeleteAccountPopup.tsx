import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import { useTheme } from '../../../../core/themes/v2/themeContext';
import Button from '../../../atoms/Button/v2';
import Text from '../../../atoms/Text';
import BigHeader from '../../../molecules/BigHeader';
import BottomWindowWithGesture from '../../../molecules/BottomWindowWithGesture';
import { type ConfirmDeleteAccountPopupProps } from '../types';
import { type ChangeDataPopUpMode } from './changePopUps/types';

const ConfirmDeleteAccountPopupWithoutI18n = ({
  setIsConfirmDeleteAccountPopupVisible,
  handleOpenVerification,
  userData,
}: ConfirmDeleteAccountPopupProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { phone, email } = userData;

  const onConfirm = (mode: ChangeDataPopUpMode) => {
    handleOpenVerification(mode, userData[mode], 'delete');
    setIsConfirmDeleteAccountPopupVisible(false);
  };

  const computedStyles = StyleSheet.create({
    verificationMethodText: {
      color: colors.textQuadraticColor,
    },
    orText: {
      color: colors.textPrimaryColor,
    },
  });

  const hiddenPartContent = (
    <View>
      <BigHeader
        windowTitle={t('AccountSettings_ConfirmDeleteAccountPopup_subTitle')}
        firstHeaderTitle={t('AccountSettings_ConfirmDeleteAccountPopup_firstTitle')}
      />
      <View>
        <Text style={[styles.description, computedStyles.verificationMethodText]}>
          {t('AccountSettings_ConfirmDeleteAccountPopup_emailText', { email })}
        </Text>
        <Text style={[styles.description, computedStyles.orText]}>
          {t('AccountSettings_ConfirmDeleteAccountPopup_or')}
        </Text>
        <Text style={[styles.description, computedStyles.verificationMethodText]}>
          {t('AccountSettings_ConfirmDeleteAccountPopup_phoneText', { phone })}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.button}
          text={t('AccountSettings_ConfirmDeleteAccountPopup_emailButtonText')}
          onPress={() => onConfirm('email')}
        />
        <Button
          containerStyle={styles.button}
          text={t('AccountSettings_ConfirmDeleteAccountPopup_phoneButtonText')}
          onPress={() => onConfirm('phone')}
        />
      </View>
    </View>
  );

  return (
    <BottomWindowWithGesture
      withShade
      opened
      setIsOpened={setIsConfirmDeleteAccountPopupVisible}
      hiddenPart={hiddenPartContent}
    />
  );
};

const ConfirmDeleteAccountPopup = (props: ConfirmDeleteAccountPopupProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <ConfirmDeleteAccountPopupWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  description: {
    fontFamily: 'Inter SemiBold',
    fontSize: 20,
    lineHeight: 34,
    letterSpacing: -1.53,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 42,
  },
  button: {
    flex: 1,
  },
});

export default ConfirmDeleteAccountPopup;
