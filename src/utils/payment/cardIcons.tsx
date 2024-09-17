import ApplePayIcon from '../../shared/icons/ApplePayIcon';
import CashIcon from '../../shared/icons/CashIcon';
import CreditCardIcon from '../../shared/icons/CreditCardIcon';
import CryptoIcon from '../../shared/icons/CryptoIcon';
import MaestroIcon from '../../shared/icons/MaestroIcon';
import MasterCardIcon from '../../shared/icons/MasterCardIcon';
import PayPalIcon from '../../shared/icons/PayPalIcon';
import VisaIcon from '../../shared/icons/VisaIcon';
import { type PaymentMethod } from './types';

export const getPaymentIcon = (type: PaymentMethod['method']) => {
  switch (type) {
    case 'paypal':
      return <PayPalIcon />;
    case 'visa':
      return <VisaIcon />;
    case 'mastercard':
      return <MasterCardIcon />;
    case 'applepay':
      return <ApplePayIcon />;
    case 'maestro':
      return <MaestroIcon />;
    case 'cash':
      return <CashIcon />;
    case 'card':
      return <CreditCardIcon />;
    case 'crypto':
      return <CryptoIcon />;
    default:
      return <CreditCardIcon />;
  }
};
