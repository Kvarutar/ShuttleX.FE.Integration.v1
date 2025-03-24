import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { DateTimePicker, DateTimePickerDisplay, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';
import type { DateTimePickerProps } from '../../../src/shared/molecules/DateTimePicker/types';

const DatePickerMeta: Meta<typeof DateTimePicker> = {
  title: 'DatePicker',
  component: DateTimePicker,
  decorators: [
    Story => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  args: {
    theme: 'light',
    display: DateTimePickerDisplay.Calendar,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    display: {
      options: Object.values(DateTimePickerDisplay),
      control: { type: 'select' },
    },
  },
};

export default DatePickerMeta;

type DatePickerWithHooksProps = { themeName: ThemeContextType['themeMode'] } & DateTimePickerProps;

const DatePickerWithHooks = ({ themeName, ...props }: DatePickerWithHooksProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <DateTimePicker {...props} />;
};

type Story = StoryObj<typeof DateTimePicker>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <DatePickerWithHooks onValueSelect={() => {}} {...args} themeName={theme} />;
  },
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});
