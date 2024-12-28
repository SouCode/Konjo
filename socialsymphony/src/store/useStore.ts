import { create } from 'zustand';

interface MyState {
  count: number;
  increment: () => void;
}

const useStore = create<MyState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;
