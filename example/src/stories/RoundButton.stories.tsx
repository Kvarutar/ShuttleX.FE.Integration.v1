import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { CalendarIcon, palettes, RoundButton, type ThemeContextType, useTheme } from 'shuttlex-integration';

const RoundButtonMeta: Meta<typeof RoundButton> = {
  title: 'RoundButton',
  component: RoundButton,
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

export default RoundButtonMeta;

const RoundButtonWithHooks = ({ themeName }: { themeName: ThemeContextType['themeMode'] }) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <RoundButton children={<CalendarIcon />} />;
};

type Story = StoryObj<typeof RoundButton>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <RoundButtonWithHooks {...args} themeName={theme} />;
  },
};
