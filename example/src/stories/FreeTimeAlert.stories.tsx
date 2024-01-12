import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { FreeTimeAlert, FreeTimeAlertType, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { type FreeTimeAlertProps } from '../../../src/shared/Widgets/alerts/FreeTimeAlert/props';

const FreeTimeAlertMeta: Meta<
  {
    theme: ThemeContextType['themeMode'];
    number: number;
    type: FreeTimeAlertProps['time']['type'];
  } & FreeTimeAlertProps
> = {
  title: 'FreeTimeAlert',
  component: FreeTimeAlert,
  args: {
    theme: 'light',
    number: 3,
    type: FreeTimeAlertType.Minutes,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    type: {
      options: Object.values(FreeTimeAlertType),
      control: { type: 'select' },
    },
  },
};

export default FreeTimeAlertMeta;

const FreeTimeAlertWithHooks = ({
  theme,
  ...props
}: {
  theme: ThemeContextType['themeMode'];
} & FreeTimeAlertProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <FreeTimeAlert {...props} />;
};

type Story = StoryObj<typeof FreeTimeAlert>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme, number, type }] = useArgs();
    return <FreeTimeAlertWithHooks theme={theme} time={{ number, type }} {...args} />;
  },
};
