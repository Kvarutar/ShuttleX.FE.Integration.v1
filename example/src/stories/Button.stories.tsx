import { type Meta, type StoryObj } from '@storybook/react-native';
import { Button } from 'shuttlex-integration';

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default ButtonMeta;
type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    text: 'Sample text',
    mode: 'mode1',
  },
};

export const White: Story = {
  args: {
    ...Basic.args,
    mode: 'mode2',
  },
};

export const Black: Story = {
  args: {
    ...Basic.args,
    mode: 'mode3',
  },
};

export const WithBorders: Story = {
  args: {
    ...Basic.args,
    mode: 'mode4',
  },
};
