import { useCallback, useState } from 'react';

import { isEmailValid, isNameValid, isPhoneValid } from './validation';

// One type for different results
type ValidationResult<T> = Record<keyof T, boolean>;

// Func forn init state
const getInitialCorrectForm = <T extends Record<string, any>>(form: T): ValidationResult<T> => {
  return Object.keys(form).reduce((acc, key) => {
    const field = key as keyof T;
    acc[field] = false;
    return acc;
  }, {} as ValidationResult<T>);
};

// Func for form validation
export const useSignUpValidation = <T extends Record<string, any>>(form: T) => {
  const [isFormCorrect, setIsFormCorrect] = useState<ValidationResult<T>>(getInitialCorrectForm(form));

  // Func for validation every field
  const validateField = useCallback((field: keyof T, value: string | boolean | Date): boolean => {
    switch (field) {
      case 'fullName':
        return isNameValid(value as string);
      case 'email':
        return isEmailValid(value as string);
      case 'phone':
        return isPhoneValid(value as string);
      default:
        return false;
    }
  }, []);

  // Func for validation whole form
  const validateForm = useCallback((): boolean => {
    const updatedFormCorrectness = Object.keys(form).reduce<ValidationResult<T>>((acc, key) => {
      const field = key as keyof T;
      acc[field] = validateField(field, form[field]);
      return acc;
    }, {} as ValidationResult<T>);

    setIsFormCorrect(updatedFormCorrectness);
    return Object.values(updatedFormCorrectness).every(Boolean);
  }, [form, validateField]);

  return { validateForm, isFormCorrect };
};
