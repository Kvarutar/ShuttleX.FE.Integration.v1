import { type StyleProp, type ViewStyle } from 'react-native';
import { type LatLng } from 'react-native-maps';

export enum MapInterestingPlaceMarkerModes {
  Mode1 = 'mode1',
  Mode2 = 'mode2',
  Mode3 = 'mode3',
  Mode4 = 'mode4',
}

export type MapInterestingPlaceMarkerImage = {
  uri: string;
};

export type MapInterestingPlace = {
  id: string;
  name: string;
  coordinate: LatLng;
  imageFirst: MapInterestingPlaceMarkerImage;
  imageSecond: MapInterestingPlaceMarkerImage;
  backgroundGradientColor: string;
  mode?: MapInterestingPlaceMarkerModes;
};

export type MapInterestingPlaceMarkerProps = MapInterestingPlace & {
  placesStyles: {
    contentAndGradientContainerStyle: StyleProp<ViewStyle>;
    placesContainerStyle: StyleProp<ViewStyle>;
    gradientWidthAndHeight: number;
  };
};
