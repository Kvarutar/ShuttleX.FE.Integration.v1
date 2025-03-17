import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { GroupedBrandIcon, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

const GroupedBrandIconMeta: Meta<typeof GroupedBrandIcon> = {
  title: 'GroupedBrandIcon',
  component: GroupedBrandIcon,
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

const GroupedBrandIconWithHooks = ({ themeName }: { themeName: ThemeContextType['themeMode'] }) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <GroupedBrandIcon />;
};

type Story = StoryObj<typeof GroupedBrandIcon>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <GroupedBrandIconWithHooks {...args} themeName={theme} />;
  },
};
