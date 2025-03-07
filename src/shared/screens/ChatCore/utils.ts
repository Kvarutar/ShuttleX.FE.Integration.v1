import { Alert, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { type IMessage } from 'react-native-gifted-chat';
import ImageCropPicker from 'react-native-image-crop-picker';
import { type PermissionStatus, RESULTS } from 'react-native-permissions';

import {
  checkCameraUsagePermission,
  checkGalleryUsagePermission,
  checkMicrophonUsagePermission,
  PermissionAction,
  requestCameraUsagePermission,
  requestGalleryUsagePermission,
  requestMicrophonUsagePermission,
} from '../../../utils/permissions';

const permissionConfigs = {
  [PermissionAction.Camera]: {
    check: checkCameraUsagePermission,
    request: requestCameraUsagePermission,
  },
  [PermissionAction.Gallery]: {
    check: checkGalleryUsagePermission,
    request: requestGalleryUsagePermission,
  },
  [PermissionAction.Microphone]: {
    check: checkMicrophonUsagePermission,
    request: requestMicrophonUsagePermission,
  },
};

export const handlePermission = async (
  action: PermissionAction,
  showPermissionAlert?: (action: PermissionAction) => void,
) => {
  const config = permissionConfigs[action];

  let permissionStatus = await config.check();

  if (permissionStatus === RESULTS.DENIED || permissionStatus === RESULTS.LIMITED) {
    await config.request();
    permissionStatus = await config.check();
  }

  const blockedStatuses: PermissionStatus[] = [RESULTS.DENIED, RESULTS.BLOCKED, RESULTS.UNAVAILABLE];

  const isBlocked = blockedStatuses.includes(permissionStatus);

  if (isBlocked) {
    showPermissionAlert?.(action);
    return;
  }

  return (
    permissionStatus === RESULTS.GRANTED ||
    (action === PermissionAction.Gallery && permissionStatus === RESULTS.LIMITED)
  );
};

export const cropPhoto = async (uri: string, errorLogger: (...messages: any[]) => void): Promise<string | void> => {
  //TODO temporary solution - ImageCropPicker library works strange on ios devices though android works fine. We need to check library version conflicts and resolve problem on ios
  if (Platform.OS === 'ios') {
    console.log('Skipping crop on iOS, returning original URI');
    return uri;
  }
  try {
    const cropped = await ImageCropPicker.openCropper({
      path: uri,
      mediaType: 'photo',
      cropping: true,
      freeStyleCropEnabled: true,
      showCropGuidelines: true,
    });
    return cropped.path;
  } catch (error) {
    errorLogger('Error while cropping photo', error);
    return;
  }
};

export const onSelectDocument = async (
  userId: string,
  addSelectedFile: (file: IMessage) => void,
  titleAlert: string,
  messageAlert: string,
) => {
  try {
    const result = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.allFiles] });
    const newFile: IMessage = {
      _id: result.uri,
      text: '',
      createdAt: new Date(),
      user: { _id: userId },
      image: result.uri,
    };
    addSelectedFile(newFile);
    return newFile;
  } catch {
    Alert.alert(titleAlert, messageAlert);
    return null;
  }
};

export const getVoiceLanguage = (languageCode?: string) => {
  const languageMap: Record<string, string> = {
    en: 'en-US',
    uk: 'uk-UA',
    ar: 'ar-SA',
  };
  return languageCode ? languageMap[languageCode] : 'en-US';
};
