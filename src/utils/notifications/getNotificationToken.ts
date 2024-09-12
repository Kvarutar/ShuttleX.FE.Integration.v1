import messaging from '@react-native-firebase/messaging';

export const getNotificationToken = () =>
  messaging()
    .getToken()
    .then((token: string) => {
      // TODO: Send token to backend for getting notification
      console.log('FCM Token:', token);
    });
