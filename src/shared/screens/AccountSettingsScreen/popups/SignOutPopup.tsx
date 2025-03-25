import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import Button from '../../../atoms/Button';
import { SquareButtonModes } from '../../../atoms/Button/types';
import BigHeader from '../../../molecules/BigHeader';
import BottomWindowWithGesture from '../../../molecules/BottomWindowWithGesture';
import { type SignOutPopupProps } from '../types';

const SignOutPopupWithoutI18n = ({ setIsSignOutPopupVisible, onSignOut }: SignOutPopupProps) => {
  const { t } = useTranslation();

  const onConfirm = () => {
    onSignOut();
    setIsSignOutPopupVisible(false);
  };

  const hiddenPartContent = (
    <View>
      <BigHeader
        windowTitle={t('AccountSettings_SignOutPopup_subTitle')}
        firstHeaderTitle={t('AccountSettings_SignOutPopup_firstTitle')}
        description={t('AccountSettings_SignOutPopup_description')}
      />
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.button}
          text={t('AccountSettings_SignOutPopup_confirmButton')}
          onPress={onConfirm}
        />
        <Button
          containerStyle={styles.button}
          text={t('AccountSettings_SignOutPopup_rejectButton')}
          mode={SquareButtonModes.Mode5}
          onPress={() => setIsSignOutPopupVisible(false)}
        />
      </View>
    </View>
  );

  return (
    <BottomWindowWithGesture withShade opened setIsOpened={setIsSignOutPopupVisible} hiddenPart={hiddenPartContent} />
  );
};

const SignOutPopup = (props: SignOutPopupProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <SignOutPopupWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 135,
  },
  button: {
    flex: 1,
  },
});

export default SignOutPopup;
