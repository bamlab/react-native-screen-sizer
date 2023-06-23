import { store } from '../state';

/**
 * NOTE: this will override any other custom items, not good!
 */
export const registerExpoDevMenuItem = async () => {
  let ExpoDevMenu;
  try {
    ExpoDevMenu = await import('expo-dev-menu');
  } catch {
    return;
  }

  try {
    await ExpoDevMenu.registerDevMenuItems([
      {
        name: '📐 Toggle Screen Sizer',
        callback: () => store.toggleIsEnabled(),
      },
    ]);
  } catch (error) {
    console.warn(
      'ScreenSizer: registration of item in expo dev menu failed',
      error
    );
  }
};
