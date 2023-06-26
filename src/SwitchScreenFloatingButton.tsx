import React, { useRef, useState } from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

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
  const [position, setPosition] = useState({
    x: width / 2 - 65,
    y: top + 12,
  });
  const startMovePosition = useRef({ x: 0, y: 0 });

  const handleStartMove = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    startMovePosition.current = {
      x: pageX - position.x,
      y: pageY - position.y,
    };
  };

  const handleMove = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    setPosition({
      x: pageX - startMovePosition.current.x,
      y: pageY - startMovePosition.current.y,
    });
  };

  return (
    <View
      style={[styles.buttonsContainer, { top: position.y, left: position.x }]}
      onTouchStart={handleStartMove}
      onTouchMove={handleMove}
    >
      <TouchableOpacity onPress={handlePrevScreen} style={styles.iconContainer}>
        <Image
          source={require('../assets/images/LeftArrow.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.divider} />
      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/images/ScreenInfo.png')}
          style={styles.icon}
        />
      </View>
      <View style={styles.divider} />
      <TouchableOpacity onPress={handleNextScreen} style={styles.iconContainer}>
        <Image
          source={require('../assets/images/RightArrow.png')}
          style={styles.icon}
        />
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
