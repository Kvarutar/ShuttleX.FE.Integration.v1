import { type StyleProp, type ViewStyle } from 'react-native';

import { type CountryPhoneMaskDto } from '../../../../core/countries/types';

export type ListItemProps = {
  style?: StyleProp<ViewStyle>;
  withCheck?: boolean;
  onPress: () => void;
  icc: string;
  countryName: string;
  iconSvg: JSX.Element;
};

export type PhoneSelectProps = {
  flagState: CountryPhoneMaskDto;
  onFlagSelect: (flag: CountryPhoneMaskDto) => void;
  hidePanel: () => void;
};
