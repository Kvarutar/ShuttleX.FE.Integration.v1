import { type Nullable } from '../../../../../utils/typescript';
import { isEmailValid, isPhoneValid } from '../../../../../utils/validation';

export type Profile = {
  fullName: string;
  email: string;
  phone: string;
};

export type NewData = {
  currentValue: string;
  newValue: string;
};

export type AccountSettingsErrorData = {
  newphone: string;
  newemail: string;
};

export type AccountSettingsRef = {
  showErrors: (errorMessages: Partial<Record<keyof AccountSettingsErrorData, string>>) => void;
};

export type ChangeNamePopUpProps = {
  isContractor: boolean;
};
export type ChangeNamePopUpButtonsProps = {
  setAnswer: (value: boolean) => void;
  setIsPopUpVisible: (value: boolean) => void;
};

export type ChangeDataPopUpMode = 'email' | 'phone';

export const inputsValidation: Record<ChangeDataPopUpMode, (value: string) => boolean> = {
  email: isEmailValid,
  phone: isPhoneValid,
};

export type ChangeDataPopUpProps = {
  newValueErrorMessage?: Nullable<string>;
  currentValue: string;
  isChangeDataLoading: boolean;
  handleOpenVerification?: (
    mode: ChangeDataPopUpMode,
    newValue: string,
    method: 'change' | 'verify',
  ) => Promise<boolean | void>;
  setNewValue?: (value: string) => void;
  mode: ChangeDataPopUpMode;
  onChangeDataPopupClose: () => void;
};
