import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ThemeLoader from '../src/ThemeLoader';
import { StyleSheet, View } from 'react-native';

export const decorators = [
  Story => (
    <View style={styles.wrapper}>
      <ThemeLoader>
        <GestureHandlerRootView style={styles.gestureHandlerRootView}>
          <Story />
        </GestureHandlerRootView>
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

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  gestureHandlerRootView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
