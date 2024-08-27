import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { palettes, type ThemeContextTypeV1, Timer, useThemeV1 } from 'shuttlex-integration';

import { TimerModes, type TimerProps } from '../../../src/shared/molecules/timerAndStopwatch/Timer/props';

const modes: TimerProps['mode'][] = Object.values(TimerModes);

const SwipeButtonMeta: Meta<typeof Timer> = {
  title: 'Timer',
  component: Timer,
  args: {
    theme: 'light',
    mode: 'normal',
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
    mode: {
      options: modes,
      control: { type: 'select' },
    },
  },
};

export default SwipeButtonMeta;

const TimerWithHooks = ({
  themeName,
  mode,
}: {
  themeName: ThemeContextTypeV1['themeMode'];
  mode: TimerProps['mode'];
}) => {
  const { setThemeMode, colors } = useThemeV1();
  const { primaryGradientStartColor, primaryColor } = colors;

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return (
    <Timer
      initialDate={new Date(new Date().getTime() + 120000)}
      startColor={primaryGradientStartColor}
      endColor={primaryColor}
      mode={mode}
      onAfterCountdownEnds={() => Alert.alert('Attention', 'onAfterCountdownEndsReached!')}
    />
  );
};

type Story = StoryObj<typeof Timer>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme, mode }] = useArgs();

    return (
      <View>
        <TimerWithHooks {...args} themeName={theme} mode={mode} />
      </View>
    );
  },
};
