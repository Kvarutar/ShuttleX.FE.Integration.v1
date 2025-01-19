import { useCallback, useEffect, useState } from 'react';

import { countryDtos } from '../../../../../../core/countries/countryDtos';
import { type CountryPhoneMaskDto } from '../../../../../../core/countries/types';
import { type Profile } from '../types';

export const useProfileForm = (initialProfile: Profile) => {
  const [profileDataForm, setProfileDataForm] = useState<Profile>(initialProfile);
  const [flag, setFlag] = useState<CountryPhoneMaskDto>(countryDtos[0] ?? ({} as CountryPhoneMaskDto));

  //TODO uncoment when we need change name popup
  // const handleInputChange = useCallback((field: keyof Profile, value: string | boolean) => {
  //   setProfileDataForm(prev => ({ ...prev, [field]: value }));
  // }, []);

  const hasProfileChanged = useCallback(() => {
    return (
      profileDataForm.fullName !== initialProfile.fullName

      // || TODO get to know if we need button visibility for all changes or just for name
      // profileDataForm.email.toLowerCase() !== initialProfile.email.toLowerCase() ||
      // profileDataForm.phone !== initialProfile.phone
    );
  }, [profileDataForm, initialProfile]);

  useEffect(() => {
    const findCountryByPhone = (phone: string) => {
      const numericPhone = phone.replace(/[^\d+]/g, '');
      return countryDtos.find(dto => numericPhone.startsWith(dto.icc.toString()));
    };

    const country = findCountryByPhone(profileDataForm.phone);
    if (country) {
      setFlag(country);
    }
  }, [profileDataForm.phone]);

  return {
    // handleInputChange,
    setProfileDataForm,
    hasProfileChanged: hasProfileChanged(),
    flag,
  };
};
