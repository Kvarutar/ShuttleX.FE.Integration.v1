import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { ButtonV1, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { ButtonV1Modes, type ButtonV1Props, ButtonV1Shadows } from '../../../../src/shared/atoms/Button/V1/props';

const ButtonMeta: Meta<typeof ButtonV1> = {
  title: 'Button',
  component: ButtonV1,
  args: {
    theme: 'light',
    mode: ButtonV1Modes.Mode1,
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
      options: Object.values(ButtonV1Modes),
      control: { type: 'select' },
    },
    shadow: {
      options: [undefined, ...Object.values(ButtonV1Shadows)],
      control: { type: 'select' },
    },
  },
};

export default ButtonMeta;

type ButtonWithHooksProps = { themeName: ThemeContextType['themeMode'] } & ButtonV1Props;

const ButtonWithHooks = ({ themeName, ...props }: ButtonWithHooksProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <ButtonV1 {...props} />;
};

type Story = StoryObj<typeof ButtonWithHooks>;

export const Basic: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <ButtonWithHooks themeName={theme} {...args} />;
  },
};
