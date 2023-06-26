import { registerExpoDevMenuItem } from './integrations/expo-dev-menu';
import { registerReactNativeDevMenuItem } from './integrations/react-native-dev-menu';
import { store } from './state';

type SetupConfig = {
  activatedByDefault?: boolean;
};

export const setup = ({ activatedByDefault = false }: SetupConfig) => {
  registerExpoDevMenuItem();
  registerReactNativeDevMenuItem();
  if (activatedByDefault) {
    store.toggleIsEnabled();
  }
};
