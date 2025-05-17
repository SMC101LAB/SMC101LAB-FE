import { createTableStore } from './tableStore';
import { Slope } from '../apis/slopeMap';

// 급경사지 스토어 생성 - 팩토리 함수 사용
export const useSteepSlopeStore = createTableStore<Slope>();
