import { type IMessage } from 'react-native-gifted-chat';

export type ChatCoreProps = {
  userId: string;
  messages: IMessage[];
  onSend: (messages: IMessage[]) => void;
  onBackButtonPress: () => void;
  errorLogger: (...messages: any[]) => void;
  chatName?: string;
  onLoadEarlier?: () => void;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  isTyping?: boolean;
  withRenderAvatar?: boolean;
  onVoiceButtonPress?: () => void;
};

export type AttachmentPopupState = {
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onDocumentPress: () => void;
};
