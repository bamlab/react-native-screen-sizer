import { setup as setupInternal } from "./setup";
import { Wrapper as WrapperInternal } from "./Wrapper";

const IdentityComponent = ({ children }: { children: React.ReactElement }) => children;

export const setup = (__DEV__ ? setupInternal : () => {}) as typeof setupInternal;
export const Wrapper = (__DEV__ ? WrapperInternal : IdentityComponent) as typeof WrapperInternal;
