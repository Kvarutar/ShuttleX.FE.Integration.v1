import creditCardType from 'credit-card-type';
import { type CreditCardType } from 'credit-card-type/dist/types';
import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { getPaymentIcon } from '../../../utils/payment/cardIcons';
import Button from '../../atoms/Button/v2';
import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import TextInput from '../../atoms/TextInput/v2';
import { TextInputInputMode } from '../../atoms/TextInput/v2/props';
import CreditCardIcon from '../../icons/CreditCardIcon';
import { type AddCardScreenProps, type Card } from './props';

const AddCardScreenWithoutI18n = ({ onCardSave }: AddCardScreenProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    headerPayBillText: {
      color: colors.textQuadraticColor,
    },
  });

  const [cardData, setCardData] = useState<Card>({
    number: '',
    expiresAt: '',
    code: '',
    type: null,
  });
  const [cardType, setCardType] = useState<CreditCardType | null>(null);

  const validCardLength = cardData.number.replace(/\W/gi, '').length;
  //TODO clarify if we need validation on front side

  const onNumberChange = (text: string) => {
    const creditCardTypeVariants = creditCardType(text);
    if (creditCardTypeVariants.length === 1) {
      setCardType(creditCardTypeVariants[0] ?? null);
    } else {
      setCardType(null);
    }

    setCardData(prevState => ({
      ...prevState,
      number: text
        .replace(/\W/gi, '')
        .replace(/(.{4})/g, '$1 ')
        .trim(),
    }));
  };

  const onCodeChange = (text: string) => {
    setCardData(prevState => ({
      ...prevState,
      code: text,
    }));
  };

  const onDateChange = (text: string) => {
    if (text[0] && +text[0] > 1) {
      text = `0${text}`;
    }

    setCardData(prevState => ({
      ...prevState,
      expiresAt: text
        .replace(/\W/gi, '')
        .replace(/(.{2})/g, '$1/')
        .replace(/\/$/, ''),
    }));
  };

  const onSaveCard = () => {
    const date = cardData.expiresAt.split('/');
    //TODO call system modal window

    const dataToSave = {
      ...cardData,
      expiresAt: `20${date[1]}-${date[0]}-01`,
      type: cardType ? cardType.type : null,
    };
    onCardSave(dataToSave);
  };

  const isValid = Boolean(cardData.number) && Boolean(cardData.code) && Boolean(cardData.expiresAt);

  return (
    <View style={styles.wrapper}>
      <View style={styles.mainInfo}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.textTitleColor }]}>{t('AddPayment_headerTitle')}</Text>
          <View>
            <Text style={styles.headerPayBillText}>{t('AddCard_payBill')}</Text>
            <Text style={[styles.headerPayBillText, computedStyles.headerPayBillText]}>
              {t('AddCard_automatically')}
            </Text>
          </View>
        </View>
        <View style={styles.inputsWrapper}>
          <View>
            <TextInput
              maxLength={19}
              inputMode={TextInputInputMode.Numeric}
              value={cardData.number}
              placeholder={t('AddCard_inputCardNumber')}
              onChangeText={onNumberChange}
              containerStyle={styles.numberInput}
              error={{
                isError: validCardLength > 1 && validCardLength < 14,
                message: t('AddCard_inputErrorMessage1'),
              }}
            />
            <View style={styles.paymentIcon}>
              {cardType ? getPaymentIcon(cardType.type) : <CreditCardIcon style={styles.paymentIconStyle} />}
            </View>
          </View>
          <View style={styles.creditionals}>
            <View style={styles.creditionalsItemWrapper}>
              <TextInput
                inputMode={TextInputInputMode.Numeric}
                value={cardData.expiresAt}
                placeholder={t('AddCard_inputExpire')}
                onChangeText={onDateChange}
                maxLength={5}
                error={{
                  isError: cardData.expiresAt.length > 1 && cardData.expiresAt.length < 3,
                  message: t('AddCard_inputErrorMessage2'),
                }}
              />
            </View>
            <View style={styles.creditionalsItemWrapper}>
              <TextInput
                inputMode={TextInputInputMode.Numeric}
                placeholder={cardType ? cardType.code.name : t('AddCard_inputCVV')}
                onChangeText={onCodeChange}
                maxLength={4}
                error={{
                  isError: cardData.code.length > 1 && cardData.code.length < 3,
                  message: t('AddCard_inputErrorMessage3'),
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <Button
        text={t('AddCard_saveButton')}
        mode={isValid ? CircleButtonModes.Mode1 : CircleButtonModes.Mode4}
        shape={ButtonShapes.Circle}
        size={ButtonSizes.L}
        containerStyle={styles.saveButton}
        disabled={!isValid}
        onPress={onSaveCard}
        innerSpacing={8}
      />
    </View>
  );
};

const AddCardScreen = (props: AddCardScreenProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <AddCardScreenWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    gap: 9,
  },
  saveButton: {
    alignItems: 'center',
  },
  mainInfo: {
    gap: 19,
  },
  inputsWrapper: {
    gap: 8,
  },
  headerTitle: {
    fontFamily: 'Inter Bold',
    fontSize: 14,
  },
  paymentIconStyle: {
    width: 18,
    height: 16,
    marginTop: 4,
  },
  paymentIcon: {
    position: 'absolute',
    top: 18,
    left: 16,
  },
  creditionals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 9,
  },
  headerPayBillText: {
    fontSize: 34,
    fontFamily: 'Inter Bold',
    letterSpacing: -1.53,
    lineHeight: 34,
  },
  creditionalsItemWrapper: {
    flex: 1,
  },
  numberInput: {
    paddingLeft: 26,
  },
});

export default AddCardScreen;
