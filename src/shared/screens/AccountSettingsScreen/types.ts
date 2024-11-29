import { type ReactNode } from 'react';

import { type ChangeDataPopUpMode, type Profile } from '../../molecules/changePopUps/types';

export type AccountSettingsProps = {
  //TODO uncoment when we need changeName popup
  // onProfileDataSave: (profileData: Profile) => void;
  profile: Profile;
  handleOpenVerification: (mode: ChangeDataPopUpMode, newValue: string) => void;
  isVerificationDone: boolean;
  photoBlock?: ReactNode;
  barBlock?: ReactNode;
  onSignOut: () => void;
  // onNameChanged?: () => void;
  // isContractor?: boolean;
};

export type SignOutPopupProps = {
  setIsSignOutPopupVisible: (state: boolean) => void;
  onSignOut: () => void;
};
