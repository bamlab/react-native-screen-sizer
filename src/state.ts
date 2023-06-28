import { useSyncExternalStore } from 'react';

const createStore = () => {
  type State = {
    isEnabled: boolean;
  };

  let state: State = {
    isEnabled: false,
  };

  const setState = (newState: Partial<State>) => {
    state = { ...state, ...newState };

    for (const listener of listeners) {
      listener();
    }
  };

  const listeners = new Set<() => void>();

  return {
    setIsEnabled: (isEnabled: boolean) => setState({ isEnabled }),
    toggleIsEnabled: () => {
      setState({ isEnabled: !state.isEnabled });
    },
    subscribe: (callback: () => void) => {
      listeners.add(callback);

      return () => {
        listeners.delete(callback);
      };
    },
    getSnapshot: () => state,
  };
};

export const store = createStore();

export const useStore = () => {
  return useSyncExternalStore(store.subscribe, store.getSnapshot);
};
