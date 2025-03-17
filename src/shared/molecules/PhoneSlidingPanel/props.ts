import { type StyleProp, type ViewStyle } from 'react-native';

import { type CountryPhoneMaskDto } from '../../../core/countries/types';

export type SlidingPanelProps = {
  flagState: CountryPhoneMaskDto;
  onFlagSelect: (flag: CountryPhoneMaskDto) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (isPanelOpen: boolean) => void;
  withShade?: boolean;
  bottomWindowStyle?: StyleProp<ViewStyle>;
};
