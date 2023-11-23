import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { Button, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { type ButtonProps } from '../../../src/shared/BrandBook/Button/props';

const modes: ButtonProps['mode'][] = ['mode1', 'mode2', 'mode3', 'mode4'];

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    theme: 'light',
    mode: modes[0],
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    mode: {
      options: modes,
      control: { type: 'select' },
    },
  },
};

export default ButtonMeta;

const ButtonWithHooks = ({
  themeName,
  mode,
}: {
  themeName: ThemeContextType['themeMode'];
  mode: ButtonProps['mode'];
}) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <Button text="Sample text" mode={mode} />;
};

type Story = StoryObj<typeof ButtonWithHooks>;

export const Basic: Story = {
  render: function Render(args) {
    const [{ theme, mode }] = useArgs();

    return <ButtonWithHooks {...args} themeName={theme} mode={mode} />;
  },
};
