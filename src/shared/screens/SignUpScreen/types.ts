export type SignUpProps = {
  navigateToSignIn: () => void;
  navigateToTerms: () => void;
  onSubmit: (dataForm: SignUpForm) => void;
  isLoading: boolean;
};

export type SignUpScreenRef = {
  showErrors: (errorMessages: Partial<Record<keyof SignUpForm, string>>) => void;
};

export type SignUpForm = {
  firstName: string;
  email: string;
  phone: string;
  isFamiliarWithTermsAndConditions: boolean;
  isAllowedProcessPersonalData: boolean;
};

export type SignUpFormValidation = {
  correctFirstName: boolean;
  correctEmail: boolean;
  correctPhone: boolean;
  correctIsFamiliarWithTermsAndConditions: boolean;
  correctIsAllowedProcessPersonalData: boolean;
};
