import { useRef, TouchEvent } from 'react';
import styled from 'styled-components';
import InfoTable from './components/InfoTable';
import ListContainer from './components/ListContainer';
import CommentList from './components/comment/CommentList';
import NoInfo from './components/NoInfo';
import SearchResult from './components/SearchResult';
import { Slope } from '../../apis/slopeMap';
import { useMapStore } from '../../stores/mapStore';

const BottomSheet = () => {
  const {
    slopeData,
    selectedMarkerId,
    chooseSelectItem,
    bottomSheetHeight,
    setBottomSheetHeight,
    searchMod,
  } = useMapStore();

  const height = bottomSheetHeight;
  const setHeight = setBottomSheetHeight;
  const selectItem =
    selectedMarkerId !== null ? slopeData[selectedMarkerId] : null;

  const startY = useRef<number>(0);
  const currentHeight = useRef<number>(200); //현재 높이
  const isDragging = useRef<boolean>(false); //드래그 상태
  const scrollWrapperRef = useRef<HTMLDivElement>(null); //스크롤 Wrapper 위치

  //데스크 용 bottomsheet 높이 변동 관련 함수
  const handleMouseMove = useRef((e: globalThis.MouseEvent) => {
    if (!isDragging.current) return;

    const diff = startY.current - e.clientY;
    let newHeight = currentHeight.current + diff;
    newHeight = Math.max(100, Math.min(window.innerHeight * 0.8, newHeight));
    setHeight(newHeight);
  }).current;

  const handleMouseUp = useRef(() => {
    isDragging.current = false;
    currentHeight.current = height;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }).current;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    startY.current = e.clientY;
    currentHeight.current = height;
    isDragging.current = true;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  //모바일 용 bottomsheet 높이 변동 관련 함수
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    //ScrollWrapper 스크롤 막기
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.style.overflow = 'hidden';
    }

    const diff = startY.current - e.touches[0].clientY;
    let newHeight = currentHeight.current + diff;
    newHeight = Math.max(100, Math.min(window.innerHeight * 0.8, newHeight));
    setHeight(newHeight);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
    currentHeight.current = height;
    isDragging.current = true;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    currentHeight.current = height;

    //ScrollWrapper 스크롤 제한 풀기
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.style.overflow = 'auto';
    }
  };

  const countGrades = (slopes: Slope[]) => {
    const counts = {
      aCount: 0,
      bCount: 0,
      cCount: 0,
      dCount: 0,
      fCount: 0,
    };

    for (let i = 0; i < slopes.length; i++) {
      const grade = slopes[i].priority.grade.toUpperCase();

      switch (grade) {
        case 'A':
          counts.aCount++;
          break;
        case 'B':
          counts.bCount++;
          break;
        case 'C':
          counts.cCount++;
          break;
        case 'D':
          counts.dCount++;
          break;
        case 'F':
          counts.fCount++;
          break;
      }
    }
    return counts;
  };

  return (
    <BaseContainer height={height} $isDragging={isDragging.current}>
      <ScrollWrapper ref={scrollWrapperRef}>
        <IconWrapper
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <SlideContainer />
          <SlideIcon />
        </IconWrapper>

        {(() => {
          if (selectItem !== null) {
            return (
              <div>
                <InfoTable selectItem={selectItem} />
                <CommentList slopeId={selectItem._id} />
              </div>
            );
          } else if (slopeData.length === 0) {
            if (searchMod) {
              return <NoInfo text="검색결과가 없습니다." />;
            } else {
              return <NoInfo text="5km 반경 내 급경사지 데이터가 없습니다." />;
            }
          } else {
            const { aCount, bCount, cCount, dCount, fCount } =
              countGrades(slopeData);
            return (
              <>
                <SearchResult
                  resultCount={slopeData.length}
                  gradeCount={{
                    A: aCount,
                    B: bCount,
                    C: cCount,
                    D: dCount,
                    F: fCount,
                  }}
                />
                <ListWrapper>
                  {!slopeData || slopeData.length === 0 ? (
                    <div>데이터 조회 중</div>
                  ) : (
                    slopeData.map((item, index) => (
                      <ListContainer
                        key={index}
                        item={item}
                        onClick={() => {
                          chooseSelectItem(item, index);
                        }}
                      ></ListContainer>
                    ))
                  )}
                </ListWrapper>
              </>
            );
          }
        })()}
      </ScrollWrapper>
    </BaseContainer>
  );
};

export default BottomSheet;

const BaseContainer = styled.div<{ $isDragging?: boolean; height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  min-height: 100px;
  max-height: 80vh;
  overflow: hidden;
  transition: ${({ $isDragging }) =>
    $isDragging ? 'none' : 'height 0.3s ease'};
  border-top-left-radius: 35px;
  border-top-right-radius: 25px;
  background-color: #fff;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ScrollWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  cursor: grab;
  flex-shrink: 0;
  touch-action: none;
`;

const SlideContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 120px;
`;

const SlideIcon = styled.div`
  border-radius: 30px;
  width: 30px;
  height: 10px;
  background-color: #acacac;
`;

const ListWrapper = styled.div`
  margin-top: 30px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
  height: calc(100% - 60px);
  flex: 1;
`;
