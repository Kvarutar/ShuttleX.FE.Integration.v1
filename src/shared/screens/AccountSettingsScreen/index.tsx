import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, SquareButtonModes } from 'shuttlex-integration';

import i18nIntegration from '../../../core/locales/i18n';
import { formatNumbersToMask } from '../../../utils';
import TextInput from '../../atoms/TextInput/v2';
import { countryFlags } from '../../icons/Flags';
import WarningIcon from '../../icons/WarningIcon';
import BottomWindowWithGesture from '../../molecules/BottomWindowWithGesture';
import ChangeDataPopUp from '../../molecules/changePopUps/ChangeDataPopUp';
import { useChangeData } from '../../molecules/changePopUps/hooks/useChangeData';
import { useProfileForm } from '../../molecules/changePopUps/hooks/useProfileForm';
import ScrollViewWithCustomScroll from '../../molecules/ScrollViewWithCustomScroll';
import VerifyDataPopUp from '../../molecules/VerifyDataPopUp';
import { type AccountSettingsProps } from './types';

const windowSizes = Dimensions.get('window');

const AccountSettingsScreenWithoutI18n = ({
  profile,
  handleOpenVerification,
  isChangeDataLoading,
  // onNameChanged,
  barBlock,
  photoBlock,
  verifiedStatus,
  setIsSignOutPopupVisible,
}: AccountSettingsProps) => {
  const { t } = useTranslation();

  const { flag } = useProfileForm(profile);

  const {
    isChangeDataPopUpVisible,
    onVerifyPopupClose,
    isVerifyPopUpVisible,
    handleOpenVerifyWindow,
    mode,
    handleOpenChangeWindow,
    onChangeDataPopupClose,
  } = useChangeData();

  const fullPhoneMask = flag.icc + flag.phoneMask;
  const outputNumber = verifiedStatus.phoneInfo.replace(new RegExp(`^\\+${flag.icc}`, ''), '');

  const computedStyles = StyleSheet.create({
    hiddenPartChange: {
      height: windowSizes.height * 0.83,
    },
  });

  return (
    <>
      <View style={styles.wrapper}>
        <ScrollViewWithCustomScroll contentContainerStyle={styles.container}>
          {photoBlock}
          <View style={styles.inputsStyle}>
            <View pointerEvents="none">
              <TextInput value={profile.fullName} />
            </View>

            <View style={styles.inputWithIcon}>
              <Pressable onPress={() => handleOpenChangeWindow('email')}>
                <View pointerEvents="none">
                  {/*TODO just for test, change it when back will synchronize profile & user */}
                  <TextInput value={verifiedStatus.emailInfo} />
                </View>
              </Pressable>
              {!verifiedStatus.isEmailVerified && (
                <Pressable onPress={() => handleOpenVerifyWindow('email')}>
                  <WarningIcon style={styles.warningIcon} />
                </Pressable>
              )}
            </View>

            <View style={styles.inputWithIcon}>
              <Pressable onPress={() => handleOpenChangeWindow('phone')}>
                <View style={styles.flagAndInputContainer} pointerEvents="none">
                  <View style={styles.flagContainer}>{flag && countryFlags[flag.countryCode]}</View>
                  <TextInput
                    // {/*TODO just for test, change it when back will synchronize profile & user */}
                    value={formatNumbersToMask(outputNumber, fullPhoneMask)}
                    containerStyle={styles.input}
                    wrapperStyle={styles.inputWrapperStyle}
                  />
                </View>
              </Pressable>
              {!verifiedStatus.isPhoneVerified && (
                <Pressable onPress={() => handleOpenVerifyWindow('phone')}>
                  <WarningIcon style={styles.warningIcon} />
                </Pressable>
              )}
            </View>
            {barBlock}
          </View>
        </ScrollViewWithCustomScroll>
        <Button
          onPress={() => setIsSignOutPopupVisible(true)}
          mode={SquareButtonModes.Mode4}
          text={t('AccountSettings_logOutButton')}
          textStyle={styles.logOutText}
        />
      </View>
      {isChangeDataPopUpVisible && (
        <Modal transparent statusBarTranslucent>
          <GestureHandlerRootView style={styles.gestureView}>
            <BottomWindowWithGesture
              withShade
              setIsOpened={onChangeDataPopupClose}
              hiddenPartStyle={computedStyles.hiddenPartChange}
              opened
              withHiddenPartScroll={false}
              hiddenPart={
                <ChangeDataPopUp
                  currentValue={profile[mode]}
                  mode={mode}
                  handleOpenVerification={handleOpenVerification}
                  isChangeDataLoading={isChangeDataLoading}
                  // setNewValue={handleValueChange}
                  onChangeDataPopupClose={onChangeDataPopupClose}
                />
              }
            />
          </GestureHandlerRootView>
        </Modal>
      )}

      {isVerifyPopUpVisible && (
        <VerifyDataPopUp
          mode={mode}
          handleOpenVerification={handleOpenVerification}
          data={profile[mode]}
          onVerifyPopupClose={onVerifyPopupClose}
        />
      )}
    </>
  );
};

const AccountSettingsScreen = (props: AccountSettingsProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <AccountSettingsScreenWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  flagAndInputContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  gestureView: {
    flex: 1,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    paddingVertical: 18,
    gap: 12,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#DEE3E4',
    height: 62,
  },
  input: {
    paddingLeft: 70,
  },
  inputWrapperStyle: {
    flex: 1,
  },
  bar: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
    zIndex: -1,
  },
  warningIcon: {
    position: 'absolute',
    right: 18,
    bottom: 15,
    alignItems: 'center',
    alignContent: 'center',
  },
  inputWithIcon: {
    position: 'relative',
  },
  container: {
    gap: 22,
    paddingBottom: 22,
  },
  inputsStyle: {
    gap: 16,
  },
  logOutText: {
    fontSize: 17,
  },
});

export default AccountSettingsScreen;
