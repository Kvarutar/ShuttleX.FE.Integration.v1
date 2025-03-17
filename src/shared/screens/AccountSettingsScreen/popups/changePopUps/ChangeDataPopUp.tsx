import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { PhoneSlidingPanel } from 'shuttlex-integration';

import { countryDtos } from '../../../../../core/countries/countryDtos';
import { type CountryPhoneMaskDto } from '../../../../../core/countries/types';
import i18nIntegration from '../../../../../core/locales/i18n';
import sizes from '../../../../../core/themes/sizes';
import { useTheme } from '../../../../../core/themes/themeContext';
import Button from '../../../../atoms/Button/v2';
import { SquareButtonModes } from '../../../../atoms/Button/v2/props';
import Text from '../../../../atoms/Text';
import TextInput from '../../../../atoms/TextInput/v2';
import { TextInputInputMode } from '../../../../atoms/TextInput/v2/props';
import CustomKeyboardAvoidingView from '../../../../molecules/KeyboardAvoidingView';
import PhoneInput from '../../../../molecules/PhoneInput';
import { getRenderText } from './getRenderText';
import { useChangeDataForm } from './hooks/useChangeDataForm';
import { type ChangeDataPopUpProps, type NewData } from './types';

const ChangeDataPopUpWithoutI18n = ({
  currentValue,
  handleOpenVerification,
  setNewValue,
  mode,
  isChangeDataLoading,
  onChangeDataPopupClose,
  newValueErrorMessage,
}: ChangeDataPopUpProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [flagStates, setFlagStates] = useState<{ [key: string]: CountryPhoneMaskDto }>({
    currentValue: countryDtos[0] ?? ({} as CountryPhoneMaskDto),
    newValue: countryDtos[0] ?? ({} as CountryPhoneMaskDto),
  });
  const [phonePanelVisibility, setPhonePanelVisibility] = useState<{ currentValue: boolean; newValue: boolean }>({
    currentValue: false,
    newValue: false,
  });

  const [newValueError, setNewValueError] = useState<boolean>(false);
  const { data, isValid, isFilled, isError, onValueChange, setWasValidated } = useChangeDataForm(
    mode,
    currentValue,
    setNewValueError,
  );
  const renderText = getRenderText(t, mode);

  const onSave = async () => {
    setWasValidated(true);
    if (isValid) {
      const success = (await handleOpenVerification?.(mode, data.newValue, 'change')) ?? false;
      setNewValueError(!success);

      if (success) {
        onChangeDataPopupClose();
        setNewValue?.(data.newValue);
      }
    }
  };

  const computedStyles = StyleSheet.create({
    changeText: {
      color: colors.textTitleColor,
    },
    explainText: {
      color: colors.textQuadraticColor,
    },
    inputHeader: {
      color: colors.textSecondaryColor,
    },
    phoneSlidingBottomWindow: {
      marginHorizontal: -sizes.paddingHorizontal,
    },
  });

  const renderInput = (fieldName: keyof NewData, placeholder: string, errorMessage: string) => {
    if (mode === 'phone') {
      return (
        <PhoneInput
          getPhoneNumber={(value: string) => onValueChange(fieldName, value)}
          onFlagPress={() => setPhonePanelVisibility(prev => ({ ...prev, [fieldName]: true }))}
          flagState={flagStates[fieldName] ?? ({} as CountryPhoneMaskDto)}
          error={{
            isError: isError(fieldName) || (fieldName === 'newValue' && newValueError),
            message: errorMessage,
          }}
        />
      );
    } else {
      return (
        <TextInput
          maxLength={50}
          inputMode={TextInputInputMode[mode as keyof typeof TextInputInputMode] ?? TextInputInputMode.Text}
          value={data[fieldName].trim()}
          placeholder={placeholder}
          withClearButton
          onChangeText={(value: string) => onValueChange(fieldName, value)}
          error={{
            isError: isError(fieldName) || (fieldName === 'newValue' && newValueError),
            message: errorMessage,
          }}
        />
      );
    }
  };

  return (
    <CustomKeyboardAvoidingView mode={'inverted'}>
      <View style={styles.wrapper}>
        <View style={styles.textsStyle}>
          <Text style={[styles.changeText, computedStyles.changeText]}>{t('AccountChangePopUp_change')}</Text>
          <View>
            <Text style={styles.inputsText}>{t('AccountChangeEmailPopUp_edit')}</Text>
            <Text style={[styles.inputsText, computedStyles.explainText]}>{renderText?.header}</Text>
          </View>
        </View>
        <View style={styles.inputsWithButton}>
          <View style={styles.inputsWrapper}>
            {['currentValue', 'newValue'].map((field, index) => (
              <View key={field} style={styles.inputWrapper}>
                <Text style={[computedStyles.inputHeader, styles.inputHeader]}>
                  {index === 0 ? renderText?.descriptionCurr : renderText?.descriptionNew}
                </Text>
                {renderInput(
                  field as keyof NewData,
                  renderText?.placeholder,
                  index === 0 ? renderText?.error1 : (newValueErrorMessage ?? renderText?.error2),
                )}
              </View>
            ))}
          </View>

          <Button
            text={t('AccountChangeEmailPopUp_button')}
            onPress={onSave}
            disabled={!isFilled}
            mode={!isFilled ? SquareButtonModes.Mode5 : SquareButtonModes.Mode1}
            isLoading={isChangeDataLoading}
          />
        </View>
      </View>
      {Object.entries(phonePanelVisibility).map(
        ([field, isVisible]) =>
          isVisible && (
            <PhoneSlidingPanel
              key={field}
              flagState={flagStates[field] ?? ({} as CountryPhoneMaskDto)}
              onFlagSelect={newFlag => setFlagStates(prev => ({ ...prev, [field]: newFlag }))}
              isPanelOpen={isVisible}
              setIsPanelOpen={value => setPhonePanelVisibility(prev => ({ ...prev, [field]: value }))}
              withShade={false}
              bottomWindowStyle={[styles.phoneSlidingBottomWindow, computedStyles.phoneSlidingBottomWindow]}
            />
          ),
      )}
    </CustomKeyboardAvoidingView>
  );
};

const ChangeDataPopUp = (props: ChangeDataPopUpProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <ChangeDataPopUpWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 50,
  },
  phoneSlidingBottomWindow: {
    marginBottom: 8,
  },
  textsStyle: {
    gap: 9,
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter Bold',
  },
  inputsWithButton: {
    gap: 21,
  },
  inputsWrapper: {
    gap: 17,
  },
  inputWrapper: {
    gap: 12,
  },
  inputHeader: {
    fontSize: 14,
    fontFamily: 'Inter Medium',
  },
  inputsText: {
    fontSize: 34,
    lineHeight: 34,
    letterSpacing: -1.53,
    fontFamily: 'Inter Bold',
  },
});

export default ChangeDataPopUp;
