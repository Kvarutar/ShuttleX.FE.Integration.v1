import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { Button, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { ButtonModes, type ButtonProps, ButtonShadows } from '../../../src/shared/atoms/Button/props';

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    theme: 'light',
    mode: ButtonModes.Mode1,
    text: 'Sample text',
    borderRadius: 28,
    shadow: undefined,
    disableShadow: false,
    disabled: false,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    mode: {
      options: Object.values(ButtonModes),
      control: { type: 'select' },
    },
    shadow: {
      options: [undefined, ...Object.values(ButtonShadows)],
      control: { type: 'select' },
    },
  },
};

export default ButtonMeta;

type ButtonWithHooksProps = { themeName: ThemeContextType['themeMode'] } & ButtonProps;

const ButtonWithHooks = ({ themeName, ...props }: ButtonWithHooksProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <Button {...props} />;
};

type Story = StoryObj<typeof ButtonWithHooks>;

export const Basic: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <ButtonWithHooks themeName={theme} {...args} />;
  },
};
