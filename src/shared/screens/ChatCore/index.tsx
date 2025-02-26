import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Image, type ImageURISource, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Bubble,
  type BubbleProps,
  Composer,
  type ComposerProps,
  GiftedChat,
  type IMessage,
  InputToolbar,
  type InputToolbarProps,
  type MessageImageProps,
  Send,
  type SendProps,
} from 'react-native-gifted-chat';
import ImageCropPicker from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import { type PermissionStatus, RESULTS } from 'react-native-permissions';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/v2/themeContext';
import {
  checkCameraUsagePermission,
  checkGalleryUsagePermission,
  requestCameraUsagePermission,
  requestGalleryUsagePermission,
} from '../../../utils/permissions';
import Button from '../../atoms/Button/v2';
import { ButtonShapes, CircleButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import ArrowSendMessageIcon from '../../icons/ArrowSendMessageIcon';
import AttachImageIcon from '../../icons/AttachImageIcon';
import CameraIcon from '../../icons/CameraIcon';
import CloseIcon from '../../icons/CloseIcon';
import VoiceChatIcon from '../../icons/VoiceChatIcon';
import CustomKeyboardAvoidingView from '../../molecules/KeyboardAvoidingView';
import SafeAreaView from '../../molecules/SafeAreaView';
import { useMediaPermissionAlert } from '../MediaCore/mediaUtils';
import { type ChatCoreProps } from './types';

const ChatCoreWithoutI18n = ({ userId, messages, onSend, onBackButtonPress, chatName, errorLogger }: ChatCoreProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showPermissionAlert } = useMediaPermissionAlert();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageURISource[]>([]);
  const [inputText, setInputText] = useState('');

  const openImageModal = (imageUri: string) => {
    setSelectedImages([{ uri: imageUri }]);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImages([]);
  };

  const cropPhoto = async (uri: string): Promise<string | void> => {
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

  const handlePhotoAction = async (action: 'camera' | 'gallery') => {
    const permissionCheck = action === 'camera' ? checkCameraUsagePermission : checkGalleryUsagePermission;
    const requestPermission = action === 'camera' ? requestCameraUsagePermission : requestGalleryUsagePermission;

    let permissionStatus: PermissionStatus = await permissionCheck();

    if (permissionStatus === RESULTS.DENIED || permissionStatus === RESULTS.LIMITED) {
      await requestPermission();
      permissionStatus = await permissionCheck();
    }

    if (permissionStatus === RESULTS.DENIED || permissionStatus === RESULTS.BLOCKED) {
      showPermissionAlert(action);
      return;
    }

    if (permissionStatus !== RESULTS.GRANTED && !(permissionStatus === RESULTS.LIMITED && action === 'gallery')) {
      return;
    }

    const response =
      action === 'camera'
        ? await launchCamera({ mediaType: 'photo', quality: 0.8 })
        : await launchImageLibrary({ mediaType: 'photo', selectionLimit: 0, quality: 0.8 });

    if (response.assets?.length !== 0) {
      return;
    }

    const images: IMessage[] = [];

    response.assets.forEach(asset => {
      if (!asset.uri) {
        errorLogger('Asset URI is missing', asset);
        return;
      }

      images.push({
        _id: asset.uri,
        text: '',
        createdAt: new Date(),
        user: { _id: userId },
        image: asset.uri,
      });
    });

    if (images.length > 1) {
      onSend(images);
      return;
    }

    const uri = response.assets[0]?.uri;
    if (!uri) {
      return;
    }

    const croppedUri = await cropPhoto(uri);
    if (!croppedUri) {
      return;
    }

    onSend([{ _id: croppedUri, text: '', createdAt: new Date(), user: { _id: userId }, image: croppedUri }]);
  };

  const computedStyles = StyleSheet.create({
    headerText: {
      color: colors.textPrimaryColor,
    },
    leftBubbleWrapper: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    rightBubbleWrapper: {
      backgroundColor: colors.primaryColor,
    },
    leftBubbleText: {
      color: colors.textPrimaryColor,
    },
    rightBubbleText: {
      color: colors.textPrimaryColor,
    },
    inputToolBar: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    composer: {
      color: colors.textPrimaryColor,
    },
    sendButton: {
      backgroundColor: colors.primaryColor,
    },
  });

  const renderBubble = (props: BubbleProps<IMessage>) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: [styles.leftBubbleWrapper, computedStyles.leftBubbleWrapper, styles.bubbleWrapper],
        right: [styles.rightBubbleWrapper, computedStyles.rightBubbleWrapper, styles.bubbleWrapper],
      }}
      textStyle={{
        left: [computedStyles.leftBubbleText, styles.bubbleText],
        right: [computedStyles.rightBubbleText, styles.bubbleText],
      }}
    />
  );

  const renderMessageImage = (props: MessageImageProps<IMessage>) => {
    const imageUri = props.currentMessage.image;

    if (!imageUri) {
      return null;
    }

    return (
      <TouchableOpacity onPress={() => openImageModal(imageUri)}>
        <Image source={{ uri: imageUri }} style={styles.messageImage} />
      </TouchableOpacity>
    );
  };

  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => (
    <InputToolbar {...props} containerStyle={[styles.inputToolbar, computedStyles.inputToolBar]} />
  );

  const renderActions = () => (
    <TouchableOpacity style={styles.actionsContainer} onPress={() => handlePhotoAction('gallery')}>
      <AttachImageIcon style={styles.icon} />
    </TouchableOpacity>
  );

  const renderComposer = (props: ComposerProps) => (
    <Composer {...props} textInputStyle={[styles.composer, computedStyles.composer]} />
  );

  const renderSend = (props: SendProps<IMessage>) => {
    if (inputText.trim() === '') {
      return (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.sendButton, computedStyles.sendButton]}
            onPress={() => handlePhotoAction('camera')}
          >
            <CameraIcon style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendButton, computedStyles.sendButton]}
            //TODO launch voice input
            // onPress={() => handlePhotoAction('camera')}
          >
            <VoiceChatIcon style={styles.voiceIcon} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Send {...props} containerStyle={[styles.sendButton, computedStyles.sendButton]}>
        <ArrowSendMessageIcon />
      </Send>
    );
  };

  return (
    <CustomKeyboardAvoidingView>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Button
            containerStyle={styles.backButton}
            onPress={onBackButtonPress}
            shape={ButtonShapes.Circle}
            mode={CircleButtonModes.Mode2}
          >
            <CloseIcon />
          </Button>
          <Text style={[styles.headerText, computedStyles.headerText]}>
            {chatName ? chatName : t('ChatCore_Header')}
          </Text>
        </View>

        <GiftedChat
          onInputTextChanged={setInputText}
          keyboardShouldPersistTaps="handled"
          user={{ _id: userId }}
          messages={messages}
          onSend={onSend}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderMessageImage={renderMessageImage}
          renderSend={renderSend}
          renderActions={renderActions}
          renderComposer={renderComposer}
          maxComposerHeight={100}
          renderTime={() => null}
          renderDay={() => null}
          alwaysShowSend
          inverted={false}
        />

        <ImageView images={selectedImages} imageIndex={0} visible={isModalVisible} onRequestClose={closeImageModal} />
      </SafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

const ChatCore = (props: ChatCoreProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <ChatCoreWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  leftBubbleWrapper: {
    borderBottomLeftRadius: 0,
  },
  rightBubbleWrapper: {
    borderBottomRightRadius: 0,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  bubbleWrapper: {
    padding: 12,
    borderRadius: 30,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter Medium',
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  voiceIcon: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontFamily: 'Inter Medium',
  },
  messageImage: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  actionsContainer: {
    borderRadius: 22,
    paddingHorizontal: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 18,
    height: 18,
  },
  inputToolbar: {
    borderTopWidth: 0,
    borderRadius: 38,
    padding: 8,
  },
  composer: {
    marginBottom: 0,
    alignSelf: 'center',
  },
  sendButton: {
    marginLeft: 6,
    width: 48,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatCore;
