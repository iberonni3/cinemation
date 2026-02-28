import { create } from 'zustand';

interface LoadingState {
    isFullyLoaded: boolean;
    setFullyLoaded: (loaded: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
    isFullyLoaded: false,
    setFullyLoaded: (loaded) => set({ isFullyLoaded: loaded }),
}));
