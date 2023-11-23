import ThemeLoader from '../src/ThemeLoader';
import { View } from 'react-native';

export const decorators = [
  Story => (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <ThemeLoader>
        <Story />
      </ThemeLoader>
    </View>
  ),
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
