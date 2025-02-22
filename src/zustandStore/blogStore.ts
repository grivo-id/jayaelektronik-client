import { create } from 'zustand';

type BlogState = {
  selectedCategoryBlogId: string;
  setSelectedCategoryBlogId: (value: string) => void;
};

export const useBlogStore = create<BlogState>()((set, get) => ({
  selectedCategoryBlogId: '',
  setSelectedCategoryBlogId: (value: string) =>
    set({ selectedCategoryBlogId: value }),
}));
