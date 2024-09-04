import creditCardType from 'credit-card-type';
import { type CreditCardType } from 'credit-card-type/dist/types';
import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import sizes from '../../../core/themes/sizes';
import { getPaymentIcon } from '../../../utils/payment/cardIcons';
import { ButtonV1 } from '../../atoms/Button/index';
import { ButtonV1Shapes } from '../../atoms/Button/V1/props';
import Text from '../../atoms/Text';
import TextInputV1 from '../../atoms/TextInput/v1';
import { TextInputV1InputMode } from '../../atoms/TextInput/v1/props';
import ShortArrowIcon from '../../icons/ShortArrowIcon';
import UnknownCardIcon from '../../icons/UnknownCardIcon';
import { type AddCardScreenProps, type Card } from './props';

const AddCardScreenWithoutI18n = ({ onCardSave, onBackButtonPress }: AddCardScreenProps): JSX.Element => {
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
          <ButtonV1 shape={ButtonV1Shapes.Circle} onPress={onBackButtonPress}>
            <ShortArrowIcon />
          </ButtonV1>
          <Text style={[styles.headerTitle]}>{t('AddPayment_headerTitle')}</Text>
          <View style={styles.headerDummy} />
        </View>
        <View>
          <TextInputV1
            maxLength={19}
            inputMode={TextInputV1InputMode.Numeric}
            value={cardData.number}
            placeholder="0000 0000 0000 0000"
            onChangeText={onNumberChange}
            style={styles.numberInput}
          />
          <View style={styles.paymentIcon}>{cardType ? getPaymentIcon(cardType.type) : <UnknownCardIcon />}</View>
        </View>
        <View style={styles.creditionals}>
          <View style={styles.creditionalsItemWrapper}>
            <TextInputV1
              inputMode={TextInputV1InputMode.Numeric}
              value={cardData.expiresAt}
              placeholder="MM/YY"
              onChangeText={onDateChange}
              maxLength={5}
            />
          </View>
          <View style={styles.creditionalsItemWrapper}>
            <TextInputV1
              inputMode={TextInputV1InputMode.Numeric}
              placeholder={cardType ? cardType.code.name : 'CVV'}
              onChangeText={onCodeChange}
              maxLength={cardType ? cardType.code.size : 3}
            />
          </View>
        </View>
      </View>
      {Boolean(cardData.number) && Boolean(cardData.code) && Boolean(cardData.expiresAt) && (
        <ButtonV1 text={t('AddPayment_saveButton')} onPress={onSaveCard} />
      )}
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

export default AddCardScreen;
