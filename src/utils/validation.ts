import { emailRegex } from '../core/consts/regex.consts';
import { type Profile } from '../shared/screens/AccountSettingsScreen/types';

const isNameValid = (name: string) => name.length >= 2 && name.length <= 30;
const isEmailValid = (email: string) => emailRegex.test(email);
const isPhoneValid = (phone: string) => phone.length >= 10;

const isAllFieldsFilled = (state: Profile) =>
  state.fullName.length > 0 && state.email.length > 0 && state.phone.length >= 10;

export { isAllFieldsFilled, isEmailValid, isNameValid, isPhoneValid };
