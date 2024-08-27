import { type Meta } from '@storybook/react-native';
import { useEffect } from 'react';
import { FreeTimeAlert, palettes, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

import { type FreeTimeAlertProps } from '../../../src/shared/molecules/alerts/FreeTimeAlert/props';

type FreeTimeAlertStorybookProps = { theme: ThemeContextTypeV1['themeMode'] } & FreeTimeAlertProps;

const FreeTimeAlertMeta: Meta<FreeTimeAlertStorybookProps> = {
  title: 'FreeTimeAlert',
  component: FreeTimeAlert,
  args: {
    theme: 'light',
    text: 'Free time ends in 5 minutes',
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
  },
};

export default FreeTimeAlertMeta;

const FreeTimeAlertWithHooks = ({ theme, ...props }: FreeTimeAlertStorybookProps) => {
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <FreeTimeAlert {...props} />;
};

export const BasicExample: Meta<FreeTimeAlertStorybookProps> = {
  render: args => <FreeTimeAlertWithHooks {...args} />,
};
