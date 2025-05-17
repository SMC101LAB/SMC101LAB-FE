//목차 토글 관련 타입
export type SelectPageState = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];
// 목차 선택 페이지 관련 타입
export interface SideComponentsProps {
  selectPage: SelectPageState;
  ChooseIndex: (num: number) => void;
}

// 검색 필터 검색창 관련 props 타입
export interface DebouncedInputProps {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  [key: string]: any;
}

//페이지 네이션 타입
export interface PaginationProps {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
  onPageSizeChange: (size: number) => void;
}

//급경사지 테이블 관련 props타입
import {
  Table as TableInstance,
  Row as RowInstance,
} from '@tanstack/react-table';

import { Virtualizer } from '@tanstack/react-virtual';
import { Slope } from '../../apis/slopeMap';

export interface DataTableProps {
  tableContainerRef: React.RefObject<HTMLDivElement>;
  handleScroll: () => void;
  table: TableInstance<any>;
  rows: RowInstance<any>[];
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  selectedRow: Slope | null;
  setSelectedRow: (row: Slope | null) => void;
}

export interface TableActionProps {
  isLoading: boolean;
  selectedRow: Slope | null;
  // 선택된 행들 배열 추가
  selectedRows: Slope[];
  openEditModal: () => void;
  openDeleteModal: () => void;
}

export interface TableCheckboxProps {
  indeterminate?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TableModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  table: TableInstance<any>;
  isRegionModalOpen: boolean;
  closeRegionModal: () => void;
  handleRegionSelect: (city: string, county: string) => void;
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  handleDelete: () => void;
  selectedRow: Slope | null;
  selectedRows: Slope[];
  isEditModalOpen: boolean;
  closeEditModal: () => void;
  handleEdit: (updatedSlope: Slope) => void;
}

export interface TableToolbarProps {
  title: string;
  setSearchQuery: (query: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedRegion: Region | null;
  resetFilters: () => void;
  downloadExcel: () => void;
  isDownloading: boolean;
  totalCount: number;
}

interface Region {
  city: string;
  county: string;
}

export interface AddSlopeProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: TableInstance<Slope>;
}
export interface RegionFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegionSelect: (city: string, county: string) => void;
}
export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedRow: Slope | null;
  selectedRows: Slope[];
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedSlope: Slope) => void;
  selectedRow: Slope | null;
}

export interface SlopeFormProps {
  titleText: string;
  initialData: Slope;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Slope) => void;
  submitButtonText: string;
}
export interface FileInputContainerProps {
  $isDragActive?: boolean;
  $hasFile?: boolean;
  theme?: any;
}
