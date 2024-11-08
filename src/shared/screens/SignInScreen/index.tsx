import { type ReactNode, useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  KeyboardState,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TextInput } from 'shuttlex-integration';

import { getCountryPhoneMaskByCountryName } from '../../../core/countries/countryDtos';
import { type CountryPhoneMaskDto } from '../../../core/countries/types';
import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import Button from '../../atoms/Button/v2';
import { ButtonShadows, ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import HeaderWithTwoTitles from '../../molecules/HeaderWithTwoTitles';
import PhoneInput from '../../molecules/PhoneInput';
import PhoneSlidingPanel from '../../molecules/PhoneSlidingPanel';
import ScrollViewWithCustomScroll from '../../molecules/ScrollViewWithCustomScroll';
import { SignInMethod, type SignInScreenProps } from './types';

const animationsDurations = {
  fading: 200,
  keyboard: {
    opening: 25,
    closing: 300,
  },
};

const SignInScreenWithoutI18n = ({
  navigateToSignUp,
  onSubmit,
  signMethod = SignInMethod.Phone,
  setSignMethod,
}: SignInScreenProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const keyboard = useAnimatedKeyboard();

  const bottomButtonsMargin = useSharedValue(0);

  const bottomButtonsAnimatedStyle = useAnimatedStyle(() => ({
    marginBottom: bottomButtonsMargin.value,
  }));

  const [flagState, setFlagState] = useState<CountryPhoneMaskDto>(
    getCountryPhoneMaskByCountryName('Ukraine') ?? ({} as CountryPhoneMaskDto),
  );
  const [data, setData] = useState<string>('');
  const [isPanelPhoneSelectVisible, setIsPanelPhoneSelectVisible] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(true);
  const [wasValidated, setWasValidated] = useState(false);
  const trimmedSignData = data.trim();

  useDerivedValue(() => {
    if (!isPanelPhoneSelectVisible) {
      switch (keyboard.state.value) {
        case KeyboardState.OPENING:
          bottomButtonsMargin.value = withTiming(keyboard.height.value, {
            duration: animationsDurations.keyboard.opening,
          });
          break;
        case KeyboardState.CLOSING:
          bottomButtonsMargin.value = withTiming(0, { duration: animationsDurations.keyboard.closing });
          break;
        default:
      }
    }
  });

  useEffect(() => {
    setIsValid(!wasValidated || Boolean(data));
  }, [data, wasValidated]);

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
              message: t('SignUp_incorrectEmail'),
            }}
            placeholder={t('SignUp_emailInputPlaceholder')}
            value={data}
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
            error={{ isError: !isValid }}
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
      <Animated.View style={[styles.buttonsContainer, bottomButtonsAnimatedStyle]}>
        <Button
          containerStyle={styles.nextButton}
          shape={ButtonShapes.Circle}
          mode={trimmedSignData ? CircleButtonModes.Mode1 : CircleButtonModes.Mode4}
          disabled={!trimmedSignData}
          size={ButtonSizes.L}
          text={t('SignIn_nextButton')}
          innerSpacing={5}
          shadow={trimmedSignData ? ButtonShadows.Strong : undefined}
          onPress={handleSubmit}
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
      </Animated.View>
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
