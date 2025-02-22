import { create } from 'zustand';

type BlogState = {
  selectedCategoryBlog: string;
  setSelectedCategoryBlog: (value: string) => void;
};

export const useBlogStore = create<BlogState>()((set, get) => ({
  selectedCategoryBlog: '',
  setSelectedCategoryBlog: (value: string) =>
    set({ selectedCategoryBlog: value }),
}));
