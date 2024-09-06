import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { CodeInputV1, palettes, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

const CodeInputMeta: Meta<typeof CodeInputV1> = {
  title: 'CodeInput',
  component: CodeInputV1,
  decorators: [
    Story => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  args: {
    theme: 'light',
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
  },
};

export default CodeInputMeta;

const CodeInputWithHooks = ({ themeName }: { themeName: ThemeContextTypeV1['themeMode'] }) => {
  const { setThemeMode } = useThemeV1();

  const getCode = () => {};

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <CodeInputV1 onCodeChange={getCode} />;
};

type Story = StoryObj<typeof CodeInputV1>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <CodeInputWithHooks {...args} themeName={theme} />;
  },
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});
