import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import Button from '../../../../src/shared/atoms/Button/v2';
import {
  type ButtonProps,
  ButtonShadows,
  ButtonShapes,
  ButtonSizes,
  CircleButtonModes,
} from '../../../../src/shared/atoms/Button/v2/props';

const ButtonMeta: Meta<ButtonProps & { theme: ThemeContextType['themeMode'] }> = {
  title: 'ButtonV2',
  component: Button,
  args: {
    theme: 'light',
    mode: undefined,
    shape: undefined,
    size: undefined,
    innerSpacing: 0,
    text: 'Sample text',
    shadow: undefined,
    disableShadow: false,
    disabled: false,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    //TODO: create separate modes argTypes for options
    mode: {
      options: [undefined, ...Object.values(CircleButtonModes)],
      control: { type: 'select' },
    },
    shape: {
      options: [undefined, ...Object.values(ButtonShapes)],
      control: { type: 'select' },
    },
    size: {
      options: [undefined, ...Object.values(ButtonSizes)],
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
