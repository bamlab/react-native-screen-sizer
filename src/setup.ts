import { registerExpoDevMenuItem } from './integrations/expo-dev-menu';

type Config = {
  registerExpoDevMenuItem?: boolean;
  patchRNKeyboard?: boolean;
};

export const setup = (config?: Config) => {
  if (config?.registerExpoDevMenuItem !== false) {
    registerExpoDevMenuItem();
  }
};
