import creditCardType from 'credit-card-type';
import { type CreditCardType } from 'credit-card-type/dist/types';
import React, { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../core/locales/i18n';
import sizes from '../../core/themes/sizes';
import { getPaymentIcon } from '../../utils/payment/cardIcons';
import Button from '../BrandBook/Button';
import ShortArrowIcon from '../BrandBook/Icons/ShortArrowIcon';
import UnknownCardIcon from '../BrandBook/Icons/UnknownCardIcon';
import Text from '../BrandBook/Text';
import TextInput from '../BrandBook/TextInput';
import { TextInputInputMode } from '../BrandBook/TextInput/props';
import RoundButton from '../RoundButton';
import { type AddCardProps, type Card } from './props';

const AddCardWithoutI18n = ({ onCardSave, onBackButtonPress }: AddCardProps): JSX.Element => {
  const { t } = useTranslation();

  const [cardData, setCardData] = useState<Card>({
    number: '',
    expiresAt: '',
    code: '',
    type: null,
  });
  const [cardType, setCardType] = useState<CreditCardType | null>(null);

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

    const dataToSave = {
      ...cardData,
      expiresAt: `20${date[1]}-${date[0]}-01`,
      type: cardType ? cardType.type : null,
    };

    onCardSave(dataToSave);
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <View style={[styles.header]}>
          <RoundButton onPress={onBackButtonPress}>
            <ShortArrowIcon />
          </RoundButton>
          <Text style={[styles.headerTitle]}>{t('AddPayment_headerTitle')}</Text>
          <View style={styles.headerDummy} />
        </View>
        <View>
          <TextInput
            maxLength={19}
            inputMode={TextInputInputMode.Numeric}
            value={cardData.number}
            placeholder="0000 0000 0000 0000"
            onChangeText={onNumberChange}
            style={styles.numberInput}
          />
          <View style={styles.paymentIcon}>{cardType ? getPaymentIcon(cardType.type) : <UnknownCardIcon />}</View>
        </View>
        <View style={styles.creditionals}>
          <View style={styles.creditionalsItemWrapper}>
            <TextInput
              inputMode={TextInputInputMode.Numeric}
              value={cardData.expiresAt}
              placeholder="MM/YY"
              onChangeText={onDateChange}
              maxLength={5}
            />
          </View>
          <View style={styles.creditionalsItemWrapper}>
            <TextInput
              inputMode={TextInputInputMode.Numeric}
              placeholder={cardType ? cardType.code.name : 'CVV'}
              onChangeText={onCodeChange}
              maxLength={cardType ? cardType.code.size : 3}
            />
          </View>
        </View>
      </View>
      {Boolean(cardData.number) && Boolean(cardData.code) && Boolean(cardData.expiresAt) && (
        <Button text={t('AddPayment_saveButton')} onPress={onSaveCard} />
      )}
    </View>
  );
};

const AddCard = (props: AddCardProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <AddCardWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontFamily: 'Inter Medium',
    fontSize: 18,
  },
  headerDummy: {
    width: 50,
  },
  paymentIcon: {
    position: 'absolute',
    top: 14,
    left: 20,
  },
  creditionals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
    marginTop: 30,
  },
  creditionalsItemWrapper: {
    flex: 1,
  },
  numberInput: {
    paddingLeft: sizes.paddingHorizontal + 34,
  },
});

export default AddCard;
