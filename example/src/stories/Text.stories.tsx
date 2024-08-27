import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { palettes, Text, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

import { TextElipsizeMode } from '../../../src/shared/atoms/Text/props';

const TextMeta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  decorators: [
    Story => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  args: {
    theme: 'light',
    numberOfLines: 10,
    text: 'Some text',
    elipsizeMode: TextElipsizeMode.Tail,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    numberOfLines: {
      control: { type: 'number' },
    },
    elipsizeMode: {
      options: Object.values(TextElipsizeMode),
      control: { type: 'select' },
    },
  },
};

export default TextMeta;

const TextWithHooks = ({
  themeName,
  children,
  ...args
}: {
  themeName: ThemeContextTypeV1['themeMode'];
  children: React.ReactNode;
}) => {
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <Text {...args}>{children}</Text>;
};

type Story = StoryObj<typeof Text>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme, text }] = useArgs();
    return (
      <TextWithHooks {...args} themeName={theme}>
        {text}
      </TextWithHooks>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});
