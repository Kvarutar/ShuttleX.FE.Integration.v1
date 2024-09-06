import { type StyleProp, type ViewStyle } from 'react-native';
import { type LatLng } from 'react-native-maps';

export type MapCameraMode = 'free' | 'follow' | 'followWithCompass';

type MapPolyline =
  | { type: 'straight'; options: { coordinates: LatLng[]; color?: string } }
  | { type: 'dotted'; options: { coordinates: LatLng[]; color?: string } }
  | { type: 'arc'; options: { startPont: LatLng; endPoint: LatLng } };

export type MapViewProps = {
  style?: StyleProp<ViewStyle>;
  geolocationCoordinates?: LatLng;
  geolocationCalculatedHeading?: number;
  polylines?: MapPolyline[];
  stopPoints?: LatLng[];
  finalStopPoint?: LatLng;
  cameraMode?: MapCameraMode;
  setCameraModeOnDrag?: (cameraMode: MapCameraMode) => void;
  onDragComplete?: (coordinates: LatLng) => void;
};

export type MapCameraModeButtonProps = {
  mode: MapCameraMode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
