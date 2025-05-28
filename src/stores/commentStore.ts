import { create } from 'zustand';

interface commentStore {
  //초기상태
  isMoreOpen: boolean;
  isDeleteOpen: boolean;
  isModiOpen: boolean;
  //액션
  setIsMore: (value: boolean) => void;
  setIsDelete: (value: boolean) => void;
  setIsModi: (value: boolean) => void;
}

export const useCommentStore = create<commentStore>((set) => ({
  //초기상태
  isMoreOpen: false,
  isDeleteOpen: false,
  isModiOpen: false,
  //액션
  setIsMore: (value) => set({ isMoreOpen: value }),
  setIsDelete: (value) => set({ isDeleteOpen: value }),
  setIsModi: (value) => set({ isModiOpen: value }),

  //비즈니스 로직
}));
