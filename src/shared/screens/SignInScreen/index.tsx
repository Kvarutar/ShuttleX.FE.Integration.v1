import { forwardRef, type ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { getCountryPhoneMaskByCountryName } from '../../../core/countries/countryDtos';
import { type CountryPhoneMaskDto } from '../../../core/countries/types';
import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/themeContext';
import Button from '../../atoms/Button/v2';
import { ButtonShadows, ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import TextInput from '../../atoms/TextInput/v2';
import HeaderWithTwoTitles from '../../molecules/HeaderWithTwoTitles';
import PhoneInput from '../../molecules/PhoneInput';
import PhoneSlidingPanel from '../../molecules/PhoneSlidingPanel';
import ScrollViewWithCustomScroll from '../../molecules/ScrollViewWithCustomScroll';
import { SignInMethod, type SignInScreenProps, type SignInScreenRef } from './types';

const animationsDurations = {
  fading: 200,
  keyboard: {
    opening: 25,
    closing: 300,
  },
};

const SignInScreenWithoutI18n = forwardRef<SignInScreenRef, SignInScreenProps>(
  (
    { navigateToSignUp, onSubmit, signMethod = SignInMethod.Phone, setPanelPhoneVisible, setSignMethod, isLoading },
    ref,
  ): JSX.Element => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const [flagState, setFlagState] = useState<CountryPhoneMaskDto>(
      getCountryPhoneMaskByCountryName('United States') ?? ({} as CountryPhoneMaskDto),
    );
    const [data, setData] = useState<string>('');
    const [isPanelPhoneSelectVisible, setIsPanelPhoneSelectVisible] = useState<boolean>(false);
    const [isValid, setIsValid] = useState(true);
    const [wasValidated, setWasValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const trimmedSignData = data.trim();
    const [isButtonEnabled, setIsButtonEnabled] = useState(trimmedSignData && !isLoading);

    useEffect(() => {
      setIsValid(!wasValidated || Boolean(data));
    }, [data, wasValidated]);

    useEffect(() => {
      setPanelPhoneVisible(isPanelPhoneSelectVisible);
    }, [isPanelPhoneSelectVisible, setPanelPhoneVisible]);

    useEffect(() => {
      setIsButtonEnabled(trimmedSignData && !isLoading);
    }, [isLoading, trimmedSignData]);

    useEffect(() => {
      setData('');
    }, [signMethod]);

    useImperativeHandle(ref, () => ({
      resetErrors: () => {
        setErrorMessage(null);
        setIsValid(true);
      },
      showErrors: errorMessages => {
        if (errorMessages) {
          setErrorMessage(errorMessages);
          setIsValid(false);
          setIsButtonEnabled(false);
        }
      },
    }));

    const handleSubmit = () => {
      setWasValidated(true);
      if (data) {
        onSubmit(data);
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

    const signElements: Record<
      SignInMethod,
      { input: ReactNode; changeMethod: () => void; labelText: string; title: ReactNode }
    > = {
      email: {
        input: (
          <Animated.View entering={FadeIn.duration(animationsDurations.fading)} key={'email'}>
            <TextInput
              error={{
                isError: !isValid,
                message: errorMessage ?? t('SignUp_incorrectEmail'),
              }}
              placeholder={t('SignUp_emailInputPlaceholder')}
              value={data.trim()}
              onChangeText={setData}
            />
          </Animated.View>
        ),
        changeMethod: () => setSignMethod?.(SignInMethod.Phone),
        labelText: t('SignIn_signInMethodChangeToPhoneLabel'),
        title: (
          <Animated.View entering={FadeIn.duration(animationsDurations.fading)} key={'email-title'}>
            <HeaderWithTwoTitles
              firstTitle={t('SignIn_firstPartHeaderEmail')}
              secondTitle={t('SignIn_secondPartHeader')}
            />
          </Animated.View>
        ),
      },
      phone: {
        input: (
          <Animated.View entering={FadeIn.duration(animationsDurations.fading)} key={'phone'}>
            <PhoneInput
              error={{
                isError: !isValid,
                message: errorMessage ?? t('SignUp_incorrectPhone'),
              }}
              flagState={flagState}
              getPhoneNumber={setData}
              onFlagPress={() => setIsPanelPhoneSelectVisible(true)}
            />
          </Animated.View>
        ),
        changeMethod: () => setSignMethod?.(SignInMethod.Email),
        labelText: t('SignIn_signInMethodChangeToEmailLabel'),
        title: (
          <Animated.View entering={FadeIn.duration(animationsDurations.fading)} key={'phone-title'}>
            <HeaderWithTwoTitles
              firstTitle={t('SignIn_firstPartHeaderPhone')}
              secondTitle={t('SignIn_secondPartHeader')}
            />
          </Animated.View>
        ),
      },
    };

    const { input, changeMethod, labelText, title } = signElements[signMethod];

    const content = (
      <>
        <ScrollViewWithCustomScroll contentContainerStyle={[styles.formSignInContainer]}>
          {title}
          <Animated.View layout={FadeIn.duration(animationsDurations.fading)}>{input}</Animated.View>
        </ScrollViewWithCustomScroll>
        <View style={styles.buttonsContainer}>
          <Button
            containerStyle={styles.nextButton}
            shape={ButtonShapes.Circle}
            mode={isButtonEnabled ? CircleButtonModes.Mode1 : CircleButtonModes.Mode4}
            disabled={!trimmedSignData}
            size={ButtonSizes.L}
            text={t('SignIn_nextButton')}
            innerSpacing={5}
            shadow={isButtonEnabled ? ButtonShadows.Strong : undefined}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
          {setSignMethod && (
            <Pressable style={styles.dontHaveAccountContainer} onPress={changeMethod} hitSlop={10}>
              <Animated.View layout={FadeIn.duration(animationsDurations.fading)}>
                <Text style={styles.dontHaveAccountText}>
                  {t('SignIn_signInMethodChange')}{' '}
                  <Text style={[styles.signUpLabel, computedStyles.signUpLabel]}>{labelText}</Text>
                </Text>
              </Animated.View>
            </Pressable>
          )}
          <Pressable style={styles.dontHaveAccountContainer} onPress={navigateToSignUp} hitSlop={10}>
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
        {content}
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
  },
);

const SignInScreen = forwardRef<SignInScreenRef, SignInScreenProps>((props, ref) => (
  <I18nextProvider i18n={i18nIntegration}>
    <SignInScreenWithoutI18n {...props} ref={ref} />
  </I18nextProvider>
));

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
