import { type ReactNode } from 'react';

import { isEmailValid, isPhoneValid } from '../../../utils/validation';

export type Profile = {
  fullName: string;
  email: string;
  phone: string;
};

export type AccountSettingsProps = {
  onProfileDataSave: (profileData: Profile) => void;
  profile: Profile;
  handleOpenVerification: () => void;
  isVerificationDone: boolean;
  photoBlock?: ReactNode;
  barBlock?: ReactNode;
  onNameChanged?: () => void;
  isContractor?: boolean;
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
  handleOpenVerification: () => void;
  setNewValue: (value: string) => void;
  mode: ChangeDataPopUpMode;
  onChangeDataPopupClose: () => void;
};
