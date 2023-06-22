import * as ExpoDevMenu from 'expo-dev-menu';
import type { ExpoDevMenuItem } from 'expo-dev-menu/build/ExpoDevMenu.types';

import { store } from '../state';

export const devMenuItem: ExpoDevMenuItem = {
  name: '📐 Toggle Screen Sizer',
  callback: () => store.toggleIsEnabled(),
};

/**
 * NOTE: this will override any other custom items, not good!
 */
export const registerExpoDevMenuItem = () => {
  ExpoDevMenu.registerDevMenuItems([devMenuItem]).catch(console.warn);
};
