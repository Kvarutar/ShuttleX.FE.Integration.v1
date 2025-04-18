import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import TextInput from '../../../src/shared/atoms/TextInput';
import { TextInputInputMode, type TextInputProps } from '../../../src/shared/atoms/TextInput/types';

const TextInputMeta: Meta<TextInputProps & { theme: ThemeContextType['themeMode'] }> = {
  title: 'TextInput',
  component: TextInput,
  decorators: [
    Story => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  args: {
    theme: 'light',
    placeholder: 'Example',
    maxLength: 100,
    inputMode: undefined,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    inputMode: {
      options: [undefined, ...Object.values(TextInputInputMode)],
      control: { type: 'select' },
    },
  },
};

export default TextInputMeta;

const TextInputWithHooks = ({ themeName, ...args }: { themeName: ThemeContextType['themeMode'] }) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <TextInput {...args} />;
};

type Story = StoryObj<typeof TextInput>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();
    return <TextInputWithHooks {...args} themeName={theme} />;
  },
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});
