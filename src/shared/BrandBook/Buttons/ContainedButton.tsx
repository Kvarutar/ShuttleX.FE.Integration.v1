import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { containedMode, type ButtonProps } from './props';

const ContainedButton = ({
  color = '#FFFFFF', //TODO: Adjust after implementing https://www.notion.so/shuttlex/i18n-install-library-to-support-i18n-77e236ccfc344d67b9d370e400d45557
  text = 'Press me', //TODO: Adjust after implementing https://www.notion.so/shuttlex/React-Native-Paper-Theme-setup-d194000d1d594e688831b0e5d81cf038
  style = styles.containedButton,
}: ButtonProps): JSX.Element => (
  <Button
    textColor={color}
    contentStyle={styles.containedButtonContent}
    style={[styles.containedButton, style]}
    mode={containedMode}
    onPress={() => {}}
  >
    {text}
  </Button>
);

const styles = StyleSheet.create({
  containedButton: {
    width: 100,
    height: 40,
    backgroundColor: '#5295F7',
    borderRadius: 28,
  },
  containedButtonContent: {
    height: '100%',
    width: '100%',
  },
});

export default ContainedButton;
