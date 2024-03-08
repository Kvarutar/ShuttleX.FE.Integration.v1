import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import Alert from '../../../src/shared/Widgets/alerts/Alert';
import { type AlertProps } from '../../../src/shared/Widgets/alerts/Alert/props';

type AlertStorybookProps = AlertProps & { theme: ThemeContextType['themeMode'] };

const AlertMeta: Meta<AlertStorybookProps> = {
  title: 'Alert',
  component: Alert,
  args: {
    theme: 'light',
    isClosable: true,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
  },
};

export default AlertMeta;

const AlertWithHooks = ({ theme, ...args }: AlertStorybookProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <Alert {...args}>{args.children}</Alert>;
};

type Story = StoryObj<typeof Alert>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme, children }] = useArgs();
    return (
      <AlertWithHooks theme={theme} style={styles.container} {...args}>
        {children}
      </AlertWithHooks>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    width: 320,
  },
});
