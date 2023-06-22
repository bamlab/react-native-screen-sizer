import { DevSettings } from 'react-native';

import { store } from '../state';

export const registerReactNativeDevMenuItem = () => {
  DevSettings.addMenuItem('📐 Toggle Screen Sizer', () =>
    store.toggleIsEnabled()
  );
};
