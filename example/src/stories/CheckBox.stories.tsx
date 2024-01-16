import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { CheckBox, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

const CheckBoxMeta: Meta<typeof CheckBox> = {
  title: 'CheckBox',
  component: CheckBox,
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

export default CheckBoxMeta;

const CheckBoxWithHooks = ({ themeName }: { themeName: ThemeContextType['themeMode'] }) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <CheckBox getCheckValue={() => {}} />;
};

type Story = StoryObj<typeof CheckBox>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <CheckBoxWithHooks {...args} themeName={theme} />;
  },
};
