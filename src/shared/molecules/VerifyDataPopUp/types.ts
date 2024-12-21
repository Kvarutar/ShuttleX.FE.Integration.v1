export type VerifyDataPopUpType = {
  mode: 'email' | 'phone';
  handleOpenVerification: (mode: 'email' | 'phone', value: string, method: 'change' | 'verify') => void;
  data: string;
  onVerifyPopupClose: () => void;
};
