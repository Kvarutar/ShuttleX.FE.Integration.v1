import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  InteractionManager,
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps as KeyboardAvoidingViewNativeProps,
  NativeModules,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/v2/themeContext';
import {
  type AndroidKeyboardAvoidingViewProps,
  type KeyboardAvoidingViewAndroidMode,
  type KeyboardAvoidingViewProps,
} from './types';

const { IntegrationModule } = NativeModules;

const invertAndroidMode = (mode: KeyboardAvoidingViewAndroidMode): KeyboardAvoidingViewAndroidMode => {
  switch (mode) {
    case 'adjustPan':
      return 'adjustResize';
    case 'adjustResize':
      return 'adjustPan';
  }
};

const CustomKeyboardAvoidingView = ({ children, mode = 'normal', style }: KeyboardAvoidingViewProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  let androidMode: KeyboardAvoidingViewAndroidMode = 'adjustResize';
  let iosMode: KeyboardAvoidingViewNativeProps['behavior'] = 'padding';
  if (mode === 'inverted') {
    androidMode = 'adjustPan';
    iosMode = undefined;
  }

  const computedStyles = StyleSheet.create({
    keyboardAvoidingView: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView
        children={children}
        keyboardVerticalOffset={insets.bottom ? sizes.paddingVertical / 2 : 0}
        style={[styles.keyboardAvoidingView, computedStyles.keyboardAvoidingView, style]}
        behavior={iosMode}
      />
    );
  } else {
    return (
      <AndroidKeyboardAvoidingView
        children={children}
        androidMode={androidMode}
        style={[styles.keyboardAvoidingView, style]}
      />
    );
  }
};

const AndroidKeyboardAvoidingView = ({ children, androidMode, style }: AndroidKeyboardAvoidingViewProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    IntegrationModule.setSoftInputMode(androidMode);
    return () => IntegrationModule.setSoftInputMode(invertAndroidMode(androidMode));
  }, [androidMode]);

  useEffect(() => {
    if (isFocused) {
      // Delay softInputMode until navigation animations complete, preventing conflicts
      InteractionManager.runAfterInteractions(() => {
        IntegrationModule.setSoftInputMode(androidMode);
      });
    } else {
      IntegrationModule.setSoftInputMode(invertAndroidMode(androidMode));
    }
  }, [isFocused, androidMode]);

  return <View style={style}>{children}</View>;
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default CustomKeyboardAvoidingView;
