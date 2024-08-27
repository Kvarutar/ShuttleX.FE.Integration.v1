import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { palettes, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

import { Button } from '../../../../src/shared/atoms/Button';
import { ButtonModes, type ButtonProps, ButtonShadows } from '../../../../src/shared/atoms/Button/V2/props';

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

type ButtonWithHooksProps = { themeName: ThemeContextTypeV1['themeMode'] } & ButtonProps;

const ButtonWithHooks = ({ themeName, ...props }: ButtonWithHooksProps) => {
  const { setThemeMode } = useThemeV1();

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
