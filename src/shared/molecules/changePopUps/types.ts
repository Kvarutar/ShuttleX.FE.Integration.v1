import { isEmailValid, isPhoneValid } from '../../../utils/validation';

export type Profile = {
  fullName: string;
  email: string;
  phone: string;
};

export type NewData = {
  currentValue: string;
  newValue: string;
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
  currentValue: string;
  handleOpenVerification: (mode: ChangeDataPopUpMode, newValue: string) => void;
  setNewValue?: (value: string) => void;
  mode: ChangeDataPopUpMode;
  onChangeDataPopupClose: () => void;
};
