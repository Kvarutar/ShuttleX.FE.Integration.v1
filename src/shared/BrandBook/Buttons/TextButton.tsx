import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { type ButtonProps, textMode } from './props';

const TextButton = ({
  color = '#000000', //TODO: Adjust after implementing https://www.notion.so/shuttlex/i18n-install-library-to-support-i18n-77e236ccfc344d67b9d370e400d45557
  text = 'Press me', //TODO: Adjust after implementing https://www.notion.so/shuttlex/React-Native-Paper-Theme-setup-d194000d1d594e688831b0e5d81cf038
  style = styles.textButton,
}: ButtonProps): JSX.Element => (
  <Button
    textColor={color}
    contentStyle={styles.textButtonContent}
    style={[styles.textButton, style]}
    mode={textMode}
    onPress={() => {}}
  >
    {text}
  </Button>
);

const styles = StyleSheet.create({
  textButton: {
    width: 100,
    height: 40,
    borderRadius: 28,
  },
  textButtonContent: {
    height: '100%',
    width: '100%',
  },
});

export default TextButton;
