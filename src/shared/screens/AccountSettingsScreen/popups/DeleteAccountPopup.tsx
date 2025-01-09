import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import Button from '../../../atoms/Button/v2';
import { SquareButtonModes } from '../../../atoms/Button/v2/props';
import BigHeader from '../../../molecules/BigHeader';
import BottomWindowWithGesture from '../../../molecules/BottomWindowWithGesture';
import { type DeleteAccountPopupProps } from '../types';

const DeleteAccountPopupWithoutI18n = ({ setIsDeleteAccountPopupVisible, onPressYes }: DeleteAccountPopupProps) => {
  const { t } = useTranslation();

  const onConfirm = () => {
    onPressYes();
    setIsDeleteAccountPopupVisible(false);
  };

  const hiddenPartContent = (
    <View>
      <BigHeader
        windowTitle={t('AccountSettings_DeleteAccountPopup_subTitle')}
        firstHeaderTitle={t('AccountSettings_DeleteAccountPopup_firstTitle')}
        description={t('AccountSettings_DeleteAccountPopup_description')}
      />
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.button}
          text={t('AccountSettings_DeleteAccountPopup_confirmButton')}
          onPress={onConfirm}
        />
        <Button
          containerStyle={styles.button}
          text={t('AccountSettings_DeleteAccountPopup_rejectButton')}
          mode={SquareButtonModes.Mode2}
          onPress={() => setIsDeleteAccountPopupVisible(false)}
        />
      </View>
    </View>
  );

  return (
    <BottomWindowWithGesture
      withShade
      opened
      setIsOpened={setIsDeleteAccountPopupVisible}
      hiddenPart={hiddenPartContent}
    />
  );
};

const DeleteAccountPopup = (props: DeleteAccountPopupProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <DeleteAccountPopupWithoutI18n {...props} />
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

export default DeleteAccountPopup;
