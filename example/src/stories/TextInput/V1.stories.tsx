import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { palettes, TextInputV1, type ThemeContextType, useThemeV1 } from 'shuttlex-integration';

import { TextInputV1InputMode, type TextInputV1Props } from '../../../../src/shared/atoms/TextInput/v1/props';

const TextInputMeta: Meta<TextInputV1Props & { theme: ThemeContextType['themeMode'] }> = {
  title: 'TextInputV1',
  component: TextInputV1,
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
      options: [undefined, ...Object.values(TextInputV1InputMode)],
      control: { type: 'select' },
    },
  },
};

export default TextInputMeta;

const TextInputWithHooks = ({ themeName, ...args }: { themeName: ThemeContextType['themeMode'] }) => {
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <TextInputV1 {...args} />;
};

type Story = StoryObj<typeof TextInputV1>;

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
