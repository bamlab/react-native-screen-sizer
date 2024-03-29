import React, { useRef } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { LeftArrow, RightArrow, ScreenInfo } from './assets';

type SwitchScreenFloatingButtonProps = {
  handlePrevScreen: () => void;
  handleNextScreen: () => void;
};

export const SwitchScreenFloatingButton = ({
  handleNextScreen,
  handlePrevScreen,
}: SwitchScreenFloatingButtonProps) => {
  const { top } = useSafeAreaInsets();
  const { width } = useSafeAreaFrame();

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }: PanResponderGestureState) =>
        dx > 0 || dy > 0,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => pan.extractOffset(),
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.buttonsContainer,
        {
          top: top + 12,
          left: width / 2 - 65,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
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
    </Animated.View>
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
