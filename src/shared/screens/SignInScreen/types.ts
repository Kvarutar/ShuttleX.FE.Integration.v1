export enum SignInMethod {
  Phone = 'phone',
  Email = 'email',
}

export type SignInScreenProps = {
  navigateToSignUp: () => void;
  onSubmit: (phone: string) => void;
  isLoading: boolean;
  signMethod?: SignInMethod;
  setSignMethod?: (newMethod: SignInMethod) => void;
};
