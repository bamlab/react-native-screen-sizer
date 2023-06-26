/* eslint-disable react-native/no-inline-styles */
import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SafeAreaFrameContext,
  SafeAreaInsetsContext,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { SwitchScreenFloatingButton } from './SwitchScreenFloatingButton';
import { defaultDevices } from './defaultDevices';
import { useStore } from './state';
import type { Device } from './types';

type WrapperMemoProps = PropsWithChildren<{
  devices?: Array<Device>;
}>;

const WrapperMemo = ({ children, devices }: WrapperMemoProps) => {
  const { isEnabled } = useStore();
  const devicesList = devices || defaultDevices.all;
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const selectedDevice = devicesList[selectedDeviceIndex];

  if (selectedDevice === undefined) {
    throw new Error(
      `ScreenSizer: No screen config for index ${selectedDeviceIndex}.`
    );
  }

  const handleNextScreen = () => {
    setSelectedDeviceIndex((index) => (index + 1) % devicesList.length);
  };
  const handlePrevScreen = () => {
    setSelectedDeviceIndex(
      (index) => (index + devicesList.length - 1) % devicesList.length
    );
  };

  const realInsets = useSafeAreaInsets();

  const insets = isEnabled
    ? {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        ...selectedDevice.insets,
      }
    : realInsets;

  const realFrame = useSafeAreaFrame();

  const frame = isEnabled
    ? {
        x: 0,
        y: 0,
        height: selectedDevice.height,
        width: selectedDevice.width,
      }
    : realFrame;

  /*
   * ☢️ This tree must be the same whether isEnabled or not, otherwise children state is lost when toggling
   */
  return (
    <View
      style={isEnabled ? styles.wholeScreenEnabled : styles.wholeScreenDisabled}
    >
      <SafeAreaFrameContext.Provider value={frame}>
        <SafeAreaInsetsContext.Provider value={insets}>
          <View
            style={[
              styles.fakeScreen,
              { width: frame.width, height: frame.height },
            ]}
          >
            {children}
            {isEnabled && (
              <>
                <View
                  style={[styles.insetOverlay, { top: 0, height: insets.top }]}
                />
                <View
                  style={[
                    styles.insetOverlay,
                    { bottom: 0, height: insets.bottom },
                  ]}
                />
              </>
            )}
          </View>
        </SafeAreaInsetsContext.Provider>
      </SafeAreaFrameContext.Provider>
      {isEnabled && (
        <SwitchScreenFloatingButton
          handleNextScreen={handleNextScreen}
          handlePrevScreen={handlePrevScreen}
        />
      )}
    </View>
  );
};

export const Wrapper = React.memo(WrapperMemo);

const styles = StyleSheet.create({
  wholeScreenDisabled: {
    width: '100%',
    height: '100%',
  },
  wholeScreenEnabled: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  insetOverlay: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(130, 130, 130, 0.3)',
  },
  fakeScreen: {
    backgroundColor: 'white',
  },
});
