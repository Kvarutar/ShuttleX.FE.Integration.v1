export enum SignInMethod {
  Phone = 'phone',
  Email = 'email',
}

export type SignInScreenProps = {
  navigateToSignUp: () => void;
  onSubmit: (phone: string) => void;
  isLoading: boolean;
  setPanelPhoneVisible: (value: boolean) => void;
  signMethod?: SignInMethod;
  setSignMethod?: (newMethod: SignInMethod) => void;
};

export type SignInScreenRef = {
  resetErrors: () => void;
  showErrors: (errorMessages: string) => void;
};
