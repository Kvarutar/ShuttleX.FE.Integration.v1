import { type Meta, type StoryObj } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { GroupedBrandIcon } from 'shuttlex-integration';

const GroupedBrandIconMeta: Meta<typeof GroupedBrandIcon> = {
  title: 'GroupedBrandIcon',
  component: GroupedBrandIcon,
  decorators: [
    Story => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default GroupedBrandIconMeta;

type Story = StoryObj<typeof GroupedBrandIcon>;

export const BasicExample: Story = {
  args: {},
};

export const AnotherExample: Story = {
  args: {},
};

export const MainExample: Story = {
  args: {},
};
