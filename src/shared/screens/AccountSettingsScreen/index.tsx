import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Dimensions, Platform, Pressable, StyleSheet, View } from 'react-native';

// import { Switch } from 'react-native';
import i18nIntegration from '../../../core/locales/i18n';
// TODO Uncomment all code whe we need it
// import { useTheme } from '../../../core/themes/v2/themeContext';
// import { Switch } from 'react-native';
// import { isNameValid } from '../../../utils/validation';
// import { BarModes } from '../../atoms/Bar/types';
// import Bar from '../../atoms/Bar/v2';
// import Button from '../../atoms/Button/v2';
// import Text from '../../atoms/Text';
import TextInput from '../../atoms/TextInput/v2';
// import { type TextInputRef } from '../../atoms/TextInput/v2/props';
import { countryFlags } from '../../icons/Flags';
import BottomWindowWithGesture from '../../molecules/BottomWindowWithGesture';
import ChangeDataPopUp from './ChangeDataPopUp';
// import { ChangeNamePopUp, ChangeNamePopUpButtons } from './ChangeNamePopUp';
import { useChangeData } from './hooks/useChangeData';
import { useProfileForm } from './hooks/useProfileForm';
import { type AccountSettingsProps } from './types';

const windowSizes = Dimensions.get('window');

//////TODO uncoment all changeName related code when we need changeName popup///////

const AccountSettingsScreenWithoutI18n = ({
  // onProfileDataSave,
  profile,
  handleOpenVerification,
  isVerificationDone,
  // onNameChanged,
  barBlock,
  photoBlock,
  // isContractor = false,
}: AccountSettingsProps) => {
  // const { t } = useTranslation();
  // const fullNameInputRef = useRef<TextInputRef>(null);

  const { profileDataForm, handleInputChange, flag } = useProfileForm(profile);

  const { isChangeDataPopUpVisible, mode, changedValue, handleOpenChangeWindow, onChangeDataPopupClose } =
    useChangeData();

  //theme logic
  // TODO Uncomment all code whe we need it
  // const { themeMode, setThemeMode } = useTheme();

  //validate logic
  // const [wasValidated, setWasValidated] = useState<boolean>(false);
  // const [isChangeNamePopupVisible, setIsChangeNamePopupVisible] = useState<boolean>(false);
  // const [isAnswer, setAnswer] = useState<boolean>(false);

  //switch theme logic
  // TODO Uncomment all code whe we need it
  // const isThemeSwitchActive = themeMode === 'dark';

  // const toggleSwitch = useCallback(() => {
  //   setThemeMode(isThemeSwitchActive ? 'light' : 'dark');
  // }, [isThemeSwitchActive, setThemeMode]);
  // }, [isThemeSwitchActive, setThemeMode]);

  useEffect(() => {
    if (isVerificationDone) {
      handleInputChange(mode, changedValue);
    }
  }, [isVerificationDone, handleInputChange, changedValue, mode]);

  // useEffect(() => {
  //   if (isAnswer) {
  //     if (isContractor) {
  //       onNameChanged?.();
  //     }
  //     onProfileDataSave(profileDataForm);
  //     setAnswer(false);
  //   }
  // }, [profileDataForm, isAnswer, onProfileDataSave, onNameChanged, isContractor]);

  // const onChangeNamePopupClose = () => {
  //   setIsChangeNamePopupVisible(false);

  //   setProfileDataForm(prevState => ({
  //     ...prevState,
  //     fullName: profile.fullName,
  //   }));
  // };

  // const onDataSave = () => {
  //   fullNameInputRef.current?.blur();

  //   setWasValidated(true);
  //   if (profile.fullName !== profileDataForm.fullName) {
  //     setIsChangeNamePopupVisible(true);
  //   }
  // };

  const computedStyles = StyleSheet.create({
    switch: {
      transform: Platform.OS === 'android' ? [{ scaleX: 1 }, { scaleY: 1 }] : '',
    },
    hiddenPartChange: {
      height: windowSizes.height * 0.83,
    },
  });

  return (
    <>
      <View style={styles.wrapper}>
        {photoBlock}
        <View style={styles.inputsStyle}>
          <View pointerEvents="none">
            <TextInput
              // ref={fullNameInputRef}
              // inputMode={TextInputInputMode.Text}
              value={profileDataForm.fullName}
              // placeholder={t('AccountSettings_fullName_placeholder')}
              // withClearButton
              // onChangeText={(value: string) => handleInputChange('fullName', value)}
              // error={{
              //   isError: !isNameValid(profileDataForm.fullName) && wasValidated,
              //   message: t('AccountSettings_nameError'),
              // }}
            />
          </View>

          <Pressable onPress={() => handleOpenChangeWindow('email')}>
            <View pointerEvents="none">
              <TextInput value={profileDataForm.email} />
            </View>
          </Pressable>

          <Pressable onPress={() => handleOpenChangeWindow('phone')}>
            <View style={styles.flagAndInputContainer} pointerEvents="none">
              <View style={styles.flagContainer}>{flag && countryFlags[flag.countryCode]}</View>
              <TextInput
                value={profileDataForm.phone}
                containerStyle={styles.input}
                wrapperStyle={styles.inputWrapperStyle}
              />
            </View>
          </Pressable>
          {barBlock}

          {/* // TODO Uncomment all code whe we need it */}

          {/*  <Bar style={styles.bar} mode={BarModes.Default}>
              <Text style={styles.barText}>{t('AccountSettings_barDarkMode')}</Text>
              <Switch onValueChange={toggleSwitch} value={isThemeSwitchActive} style={computedStyles.switch} />
            </Bar>*/}

          {/* {hasProfileChanged && (
            <Button onPress={onDataSave} textStyle={styles.button} text={t('AccountSettings_saveButton')} />
          )} */}
        </View>
      </View>

      {/* {isChangeNamePopupVisible && (
        <Modal transparent>
          <BottomWindowWithGesture
            withShade
            setIsOpened={onChangeNamePopupClose}
            hiddenPartButton={
              <ChangeNamePopUpButtons setAnswer={setAnswer} setIsPopUpVisible={setIsChangeNamePopupVisible} />
            }
            opened
            hiddenPart={<ChangeNamePopUp isContractor={isContractor} />}
          />
        </Modal>
      )} */}

      {isChangeDataPopUpVisible && (
        //TODO modal does not work properly on android devices, resolve problem after demo
        // <Modal transparent>
        <BottomWindowWithGesture
          withShade
          setIsOpened={onChangeDataPopupClose}
          hiddenPartStyle={computedStyles.hiddenPartChange}
          opened
          withHiddenPartScroll={false}
          hiddenPart={
            <ChangeDataPopUp
              currentValue={profileDataForm[mode]}
              mode={mode}
              handleOpenVerification={handleOpenVerification}
              // setNewValue={handleValueChange}
              onChangeDataPopupClose={onChangeDataPopupClose}
            />
          }
        />
        // </Modal>
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
});

export default AccountSettingsScreen;
