import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { InternetDisconnectedAlert, palettes, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

type InternetDisconnectedAlertStorybookProps = { theme: ThemeContextTypeV1['themeMode'] };

const InternetDisconnectedAlertMeta: Meta<InternetDisconnectedAlertStorybookProps> = {
  title: 'InternetDisconnectedAlert',
  component: InternetDisconnectedAlert,
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

export default InternetDisconnectedAlertMeta;

const InternetDisconnectedAlertWithHooks = ({ theme }: InternetDisconnectedAlertStorybookProps) => {
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <InternetDisconnectedAlert />;
};

type Story = StoryObj<typeof InternetDisconnectedAlert>;

export const BasicExample: Story = {
  render: function Render() {
    const [{ theme }] = useArgs();
    return <InternetDisconnectedAlertWithHooks theme={theme} />;
  },
};
