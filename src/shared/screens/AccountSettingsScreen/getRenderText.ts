import { type ChangeDataPopUpMode } from './props';

export const getRenderText = (t: any, mode: ChangeDataPopUpMode) => {
  return {
    email: {
      header: t('AccountChangeEmailPopUp_email'),
      descriptCurr: t('AccountChangeEmailPopUp_currEmail'),
      descriptNew: t('AccountChangeEmailPopUp_newEmail'),
      error1: t('AccountSettings_isEqualEmailError'),
      error2: t('AccountSettings_emailError'),
      placeholder: t('AccountChangeEmailPopUp_email'),
    },
    phone: {
      header: t('AccountChangePhonePopUp_phone'),
      descriptCurr: t('AccountChangePhonePopUp_currPhone'),
      descriptNew: t('AccountChangePhonePopUp_newPhone'),
      error1: t('AccountSettings_isEqualPhoneError'),
      error2: t('AccountSettings_phoneError'),
      placeholder: t('AccountChangePhonePopUp_phone'),
    },
  }[mode];
};
