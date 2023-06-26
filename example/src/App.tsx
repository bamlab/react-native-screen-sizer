import * as React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenSizer from 'react-native-screen-sizer';

ScreenSizer.setup({ activatedByDefault: true });

export default function App() {
  return (
    <SafeAreaProvider>
      <ScreenSizer.Wrapper
        devices={[ScreenSizer.defaultDevices.iPhoneSE2016, 'hostDevice']}
      >
        <View style={styles.container}>
          <Text style={styles.title}>ScreenSizer Demo Application</Text>
          <Button
            onPress={() => ScreenSizer.toggleScreenSizer()}
            title="Toggle Screen Sizer"
          />
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
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 28,
  },
});
