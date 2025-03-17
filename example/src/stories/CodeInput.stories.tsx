import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { CodeInput, type ThemeContextType, useTheme } from 'shuttlex-integration';

const CodeInputMeta: Meta<typeof CodeInput> = {
  title: 'CodeInput',
  component: CodeInput,
  decorators: [
    Story => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  args: {},
  argTypes: {},
};

export default CodeInputMeta;

const CodeInputWithHooks = ({ themeName }: { themeName: ThemeContextType['themeMode'] }) => {
  const { setThemeMode } = useTheme();

  const getCode = () => {};

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <CodeInput onCodeChange={getCode} />;
};

type Story = StoryObj<typeof CodeInput>;

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
