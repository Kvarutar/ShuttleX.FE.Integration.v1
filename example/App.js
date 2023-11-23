import Constants from 'expo-constants';

let AppEntryPoint = require('./src/App').default;

if (Constants.expoConfig.extra.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;
