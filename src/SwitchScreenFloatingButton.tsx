import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SwitchScreenFloatingButton = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.buttonsContainer, { top: top }]}>
      <Button title="<" color="black" />
      <View style={styles.divider} />
      <Button title=">" color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD7A1BB',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    gap: 4,
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: 'black',
    borderRadius: 1,
  },
});
