import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import React, { useEffect, useState } from 'react';
import { GroupedButtons, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { type GroupedButtonsProps } from '../../../src/shared/Widgets/GroupedButtons/props';

const GroupedButtonsMeta: Meta<typeof GroupedButtons> = {
  title: 'GroupedButtons',
  component: GroupedButtons,
  args: {
    theme: 'light',
    firstTextButton: 'Button 1',
    secondTextButton: 'Button 2',
  },
  argTypes: {
    theme: {
      options: Object.keys(palettes),
      control: { type: 'select' },
    },
  },
};

export default GroupedButtonsMeta;

const GroupedButtonsWithHooks = ({
  themeName,
  ...args
}: { themeName: ThemeContextType['themeMode'] } & GroupedButtonsProps) => {
  const { setThemeMode } = useTheme();

  const [isFirstSelectedButton, setIsFirstSelectedButton] = useState(false);

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return (
    <GroupedButtons
      {...args}
      isFirstSelectedButton={isFirstSelectedButton}
      setIsFirstSelectedButton={setIsFirstSelectedButton}
    />
  );
};

type Story = StoryObj<typeof GroupedButtons>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <GroupedButtonsWithHooks {...({ ...args } as GroupedButtonsProps)} themeName={theme} />;
  },
};
