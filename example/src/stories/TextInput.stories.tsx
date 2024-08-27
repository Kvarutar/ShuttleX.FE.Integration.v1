import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { palettes, TextInput, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

import { TextInputInputMode, type TextInputProps } from '../../../src/shared/atoms/TextInput/props';

const TextInputMeta: Meta<TextInputProps & { theme: ThemeContextTypeV1['themeMode'] }> = {
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
    editable: true,
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

const TextInputWithHooks = ({ themeName, ...args }: { themeName: ThemeContextTypeV1['themeMode'] }) => {
  const { setThemeMode } = useThemeV1();

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
