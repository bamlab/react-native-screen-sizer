/* eslint-disable react-native/no-inline-styles */
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaFrameContext,
  SafeAreaInsetsContext,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { SwitchScreenFloatingButton } from './SwitchScreenFloatingButton';
import { defaultDevices } from './defaultDevices';
import { store, useStore } from './state';
import type { Device } from './types';

type WrapperMemoProps = PropsWithChildren<{
  devices?: Array<Device | 'hostDevice'>;
  activatedByDefault?: boolean;
}>;

const WrapperMemo = ({
  children,
  devices,
  activatedByDefault,
}: WrapperMemoProps) => {
  useEffect(() => {
    store.setIsEnabled(!!activatedByDefault);
  }, [activatedByDefault]);

  const { isEnabled } = useStore();

  const realFrame = useSafeAreaFrame();
  const realInsets = useSafeAreaInsets();

  const isPortrait = realFrame.width < realFrame.height;

  const devicesList = useMemo(
    () =>
      devices?.map<Device>((device) => {
        if (device === 'hostDevice') {
          return {
            name: 'Host Device',
            width: realFrame.width,
            height: realFrame.height,
            insets: realInsets,
            landscapeInsets: realInsets,
          };
        } else {
          return isPortrait
            ? device
            : { ...device, width: device.height, height: device.width };
        }
      }) ||
      (isPortrait
        ? defaultDevices.all
        : defaultDevices.all.map((device) => {
            return {
              ...device,
              width: device.height,
              height: device.width,
            };
          })),
    [devices, isPortrait, realFrame, realInsets]
  );

  useEffect(() => {
    devicesList.forEach((device) => {
      if (
        isEnabled &&
        (realFrame.width < device.width || realFrame.height < device.height)
      ) {
        console.warn(
          `ScreenSizer: ${device.name} is too large for the base device. Please choose a bigger base device or a smaller emulated device.`
        );
      }
    });
  }, [devicesList, isEnabled, realFrame]);

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

  const insets = isEnabled
    ? {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        ...(isPortrait
          ? selectedDevice.insets
          : selectedDevice.landscapeInsets),
      }
    : realInsets;

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
    <View style={isEnabled ? styles.wholeScreenEnabled : styles.identity}>
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
                  style={[
                    styles.insetOverlay,
                    { top: 0, height: insets.top, width: '100%' },
                  ]}
                />
                <View
                  style={[
                    styles.insetOverlay,
                    { bottom: 0, height: insets.bottom, width: '100%' },
                  ]}
                />
                <View
                  style={[
                    styles.insetOverlay,
                    {
                      left: 0,
                      top: insets.top,
                      width: insets.left,
                      height: frame.height - insets.top - insets.bottom,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.insetOverlay,
                    {
                      right: 0,
                      top: insets.top,
                      width: insets.right,
                      height: frame.height - insets.top - insets.bottom,
                    },
                  ]}
                />
              </>
            )}
          </View>
        </SafeAreaInsetsContext.Provider>
      </SafeAreaFrameContext.Provider>
      {isEnabled && (
        <>
          <SwitchScreenFloatingButton
            handleNextScreen={handleNextScreen}
            handlePrevScreen={handlePrevScreen}
          />
          <Text style={[styles.deviceInfo, { bottom: realInsets.bottom }]}>
            {selectedDevice.name ? `${selectedDevice.name} | ` : ''}
            {`${selectedDevice.width.toFixed(
              0
            )} x ${selectedDevice.height.toFixed(0)}`}
          </Text>
        </>
      )}
    </View>
  );
};

export const Wrapper = React.memo(WrapperMemo);

const styles = StyleSheet.create({
  identity: {
    /*
     * View styles that are supposed to be "transparent": having this view should be like it being not present in terms of layout / visual impact
     * This is useful because of the "having the same react tree whether enabled or not" requirement
     */
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
    backgroundColor: 'rgba(130, 130, 130, 0.3)',
  },
  fakeScreen: {
    backgroundColor: 'white',
  },
  deviceInfo: {
    backgroundColor: '#FFFFFF99',
    position: 'absolute',
    paddingHorizontal: 4,
    color: 'black',
  },
});
