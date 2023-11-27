import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { Bar, CalendarIcon, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

const BarMeta: Meta<typeof Bar> = {
  title: 'Bar',
  component: Bar,
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

export default BarMeta;

const BarWithHooks = ({ themeName }: { themeName: ThemeContextType['themeMode'] }) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <Bar children={<CalendarIcon />} />;
};

type Story = StoryObj<typeof Bar>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <BarWithHooks {...args} themeName={theme} />;
  },
};
