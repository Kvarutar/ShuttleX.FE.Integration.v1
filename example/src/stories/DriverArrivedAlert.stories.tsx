import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { DriverArrivedAlert, palettes, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

type DriverArrivedAlertStorybookProps = { theme: ThemeContextTypeV1['themeMode'] };

const DriverArrivedAlertMeta: Meta<DriverArrivedAlertStorybookProps> = {
  title: 'DriverArrivedAlert',
  component: DriverArrivedAlert,
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

export default DriverArrivedAlertMeta;

const DriverArrivedAlertWithHooks = ({ theme }: DriverArrivedAlertStorybookProps) => {
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <DriverArrivedAlert />;
};

type Story = StoryObj<typeof DriverArrivedAlert>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();
    return <DriverArrivedAlertWithHooks theme={theme} {...args} />;
  },
};
