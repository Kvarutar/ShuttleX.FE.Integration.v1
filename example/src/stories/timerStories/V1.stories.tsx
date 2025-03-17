import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { palettes, type ThemeContextType, TimerV1, useTheme } from 'shuttlex-integration';

import { TimerV1Modes, type TimerV1Props } from '../../../../src/shared/molecules/timerAndStopwatch/Timer/V1/props';

const modes: TimerV1Props['mode'][] = Object.values(TimerV1Modes);

const SwipeButtonMeta: Meta<typeof TimerV1> = {
  title: 'Timer',
  component: TimerV1,
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
  themeName: ThemeContextType['themeMode'];
  mode: TimerV1Props['mode'];
}) => {
  const { setThemeMode, colors } = useTheme();
  const { primaryGradientStartColor, primaryColor } = colors;

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return (
    <TimerV1
      initialDate={new Date(new Date().getTime() + 120000)}
      startColor={primaryGradientStartColor}
      endColor={primaryColor}
      mode={mode}
      onAfterCountdownEnds={() => Alert.alert('Attention', 'onAfterCountdownEndsReached!')}
    />
  );
};

type Story = StoryObj<typeof TimerV1>;

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
