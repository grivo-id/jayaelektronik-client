import { create } from 'zustand';

type CategoryState = {
  categoryMenu: boolean;
  setCategoryMenu: (value: boolean) => void;
};

export const useCategoryStore = create<CategoryState>()((set, get) => ({
  categoryMenu: false,

  setCategoryMenu: (value: boolean) => set({ categoryMenu: value }),
}));
