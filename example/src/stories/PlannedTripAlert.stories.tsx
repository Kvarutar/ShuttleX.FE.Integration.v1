import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { palettes, PlannedTripAlert, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { type PlannedTripAlertProps } from '../../../src/shared/Widgets/alerts/PlannedTripAlert/props';

const locales = ['en-US', 'it-IT', 'ar-EG'];

type PlannedTripAlertStorybookProps = { theme: ThemeContextType['themeMode'] } & PlannedTripAlertProps;

const PlannedTripAlertMeta: Meta<PlannedTripAlertStorybookProps> = {
  title: 'PlannedTripAlert',
  component: PlannedTripAlert,
  args: {
    theme: 'light',
    date: new Date(Date.now() + 1000 * 60 * 20),
    locale: locales[0],
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    date: {
      control: { type: 'date' },
    },
    locale: {
      options: locales,
      control: { type: 'select' },
    },
  },
};

export default PlannedTripAlertMeta;

const PlannedTripAlertWithHooks = ({ theme, ...props }: PlannedTripAlertStorybookProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <PlannedTripAlert {...props} />;
};

type Story = StoryObj<typeof PlannedTripAlert>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme, date, locale }] = useArgs();
    return (
      <PlannedTripAlertWithHooks
        theme={theme}
        date={date}
        locale={locale}
        onCancelPress={() => Alert.alert('Attention', 'Cancel button pressed')}
        {...args}
      />
    );
  },
};
