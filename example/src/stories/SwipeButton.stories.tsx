import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { palettes, SwipeButton, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { SwipeButtonModes, type SwipeButtonProps } from '../../../src/shared/molecules/SwipeButton/props';

const modes: SwipeButtonProps['mode'][] = Object.values(SwipeButtonModes);

const SwipeButtonMeta: Meta<typeof SwipeButton> = {
  title: 'SlideToConfirmButton',
  component: SwipeButton,
  args: {
    theme: 'light',
    mode: 'confirm',
    editable: true,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    mode: {
      options: modes,
      control: { type: 'select' },
    },
  },
};

export default SwipeButtonMeta;

const SwipeButtonWithHooks = ({
  themeName,
  mode,
}: {
  themeName: ThemeContextType['themeMode'];
  mode: SwipeButtonProps['mode'];
}) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return (
    <SwipeButton
      mode={mode}
      onSwipeEnd={() => {
        Alert.alert('Attention', 'onEndReached!');
      }}
    />
  );
};

type Story = StoryObj<typeof SwipeButton>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme, mode }] = useArgs();

    return (
      <View style={styles.element}>
        <SwipeButtonWithHooks {...args} themeName={theme} mode={mode} />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  element: {
    width: 350,
  },
});
