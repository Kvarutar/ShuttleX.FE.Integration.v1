import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { Bar, CalendarIcon, palettes, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

import { BarModes, type BarProps } from '../../../src/shared/atoms/Bar/types';

const modes: BarProps['mode'][] = Object.values(BarModes);

type BarStorybookProps = BarProps & { theme: ThemeContextTypeV1['themeMode'] };

const BarMeta: Meta<BarStorybookProps> = {
  title: 'Bar',
  component: Bar,
  args: {
    theme: 'light',
    mode: BarModes.Default,
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

export default BarMeta;

const BarWithHooks = ({ themeName, mode }: { themeName: ThemeContextTypeV1['themeMode']; mode: BarProps['mode'] }) => {
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <Bar children={<CalendarIcon />} mode={mode} />;
};

type Story = StoryObj<typeof Bar>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme, mode }] = useArgs();

    return <BarWithHooks {...args} themeName={theme} mode={mode} />;
  },
};
