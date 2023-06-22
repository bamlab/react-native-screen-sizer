import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenSizer from 'react-native-screen-sizer';

ScreenSizer.setup();

export default function App() {
  return (
    <SafeAreaProvider>
      <ScreenSizer.Wrapper>
        <View style={styles.container}>
          <Text>Coucou!</Text>
        </View>
      </ScreenSizer.Wrapper>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
