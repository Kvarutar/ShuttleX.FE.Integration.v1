import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect, useState } from 'react';
import { GroupedButtonsV1, palettes, type ThemeContextType, useTheme } from 'shuttlex-integration';

import { type GroupedButtonsV1Props } from '../../../src/shared/molecules/GroupedButtons/V1/props';

const GroupedButtonsMeta: Meta<typeof GroupedButtonsV1> = {
  title: 'GroupedButtons',
  component: GroupedButtonsV1,
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
}: { themeName: ThemeContextType['themeMode'] } & GroupedButtonsV1Props) => {
  const { setThemeMode } = useTheme();

  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return (
    <GroupedButtonsV1
      {...args}
      isFirstButtonSelected={isFirstButtonSelected}
      setIsFirstButtonSelected={setIsFirstButtonSelected}
    />
  );
};

type Story = StoryObj<typeof GroupedButtonsV1>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <GroupedButtonsWithHooks {...({ ...args } as GroupedButtonsV1Props)} themeName={theme} />;
  },
};
