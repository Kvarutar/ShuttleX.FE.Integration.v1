import { type Meta } from '@storybook/react-native';
import { useEffect } from 'react';
import { palettes, RideHasFinishedAlert, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { type RideHasFinishedAlertProps } from '../../../src/shared/molecules/alerts/RideHasFinishedAlert/props';

type RideHasFinishedAlertStorybookProps = { theme: ThemeContextType['themeMode'] } & RideHasFinishedAlertProps;

const RideHasFinishedAlertMeta: Meta<RideHasFinishedAlertStorybookProps> = {
  title: 'RideHasFinishedAlert',
  component: RideHasFinishedAlert,
  args: {
    theme: 'light',
    name: 'Arnold',
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
  },
};

export default RideHasFinishedAlertMeta;

const RideHasFinishedAlertWithHooks = ({ theme, ...props }: RideHasFinishedAlertStorybookProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <RideHasFinishedAlert {...props} />;
};

export const BasicExample: Meta<RideHasFinishedAlertStorybookProps> = {
  render: args => <RideHasFinishedAlertWithHooks {...args} />,
};
