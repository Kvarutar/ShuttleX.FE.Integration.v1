import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { emailRegex } from '../../../core/consts/regex.consts';
import { getCountryPhoneMaskByCountryName } from '../../../core/countries/countryDtos';
import { type CountryPhoneMaskDto } from '../../../core/countries/types';
import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import Button from '../../atoms/Button/v2';
import { ButtonShadows, ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import CheckBox from '../../atoms/Checkbox';
import Text from '../../atoms/Text';
import TextInput from '../../atoms/TextInput/v2';
import HeaderWithTwoTitles from '../../molecules/HeaderWithTwoTitles';
import PhoneInput from '../../molecules/PhoneInput';
import SlidingPanel from '../../molecules/PhoneSlidingPanel';
import ScrollViewWithCustomScroll from '../../molecules/ScrollViewWithCustomScroll';
import { type SignUpForm, type SignUpFormValidation, type SignUpProps, type SignUpScreenRef } from './types';

const SignUpScreenWithoutI18n = forwardRef<SignUpScreenRef, SignUpProps>(
  ({ navigateToSignIn, navigateToTerms, onSubmit, isLoading, setPanelPhoneVisible }, ref): JSX.Element => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const [userDataForm, setUserDataForm] = useState<SignUpForm>({
      firstName: '',
      email: '',
      phone: '',
      isFamiliarWithTermsAndConditions: false,
      isAllowedProcessPersonalData: false,
    });
    const getInitialCorrectForm = (): SignUpFormValidation => ({
      correctFirstName: true,
      correctEmail: true,
      correctPhone: true,
      correctIsFamiliarWithTermsAndConditions: true,
      correctIsAllowedProcessPersonalData: true,
    });
    const [isFormCorrect, setIsFormCorrect] = useState<SignUpFormValidation>(getInitialCorrectForm);
    const [wasValidated, setWasValidated] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
    const [isPanelPhoneSelectVisible, setIsPanelPhoneSelectVisible] = useState<boolean>(false);
    const [flagState, setFlagState] = useState<CountryPhoneMaskDto>(
      getCountryPhoneMaskByCountryName('Ukraine') ?? ({} as CountryPhoneMaskDto),
    );

    useEffect(() => {
      setPanelPhoneVisible(isPanelPhoneSelectVisible);
    }, [isPanelPhoneSelectVisible, setPanelPhoneVisible]);

    useImperativeHandle(ref, () => ({
      showErrors: errorMessages => {
        if (errorMessages.email) {
          setEmailErrorMessage(errorMessages.email);
          setIsFormCorrect(prev => ({ ...prev, correctEmail: false }));
          setIsButtonEnabled(false);
        }
      },
    }));

    const checkLength = (text: string): boolean => text.length <= 30 && text.length >= 2;

    const validateField = useCallback(
      (field: keyof SignUpForm, value: string | boolean): boolean => {
        switch (field) {
          case 'firstName':
            return checkLength(value as string);
          case 'email':
            return !emailErrorMessage && emailRegex.test(value as string);
          case 'phone':
            return value as boolean;
          case 'isFamiliarWithTermsAndConditions':
          case 'isAllowedProcessPersonalData':
            return value as boolean;
          default:
            return false;
        }
      },
      [emailErrorMessage],
    );

    const getCorrectFieldKey = (field: keyof SignUpForm): keyof SignUpFormValidation => {
      const firstLetterToUppercase = field.charAt(0).toUpperCase() + field.slice(1);
      return `correct${firstLetterToUppercase}` as keyof SignUpFormValidation;
    };

    const handleInputChange = (field: keyof SignUpForm, value: string | boolean) => {
      if (field === 'email') {
        setEmailErrorMessage(null);
      }
      setUserDataForm(prev => ({ ...prev, [field]: value }));
      if (wasValidated) {
        setIsFormCorrect(prev => ({
          ...prev,
          [getCorrectFieldKey(field)]: validateField(field, value),
        }));
      }
    };

    const validateForm = useCallback((): boolean => {
      const updatedFormCorrectness = Object.keys(userDataForm).reduce<SignUpFormValidation>((acc, key) => {
        const field = key as keyof SignUpForm;
        const correctKey = getCorrectFieldKey(field);
        acc[correctKey] = validateField(field, userDataForm[field]);
        return acc;
      }, getInitialCorrectForm());

      setIsFormCorrect(updatedFormCorrectness);
      return Object.values(updatedFormCorrectness).every(Boolean);
    }, [userDataForm, validateField]);

    useEffect(() => {
      const isAllFieldsFilled = Object.values(userDataForm).every(
        value => value !== '' && value !== null && value !== false,
      );
      const isValid = wasValidated ? validateForm() : isAllFieldsFilled;
      setIsButtonEnabled(isValid && !emailErrorMessage);
    }, [userDataForm, validateForm, wasValidated, emailErrorMessage]);

    //TODO add code for checking if user was werificated by phone or by email
    const handleSubmit = () => {
      setWasValidated(true);
      if (!validateForm()) {
        setIsButtonEnabled(false);
        return;
      }
      onSubmit(userDataForm);
    };

    const computedStyles = StyleSheet.create({
      signInLabel: {
        color: colors.textLinkColor,
      },
      checkBoxText: {
        color: colors.textSecondaryColor,
      },
    });

    const content = (
      <>
        <ScrollViewWithCustomScroll contentContainerStyle={[styles.formSignUpContainer]}>
          <HeaderWithTwoTitles firstTitle={t('SignUp_firstPartHeader')} secondTitle={t('SignUp_secondPartHeader')} />

          <View style={styles.inputContainer}>
            <TextInput
              error={{
                isError: !isFormCorrect.correctFirstName && wasValidated,
                message: t('SignUp_incorrectName'),
              }}
              placeholder={t('SignUp_nameInputPlaceholder')}
              value={userDataForm.firstName}
              onChangeText={(value: string) => handleInputChange('firstName', value)}
            />
            <TextInput
              error={{
                isError: !isFormCorrect.correctEmail && wasValidated,
                message: emailErrorMessage ?? t('SignUp_incorrectEmail'),
              }}
              placeholder={t('SignUp_emailInputPlaceholder')}
              value={userDataForm.email}
              onChangeText={(value: string) => handleInputChange('email', value)}
            />
            <PhoneInput
              error={{
                isError: !isFormCorrect.correctPhone && wasValidated,
              }}
              flagState={flagState}
              onFlagPress={() => setIsPanelPhoneSelectVisible(true)}
              getPhoneNumber={(value: string) => handleInputChange('phone', value)}
            />
          </View>

          <CheckBox
            error={{
              isError: !isFormCorrect.correctIsFamiliarWithTermsAndConditions && wasValidated,
            }}
            text={t('SignUp_agreeCheckBox')}
            onChange={value => handleInputChange('isFamiliarWithTermsAndConditions', value)}
          >
            <Pressable onPress={navigateToTerms} hitSlop={20}>
              <Text style={[styles.checkBoxText, computedStyles.checkBoxText]}>
                {t('SignUp_termsAndConditionsCheckBox')}
              </Text>
            </Pressable>
          </CheckBox>

          {/* <CheckBox
            error={{
              isError: !isFormCorrect.correctIsAllowedProcessPersonalData && wasValidated,
            }}
            text={t('SignUp_allowProcessCheckBox')}
            onChange={value => handleInputChange('isAllowedProcessPersonalData', value)}
          >
            <Pressable onPress={navigateToTerms} hitSlop={20}>
              <Text style={[styles.checkBoxText, computedStyles.checkBoxText]}>{t('SignUp_personalDataCheckBox')}</Text>
            </Pressable>
          </CheckBox> */}
        </ScrollViewWithCustomScroll>

        <View style={styles.buttonsContainer}>
          <Button
            containerStyle={styles.nextButton}
            shape={ButtonShapes.Circle}
            mode={isButtonEnabled && !isLoading ? CircleButtonModes.Mode1 : CircleButtonModes.Mode4}
            disabled={!isButtonEnabled}
            size={ButtonSizes.L}
            text={t('SignUp_nextButton')}
            innerSpacing={5}
            shadow={isButtonEnabled && !isLoading ? ButtonShadows.Strong : undefined}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
          <Pressable style={styles.alreadyHaveAccountContainer} onPress={navigateToSignIn} hitSlop={20}>
            <Text style={styles.alreadyHaveAccountText}>
              {t('SignUp_haveAccount')}{' '}
              <Text style={[styles.signInLabel, computedStyles.signInLabel]}>{t('SignUp_signInLabel')}</Text>
            </Text>
          </Pressable>
        </View>
      </>
    );

    return (
      <>
        {content}
        {isPanelPhoneSelectVisible && (
          <SlidingPanel
            flagState={flagState}
            onFlagSelect={setFlagState}
            isPanelOpen={isPanelPhoneSelectVisible}
            setIsPanelOpen={setIsPanelPhoneSelectVisible}
          />
        )}
      </>
    );
  },
);

const SignUpScreen = forwardRef<SignUpScreenRef, SignUpProps>((props, ref) => (
  <I18nextProvider i18n={i18nIntegration}>
    <SignUpScreenWithoutI18n {...props} ref={ref} />
  </I18nextProvider>
));

const styles = StyleSheet.create({
  formSignUpContainer: {
    gap: 24,
    paddingBottom: 24,
  },
  inputContainer: {
    gap: 16,
  },
  buttonsContainer: {
    marginTop: 12,
    gap: 12,
  },
  nextButton: {
    alignSelf: 'center',
  },
  alreadyHaveAccountContainer: {
    alignSelf: 'center',
  },
  alreadyHaveAccountText: {
    fontFamily: 'Inter Medium',
    fontSize: 14,
  },
  signInLabel: {
    fontFamily: 'Inter Medium',
    fontSize: 14,
  },
  checkBoxText: {
    fontSize: 12,
    lineHeight: 14,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
