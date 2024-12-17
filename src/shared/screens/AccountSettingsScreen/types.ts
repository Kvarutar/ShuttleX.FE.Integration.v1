import { type ReactNode } from 'react';

import { type ChangeDataPopUpMode, type Profile } from '../../molecules/changePopUps/types';

export type AccountSettingsProps = {
  //TODO uncoment when we need changeName popup
  profile: Profile;
  handleOpenVerification: (mode: ChangeDataPopUpMode, newValue: string, method: 'change' | 'verify') => void;
  photoBlock?: ReactNode;
  barBlock?: ReactNode;
  isChangeDataLoading: boolean;
  verifiedStatus: VerifyStatusType;
  onSignOut: () => void;
  // onNameChanged?: () => void;
  // isContractor?: boolean;
};

export type VerifyStatusType = {
  phoneInfo: string;
  isPhoneVerified: boolean;
  emailInfo: string;
  isEmailVerified: boolean;
};

export type SignOutPopupProps = {
  setIsSignOutPopupVisible: (state: boolean) => void;
  onSignOut: () => void;
};

export type VerifyDataPopUpType = {
  mode: 'email' | 'phone';
  handleOpenVerification: (mode: 'email' | 'phone', value: string, method: 'change' | 'verify') => void;
  data: string;
  onVerifyPopupClose: () => void;
};
