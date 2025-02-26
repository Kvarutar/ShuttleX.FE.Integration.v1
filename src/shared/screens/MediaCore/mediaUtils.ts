import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { openSettings } from 'react-native-permissions';

export const useMediaPermissionAlert = () => {
  const { t } = useTranslation();

  const showPermissionAlert = (action: 'camera' | 'gallery') => {
    const title = t('MediaCore_permissionDeniedTitle');

    const message =
      action === 'camera'
        ? t('MediaCore_permissionDeniedCameraMessage')
        : t('MediaCore_permissionDeniedGalleryMessage');

    Alert.alert(title, message, [
      { text: t('MediaCore_permissionDeniedCancel'), style: 'cancel' },
      { text: t('MediaCore_permissionDeniedGoToSettings'), onPress: () => openSettings() },
    ]);
  };

  return { showPermissionAlert };
};
