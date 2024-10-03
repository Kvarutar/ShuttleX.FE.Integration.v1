import { useCallback, useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, type LayoutChangeEvent, Platform, Pressable, StyleSheet, Switch, View } from 'react-native';

import { countryDtos } from '../../../core/countries/countryDtos';
import { type CountryPhoneMaskDto } from '../../../core/countries/types';
import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { isAllFieldsFilled } from '../../../utils/validation';
import { BarModes } from '../../atoms/Bar/types';
import Bar from '../../atoms/Bar/v2';
import Button from '../../atoms/Button/v2';
import Text from '../../atoms/Text';
import TextInput from '../../atoms/TextInput/v2';
import { TextInputInputMode } from '../../atoms/TextInput/v2/props';
import ArrowInPrimaryColorIcon from '../../icons/ArrowInPrimaryColorIcon';
import UploadPhotoIcon from '../../icons/UploadPhotoIcon';
import WarningIcon from '../../icons/WarningIcon';
import MenuUserImage2 from '../../images/MenuUserImage2';
import BottomWindowWithGesture from '../../molecules/BottomWindowWithGesture';
import PhoneInput from '../../molecules/PhoneInput';
import PhoneSlidingPanel from '../../molecules/PhoneSlidingPanel';
import SafeAreaView from '../../molecules/SafeAreaView';
import ChangeNamePopUp from './ChangeNamePopUp';
import { useSignUpValidation } from './profileValidationUtils';
import { type AccountSettingsProps, type Profile } from './props';

const windowSizes = Dimensions.get('window');

const AccountSettingsScreenWithoutI18n = ({ onProfileDataSave, profile }: AccountSettingsProps) => {
  const { t } = useTranslation();

  const [profileDataForm, setProfileDataForm] = useState<Profile>({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    imageUri: profile.imageUri,
  });

  //theme logic
  const { setThemeMode } = useTheme();
  const [imageHeight, setImageHeight] = useState(0);

  //validate logic
  const { validateForm, isFormCorrect } = useSignUpValidation<Profile>(profileDataForm);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [wasValidated, setWasValidated] = useState<boolean>(false);
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [isAnswerYes, setIsAnswerYes] = useState<boolean>(false);
  const [isUpdateIcon, setIsUpdateIcon] = useState<boolean>(false);

  //flag logic
  const [flagState, setFlagState] = useState<CountryPhoneMaskDto>(countryDtos[0] ?? ({} as CountryPhoneMaskDto));
  const [isPanelPhoneSelectVisible, setIsPanelPhoneSelectVisible] = useState<boolean>(false);

  //switch theme logic
  const [isThemeSwitchActive, setIsThemeSwitchActive] = useState(false);
  const toggleSwitch = useCallback(() => setIsThemeSwitchActive(previousState => !previousState), []);

  useEffect(() => {
    setThemeMode(isThemeSwitchActive ? 'dark' : 'light');
  }, [isThemeSwitchActive, setThemeMode]);
  useEffect(() => {
    const isAllFilled = isAllFieldsFilled(profileDataForm);

    const isValid = wasValidated ? Object.values(validateForm()).every(Boolean) : isAllFilled;
    setIsButtonVisible(isValid);

    if (isAnswerYes) {
      onProfileDataSave(profileDataForm);
      setIsUpdateIcon(true);
      setIsAnswerYes(false);
    }
  }, [profileDataForm, validateForm, wasValidated, isAnswerYes, onProfileDataSave]);

  const handleInputChange = useCallback((field: keyof Profile, value: string | boolean | Date) => {
    setProfileDataForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const onUploadPhoto = () => {
    //TODO create page for uploading
  };

  const onDataSave = () => {
    setWasValidated(true);
    if (!validateForm()) {
      setIsButtonVisible(false);
      return;
    }
    if (profile.fullName !== profileDataForm.fullName) {
      setIsPopUp(true);
    } else {
      onProfileDataSave(profileDataForm);
    }
  };

  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setImageHeight(height);
  };

  const computedStyles = StyleSheet.create({
    icon: {
      bottom: -(imageHeight - 64) / 2,
    },
    switch: {
      transform: Platform.OS === 'android' ? [{ scaleX: 1 }, { scaleY: 1 }] : '',
    },
    hiddenPart: {
      height: windowSizes.height / 2,
    },
  });

  return (
    <>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <View style={styles.profilePhotoBox}>
            <Pressable onPress={onUploadPhoto}>
              <UploadPhotoIcon style={[computedStyles.icon, styles.icon]} />
            </Pressable>
            <View onLayout={handleImageLayout}>
              <MenuUserImage2 url={profileDataForm.imageUri} />
            </View>
          </View>

          <View style={styles.inputsStyle}>
            <TextInput
              inputMode={TextInputInputMode.Text}
              value={profileDataForm.fullName}
              placeholder={t('AccountSettings_fullName_placeholder')}
              withClearButton
              onChangeText={(value: string) => handleInputChange('fullName', value)}
              error={{ isError: !isFormCorrect.fullName && wasValidated, message: t('AccountSettings_nameError') }}
            />
            <TextInput
              maxLength={19}
              inputMode={TextInputInputMode.Email}
              value={profileDataForm.email}
              placeholder={t('AccountSettings_email_placeholder')}
              withClearButton
              onChangeText={(value: string) => handleInputChange('email', value)}
              error={{ isError: !isFormCorrect.email && wasValidated, message: t('AccountSettings_emailError') }}
            />
            <PhoneInput
              getPhoneNumber={(value: string) => handleInputChange('phone', value)}
              onFlagPress={() => setIsPanelPhoneSelectVisible(true)}
              flagState={flagState}
              error={{ isError: !isFormCorrect.phone && wasValidated, message: t('AccountSettings_phoneError') }}
            />

            <Bar style={styles.bar} mode={BarModes.Default}>
              <Text style={styles.barText}>{t('AccountSettings_barUpdate')}</Text>
              {!isUpdateIcon ? <ArrowInPrimaryColorIcon /> : <WarningIcon />}
            </Bar>
            <Bar style={styles.bar} mode={BarModes.Default}>
              <Text style={styles.barText}>{t('AccountSettings_barDarkMode')}</Text>
              <Switch onValueChange={toggleSwitch} value={isThemeSwitchActive} style={computedStyles.switch} />
            </Bar>
            {isButtonVisible && (
              <Button onPress={onDataSave} textStyle={styles.button} text={t('AccountSettings_saveButton')} />
            )}
          </View>
        </View>
      </SafeAreaView>
      {isPanelPhoneSelectVisible && (
        <PhoneSlidingPanel
          flagState={flagState}
          onFlagSelect={flag => setFlagState(flag)}
          isPanelOpen={isPanelPhoneSelectVisible}
          setIsPanelOpen={setIsPanelPhoneSelectVisible}
        />
      )}

      {isPopUp && (
        <BottomWindowWithGesture
          withShade
          hiddenPartStyle={computedStyles.hiddenPart}
          opened={true}
          hiddenPart={<ChangeNamePopUp setIsAnswerYes={setIsAnswerYes} setIsPopUp={setIsPopUp} />}
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
  profilePhotoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 16,
  },
});

export default AccountSettingsScreen;
