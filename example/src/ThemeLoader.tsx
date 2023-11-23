import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import type {} from 'react-native';
import { View } from 'react-native';
import { ThemeProvider } from 'shuttlex-integration';

SplashScreen.preventAutoHideAsync();

const Content = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <View onLayout={onLayoutRootView}>{children}</View>;
};

const ThemeLoader = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <Content>{children}</Content>
  </ThemeProvider>
);

export default ThemeLoader;
