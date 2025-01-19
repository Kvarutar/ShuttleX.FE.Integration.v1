import { type ReactNode } from 'react';

import { type Nullable } from '../../../utils/typescript';
import { type ChangeDataPopUpMode, type Profile } from './popups/changePopUps/types';

export type AccountSettingsVerificationMethod = 'change' | 'verify' | 'delete';

//TODO: add Weekly subscription when we have it
export type SubscriptionType = 'Daily' | 'Debt' | 'Monthly';

export type AccountSettingsProps = {
  //TODO uncoment when we need changeName popup
  profile: Profile;
  handleOpenVerification: (
    mode: ChangeDataPopUpMode,
    newValue: string,
    method: AccountSettingsVerificationMethod,
  ) => Promise<boolean | void>;
  isChangeDataLoading: boolean;
  verifiedStatus: VerifyStatusType;
  setIsSignOutPopupVisible: (newState: boolean) => void;
  setIsDeleteAccountPopupVisible: (newState: boolean) => void;
  setIsSubscriptionHelpPopupVisible?: (newState: boolean) => void;
  subscriptionStatus?: Nullable<SubscriptionType>;
  photoBlock?: ReactNode;
  barBlock?: ReactNode;
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

export type SubscriptionHelpPopupProps = {
  setIsVisible: (state: boolean) => void;
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
