import { type TextStyle } from 'react-native';
import { StyleSheet, Text as TextNative } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import { TextElipsizeMode, type TextProps } from './props';

const Text = ({ children, style, numberOfLines, elipsizeMode = TextElipsizeMode.Tail }: TextProps): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles: TextStyle = {
    color: colors.textPrimaryColor,
  };

  return (
    <TextNative numberOfLines={numberOfLines} ellipsizeMode={elipsizeMode} style={[styles.text, computedStyles, style]}>
      {children}
    </TextNative>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter Regular',
    fontSize: 16,
    letterSpacing: 0.64,
  },
});

export default Text;
