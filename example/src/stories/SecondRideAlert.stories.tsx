import { type Meta } from '@storybook/react-native';
import { useEffect } from 'react';
import { palettes, SecondRideAlert, type ThemeContextType, useTheme } from 'shuttlex-integration';

type SecondRideAlertStorybookProps = { theme: ThemeContextType['themeMode'] };

const SecondRideAlertMeta: Meta<SecondRideAlertStorybookProps> = {
  title: 'SecondRideAlert',
  component: SecondRideAlert,
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

export default SecondRideAlertMeta;

const SecondRideAlertWithHooks = ({ theme, ...props }: SecondRideAlertStorybookProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <SecondRideAlert {...props} />;
};

export const BasicExample: Meta<SecondRideAlertStorybookProps> = {
  render: args => <SecondRideAlertWithHooks {...args} />,
};
