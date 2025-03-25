import { Dimensions, Platform } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

export { IS_ANDROID, IS_IOS, WINDOW_HEIGHT, WINDOW_WIDTH };
