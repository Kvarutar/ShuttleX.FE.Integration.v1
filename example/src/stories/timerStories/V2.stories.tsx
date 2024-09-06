import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { palettes, type ThemeContextType } from 'shuttlex-integration';
import { Timer, useTheme } from 'shuttlex-integration';

import {
  TimerColorModes,
  type TimerProps,
  TimerSizesModes,
} from '../../../../src/shared/molecules/timerAndStopwatch/Timer/V2/props';

const sizeModes: TimerProps['sizeMode'][] = Object.values(TimerSizesModes);
const colorModes: TimerProps['colorMode'][] = Object.values(TimerColorModes);

const TimerMeta: Meta<typeof Timer> = {
  title: 'Timer',
  component: Timer,
  args: {
    theme: 'light',
    isWithMarks: false,
    sizeMode: 'big',
    colorMode: 'main',
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    sizeMode: {
      options: sizeModes,
      control: { type: 'select' },
    },
    colorMode: {
      options: colorModes,
      control: { type: 'select' },
    },
    isWithMarks: {
      control: { type: 'boolean' },
    },
  },
};

export default TimerMeta;

const TimerWithHooks = ({
  themeName,
  sizeMode,
  colorMode,
  isWithMarks,
}: {
  themeName: ThemeContextType['themeMode'];
  sizeMode: TimerProps['sizeMode'];
  colorMode: TimerProps['colorMode'];
  isWithMarks: boolean;
}) => {
  const { setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return (
    <Timer
      time={2 * 60 * 1000}
      sizeMode={sizeMode}
      colorMode={colorMode}
      isWithMarks={isWithMarks}
      onAfterCountdownEnds={() => Alert.alert('Attention', 'onAfterCountdownEndsReached!')}
    />
  );
};

type Story = StoryObj<typeof Timer>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ isWithMarks, theme, sizeMode, colorMode }] = useArgs();

    return (
      <View>
        <TimerWithHooks
          {...args}
          themeName={theme}
          isWithMarks={isWithMarks}
          colorMode={colorMode}
          sizeMode={sizeMode}
        />
      </View>
    );
  },
};
