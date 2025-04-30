import { create } from 'zustand';
import {
  VisibilityState,
  ColumnSizingState,
  OnChangeFn,
} from '@tanstack/react-table';
import { getDefaultColumnVisibility } from '..//coloums';

// 제네릭 타입 T는 각 테이블에서 사용할 데이터 타입입니다 (Slope, SlopeOutlier 등)
export interface TableState<T> {
  // 테이블 상태
  columnVisibility: VisibilityState;
  columnSizing: ColumnSizingState;
  totalCount: number;
  searchQuery: string;
  inputValue: string;
  selectedRegion: { city: string; county: string } | null;

  // 모달 상태
  isModalOpen: boolean;
  isRegionModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;

  // 선택된 행
  selectedRow: T | null;

  // 액션 - 타입 수정됨
  setColumnVisibility: OnChangeFn<VisibilityState>;
  setColumnSizing: OnChangeFn<ColumnSizingState>;
  setTotalCount: (count: number) => void;
  setSearchQuery: (query: string) => void;
  setInputValue: (value: string) => void;
  setSelectedRegion: (region: { city: string; county: string } | null) => void;

  openModal: () => void;
  closeModal: () => void;
  openRegionModal: () => void;
  closeRegionModal: () => void;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  openEditModal: () => void;
  closeEditModal: () => void;

  setSelectedRow: (row: T | null) => void;
  resetFilters: () => void;
}

// 테이블 스토어 팩토리 함수
export function createTableStore<T>(initialState: Partial<TableState<T>> = {}) {
  return create<TableState<T>>((set) => ({
    // 기본 상태
    columnVisibility: getDefaultColumnVisibility(),
    columnSizing: {},
    totalCount: 0,
    searchQuery: '',
    inputValue: '',
    selectedRegion: null,

    isModalOpen: false,
    isRegionModalOpen: false,
    isDeleteModalOpen: false,
    isEditModalOpen: false,

    selectedRow: null,

    // 액션 메서드들 - TanStack Table 호환 타입으로 수정
    setColumnVisibility: (updaterOrValue) => {
      // OnChangeFn 타입 호환을 위한 함수 구현
      if (typeof updaterOrValue === 'function') {
        set((state) => ({
          columnVisibility: updaterOrValue(state.columnVisibility),
        }));
      } else {
        set({ columnVisibility: updaterOrValue });
      }
    },

    setColumnSizing: (updaterOrValue) => {
      // OnChangeFn 타입 호환을 위한 함수 구현
      if (typeof updaterOrValue === 'function') {
        set((state) => ({
          columnSizing: updaterOrValue(state.columnSizing),
        }));
      } else {
        set({ columnSizing: updaterOrValue });
      }
    },

    setTotalCount: (count) => set({ totalCount: count }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setInputValue: (value) => set({ inputValue: value }),
    setSelectedRegion: (region) => set({ selectedRegion: region }),

    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    openRegionModal: () => set({ isRegionModalOpen: true }),
    closeRegionModal: () => set({ isRegionModalOpen: false }),
    openDeleteModal: () => set({ isDeleteModalOpen: true }),
    closeDeleteModal: () => set({ isDeleteModalOpen: false }),
    openEditModal: () => set({ isEditModalOpen: true }),
    closeEditModal: () => set({ isEditModalOpen: false }),

    setSelectedRow: (row) => set({ selectedRow: row }),

    resetFilters: () =>
      set({
        searchQuery: '',
        inputValue: '',
        selectedRegion: null,
        columnVisibility: getDefaultColumnVisibility(),
      }),

    // 초기 상태 오버라이드
    ...initialState,
  }));
}

// 특정 타입의 테이블 스토어 생성 예시
// export const useSlopeOutlierStore = createTableStore<SlopeOutlier>();
