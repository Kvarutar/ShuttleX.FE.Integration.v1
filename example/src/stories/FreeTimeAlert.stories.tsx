import { type Meta } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { FreeTimeAlert, FreeTimeAlertType, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { AlertRunsOn } from '../../../src/shared/molecules/alerts/Alert/props';
import { type FreeTimeAlertProps } from '../../../src/shared/molecules/alerts/FreeTimeAlert/props';

type FreeTimeAlertStorybookProps = { theme: ThemeContextType['themeMode'] } & Omit<FreeTimeAlertProps, 'time'> & {
    timeNumber: FreeTimeAlertProps['time']['number'];
    timeType: FreeTimeAlertProps['time']['type'];
  };

const FreeTimeAlertMeta: Meta<FreeTimeAlertStorybookProps> = {
  title: 'FreeTimeAlert',
  component: FreeTimeAlert,
  args: {
    theme: 'light',
    runsOn: AlertRunsOn.Passenger,
    timeNumber: 3,
    timeType: FreeTimeAlertType.Minutes,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    runsOn: {
      options: Object.values(AlertRunsOn),
      control: { type: 'select' },
    },
    timeType: {
      options: Object.values(FreeTimeAlertType),
      control: { type: 'select' },
    },
  },
};

export default FreeTimeAlertMeta;

const FreeTimeAlertWithHooks = ({ theme, timeNumber, timeType, ...props }: FreeTimeAlertStorybookProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <FreeTimeAlert time={{ number: timeNumber, type: timeType }} {...props} />;
};

export const BasicExample: Meta<FreeTimeAlertStorybookProps> = {
  render: args => <FreeTimeAlertWithHooks {...args} />,
};
