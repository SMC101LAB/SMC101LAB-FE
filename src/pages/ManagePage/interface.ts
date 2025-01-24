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
