import { type StyleProp, type ViewStyle } from 'react-native';
import { type LatLng } from 'react-native-maps';

export type MapCarMarkerProps = {
  coordinate: LatLng;
  heading: number;
  animationDuration: number;
  zIndex: number;
  thinkingAnimationZIndex: number;
  withThinkingAnimation?: boolean;
  carStyles?: {
    carImageContainerWidthAndHeight: number;
    carImageHeight: number;
  };
  loadingAnimation3DotsStyles?: {
    thinkingDotWidthAndHeight: number;
    thinkingDotContainer: StyleProp<ViewStyle>;
  };
};
