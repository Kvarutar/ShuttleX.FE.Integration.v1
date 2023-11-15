import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, GroupedBrandIcon, ThemeProvider, useTheme } from 'shuttlex-integration';

SplashScreen.preventAutoHideAsync();

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
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
  });

  const { colors, setThemeMode } = useTheme();

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
      <GroupedBrandIcon />
      <Button text="Change theme to test" onPress={() => setThemeMode('test')} />
      <Button text="Change theme to dark" onPress={() => setThemeMode('dark')} />
      <Button text="Change theme to light" mode="mode2" onPress={() => setThemeMode('light')} />
      <Button text="Test 33" mode="mode3" />
      <Button text="Test 444" mode="mode4" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});

export default App;
