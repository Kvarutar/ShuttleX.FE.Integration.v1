//TODO There is a main code with all comments we dont need know. Use it when we will need theme swither and changename popup//

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
// import WarningIcon from '../../icons/WarningIcon';
import BottomWindowWithGesture from '../../molecules/BottomWindowWithGesture';
import ChangeDataPopUp from '../../molecules/changePopUps/ChangeDataPopUp';
// import { ChangeNamePopUp, ChangeNamePopUpButtons } from './ChangeNamePopUp';
import { useChangeData } from '../../molecules/changePopUps/hooks/useChangeData';
import { useProfileForm } from '../../molecules/changePopUps/hooks/useProfileForm';
import { type AccountSettingsProps } from './types';

const windowSizes = Dimensions.get('window');

//////TODO uncoment all changeName related code when we need changeName popup///////

const AccountSettingsScreenWithoutI18n = ({
  profile,
  handleOpenVerification,
  barBlock,
  photoBlock,
  // openVerifyPopUpEmail,
  // onNameChanged,
  // isContractor = false,
}: AccountSettingsProps) => {
  // const { t } = useTranslation();
  // const fullNameInputRef = useRef<TextInputRef>(null);

  const { flag } = useProfileForm(profile);

  const { isChangeDataPopUpVisible, mode, handleOpenChangeWindow, onChangeDataPopupClose } = useChangeData();

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

  // useEffect(() => {
  //   if (isAnswer) {
  //     if (isContractor) {
  //       onNameChanged?.();
  //     }
  //     onProfileDataSave(profile);
  //     setAnswer(false);
  //   }
  // }, [profile, isAnswer, onProfileDataSave, onNameChanged, isContractor]);

  // const onChangeNamePopupClose = () => {
  //   setIsChangeNamePopupVisible(false);

  //   setprofile(prevState => ({
  //     ...prevState,
  //     fullName: profile.fullName,
  //   }));
  // };

  // const onDataSave = () => {
  //   fullNameInputRef.current?.blur();

  //   setWasValidated(true);
  //   if (profile.fullName !== profile.fullName) {
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
              value={profile.fullName}
              // placeholder={t('AccountSettings_fullName_placeholder')}
              // withClearButton
              // onChangeText={(value: string) => handleInputChange('fullName', value)}
              // error={{
              //   isError: !isNameValid(profile.fullName) && wasValidated,
              //   message: t('AccountSettings_nameError'),
              // }}
            />
          </View>

          <View style={styles.inputWithIcon}>
            <Pressable onPress={() => handleOpenChangeWindow('email')}>
              <View pointerEvents="none">
                <TextInput value={profile.email} />
              </View>
            </Pressable>
            {/* {!isEmailVerificated && (
              <Pressable onPress={openVerifyPopUpEmail}>
                <WarningIcon style={styles.warningIcon} />
              </Pressable>
            )} */}
          </View>

          <Pressable
            onPress={() => {
              handleOpenChangeWindow('phone');
            }}
          >
            <View style={styles.flagAndInputContainer} pointerEvents="none">
              <View style={styles.flagContainer}>{flag && countryFlags[flag.countryCode]}</View>
              <TextInput value={profile.phone} containerStyle={styles.input} wrapperStyle={styles.inputWrapperStyle} />
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
              currentValue={profile[mode]}
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
});

export default AccountSettingsScreen;
