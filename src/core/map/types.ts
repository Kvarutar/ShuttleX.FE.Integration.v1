import { type StyleProp, type ViewStyle } from 'react-native';
import { type LatLng } from 'react-native-maps';

export type MapCameraMode = 'free' | 'follow' | 'followWithCompass';

export type MapViewProps = {
  style?: StyleProp<ViewStyle>;
  geolocationCoordinates?: LatLng;
  geolocationCalculatedHeading?: number;
  polylines?: LatLng[];
  stopPoints?: LatLng[];
  cameraMode?: MapCameraMode;
  setCameraModeOnDrag?: (cameraMode: MapCameraMode) => void;
  onDragComplete?: (coordinates: LatLng) => void;
};

export type MapCameraModeButtonProps = {
  mode: MapCameraMode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
