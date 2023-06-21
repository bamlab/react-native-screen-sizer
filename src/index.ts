import type { ReactNode } from 'react';
import { Wrapper as WrapperInternal } from './Wrapper';
import { setup as setupInternal } from './setup';

const IdentityComponent = ({ children }: { children: ReactNode }) => children;

export const setup = (
  __DEV__ ? setupInternal : () => {}
) as typeof setupInternal;

export const Wrapper = (
  __DEV__ ? WrapperInternal : IdentityComponent
) as typeof WrapperInternal;
