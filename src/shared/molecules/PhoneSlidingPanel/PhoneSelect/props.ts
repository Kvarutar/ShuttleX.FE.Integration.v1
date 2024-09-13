import { type StyleProp, type ViewStyle } from 'react-native';

import { type countryDtosProps } from '../../../../core/countries/props';

export type ListItemProps = {
  style?: StyleProp<ViewStyle>;
  withCheck?: boolean;
  onPress?: () => void;
  icc?: number;
  countryName?: string;
  iconSvg?: JSX.Element;
};

export type PhoneSelectProps = {
  flagState: countryDtosProps;
  onFlagSelect: (flag: countryDtosProps) => void;
  hidePanel: () => void;
};
