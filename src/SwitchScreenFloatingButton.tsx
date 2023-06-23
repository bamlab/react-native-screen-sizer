import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LeftArrow from '../assets/images/LeftArrow.png';
import RightArrow from '../assets/images/RightArrow.png';
import ScreenInfo from '../assets/images/ScreenInfo.png';

type SwitchScreenFloatingButtonProps = {
  handlePrevScreen: () => void;
  handleNextScreen: () => void;
};

export const SwitchScreenFloatingButton = ({
  handleNextScreen,
  handlePrevScreen,
}: SwitchScreenFloatingButtonProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.buttonsContainer, { top: top }]}>
      <TouchableOpacity onPress={handlePrevScreen} style={styles.iconContainer}>
        <Image source={LeftArrow} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.divider} />
      <View style={styles.iconContainer}>
        <Image source={ScreenInfo} style={styles.icon} />
      </View>
      <View style={styles.divider} />
      <TouchableOpacity onPress={handleNextScreen} style={styles.iconContainer}>
        <Image source={RightArrow} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4545BB',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: 'white',
  },
  iconContainer: {
    padding: 6,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
