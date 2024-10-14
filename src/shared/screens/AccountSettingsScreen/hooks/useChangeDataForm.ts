import { useState } from 'react';

import { type ChangeDataPopUpMode, inputsValidation } from '../props';

export type newData = {
  currentValue: '';
  newValue: '';
};

export const useChangeDataForm = (mode: ChangeDataPopUpMode, profileCurrentValue: string) => {
  const [data, setData] = useState<newData>({
    currentValue: '',
    newValue: '',
  });

  const [wasValidated, setWasValidated] = useState<boolean>(false);

  const isEqual = data.currentValue.toLowerCase() === profileCurrentValue;

  const isValid = isEqual && inputsValidation[mode] && inputsValidation[mode](data.newValue);

  const isFilled = data.currentValue.length > 2 && data.newValue.length > 2;

  const isError = (fieldName: keyof newData) => {
    if (fieldName === 'currentValue') {
      return !isEqual && wasValidated;
    } else if (fieldName === 'newValue') {
      return !inputsValidation[mode](data.newValue) && wasValidated;
    }
    return false;
  };

  const onValueChange = (field: keyof typeof data, value: string) => {
    setData(prevState => ({
      ...prevState,
      [field]: value,
    }));
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
