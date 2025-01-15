import { type LoadingBrandIconModes } from '../../icons/LoadingBrandIcon';

export type LoadingStubProps = {
  mode: LoadingBrandIconModes;
  onTimeout?: () => void;
};
