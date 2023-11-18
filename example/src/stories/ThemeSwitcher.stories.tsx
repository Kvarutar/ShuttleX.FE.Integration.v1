import { type Meta, type StoryObj } from '@storybook/react-native';

import ThemeSwitcher from '../ThemeSwitcher';

const ThemeSwitcherMeta: Meta<typeof ThemeSwitcher> = {
  title: 'ThemeSwitcher',
  component: ThemeSwitcher,
};

export default ThemeSwitcherMeta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Basic: Story = {};
