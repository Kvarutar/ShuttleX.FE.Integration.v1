import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { InteractionManager, KeyboardAvoidingView, NativeModules, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { type AndroidKeyboardAvoidingViewProps, type KeyboardAvoidingViewProps } from './props';

const { IntegrationModule } = NativeModules;

const CustomKeyboardAvoidingView = ({
  children,
  style,
  iosOptions = { behavior: 'padding' },
}: KeyboardAvoidingViewProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

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
        behavior={iosOptions.behavior}
      />
    );
  } else {
    return <AndroidKeyboardAvoidingView children={children} style={[styles.keyboardAvoidingView, style]} />;
  }
};

const AndroidKeyboardAvoidingView = ({ children, style }: AndroidKeyboardAvoidingViewProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    IntegrationModule.setSoftInputMode('adjustResize');
    return () => IntegrationModule.setSoftInputMode('adjustPan');
  }, []);

  useEffect(() => {
    if (isFocused) {
      // Delay softInputMode until navigation animations complete, preventing conflicts
      InteractionManager.runAfterInteractions(() => {
        IntegrationModule.setSoftInputMode('adjustResize');
      });
    } else {
      IntegrationModule.setSoftInputMode('adjustPan');
    }
  }, [isFocused]);

  return <View style={style}>{children}</View>;
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default CustomKeyboardAvoidingView;
