import type { ReactNode } from 'react';
import { Wrapper as WrapperInternal } from './Wrapper';
import { setup as setupInternal } from './setup';
import { store } from './state';

const IdentityComponent = ({ children }: { children: ReactNode }) => children;

export const setup = (
  __DEV__ ? setupInternal : () => {}
) as typeof setupInternal;

export const Wrapper = (
  __DEV__ ? WrapperInternal : IdentityComponent
) as typeof WrapperInternal;

export const toggleIsEnabled = __DEV__
  ? () => store.toggleIsEnabled()
  : () => {};

export { defaultDevices } from './defaultDevices';
