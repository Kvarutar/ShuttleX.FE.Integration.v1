import Keychain from 'react-native-keychain';

const getTokens = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (credentials !== false) {
      return {
        accessToken: credentials.username,
        refreshToken: credentials.password,
      };
    }
  } catch (error) {
    console.error('Failed to access Keychain', error);
  }

  return {
    refreshToken: null,
    accessToken: null,
  };
};

export default getTokens;
