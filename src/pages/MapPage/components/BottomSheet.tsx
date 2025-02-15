import { useState, useRef, useEffect, TouchEvent } from 'react';
import styled from 'styled-components';
import NoInfo from './NoInfo';
import InfoTable from './InfoTable';
import { BottomSheetProps } from '../interface';
import ListContainer from './ListContainer';

const BottomSheet: React.FC<BottomSheetProps> = ({
  slopeData,
  selectItem,
  onItemClick,
}) => {
  // console.log(selectItem);
  // console.log(selectItem);

  // bottome Sheet의 움직임 관련 state
  const [height, setHeight] = useState<number>(200);
  const startY = useRef<number>(0);
  const currentHeight = useRef<number>(200);
  const isDragging = useRef<boolean>(false);

  // bottome Sheet의 높이 관련 useEffect
  useEffect(() => {
    setHeight(selectItem === null ? 200 : 300);
  }, [selectItem]);

  // bottome Sheet의 움직임 관련 함수
  const handleMouseMove = useRef((e: globalThis.MouseEvent) => {
    if (!isDragging.current) return;

    const diff = startY.current - e.clientY;
    let newHeight = currentHeight.current + diff;
    newHeight = Math.max(100, Math.min(500, newHeight));
    setHeight(newHeight);
  }).current;

  const handleMouseUp = useRef(() => {
    isDragging.current = false;
    currentHeight.current = height;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }).current;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
    currentHeight.current = height;
    isDragging.current = true;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const diff = startY.current - e.touches[0].clientY;
    let newHeight = currentHeight.current + diff;
    newHeight = Math.max(100, Math.min(500, newHeight));
    setHeight(newHeight);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    currentHeight.current = height;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    startY.current = e.clientY;
    currentHeight.current = height;
    isDragging.current = true;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  return (
    <BaseContainer height={height} $isDragging={isDragging.current}>
      <IconWrapper
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SlideContainer />
        <SlideIcon />
      </IconWrapper>

      {selectItem !== null ? (
        <InfoTable selectItem={selectItem} />
      ) : (
        <ListWrapper>
          {slopeData.map((item, index) => (
            <ListContainer
              key={index}
              item={item}
              onClick={() => {
                console.log('클릭');
                onItemClick(item, index);
              }}
            ></ListContainer>
          ))}
        </ListWrapper>
      )}
    </BaseContainer>
  );
};
export default BottomSheet;
const BaseContainer = styled.div<{ $isDragging?: boolean; height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  min-height: 100px;
  max-height: 800px;
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

const IconWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  cursor: grab;
`;
const SlideContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
`;
const SlideIcon = styled.div`
  border-radius: 30px;
  width: 30px;
  height: 10px;
  background-color: #acacac;
`;

const ListWrapper = styled.div`
  margin-top: 20px;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100% - 60px);
`;
