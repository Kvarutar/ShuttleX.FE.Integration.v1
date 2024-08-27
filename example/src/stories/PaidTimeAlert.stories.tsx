import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { PaidTimeAlert, palettes, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

import { type PaidTimeAlertProps } from '../../../src/shared/molecules/alerts/PaidTimeAlert/props';

type PaidTimeAlertStorybookProps = { theme: ThemeContextTypeV1['themeMode'] } & PaidTimeAlertProps;

const PaidTimeAlertMeta: Meta<PaidTimeAlertStorybookProps> = {
  title: 'PaidTimeAlert',
  component: PaidTimeAlert,
  args: {
    theme: 'light',
    currency: '$2',
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
  },
};

export default PaidTimeAlertMeta;

const PaidTimeAlertWithHooks = ({ theme, ...props }: PaidTimeAlertStorybookProps) => {
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <PaidTimeAlert {...props} />;
};

type Story = StoryObj<typeof PaidTimeAlert>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme, currency }] = useArgs();
    return <PaidTimeAlertWithHooks theme={theme} currency={currency} {...args} />;
  },
};
