import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { DatePickerV1, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { DatePickerDisplay, type DatePickerPropsV1 } from '../../../src/shared/molecules/DatePicker/props';

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(date)
    .replace(/[^+\d]/g, '-');

const DatePickerMeta: Meta<typeof DatePickerV1> = {
  title: 'DatePicker',
  component: DatePickerV1,
  decorators: [
    Story => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  args: {
    theme: 'light',
    display: DatePickerDisplay.Calendar,
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    display: {
      options: Object.values(DatePickerDisplay),
      control: { type: 'select' },
    },
  },
};

export default DatePickerMeta;

type DatePickerWithHooksProps = { themeName: ThemeContextType['themeMode'] } & DatePickerPropsV1;

const DatePickerWithHooks = ({ themeName, ...props }: DatePickerWithHooksProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <DatePickerV1 {...props} />;
};

type Story = StoryObj<typeof DatePickerV1>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return (
      <DatePickerWithHooks
        onDateSelect={() => {}}
        {...args}
        themeName={theme}
        placeholder="Date of birth"
        formatDate={formatDate}
      />
    );
  },
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});
