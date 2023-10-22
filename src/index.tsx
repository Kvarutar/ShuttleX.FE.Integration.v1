import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export default function ExampleComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
  },
});
