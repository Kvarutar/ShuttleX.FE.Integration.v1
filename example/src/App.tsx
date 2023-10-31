import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  ContainedButton,
  GroupedBrandIcon,
  TextButton,
} from 'shuttlex-integration';

export default function App() {
  return (
    <View style={styles.container}>
      <GroupedBrandIcon />
      <ContainedButton />
      <TextButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
