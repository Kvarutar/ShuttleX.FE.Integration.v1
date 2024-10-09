import { useCallback, useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, Platform, StyleSheet, Switch, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { isNameValid } from '../../../utils/validation';
import { BarModes } from '../../atoms/Bar/types';
import Bar from '../../atoms/Bar/v2';
import Button from '../../atoms/Button/v2';
import Text from '../../atoms/Text';
import TextInput from '../../atoms/TextInput/v2';
import { TextInputInputMode } from '../../atoms/TextInput/v2/props';
// import ArrowInPrimaryColorIcon from '../../icons/ArrowInPrimaryColorIcon';
import { countryFlags } from '../../icons/Flags';
// import WarningIcon from '../../icons/WarningIcon';
import BottomWindowWithGesture from '../../molecules/BottomWindowWithGesture';
import SafeAreaView from '../../molecules/SafeAreaView';
import ChangeDataPopUp from './ChangeDataPopUp';
import { ChangeNamePopUp, ChangeNamePopUpButtons } from './ChangeNamePopUp';
import { useChangeData } from './hooks/useChangeData';
import { useProfileForm } from './hooks/useProfileForm';
import { type AccountSettingsProps } from './props';

const windowSizes = Dimensions.get('window');

const AccountSettingsScreenWithoutI18n = ({
  onProfileDataSave,
  profile,
  setIsVerificationVisible,
  isVerificationDone,
  photoBlock,
}: AccountSettingsProps) => {
  const { t } = useTranslation();

  const { profileDataForm, handleInputChange, hasProfileChanged, flag } = useProfileForm(profile);

  const {
    isChangeDataPopUpVisible,
    mode,
    changedValue,
    handleOpenChangeWindow,
    handleChangeDataClose,
    handleValueChange,
  } = useChangeData();

  //theme logic
  const { themeMode, setThemeMode } = useTheme();

  //validate logic
  const [wasValidated, setWasValidated] = useState<boolean>(false);
  const [isChangeNamePopupVisible, setIsChangeNamePopupVisible] = useState<boolean>(false);
  const [isAnswer, setAnswer] = useState<boolean>(false);
  // const [isUpdateIcon, setIsUpdateIcon] = useState<boolean>(false);

  //verification logic
  const [isVerificationScreenVisible, setIsVerificationScreenVisible] = useState(false);

  //switch theme logic
  const isThemeSwitchActive = themeMode === 'dark';

  const toggleSwitch = useCallback(() => {
    setThemeMode(isThemeSwitchActive ? 'light' : 'dark');
  }, [isThemeSwitchActive, setThemeMode]);

  useEffect(() => {
    if (isVerificationDone) {
      setIsVerificationVisible(false);
      setIsVerificationScreenVisible(false);
      handleInputChange(mode === 'email' ? 'email' : 'phone', changedValue);
      handleChangeDataClose();
    }
  }, [isVerificationDone, handleChangeDataClose, handleInputChange, changedValue, mode, setIsVerificationVisible]);

  useEffect(() => {
    if (isVerificationScreenVisible) {
      setIsVerificationVisible(true);
    }
  }, [isVerificationScreenVisible, setIsVerificationVisible]);

  useEffect(() => {
    if (isAnswer) {
      onProfileDataSave(profileDataForm);
      // setIsUpdateIcon(true);
      setAnswer(false);
    }
  }, [profileDataForm, isAnswer, onProfileDataSave]);

  const onDataSave = () => {
    setWasValidated(true);
    if (profile.fullName !== profileDataForm.fullName) {
      setIsChangeNamePopupVisible(true);
    }
  };

  const computedStyles = StyleSheet.create({
    switch: {
      transform: Platform.OS === 'android' ? [{ scaleX: 1 }, { scaleY: 1 }] : '',
    },
    hiddenPart: {
      height: windowSizes.height / 2,
    },
    hiddenPartChange: {
      height: windowSizes.height * 0.83,
    },
  });

  return (
    <>
      <SafeAreaView>
        <View style={styles.wrapper}>
          {photoBlock}
          <View style={styles.inputsStyle}>
            <TextInput
              inputMode={TextInputInputMode.Text}
              value={profileDataForm.fullName}
              placeholder={t('AccountSettings_fullName_placeholder')}
              withClearButton
              onChangeText={(value: string) => handleInputChange('fullName', value)}
              error={{
                isError: !isNameValid(profileDataForm.fullName) && wasValidated,
                message: t('AccountSettings_nameError'),
              }}
            />

            <TextInput
              inputMode={TextInputInputMode.Email}
              value={profileDataForm.email}
              onFocus={() => handleOpenChangeWindow('email')}
            />

            <View style={styles.flagAndInputContainer}>
              <View style={styles.flagContainer}>{flag && countryFlags[flag.countryCode]}</View>
              <TextInput
                inputMode={TextInputInputMode.Numeric}
                value={profileDataForm.phone}
                onFocus={() => handleOpenChangeWindow('phone')}
                containerStyle={styles.input}
                wrapperStyle={styles.inputWrapperStyle}
              />
            </View>
            {/* TODO uncomment after release */}
            {/* <Bar style={styles.bar} mode={BarModes.Default}>
              <Text style={styles.barText}>{t('AccountSettings_barUpdate')}</Text>
              {!isUpdateIcon ? <ArrowInPrimaryColorIcon /> : <WarningIcon />}
            </Bar> */}
            <Bar style={styles.bar} mode={BarModes.Default}>
              <Text style={styles.barText}>{t('AccountSettings_barDarkMode')}</Text>
              <Switch onValueChange={toggleSwitch} value={isThemeSwitchActive} style={computedStyles.switch} />
            </Bar>
            {hasProfileChanged && (
              <Button onPress={onDataSave} textStyle={styles.button} text={t('AccountSettings_saveButton')} />
            )}
          </View>
        </View>
      </SafeAreaView>

      {isChangeNamePopupVisible && (
        <BottomWindowWithGesture
          withShade
          shadeStyle={styles.shade}
          hiddenPartWrapperStyle={styles.hidenPartStyle}
          hiddenPartButton={
            <ChangeNamePopUpButtons setAnswer={setAnswer} setIsPopUpVisible={setIsChangeNamePopupVisible} />
          }
          hiddenPartStyle={computedStyles.hiddenPart}
          opened
          hiddenPart={<ChangeNamePopUp />}
        />
      )}

      {isChangeDataPopUpVisible && (
        <BottomWindowWithGesture
          shadeStyle={styles.shade}
          withShade
          hiddenPartWrapperStyle={styles.hidenPartStyle}
          setIsOpened={handleChangeDataClose}
          hiddenPartStyle={computedStyles.hiddenPartChange}
          opened
          withHiddenPartScroll={false}
          hiddenPart={
            <ChangeDataPopUp
              currentValue={profileDataForm[mode]}
              mode={mode}
              setIsVerificationScreen={setIsVerificationScreenVisible}
              setNewValue={handleValueChange}
            />
          }
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
  shade: {
    marginTop: -100,
  },
  hidenPartStyle: {
    paddingBottom: 0,
  },
  button: {
    fontSize: 17,
  },
  bar: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  barText: {
    fontSize: 17,
    fontFamily: 'Inter Medium',
  },
  wrapper: {
    gap: 22,
    flex: 1,
  },

  inputsStyle: {
    gap: 16,
  },
  shortArrowIcon: {
    transform: [{ rotate: '270deg' }],
  },
});

export default AccountSettingsScreen;
