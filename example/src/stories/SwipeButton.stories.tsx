import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { palettes, SwipeButtonV1, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

import { SwipeButtonModes, type SwipeButtonProps } from '../../../src/shared/molecules/SwipeButton/props';

const modes: SwipeButtonProps['mode'][] = Object.values(SwipeButtonModes);

const SwipeButtonMeta: Meta<typeof SwipeButtonV1> = {
  title: 'SlideToConfirmButton',
  component: SwipeButtonV1,
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
  themeName: ThemeContextTypeV1['themeMode'];
  mode: SwipeButtonProps['mode'];
}) => {
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return (
    <SwipeButtonV1
      mode={mode}
      onSwipeEnd={() => {
        Alert.alert('Attention', 'onEndReached!');
      }}
    />
  );
};

type Story = StoryObj<typeof SwipeButtonV1>;

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
