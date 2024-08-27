import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryObj } from '@storybook/react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { palettes, PhoneInput, type ThemeContextTypeV1, useThemeV1 } from 'shuttlex-integration';

const PhoneInputMeta: Meta<typeof PhoneInput> = {
  title: 'PhoneInput',
  component: PhoneInput,
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

export default PhoneInputMeta;

const PhoneInputWithHooks = ({ themeName }: { themeName: ThemeContextTypeV1['themeMode'] }) => {
  const { setThemeMode } = useThemeV1();

  useEffect(() => {
    setThemeMode(themeName);
  }, [themeName, setThemeMode]);

  return (
    <PhoneInput
      getPhoneNumber={() => {}}
      onFlagPress={() => {}}
      flagState={{
        countryCode: 'AD',
        countryCodeIso: '',
        countryName: '',
        currency: '',
        phoneMask: '',
        icc: 0,
        iccPrefix: undefined,
        prefix: undefined,
        size: 0,
      }}
    />
  );
};

type Story = StoryObj<typeof PhoneInput>;

export const BasicExample: Story = {
  render: function Render(args) {
    const [{ theme }] = useArgs();

    return <PhoneInputWithHooks {...args} themeName={theme} />;
  },
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});
