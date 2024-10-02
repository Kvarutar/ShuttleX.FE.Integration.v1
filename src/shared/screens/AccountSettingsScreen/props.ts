export type Profile = {
  fullName: string;
  email: string;
  phone: string;
};

export type AccountSettingsProps = {
  onProfileDataSave: (profileData: Profile) => void;
  userImageUri?: string;
  profile: Profile;
};

export type ChangeNamePopUpProps = {
  setIsAnswerYes: (value: boolean) => void;
  setIsPopUp: (value: boolean) => void;
};
