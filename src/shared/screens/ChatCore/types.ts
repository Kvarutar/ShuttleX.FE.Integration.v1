import { type SpeechVolumeChangeEvent } from '@react-native-voice/voice';
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
};

export type AttachmentPopupState = {
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onDocumentPress: () => void;
};

export type ListeningAnimationState = {
  iconWidth: number;
  event?: SpeechVolumeChangeEvent;
};
