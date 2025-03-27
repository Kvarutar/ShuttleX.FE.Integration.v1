import Voice, { type SpeechVolumeChangeEvent } from '@react-native-voice/voice';
import { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  Image,
  type ImageURISource,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  type AvatarProps,
  Bubble,
  type BubbleProps,
  Composer,
  type ComposerProps,
  GiftedChat,
  type IMessage,
  InputToolbar,
  type InputToolbarProps,
  type MessageImageProps,
  type RenderMessageTextProps,
  SystemMessage,
} from 'react-native-gifted-chat';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import { getLocales } from 'react-native-localize';
import Markdown from 'react-native-marked';
import { RESULTS } from 'react-native-permissions';
import { MediaFileType, PlusIcon } from 'shuttlex-integration';
import { v4 as uuidv4 } from 'uuid';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/themeContext';
import { checkMicrophonUsagePermission, PermissionAction, usePermissionAlert } from '../../../utils/permissions';
import Text from '../../atoms/Text';
import ArrowSendMessageIcon from '../../icons/ArrowSendMessageIcon';
import AttachImageIcon from '../../icons/AttachImageIcon';
import CloseIcon from '../../icons/CloseIcon';
import VoiceChatIcon from '../../icons/VoiceChatIcon';
import XIcon from '../../icons/XIcon';
import SafeAreaView from '../../molecules/SafeAreaView';
import AttachmentPopup from './AttachmentPopup';
import ListeningAnimation from './ListeningAnimation';
import { type ChatCoreProps } from './types';
import { cropPhoto, getVoiceLanguage, handlePermission, onSelectDocument } from './utils';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ChatCoreWithoutI18n = ({
  userId,
  messages,
  onSend,
  onBackButtonPress,
  chatName,
  errorLogger,
  loadEarlier,
  onLoadEarlier,
  isLoadingEarlier,
  isTyping,
}: ChatCoreProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showPermissionAlert } = usePermissionAlert();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageURISource[]>([]);
  const [attachedImages, setAttachedImages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAttachedPopupVisible, setIsAttachedPopupVisible] = useState(false);
  const [iconWidth, setIconWidth] = useState(0);
  const [volumeChangeEvent, setVolumeChangeEvent] = useState<SpeechVolumeChangeEvent>();
  const [selectedFiles, setSelectedFiles] = useState<IMessage[]>([]);
  const deviceLanguage = getVoiceLanguage(getLocales()[0]?.languageCode);

  const addSelectedFile = (file: IMessage) => {
    const fileExists = selectedFiles.some(selectedFile => selectedFile.image === file.image);

    if (fileExists) {
      Alert.alert(t('ChatCore_titleAlertDuplicateFile'), t('ChatCore_messageAlertDuplicateFile'));
    } else {
      setSelectedFiles(prevFiles => [...prevFiles, file]);
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechError = event => {
      errorLogger('Voice library error', event);
      setIsListening(false);
    };
    Voice.onSpeechEnd = () => setIsListening(false);

    Voice.onSpeechResults = event => {
      if (event.value && event.value.length > 0 && event.value[0]) {
        setInputText(event.value[0]);
      }
    };

    Voice.onSpeechVolumeChanged = e => {
      setVolumeChangeEvent(e);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [errorLogger]);

  const startListening = async () => {
    try {
      await Voice.start(deviceLanguage, {
        RECOGNIZER_ENGINE: 'services',
        EXTRA_PARTIAL_RESULTS: true,
      });
    } catch (error) {
      errorLogger('Voice start error:', error);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (error) {
      errorLogger('Voice stop error:', error);
    }
  };

  const openImageModal = (imageUri: string) => {
    setSelectedImages([{ uri: imageUri }]);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImages([]);
  };

  const handlePhotoAction = async (action: PermissionAction) => {
    setIsAttachedPopupVisible(false);
    handlePermission(action, showPermissionAlert);

    const response =
      action === 'camera'
        ? await launchCamera({ mediaType: MediaFileType.Photo, quality: 0.8 })
        : await launchImageLibrary({ mediaType: MediaFileType.Photo, selectionLimit: 5, quality: 0.8 });

    if (!response.assets || response.assets.length === 0) {
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
      setAttachedImages(prev => [...prev, ...images]);
      return;
    }

    const uri = response.assets[0]?.uri;
    if (!uri) {
      return;
    }

    const croppedUri = await cropPhoto(uri, errorLogger);
    if (!croppedUri) {
      return;
    }

    setAttachedImages(prev => [
      ...prev,
      { _id: croppedUri, text: '', createdAt: new Date(), user: { _id: userId }, image: croppedUri },
    ]);
  };

  const handleDocumentAction = async () => {
    setIsAttachedPopupVisible(false);
    const newFile = await onSelectDocument(
      userId,
      addSelectedFile,
      t('ChatCore_titleAlertSelectDocument'),
      t('ChatCore_messageAlertSelectDocument'),
    );

    if (newFile) {
      onSend([newFile]);
      setSelectedFiles([]);
    }
  };

  const handleVoiceRecord = async () => {
    const permissionStatus = await checkMicrophonUsagePermission();
    handlePermission(PermissionAction.Microphone, showPermissionAlert);
    if (permissionStatus === RESULTS.GRANTED) {
      startListening();
    }
  };

  const removeAttachedImage = (_id: IMessage['_id']) => {
    setAttachedImages(prev => prev.filter(image => image._id !== _id));
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
      opacity: isListening ? 0 : 1,
      alignSelf: Platform.OS === 'android' ? 'center' : 'flex-start',
    },
    sendButton: {
      backgroundColor: colors.primaryColor,
      opacity: isListening ? 0.3 : 1,
    },
    messageContainer: {
      borderTopColor: colors.chat.cardsBackgroundColor,
    },
    modalOverlay: {
      height: windowHeight,
      width: windowWidth,
    },
    addAttachedImageButton: {
      borderColor: colors.iconSecondaryColor,
    },
    removeAttachedImageButton: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
    systemMessageText: {
      color: colors.chat.systemMessageColor,
    },
  });

  const renderMessageText = (props: RenderMessageTextProps<IMessage>) => {
    return <MarkdownComponent text={props.currentMessage?.text} />;
  };

  const renderBubble = (props: BubbleProps<IMessage>) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: [styles.leftBubbleWrapper, computedStyles.leftBubbleWrapper, styles.bubbleWrapper],
        right: [styles.rightBubbleWrapper, computedStyles.rightBubbleWrapper, styles.bubbleWrapper],
      }}
      textStyle={{
        left: computedStyles.leftBubbleText,
        right: computedStyles.rightBubbleText,
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
    <>
      {attachedImages.length > 0 && (
        <View style={styles.attachedImagesContainer}>
          <Pressable
            style={[styles.addAttachedImageButton, computedStyles.addAttachedImageButton]}
            onPress={() => handlePhotoAction(PermissionAction.Gallery)}
          >
            <PlusIcon color={colors.iconSecondaryColor} />
          </Pressable>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.attachedImagesScrollStyle}
            contentContainerStyle={styles.attachedImagesScrollContentContainerStyle}
          >
            {attachedImages.map(attachedImage => (
              <View style={[styles.attachedImageContainer]}>
                <Pressable
                  style={[styles.removeAttachedImageButton, computedStyles.removeAttachedImageButton]}
                  onPress={() => removeAttachedImage(attachedImage._id)}
                >
                  <XIcon style={styles.removeAttachedImageButtonIcon} />
                </Pressable>
                <Image source={{ uri: attachedImage.image }} style={styles.attachedImage} />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <InputToolbar {...props} containerStyle={[styles.inputToolbar, computedStyles.inputToolBar]} />
    </>
  );

  const renderActions = () => (
    <>
      <TouchableOpacity
        style={styles.actionsContainer}
        onPress={() => setIsAttachedPopupVisible(!isAttachedPopupVisible)}
        onLayout={e => setIconWidth(e.nativeEvent.layout.width)}
      >
        <AttachImageIcon style={styles.icon} />
      </TouchableOpacity>
      {isAttachedPopupVisible && (
        <>
          <Pressable
            style={[styles.modalOverlay, computedStyles.modalOverlay]}
            onPress={() => setIsAttachedPopupVisible(false)}
          />
          <AttachmentPopup
            onCameraPress={() => handlePhotoAction(PermissionAction.Camera)}
            onGalleryPress={() => handlePhotoAction(PermissionAction.Gallery)}
            onDocumentPress={handleDocumentAction}
          />
        </>
      )}
    </>
  );

  const renderComposer = (props: ComposerProps) => (
    <>
      {isListening && <ListeningAnimation iconWidth={iconWidth} event={volumeChangeEvent} />}

      <Composer {...props} textInputStyle={[styles.composer, computedStyles.composer]} />
    </>
  );

  const renderAvatar = (props: AvatarProps<IMessage>) => {
    const avatarSource = props.currentMessage?.user?.avatar;

    switch (typeof avatarSource) {
      case 'string':
        return <Image source={{ uri: avatarSource }} style={styles.avatar} />;

      case 'number':
        return <Image source={avatarSource} style={styles.avatar} />;

      default:
        errorLogger(`Invalid avatar source: ${JSON.stringify(avatarSource)}`);
        return null;
    }
  };

  const renderSend = () => {
    const handleSend = () => {
      if (inputText.trim() === '' && attachedImages.length === 0) {
        return;
      }

      const newMessages: IMessage[] = [];

      if (inputText.trim() !== '') {
        newMessages.push({
          _id: uuidv4(),
          text: inputText,
          createdAt: new Date(),
          user: { _id: userId },
        });
      }

      if (attachedImages.length > 0) {
        newMessages.push(...attachedImages);
      }

      onSend(newMessages);
      setInputText('');
      setAttachedImages([]);
    };

    if ((inputText.trim() !== '' || attachedImages.length > 0) && !isListening) {
      return (
        <Pressable onPress={handleSend}>
          <View style={[styles.sendButton, computedStyles.sendButton]}>
            <ArrowSendMessageIcon />
          </View>
        </Pressable>
      );
    }

    return (
      <Pressable onLongPress={handleVoiceRecord} onPressOut={stopListening}>
        <View style={[styles.sendButton, computedStyles.sendButton]}>
          <VoiceChatIcon style={styles.voiceIcon} />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Pressable style={styles.headerIconStyle} />
        <Text style={[styles.headerText, computedStyles.headerText]}>{chatName ?? t('ChatCore_Header')}</Text>
        <Pressable onPress={onBackButtonPress} hitSlop={10}>
          <CloseIcon style={styles.headerIconStyle} />
        </Pressable>
      </View>

      <GiftedChat
        messagesContainerStyle={[styles.messageContainer, computedStyles.messageContainer]}
        text={inputText}
        onInputTextChanged={setInputText}
        keyboardShouldPersistTaps="never"
        user={{ _id: userId }}
        messages={messages}
        onSend={onSend}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderMessageImage={renderMessageImage}
        renderSend={renderSend}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderMessageText={renderMessageText}
        maxComposerHeight={100}
        renderTime={() => null}
        renderDay={() => null}
        alwaysShowSend
        renderAvatar={renderAvatar}
        loadEarlier={loadEarlier}
        onLoadEarlier={onLoadEarlier}
        isLoadingEarlier={isLoadingEarlier}
        infiniteScroll
        isStatusBarTranslucentAndroid
        //TODO change to true dynamicly adding isloading
        isTyping={isTyping}
        //TODO find the way to localize this message on the very top of container
        renderSystemMessage={props => (
          <SystemMessage
            {...props}
            containerStyle={styles.systemMessageWrapper}
            textStyle={[styles.systemMessageText, computedStyles.systemMessageText]}
          />
        )}
      />
      <ImageView images={selectedImages} imageIndex={0} visible={isModalVisible} onRequestClose={closeImageModal} />
    </SafeAreaView>
  );
};

const MarkdownComponent = ({ text }: { text: string }) => {
  const { colors } = useTheme();

  const markdownStyles = {
    text: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'Inter Medium',
      color: colors.textPrimaryColor,
    },
    paragraph: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 0,
    },
    strong: {
      color: colors.textPrimaryColor,
    },
    li: {
      color: colors.textPrimaryColor,
    },
  };

  return (
    <Markdown
      value={text}
      styles={markdownStyles}
      flatListProps={{
        style: {
          backgroundColor: 'transparent',
        },
      }}
    />
  );
};

const ChatCore = (props: ChatCoreProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <ChatCoreWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
  },
  messageContainer: {
    paddingBottom: 10,
    borderTopWidth: 1,
  },
  leftBubbleWrapper: {
    borderBottomLeftRadius: 0,
  },
  rightBubbleWrapper: {
    borderBottomRightRadius: 0,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    flexDirection: 'row',
    paddingHorizontal: 7,
  },
  headerIconStyle: {
    width: 13,
    height: 13,
  },
  bubbleWrapper: {
    padding: 10,
    borderRadius: 30,
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
    lineHeight: 32,
    fontSize: 17,
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
  attachedImagesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  attachedImagesScrollStyle: {
    marginBottom: 12,
  },
  attachedImagesScrollContentContainerStyle: {
    gap: 4,
  },
  attachedImageContainer: {
    borderRadius: 8,
    width: 92,
    height: 92,
    overflow: 'hidden',
  },
  attachedImage: {
    height: '100%',
    resizeMode: 'cover',
  },
  addAttachedImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 92,
    width: 92,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  removeAttachedImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    zIndex: 1,
    borderRadius: 100,
    padding: 4,
  },
  removeAttachedImageButtonIcon: {
    width: '100%',
    height: '100%',
  },
  inputToolbar: {
    borderTopWidth: 0,
    borderRadius: 38,
    padding: 8,
  },
  composer: {
    marginBottom: 0,
  },
  sendButton: {
    marginLeft: 6,
    width: 48,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    marginBottom: 20,
    paddingHorizontal: 28,
  },
  systemMessageText: {
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.64,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default ChatCore;
