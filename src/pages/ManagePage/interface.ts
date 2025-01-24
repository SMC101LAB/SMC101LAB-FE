//목차 토글 관련 타입
export type SelectPageState = [
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

export interface PaginationProps {
  currentPage: number; // 현재 페이지
  pageCount: number; // 전체 페이지 수
  pageSize: number; // 페이지당 아이템 수
  canPreviousPage: boolean; // 이전 페이지 이동 가능 여부
  canNextPage: boolean; // 다음 페이지 이동 가능 여부
  onFirstPage: () => void; // 첫 페이지로 이동
  onPreviousPage: () => void; // 이전 페이지로 이동
  onNextPage: () => void; // 다음 페이지로 이동
  onLastPage: () => void; // 마지막 페이지로 이동
  onPageSizeChange: (size: number) => void; // 페이지 크기 변경
}
