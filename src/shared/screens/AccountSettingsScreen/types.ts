import { type ReactNode } from 'react';

import { type ChangeDataPopUpMode, type Profile } from '../../molecules/changePopUps/types';

export type AccountSettingsVerificationMethod = 'change' | 'verify' | 'delete';

export type AccountSettingsProps = {
  //TODO uncoment when we need changeName popup
  profile: Profile;
  handleOpenVerification: (
    mode: ChangeDataPopUpMode,
    newValue: string,
    method: AccountSettingsVerificationMethod,
  ) => void;
  photoBlock?: ReactNode;
  barBlock?: ReactNode;
  isChangeDataLoading: boolean;
  verifiedStatus: VerifyStatusType;
  setIsSignOutPopupVisible: (newState: boolean) => void;
  setIsDeleteAccountPopupVisible: (newState: boolean) => void;
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

export type DeleteAccountPopupProps = {
  setIsDeleteAccountPopupVisible: (state: boolean) => void;
  onPressYes: () => void;
};

export type ConfirmDeleteAccountPopupProps = {
  setIsConfirmDeleteAccountPopupVisible: (state: boolean) => void;
  handleOpenVerification: (
    mode: ChangeDataPopUpMode,
    newValue: string,
    method: AccountSettingsVerificationMethod,
  ) => void;
  userData: {
    phone: string;
    email: string;
  };
};
