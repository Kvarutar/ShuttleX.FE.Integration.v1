import Keychain, { STORAGE_TYPE } from 'react-native-keychain';

const saveTokens = async ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  await Keychain.resetGenericPassword();

  //TODO: add Keychain Sharing
  await Keychain.setGenericPassword(accessToken, refreshToken, { storage: STORAGE_TYPE.FB });
};

export default saveTokens;
