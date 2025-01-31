import { Platform } from 'react-native';
import {
  check,
  checkLocationAccuracy,
  type LocationAccuracy,
  PERMISSIONS,
  type PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';

const platformVersion = Platform.Version;

const requestGeolocationPermission = async (requestAlwaysStatus: boolean = false): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const whenInUseStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (requestAlwaysStatus && whenInUseStatus === RESULTS.GRANTED) {
      const alwaysStatus = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      return alwaysStatus === RESULTS.GRANTED;
    }

    return whenInUseStatus === RESULTS.GRANTED;
  } else {
    const fineStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return fineStatus === RESULTS.GRANTED;
  }
};

const checkGeolocationPermissionAndAccuracy = async (
  requestAlwaysStatus: boolean = false,
): Promise<{
  isGranted: boolean;
  accuracy: LocationAccuracy;
}> => {
  if (Platform.OS === 'ios') {
    const whenInUseStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    const geoStatus =
      requestAlwaysStatus && whenInUseStatus === RESULTS.GRANTED
        ? await check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        : whenInUseStatus;

    const isGranted = geoStatus === RESULTS.GRANTED;
    const accuracy: LocationAccuracy = isGranted ? await checkLocationAccuracy() : 'reduced';

    return { isGranted, accuracy };
  } else {
    const [resultFine, resultCoarse] = await Promise.all([
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION),
      check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
    ]);

    const isGranted = resultFine === RESULTS.GRANTED || resultCoarse === RESULTS.GRANTED;
    const accuracy: LocationAccuracy = isGranted ? 'full' : 'reduced';

    return { isGranted, accuracy };
  }
};

const requestCameraUsagePermission = async (): Promise<void> => {
  if (Platform.OS === 'ios') {
    await request(PERMISSIONS.IOS.CAMERA);
  } else {
    await request(PERMISSIONS.ANDROID.CAMERA);
  }
};

const checkCameraUsagePermission = async (): Promise<PermissionStatus> => {
  if (Platform.OS === 'ios') {
    return await check(PERMISSIONS.IOS.CAMERA);
  } else {
    return await check(PERMISSIONS.ANDROID.CAMERA);
  }
};

const requestGalleryUsagePermission = async (): Promise<void> => {
  if (Platform.OS === 'ios') {
    await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
  } else {
    if (Number(platformVersion) > 32) {
      await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    } else {
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }
  }
};

const checkGalleryUsagePermission = async (): Promise<PermissionStatus> => {
  let result: PermissionStatus;

  if (Platform.OS === 'ios') {
    result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
  } else {
    if (Number(platformVersion) > 32) {
      result = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    } else {
      result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }
  }

  return result;
};

export {
  checkCameraUsagePermission,
  checkGalleryUsagePermission,
  checkGeolocationPermissionAndAccuracy,
  requestCameraUsagePermission,
  requestGalleryUsagePermission,
  requestGeolocationPermission,
};
