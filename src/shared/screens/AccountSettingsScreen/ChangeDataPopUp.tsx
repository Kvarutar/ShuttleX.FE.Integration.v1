import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { countryDtos } from '../../../core/countries/countryDtos';
import { type CountryPhoneMaskDto } from '../../../core/countries/types';
import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import Button from '../../atoms/Button/v2';
import { SquareButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import TextInput from '../../atoms/TextInput/v2';
import { TextInputInputMode } from '../../atoms/TextInput/v2/props';
import PhoneInput from '../../molecules/PhoneInput';
import PhoneSlidingPanel from '../../molecules/PhoneSlidingPanel';
import { getRenderText } from './getRenderText';
import { type newData } from './hooks/useChangeDataForm';
import { useChangeDataForm } from './hooks/useChangeDataForm';
import { type ChangeDataPopUpProps, inputsValidation } from './props';

const ChangeDataPopUpWithoutI18n = ({
  currentValue,
  setIsVerificationScreen,
  setNewValue,
  mode,
}: ChangeDataPopUpProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [flagState, setFlagState] = useState<CountryPhoneMaskDto>(countryDtos[0] ?? ({} as CountryPhoneMaskDto));
  const [newflagState, setNewFlagState] = useState<CountryPhoneMaskDto>(countryDtos[0] ?? ({} as CountryPhoneMaskDto));
  const [isPhoneSelectPanelVisible, setIsPhoneSelectPanelVisible] = useState<boolean>(false);
  const [isNewPhoneSelectPanelVisible, setIsNewPhoneSelectPanelVisible] = useState<boolean>(false);

  const { data, wasValidated, isEqual, isValid, isFilled, onValueChange, setWasValidated } = useChangeDataForm(
    mode,
    currentValue,
  );
  const renderText = getRenderText(t, mode);

  const onSave = () => {
    setWasValidated(true);
    if (isValid) {
      setIsVerificationScreen(true);
      setNewValue(data.newValue);
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
  });

  const renderInput = (fieldName: keyof newData, placeholder: string, errorMessage: string) => {
    if (mode === 'phone') {
      return (
        <PhoneInput
          getPhoneNumber={(value: string) => onValueChange(fieldName, value)}
          onFlagPress={() =>
            fieldName === 'currentValue' ? setIsPhoneSelectPanelVisible(true) : setIsNewPhoneSelectPanelVisible(true)
          }
          flagState={fieldName === 'currentValue' ? flagState : newflagState}
          error={{
            isError:
              (fieldName === 'currentValue' ? !isEqual : !inputsValidation[mode](data[fieldName])) && wasValidated,
            message: errorMessage,
          }}
        />
      );
    } else {
      return (
        <TextInput
          maxLength={50}
          inputMode={TextInputInputMode[mode as keyof typeof TextInputInputMode] ?? TextInputInputMode.Text}
          value={data[fieldName]}
          placeholder={placeholder}
          withClearButton
          onChangeText={(value: string) => onValueChange(fieldName, value)}
          error={{
            isError:
              (fieldName === 'currentValue' ? !isEqual : !inputsValidation[mode](data[fieldName])) && wasValidated,
            message: errorMessage,
          }}
        />
      );
    }
  };

  return (
    <>
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
                  {index === 0 ? renderText?.descriptCurr : renderText?.descriptNew}
                </Text>
                {renderInput(
                  field as keyof newData,
                  renderText?.placeholder,

                  index === 0 ? renderText?.error1 : renderText?.error2,
                )}
              </View>
            ))}
          </View>

          <Button
            text={t('AccountChangeEmailPopUp_button')}
            onPress={onSave}
            disabled={!isFilled}
            mode={!isFilled ? SquareButtonModes.Mode5 : SquareButtonModes.Mode1}
          />
        </View>
      </View>
      {isPhoneSelectPanelVisible && (
        <PhoneSlidingPanel
          flagState={flagState}
          onFlagSelect={setFlagState}
          isPanelOpen={isPhoneSelectPanelVisible}
          setIsPanelOpen={setIsPhoneSelectPanelVisible}
          withShade={false}
        />
      )}
      {isNewPhoneSelectPanelVisible && (
        <PhoneSlidingPanel
          flagState={newflagState}
          onFlagSelect={setNewFlagState}
          isPanelOpen={isNewPhoneSelectPanelVisible}
          setIsPanelOpen={setIsNewPhoneSelectPanelVisible}
          withShade={false}
        />
      )}
    </>
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
