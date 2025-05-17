import { create } from 'zustand';
import {
  VisibilityState,
  ColumnSizingState,
  OnChangeFn,
  RowSelectionState,
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
  grade: string;

  // 행 선택 상태 추가
  rowSelection: RowSelectionState;

  // 모달 상태
  isModalOpen: boolean;
  isRegionModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;

  // 선택된 행 - 단일 선택에서 다중 선택으로 변경
  selectedRow: T | null; // 기존 호환성을 위해 유지
  selectedRows: T[]; // 다중 선택을 위한 배열 추가

  // 액션 - 타입 수정됨
  setColumnVisibility: OnChangeFn<VisibilityState>;
  setColumnSizing: OnChangeFn<ColumnSizingState>;
  setTotalCount: (count: number) => void;
  setSearchQuery: (query: string) => void;
  setInputValue: (value: string) => void;
  setSelectedRegion: (region: { city: string; county: string } | null) => void;
  setGrade: (value: string) => void;

  // 행 선택 상태 설정 함수 추가
  setRowSelection: OnChangeFn<RowSelectionState>;
  setSelectedRows: (rows: T[]) => void;

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
    grade: '선택안함',

    // 행 선택 상태 초기화
    rowSelection: {},

    isModalOpen: false,
    isRegionModalOpen: false,
    isDeleteModalOpen: false,
    isEditModalOpen: false,

    selectedRow: null,
    selectedRows: [], // 다중 선택 배열 초기화

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

    // 행 선택 상태 설정 함수 추가
    setRowSelection: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        set((state) => ({
          rowSelection: updaterOrValue(state.rowSelection),
        }));
      } else {
        set({ rowSelection: updaterOrValue });
      }
    },

    setSelectedRows: (rows) => set({ selectedRows: rows }),

    setTotalCount: (count) => set({ totalCount: count }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setInputValue: (value) => set({ inputValue: value }),
    setSelectedRegion: (region) => set({ selectedRegion: region }),
    setGrade: (grade) => set({ grade: grade }),

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
        rowSelection: {}, // 선택 상태도 초기화
        selectedRows: [], // 선택된 행 배열도 초기화
      }),

    // 초기 상태 오버라이드
    ...initialState,
  }));
}
