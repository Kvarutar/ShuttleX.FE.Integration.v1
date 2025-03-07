import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/v2/themeContext';
import Text from '../../atoms/Text';
import CameraOutlineIcon from '../../icons/CameraOutlineIcon';
import FolderIcon from '../../icons/FolderIcon';
import GalleryIcon from '../../icons/GalleryIcon';
import { type AttachmentPopupState } from './types';

const AttachmentPopupWithoutI18n = ({ onCameraPress, onGalleryPress, onDocumentPress }: AttachmentPopupState) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    container: {
      paddingHorizontal: sizes.paddingHorizontal,
    },
    divider: {
      backgroundColor: colors.backgroundTertiaryColor,
    },
    wrapper: {
      backgroundColor: colors.chat.cardsBackgroundColor,
      left: sizes.paddingHorizontal,
    },
  });

  return (
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      <TouchableOpacity onPress={onGalleryPress} style={[styles.container, computedStyles.container]}>
        <Text style={styles.text}>{t('ChatCore_attachPhotos')}</Text>
        <GalleryIcon style={styles.icon} />
      </TouchableOpacity>
      <View style={[styles.divider, computedStyles.divider]} />
      <TouchableOpacity onPress={onCameraPress} style={[styles.container, computedStyles.container]}>
        <Text style={styles.text}>{t('ChatCore_takePhoto')}</Text>
        <CameraOutlineIcon style={styles.icon} />
      </TouchableOpacity>
      <View style={[styles.divider, computedStyles.divider]} />
      <TouchableOpacity onPress={onDocumentPress} style={[styles.container, computedStyles.container]}>
        <Text style={styles.text}>{t('ChatCore_attachFile')}</Text>
        <FolderIcon style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const AttachmentPopup = (props: AttachmentPopupState) => (
  <I18nextProvider i18n={i18nIntegration}>
    <AttachmentPopupWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    gap: 10,
    bottom: 90,
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    width: 180,
    //TODO change shadow to shade component later
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    opacity: 0.1,
    height: 1,
  },
  text: {
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'Inter Medium',
  },
  icon: {
    width: 18,
    height: 18,
  },
});
export default AttachmentPopup;
