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
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
  type RenderMessageTextProps,
  Send,
  type SendProps,
} from 'react-native-gifted-chat';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import { getLocales } from 'react-native-localize';
import Markdown from 'react-native-marked';
import { RESULTS } from 'react-native-permissions';
import { MediaFileType } from 'shuttlex-integration';

import i18nIntegration from '../../../core/locales/i18n';
import { useTheme } from '../../../core/themes/themeContext';
import { checkMicrophonUsagePermission, PermissionAction, usePermissionAlert } from '../../../utils/permissions';
import Button from '../../atoms/Button/v2';
import { ButtonShapes, CircleButtonModes } from '../../atoms/Button/v2/props';
import Text from '../../atoms/Text';
import ArrowSendMessageIcon from '../../icons/ArrowSendMessageIcon';
import AttachImageIcon from '../../icons/AttachImageIcon';
import CloseIcon from '../../icons/CloseIcon';
import VoiceChatIcon from '../../icons/VoiceChatIcon';
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
}: ChatCoreProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { showPermissionAlert } = usePermissionAlert();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageURISource[]>([]);
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
        : await launchImageLibrary({ mediaType: MediaFileType.Photo, selectionLimit: 0, quality: 0.8 });

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
      onSend(images);
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

    onSend([{ _id: croppedUri, text: '', createdAt: new Date(), user: { _id: userId }, image: croppedUri }]);
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
    <InputToolbar {...props} containerStyle={[styles.inputToolbar, computedStyles.inputToolBar]} />
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

  const renderSend = (props: SendProps<IMessage>) => {
    if (inputText.trim() !== '' && !isListening) {
      return (
        <Send {...props} containerStyle={[styles.sendButton, computedStyles.sendButton]}>
          <ArrowSendMessageIcon />
        </Send>
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
        <Button containerStyle={styles.leftButton} />
        <Text style={[styles.headerText, computedStyles.headerText]}>{chatName ?? t('ChatCore_Header')}</Text>
        <Button onPress={onBackButtonPress} shape={ButtonShapes.Circle} mode={CircleButtonModes.Mode2}>
          <CloseIcon />
        </Button>
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
        renderAvatar={null}
        loadEarlier={loadEarlier}
        onLoadEarlier={onLoadEarlier}
        isLoadingEarlier={isLoadingEarlier}
        infiniteScroll
        isStatusBarTranslucentAndroid
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
  },
  //TODO Change style when we will have multiply chats-add button for chats menu
  leftButton: {
    opacity: 0,
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
