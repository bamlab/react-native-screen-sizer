import { registerExpoDevMenuItem } from './integrations/expo-dev-menu';
import { registerReactNativeDevMenuItem } from './integrations/react-native-dev-menu';

export const setup = () => {
  registerExpoDevMenuItem();
  registerReactNativeDevMenuItem();
};
