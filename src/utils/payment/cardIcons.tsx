import React from 'react';

import ApplePayIcon from '../../shared/icons/ApplePayIcon';
import CashIcon from '../../shared/icons/CashIcon';
import MaestroIcon from '../../shared/icons/MaestroIcon';
import MasterCardIcon from '../../shared/icons/MasterCardIcon';
import PayPalIcon from '../../shared/icons/PayPalIcon';
import UnknownCardIcon from '../../shared/icons/UnknownCardIcon';
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
    default:
      return <UnknownCardIcon />;
  }
};
