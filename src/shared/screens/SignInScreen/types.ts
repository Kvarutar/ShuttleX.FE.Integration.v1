export enum SignInMethod {
  Phone = 'phone',
  Email = 'email',
}

export type SignInScreenProps = {
  navigateToSignUp: () => void;
  onSubmit: (body: string) => void;
  signMethod?: SignInMethod;
  setSignMethod?: (newMethod: SignInMethod) => void;
};
