import React from 'react';

import ApplePayIcon from '../../shared/BrandBook/Icons/ApplePayIcon';
import CashIcon from '../../shared/BrandBook/Icons/CashIcon';
import MaestroIcon from '../../shared/BrandBook/Icons/MaestroIcon';
import MasterCardIcon from '../../shared/BrandBook/Icons/MasterCardIcon';
import PayPalIcon from '../../shared/BrandBook/Icons/PayPalIcon';
import UnknownCardIcon from '../../shared/BrandBook/Icons/UnknownCardIcon';
import VisaIcon from '../../shared/BrandBook/Icons/VisaIcon';
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
