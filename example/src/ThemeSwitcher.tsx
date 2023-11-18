import React, { View } from 'react-native';
import { Button, useTheme } from 'shuttlex-integration';

const ThemeSwitcher = (): JSX.Element | null => {
  const { setThemeMode } = useTheme();

  return (
    <View>
      <Button text="Change theme to test" onPress={() => setThemeMode('test')} />
      <Button text="Change theme to dark" onPress={() => setThemeMode('dark')} />
      <Button text="Change theme to light" mode="mode2" onPress={() => setThemeMode('light')} />
      <Button text="Test 33" mode="mode3" />
      <Button text="Test 444" mode="mode4" />
    </View>
  );
};

export default ThemeSwitcher;
