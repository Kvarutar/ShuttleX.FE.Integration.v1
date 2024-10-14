import ApplePayIcon from '../../shared/icons/ApplePayIcon';
import CashIcon from '../../shared/icons/CashIcon';
import CreditCardIcon from '../../shared/icons/CreditCardIcon';
import CryptoIcon from '../../shared/icons/CryptoIcon';
import MaestroIcon from '../../shared/icons/MaestroIcon';
import MasterCardIcon from '../../shared/icons/MasterCardIcon';
import PayPalIcon from '../../shared/icons/PayPalIcon';
import VisaIcon from '../../shared/icons/VisaIcon';
import { type IconProps, type PaymentMethod } from './types';

const iconMap: Record<PaymentMethod['method'], React.FC<IconProps>> = {
  paypal: PayPalIcon,
  visa: VisaIcon,
  mastercard: MasterCardIcon,
  applepay: ApplePayIcon,
  maestro: MaestroIcon,
  cash: CashIcon,
  card: CreditCardIcon,
  crypto: CryptoIcon,
};

export const getPaymentIcon = (type: PaymentMethod['method'], props: IconProps = {}): React.ReactNode => {
  const IconComponent = iconMap[type];

  if (!IconComponent) {
    console.error('Icon for payment method not found');
    return <></>;
  }

  return <IconComponent {...props} />;
};
