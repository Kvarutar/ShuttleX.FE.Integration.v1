import { useState } from 'react';

import { formatPhone } from '../../../../../../utils';
import { type ChangeDataPopUpMode, inputsValidation, type NewData } from '../types';

export const useChangeDataForm = (
  mode: ChangeDataPopUpMode,
  profileCurrentValue: string,
  setNewValueError: (value: boolean) => void,
) => {
  const [data, setData] = useState<NewData>({
    currentValue: '',
    newValue: '',
  });

  const [wasValidated, setWasValidated] = useState<boolean>(false);

  const isEqual =
    mode === 'phone'
      ? formatPhone(data.currentValue) === profileCurrentValue
      : data.currentValue.toLowerCase() === profileCurrentValue;

  const isValid = isEqual && inputsValidation[mode] && inputsValidation[mode](data.newValue);

  const isFilled = data.currentValue.length > 2 && data.newValue.length > 2;

  const isError = (fieldName: keyof NewData) => {
    if (fieldName === 'currentValue') {
      return !isEqual && wasValidated;
    } else if (fieldName === 'newValue') {
      return wasValidated && !inputsValidation[mode](data.newValue);
    }
    return false;
  };

  const onValueChange = (field: keyof typeof data, value: string) => {
    setData(prevState => ({
      ...prevState,
      [field]: value,
    }));
    setNewValueError(false);
  };

  return {
    data,
    wasValidated,
    isEqual,
    isValid,
    isFilled,
    isError,
    onValueChange,
    setWasValidated,
  };
};
