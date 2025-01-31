import { type GeolocationError, type GeolocationResponse } from '@react-native-community/geolocation';
import { type LocationAccuracy } from 'react-native-permissions';

export type useGeolocationStartWatchArgs = {
  onLocationEnabledChange: (IsLocationEnabled: boolean) => void;
  onPermissionGrantedChange: (IsPermissionGranted: boolean) => void;
  onAccuracyChange: (accuracy: LocationAccuracy) => void;
  onCoordinatesChange: (coordinates: GeolocationResponse['coords']) => void;
  onError: (error: GeolocationError) => void;
  withAndroidTrackingInBackground?: boolean;
};
