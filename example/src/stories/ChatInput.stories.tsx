import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../../src/shared/atoms/Button/v2/props';
import ChatInput from '../../../src/shared/molecules/ChatInput/index';
import { type ChatInputProps } from '../../../src/shared/molecules/ChatInput/props';

const ChatInputMeta: Meta<ChatInputProps & { theme: ThemeContextType['themeMode'] }> = {
  title: 'ChatInput',
  component: ChatInput,
  decorators: [
    Story => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  args: {
    theme: 'light',
    placeholder: 'Type something...',
    button: {
      mode: CircleButtonModes.Mode1,
      size: ButtonSizes.S,
      shape: ButtonShapes.Circle,
    },
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    //TODO: Fix selects for sub-arguments (There is just a not-editable object on the screen now)
  },
};

export default ChatInputMeta;

const ChatInputWithHooks = ({ themeName, ...args }: { themeName: ThemeContextType['themeMode'] }) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <ChatInput {...args} />;
};

type Story = StoryObj<typeof ChatInput>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();
    return <ChatInputWithHooks {...args} themeName={theme} />;
  },
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});
