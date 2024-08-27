import { type Meta } from '@storybook/react-native';
import { useEffect } from 'react';
import { palettes, SecondRideAlert, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

type SecondRideAlertStorybookProps = { theme: ThemeContextTypeV1['themeMode'] };

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
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <SecondRideAlert {...props} />;
};

export const BasicExample: Meta<SecondRideAlertStorybookProps> = {
  render: args => <SecondRideAlertWithHooks {...args} />,
};
