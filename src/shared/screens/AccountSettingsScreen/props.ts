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
  setIsVerificationVisible: (value: boolean) => void;
  isVerificationDone: boolean;
  photoBlock?: ReactNode;
};

export type ChangeNamePopUpProps = {
  setAnswer: (value: boolean) => void;
  setIsPopUpVisible: (value: boolean) => void;
};

export type ChangeDataPopUpMode = 'email' | 'phone';

export const inputsValidation = {
  email: isEmailValid,
  phone: isPhoneValid,
};

export type ChangeDataPopUpProps = {
  currentValue: string;
  setIsVerificationScreen: (value: boolean) => void;
  setNewValue: (value: string) => void;
  mode: ChangeDataPopUpMode;
};
