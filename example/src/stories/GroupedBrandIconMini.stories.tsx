import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { GroupedBrandIconMini, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

type GroupedBrandIconMiniStorybookProps = { theme: ThemeContextType['themeMode'] };

const GroupedBrandIconMeta: Meta<GroupedBrandIconMiniStorybookProps> = {
  title: 'GroupedBrandIconMini',
  component: GroupedBrandIconMini,
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

export default GroupedBrandIconMeta;

const GroupedBrandIconWithHooks = ({ theme }: GroupedBrandIconMiniStorybookProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <GroupedBrandIconMini />;
};

export const BasicExample: StoryObj = {
  render: function Render() {
    const [{ theme }] = useArgs();

    return <GroupedBrandIconWithHooks theme={theme} />;
  },
};
