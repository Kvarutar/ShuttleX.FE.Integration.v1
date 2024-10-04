import { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { getCountryPhoneMaskByCountryName } from '../../../core/countries/countryDtos';
import { type CountryPhoneMaskDto } from '../../../core/countries/types';
import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import Button from '../../atoms/Button/v2';
import { ButtonShadows, ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import HeaderWithTwoTitles from '../../molecules/HeaderWithTwoTitles';
import CustomKeyboardAvoidingView from '../../molecules/KeyboardAvoidingView';
import PhoneInput from '../../molecules/PhoneInput';
import PhoneSlidingPanel from '../../molecules/PhoneSlidingPanel';
import ScrollViewWithCustomScroll from '../../molecules/ScrollViewWithCustomScroll';
import { type SignInScreenProps } from './types';

const SignInScreenWithoutI18n = ({ navigateToSignUp, onSubmit }: SignInScreenProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [flagState, setFlagState] = useState<CountryPhoneMaskDto>(
    getCountryPhoneMaskByCountryName('Ukraine') ?? ({} as CountryPhoneMaskDto),
  );
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPanelPhoneSelectVisible, setIsPanelPhoneSelectVisible] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(true);
  const [wasValidated, setWasValidated] = useState(false);
  const trimmedPhoneNumber = phoneNumber.trim();

  useEffect(() => {
    setIsValid(!wasValidated || Boolean(phoneNumber));
  }, [phoneNumber, wasValidated]);

  const handleSubmit = () => {
    setWasValidated(true);
    if (phoneNumber) {
      onSubmit(phoneNumber);
    }
  };

  const computedStyles = StyleSheet.create({
    signUpLabel: {
      color: colors.textLinkColor,
    },
    checkBoxText: {
      color: colors.textSecondaryColor,
    },
  });

  const content = (
    <>
      <ScrollViewWithCustomScroll contentContainerStyle={[styles.formSignInContainer]}>
        <HeaderWithTwoTitles firstTitle={t('SignIn_firstPartHeader')} secondTitle={t('SignIn_secondPartHeader')} />
        <PhoneInput
          error={{ isError: !isValid }}
          flagState={flagState}
          getPhoneNumber={setPhoneNumber}
          onFlagPress={() => setIsPanelPhoneSelectVisible(true)}
        />
      </ScrollViewWithCustomScroll>
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.nextButton}
          shape={ButtonShapes.Circle}
          mode={trimmedPhoneNumber ? CircleButtonModes.Mode1 : CircleButtonModes.Mode4}
          disabled={!trimmedPhoneNumber}
          size={ButtonSizes.L}
          text={t('SignIn_nextButton')}
          innerSpacing={5}
          shadow={trimmedPhoneNumber ? ButtonShadows.Strong : undefined}
          onPress={handleSubmit}
        />
        <Pressable style={styles.dontHaveAccountContainer} onPress={navigateToSignUp} hitSlop={20}>
          <Text style={styles.dontHaveAccountText}>
            {t('SignIn_dontHaveAccount')}{' '}
            <Text style={[styles.signUpLabel, computedStyles.signUpLabel]}>{t('SignIn_signUpLabel')}</Text>
          </Text>
        </Pressable>
      </View>
    </>
  );

  return (
    <>
      {!isPanelPhoneSelectVisible ? <CustomKeyboardAvoidingView>{content}</CustomKeyboardAvoidingView> : content}
      {isPanelPhoneSelectVisible && (
        <PhoneSlidingPanel
          flagState={flagState}
          onFlagSelect={flag => setFlagState(flag)}
          isPanelOpen={isPanelPhoneSelectVisible}
          setIsPanelOpen={setIsPanelPhoneSelectVisible}
        />
      )}
    </>
  );
};

const SignInScreen = (props: SignInScreenProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <SignInScreenWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  formSignInContainer: {
    gap: 24,
    paddingBottom: 24,
  },
  buttonsContainer: {
    marginTop: 12,
    gap: 12,
  },
  nextButton: {
    alignSelf: 'center',
  },
  dontHaveAccountContainer: {
    alignSelf: 'center',
  },
  dontHaveAccountText: {
    fontFamily: 'Inter Medium',
    fontSize: 14,
  },
  signUpLabel: {
    fontFamily: 'Inter Medium',
    fontSize: 14,
  },
});

export default SignInScreen;
