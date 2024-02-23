import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { palettes, type ThemeContextType, TimePicker, useTheme } from 'shuttlex-integration';

const formatTime = (time: Date): string =>
  new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(time);

const TimePickerMeta: Meta<typeof TimePicker> = {
  title: 'TimePicker',
  component: TimePicker,
  decorators: [
    Story => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
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

export default TimePickerMeta;

type TimePickerWithHooksProps = { themeName: ThemeContextType['themeMode'] };

const TimePickerWithHooks = ({ themeName }: TimePickerWithHooksProps) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return <TimePicker placeholder="Time" onTimeSelect={() => {}} formatTime={formatTime} />;
};

type Story = StoryObj<typeof TimePicker>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <TimePickerWithHooks {...args} themeName={theme} />;
  },
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});
