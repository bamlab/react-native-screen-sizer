/* eslint-disable react-native/no-inline-styles */
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SafeAreaFrameContext,
  SafeAreaInsetsContext,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { deviceSizes } from './sizes';
import { useStore } from './state';
import type { ScreenDescription } from './types';

type WrapperMemoProps = PropsWithChildren<{
  device?: ScreenDescription;
}>;

const WrapperMemo = ({ children, device }: WrapperMemoProps) => {
  const { isEnabled } = useStore();
  const screenDescription: ScreenDescription =
    device || deviceSizes['iPhone SE 2016'];

  const realInsets = useSafeAreaInsets();

  const insets = isEnabled
    ? {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        ...screenDescription.insets,
      }
    : realInsets;

  const realFrame = useSafeAreaFrame();

  const frame = isEnabled
    ? {
        x: 0,
        y: 0,
        height: screenDescription.height,
        width: screenDescription.width,
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
              {
                width: frame.width,
                height: frame.height,
              },
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
