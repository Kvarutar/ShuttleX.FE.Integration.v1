import { type StyleProp, type ViewStyle } from 'react-native';
import { type LatLng } from 'react-native-maps';

import { type MapPinIcon2Props } from '../../shared/icons/MapPinIcon2';

export type MapCameraMode = 'free' | 'follow' | 'followWithCompass';

type MapPolyline =
  | { type: 'straight'; options: { coordinates: LatLng[]; color?: string } }
  | { type: 'dotted'; options: { coordinates: LatLng[]; color?: string } }
  | { type: 'arc'; options: { startPont: LatLng; endPoint: LatLng } };

type MapCars = {
  data: {
    id: string;
    coordinates: LatLng;
    heading: number;
  }[];
  /**
   * Must be same as update rate of BE
   */
  animationDuration: number;
};

export type MapViewProps = {
  style?: StyleProp<ViewStyle>;
  geolocationCoordinates?: LatLng;
  geolocationCalculatedHeading?: number;
  cars?: MapCars;
  polylines?: MapPolyline[];
  stopPoints?: LatLng[];
  finalStopPoint?: { coordinates: LatLng } & Omit<MapPinIcon2Props, 'style'>;
  cameraMode?: MapCameraMode;
  setCameraModeOnDrag?: (cameraMode: MapCameraMode) => void;
  onDragComplete?: (coordinates: LatLng) => void;
};

export type MapCameraModeButtonProps = {
  mode: MapCameraMode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export type MapCarProps = {
  coordinates: LatLng;
  heading: number;
  animationDuration: number;
};
