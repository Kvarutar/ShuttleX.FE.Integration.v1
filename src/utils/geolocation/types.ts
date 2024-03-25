import Geolocation from 'react-native-geolocation-service';
import { type LocationAccuracy } from 'react-native-permissions';

export type useGeolocationStartWatchArgs = {
  onLocationEnabledChange: (IsLocationEnabled: boolean) => void;
  onPermissionGrantedChange: (IsPermissionGranted: boolean) => void;
  onAccuracyChange: (accuracy: LocationAccuracy) => void;
  onCoordinatesChange: (coordinates: Geolocation.GeoCoordinates) => void;
  onError: (error: Geolocation.GeoError) => void;
};
