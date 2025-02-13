import { type StyleProp, type ViewStyle } from 'react-native';
import MapView, { type Camera, type LatLng, type MapViewProps as NativeMapViewProps } from 'react-native-maps';

import { type MapPinIconProps } from '../../shared/icons/MapPinIcon';
import { type MapPinIcon2Props } from '../../shared/icons/MapPinIcon2';

export type MapCameraMode = 'free' | 'follow' | 'followWithCompass';

export type MapPolyline =
  | { type: 'straight'; options: { coordinates: LatLng[]; color?: string } }
  | { type: 'dotted'; options: { coordinates: LatLng[]; color?: string } } // TODO: delete or refactor, works bad
  | { type: 'dashed'; options: { coordinates: LatLng[]; color?: string } }
  | { type: 'arc'; options: { startPoint: LatLng; endPoint: LatLng } };

export type MarkerTypeSimple = {
  type: 'simple';
  colorMode: MapPinIconProps['colorMode'];
  coordinates: LatLng;
  zIndex?: number;
};

export type MarkerTypeWithLabel = {
  type: 'withLabel';
  coordinates: LatLng;
  zIndex?: number;
} & Omit<MapPinIcon2Props, 'style'>;

export type MapMarker = MarkerTypeSimple | MarkerTypeWithLabel;

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

export type MapViewRef = {
  animateCamera: (camera: Partial<Omit<Camera, 'altitude'>>, opts: { duration: number }) => void;
  setCamera: (camera: Partial<Omit<Camera, 'altitude'>>) => void;
  getCamera: () => Promise<Camera> | undefined;
  animateToRegion: MapView['animateToRegion'];
  setCameraBetweenTwoPoints: (
    firstPoint: LatLng,
    secondPoint: LatLng,
    ratio?: number,
    animationDurationInMs?: number,
  ) => void;
};

export type MapViewProps = {
  onLayout?: NativeMapViewProps['onLayout'];
  style?: StyleProp<ViewStyle>;
  geolocationCoordinates?: LatLng;
  geolocationCalculatedHeading?: number;
  disableSetCameraOnGeolocationAvailable?: boolean;
  cars?: MapCars;
  withCarsThinkingAnimation?: boolean;
  polylines?: MapPolyline[];
  stopPoints?: LatLng[];
  markers?: MapMarker[];
  cameraMode?: MapCameraMode;
  setCameraModeOnDrag?: (cameraMode: MapCameraMode) => void;
  onDragComplete?: (coordinates: LatLng) => void;
  onFirstCameraAnimationComplete?: () => void;
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
  withThinkingAnimation?: boolean;
};
