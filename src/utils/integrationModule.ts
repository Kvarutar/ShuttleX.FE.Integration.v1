import { NativeModules } from 'react-native';

const IntegrationNativeModule = NativeModules.IntegrationModule;

export class IntegrationModule {
  /**
   * Navigates to location settings
   * @platforms Android only
   */
  static navigateToLocationSettings() {
    IntegrationNativeModule.navigateToLocationSettings();
  }
  /**
   * Sets android:windowSoftInputMode
   * @platforms Android only
   */
  static setSoftInputMode(type: 'adjustResize' | 'adjustPan') {
    IntegrationNativeModule.setSoftInputMode(type);
  }
}
