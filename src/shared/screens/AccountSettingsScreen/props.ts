export type Profile = {
  fullName: string;
  email: string;
  phone: string;
  imageUri: string;
};

export type AccountSettingsProps = {
  onProfileDataSave: (profileData: Profile) => void;
  profile: Profile;
};

export type ChangeNamePopUpProps = {
  setIsAnswerYes: (value: boolean) => void;
  setIsPopUp: (value: boolean) => void;
};
