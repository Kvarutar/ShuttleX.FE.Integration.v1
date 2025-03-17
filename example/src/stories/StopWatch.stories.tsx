import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import { palettes, StopWatch, type ThemeContextType, useTheme } from 'shuttlex-integration';

const StopWatchMeta: Meta<typeof StopWatch> = {
  title: 'Stopwatch',
  component: StopWatch,
  args: {
    theme: 'light',
    mode: 'normal',
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
  },
};

export default StopWatchMeta;

const StopWatchWithHooks = ({ themeName }: { themeName: ThemeContextType['themeMode'] }) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <StopWatch initialDate={new Date()} mask="{H}h {M}m" />;
};

type Story = StoryObj<typeof StopWatch>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return (
      <View>
        <StopWatchWithHooks {...args} themeName={theme} />
      </View>
    );
  },
};
