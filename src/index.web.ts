import type { ReactNode } from 'react';

/*
 * On Web, browser have dev tools with equivalent functionality, so we don't need to do anything.
 */

const IdentityComponent = ({ children }: { children: ReactNode }) => children;

export const setup = () => {};

export const Wrapper = IdentityComponent;

export const toggleScreenSizer = () => {};

export { defaultDevices } from './defaultDevices';
