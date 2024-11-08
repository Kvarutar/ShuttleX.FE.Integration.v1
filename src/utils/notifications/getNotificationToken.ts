import messaging from '@react-native-firebase/messaging';

export const getNotificationToken = () =>
  messaging()
    .getToken()
    .then((token: string) => token);
