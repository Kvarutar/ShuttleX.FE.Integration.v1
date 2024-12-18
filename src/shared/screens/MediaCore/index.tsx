import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { type ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import {
  checkCameraUsagePermission,
  checkGalleryUsagePermission,
  requestCameraUsagePermission,
  requestGalleryUsagePermission,
} from '../../../utils/permissions';
import Button from '../../atoms/Button/v2';
import { ButtonShadows, ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import CameraIcon from '../../icons/CameraIcon';
import DocumentIcon from '../../icons/DocumentIcon';
import GalleryIcon from '../../icons/GalleryIcon';
import RoundCheckIcon2 from '../../icons/RoundCheckIcon2';
import ShortArrowIcon from '../../icons/ShortArrowIcon';
import BigHeader from '../../molecules/BigHeader';
import SafeAreaView from '../../molecules/SafeAreaView';
import ScrollViewWithCustomScroll from '../../molecules/ScrollViewWithCustomScroll';
import { PhotoType } from './Photo/types';
import SelectedFilePresentation from './SelectedFilePresentation';
import {
  type FileInfo,
  MediaAmount,
  mediaConsts,
  type MediaCoreProps,
  MediaFileType,
  type SelectedFile,
} from './types';

export const getCorrectURI = (uri: string) => (Platform.OS === 'ios' ? uri.replace('file://', '') : uri);

const MediaCoreWithoutI18n = ({
  goBack,
  windowTitle,
  firstHeaderTitle,
  secondHeaderTitle,
  headerDescription,
  children,
  onSaveFiles,
  cropperCircleOverlay = false,
  mediaAmount = MediaAmount.Multiple,
}: MediaCoreProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [isFileLoaded, setIsFileLoaded] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  const addSelectedFile = (file: SelectedFile) => {
    const fileExists = selectedFiles.some(selectedFile => selectedFile.body.uri === file.body.uri);

    if (fileExists) {
      Alert.alert(t('MediaCore_titleAlertDuplicateFile'), t('MediaCore_messageAlertDuplicateFile'));
    } else {
      setSelectedFiles(prevFiles => [...prevFiles, file]);
    }
  };

  const cropPhoto = async (result: ImagePickerResponse) => {
    if (!result.didCancel && result.assets?.[0]?.uri) {
      const asset = result.assets[0];
      try {
        const croppedResult = await ImageCropPicker.openCropper({
          path: result.assets[0].uri,
          mediaType: MediaFileType.Photo,
          width: mediaAmount === MediaAmount.Single ? mediaConsts.circlePhotoSize : undefined,
          height: mediaAmount === MediaAmount.Single ? mediaConsts.circlePhotoSize : undefined,
          cropperCircleOverlay: cropperCircleOverlay,
          freeStyleCropEnabled: mediaAmount === MediaAmount.Multiple,
          showCropGuidelines: true,
        });

        addSelectedFile({
          type: MediaFileType.Photo,
          body: {
            ...asset,
            uri: croppedResult.path,
            width: croppedResult.width,
            height: croppedResult.height,
          },
        });
      } catch {}
    }
    setIsFileLoaded(true);
  };

  const handlePhotoAction = async (action: 'camera' | 'gallery') => {
    const permissionCheck = action === 'camera' ? checkCameraUsagePermission : checkGalleryUsagePermission;
    const requestPermission = action === 'camera' ? requestCameraUsagePermission : requestGalleryUsagePermission;
    let isGranted = await permissionCheck();

    if (!isGranted) {
      await requestPermission();
      isGranted = await permissionCheck();
    }

    if (isGranted) {
      const result =
        action === 'camera'
          ? await launchCamera({ mediaType: MediaFileType.Photo })
          : await launchImageLibrary({ mediaType: MediaFileType.Photo });

      if (result.assets) {
        setIsFileLoaded(false);
        setTimeout(() => cropPhoto(result), mediaConsts.cropTimeOut);
      }
    }
  };

  const onSelectDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.allFiles] });
      addSelectedFile({ type: MediaFileType.Document, body: result });
    } catch {
      Alert.alert(t('MediaCore_titleAlertSelectDocument'), t('MediaCore_messageAlertSelectDocument'));
    }
  };

  const onSave = () => {
    const filesToUpload: FileInfo[] = [];

    selectedFiles.forEach(file => {
      const fileName = file.type === MediaFileType.Photo ? file.body.fileName : file.body.name;
      const { uri, type } = file.body;

      if (uri && type && fileName) {
        filesToUpload.push({
          name: fileName,
          type: type,
          uri: getCorrectURI(uri),
        });
      }
    });

    if (filesToUpload.length) {
      onSaveFiles(filesToUpload);
      goBack();
    }
  };

  let bottomButton = (
    <>
      <Button
        shape={ButtonShapes.Circle}
        mode={CircleButtonModes.Mode2}
        size={ButtonSizes.M}
        onPress={() => handlePhotoAction('gallery')}
      >
        <GalleryIcon style={styles.buttonIcons} />
      </Button>

      <Button
        shape={ButtonShapes.Circle}
        size={ButtonSizes.L}
        innerSpacing={5}
        shadow={ButtonShadows.Strong}
        onPress={() => handlePhotoAction('camera')}
        withCircleModeBorder
      >
        <CameraIcon style={styles.cameraIcon} />
      </Button>

      <Button
        shape={ButtonShapes.Circle}
        mode={CircleButtonModes.Mode2}
        size={ButtonSizes.M}
        onPress={onSelectDocument}
      >
        <DocumentIcon style={styles.buttonIcons} />
      </Button>
    </>
  );

  if (mediaAmount === MediaAmount.Single) {
    if (selectedFiles.length > 0) {
      bottomButton = <Button containerStyle={styles.button} text={t('MediaCore_saveButton')} onPress={onSave} />;
    } else {
      bottomButton = (
        <Button
          containerStyle={styles.button}
          text={t('MediaCore_selectPhotoButton')}
          onPress={() => handlePhotoAction('gallery')}
        />
      );
    }
  }

  if (!isFileLoaded) {
    if (mediaAmount === MediaAmount.Single) {
      bottomButton = <Button containerStyle={styles.button} isLoading={!isFileLoaded} />;
    } else {
      bottomButton = (
        <Button
          shape={ButtonShapes.Circle}
          size={ButtonSizes.L}
          innerSpacing={5}
          shadow={ButtonShadows.Strong}
          withCircleModeBorder
          onPress={() => handlePhotoAction('camera')}
          isLoading={!isFileLoaded}
        />
      );
    }
  }

  return (
    <>
      <SafeAreaView>
        <View style={styles.headerButtonContainer}>
          <Button onPress={goBack} shape={ButtonShapes.Circle} mode={CircleButtonModes.Mode2}>
            <ShortArrowIcon />
          </Button>

          {mediaAmount === MediaAmount.Multiple && (
            <Button
              onPress={onSave}
              shape={ButtonShapes.Circle}
              disabled={selectedFiles.length === 0}
              size={ButtonSizes.S}
              mode={selectedFiles.length > 0 ? CircleButtonModes.Mode1 : CircleButtonModes.Mode2}
              disableShadow
            >
              <RoundCheckIcon2
                style={styles.roundCheckIcon}
                color={selectedFiles.length > 0 ? undefined : colors.backgroundSecondaryColor}
              />
            </Button>
          )}
        </View>
        <ScrollViewWithCustomScroll withShadow withScroll>
          <BigHeader
            containerStyle={styles.verificationHeader}
            windowTitle={windowTitle}
            firstHeaderTitle={firstHeaderTitle}
            secondHeaderTitle={secondHeaderTitle}
            description={headerDescription}
          />

          <SelectedFilePresentation
            selectedFiles={selectedFiles}
            onTakePhoto={() => handlePhotoAction('camera')}
            onCloseFile={fileUri => setSelectedFiles(selectedFiles.filter(file => file.body.uri !== fileUri))}
            photoType={mediaAmount === MediaAmount.Single ? PhotoType.Circle : PhotoType.Default}
          />
          {children}
        </ScrollViewWithCustomScroll>
        <View style={styles.buttonContainer}>{bottomButton}</View>
      </SafeAreaView>
    </>
  );
};
const MediaCore = (props: MediaCoreProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <MediaCoreWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  verificationHeader: {
    paddingBottom: 24,
  },
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 24,
    gap: 8,
  },
  button: {
    flex: 1,
  },
  buttonIcons: {
    width: 20,
    height: 20,
  },
  cameraIcon: {
    width: 28,
    height: 28,
  },
  roundCheckIcon: {
    width: 42,
    height: 42,
  },
});

export default MediaCore;
