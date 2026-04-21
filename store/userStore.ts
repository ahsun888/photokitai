import { create } from 'zustand';

type UserStore = {
  isVip: boolean;
  setVip: (value: boolean) => void;

  freeCount: number;
  adCount: number;
  useFreeCount: () => void;
  useAdCount: () => void;
  addAdCount: (n: number) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  isVip: false,
  setVip: (value) => set({ isVip: value }),

  freeCount: 5,
  adCount: 0,

  useFreeCount: () => {
    const { freeCount } = get();
    if (freeCount > 0) set({ freeCount: freeCount - 1 });
  },

  useAdCount: () => {
    const { adCount } = get();
    if (adCount > 0) set({ adCount: adCount - 1 });
  },

  addAdCount: (n) => set((state) => ({ adCount: state.adCount + n })),
}));