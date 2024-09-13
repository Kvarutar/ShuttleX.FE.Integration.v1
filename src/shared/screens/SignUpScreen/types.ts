export type SignUpProps = {
  navigateToSignIn: () => void;
  navigateToTerms: () => void;
  navigateToSingUpCode: () => void;
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
