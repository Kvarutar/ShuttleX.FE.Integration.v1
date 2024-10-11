import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { palettes, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

import AlertV1 from '../../../src/shared/molecules/alerts/Alert/V1';
import { type AlertV1Props } from '../../../src/shared/molecules/alerts/Alert/V1/props';

type AlertStorybookProps = AlertV1Props & { theme: ThemeContextTypeV1['themeMode'] };

const AlertMeta: Meta<AlertStorybookProps> = {
  title: 'Alert',
  component: AlertV1,
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
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return <AlertV1 {...args}>{args.children}</AlertV1>;
};

type Story = StoryObj<typeof AlertV1>;

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
