import { type StyleProp, type ViewStyle } from 'react-native';

export type ListItemProps = {
  style?: StyleProp<ViewStyle>;
  withArrow?: boolean;
  onFlagContainerPress?: () => void;
  icc?: number;
  countryName?: string;
  iconSvg?: JSX.Element;
};
