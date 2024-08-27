import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProviderV1, useThemeV1 } from 'shuttlex-integration';

SplashScreen.preventAutoHideAsync();

const App = (): JSX.Element => {
  return (
    <ThemeProviderV1>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <Content />
      </GestureHandlerRootView>
    </ThemeProviderV1>
  );
};

const Content = (): JSX.Element | null => {
  const [fontsLoaded] = useFonts({
    'Inter Black': require('../../src/assets/fonts/Inter Black.ttf'),
    'Inter Bold': require('../../src/assets/fonts/Inter Bold.ttf'),
    'Inter ExtraBold': require('../../src/assets/fonts/Inter ExtraBold.ttf'),
    'Inter ExtraLight': require('../../src/assets/fonts/Inter ExtraLight.ttf'),
    'Inter Light': require('../../src/assets/fonts/Inter Light.ttf'),
    'Inter Medium': require('../../src/assets/fonts/Inter Medium.ttf'),
    'Inter Regular': require('../../src/assets/fonts/Inter Regular.ttf'),
    'Inter SemiBold': require('../../src/assets/fonts/Inter SemiBold.ttf'),
    'Inter Thin': require('../../src/assets/fonts/Inter Thin.ttf'),
    'Dealerplate California': require('../../src/assets/fonts/Dealerplate California.ttf'),
  });

  const { colors } = useThemeV1();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]} onLayout={onLayoutRootView}>
      <View style={styles.testZone}>{/* Some component */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testZone: {
    backgroundColor: 'blanchedalmond',
    width: 300,
    height: 500,
  },
  gestureHandlerRootView: {
    flex: 1,
  },
});

export default App;
