import React, { StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import { type SeparatorProps } from './props';

const Separator = ({ style, mode = 'horizontal' }: SeparatorProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    horizontal: {
      marginTop: -0.5,
      borderColor: colors.strokeColor,
    },
    vertical: {
      marginLeft: -0.5,
      borderColor: colors.strokeColor,
    },
  });

  return (
    <View style={[styles.separatorWrapper, style]}>
      <View style={[styles.separator, computedStyles[mode]]} />
    </View>
  );
};

const styles = StyleSheet.create({
  separatorWrapper: {
    overflow: 'hidden',
  },
  separator: {
    borderStyle: 'dashed',
    borderWidth: 1,
    flex: 1,
  },
});

export default Separator;
