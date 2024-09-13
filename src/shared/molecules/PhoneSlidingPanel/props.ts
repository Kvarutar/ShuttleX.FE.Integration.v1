import { type countryDtosProps } from '../../../core/countries/props';

export type SlidingPanelProps = {
  flagState: countryDtosProps;
  onFlagSelect: (flag: countryDtosProps) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (isPanelOpen: boolean) => void;
};
