import { type IMessage } from 'react-native-gifted-chat';

export type ChatCoreProps = {
  userId: string;
  messages: IMessage[];
  onSend: (messages: IMessage[]) => void;
  onBackButtonPress: () => void;
  errorLogger: (...messages: any[]) => void;
  chatName?: string;
};
