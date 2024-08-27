import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect, useState } from 'react';
import { GroupedButtons, palettes, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

import { type GroupedButtonsProps } from '../../../src/shared/molecules/GroupedButtons/props';

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
}: { themeName: ThemeContextTypeV1['themeMode'] } & GroupedButtonsProps) => {
  const { setThemeMode } = useThemeV1();

  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return (
    <GroupedButtons
      {...args}
      isFirstButtonSelected={isFirstButtonSelected}
      setIsFirstButtonSelected={setIsFirstButtonSelected}
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
