import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { KeyboardAvoidingView, NativeModules, Platform, StyleSheet, View } from 'react-native';

import { type AndroidKeyboardAvoidingViewProps, type KeyboardAvoidingViewProps } from './props';

const { IntegrationModule } = NativeModules;

const CustomKeyboardAvoidingView = ({
  children,
  style,
  iosOptions = { behavior: 'padding' },
}: KeyboardAvoidingViewProps) => {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView
        children={children}
        style={[styles.keyboardAvoidingView, style]}
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
      IntegrationModule.setSoftInputMode('adjustResize');
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
