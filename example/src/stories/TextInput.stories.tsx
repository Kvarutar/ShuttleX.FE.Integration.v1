import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { palettes, TextInput, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { type TextInputProps } from '../../../src/shared/BrandBook/TextInput/props';

const inputModes: TextInputProps['inputMode'][] = [
  'none',
  'text',
  'decimal',
  'numeric',
  'tel',
  'search',
  'email',
  'url',
];

const TextInputMeta: Meta<typeof TextInput> = {
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
    editable: true,
    placeholder: 'Example',
    maxLength: 100,
    inputMode: 'text',
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    inputMode: {
      options: inputModes,
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
