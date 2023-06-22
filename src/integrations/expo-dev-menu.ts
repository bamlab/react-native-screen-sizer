import { store } from '../state';

/**
 * NOTE: this will override any other custom items, not good!
 */
export const registerExpoDevMenuItem = async () => {
  try {
    const ExpoDevMenu = await import('expo-dev-menu');

    await ExpoDevMenu.registerDevMenuItems([
      {
        name: '📐 Toggle Screen Sizer',
        callback: () => store.toggleIsEnabled(),
      },
    ]);
  } catch (error) {
    console.log('Error with expo-dev-menu', error);
  }
};
