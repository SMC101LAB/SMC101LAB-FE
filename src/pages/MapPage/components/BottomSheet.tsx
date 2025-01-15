import { useState, useRef, useEffect, TouchEvent } from 'react';
import styled from 'styled-components';
import NoInfo from './NoInfo';
import InfoTable from './InfoTable';
import { SelectItemProps } from '../interface';

const BottomSheet: React.FC<SelectItemProps> = ({ selectItem }) => {
  const [height, setHeight] = useState<number>(100);
  const startY = useRef<number>(0);
  const currentHeight = useRef<number>(100);
  const isDragging = useRef<boolean>(false);
  //   if (!selectItem) return null;
  console.log(selectItem);
  console.log(selectItem);

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

  useEffect(() => {
    if (selectItem !== undefined) {
      setHeight(100);
    }
  }, [selectItem]);

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
      {selectItem !== undefined ? (
        <InfoTable selectItem={selectItem} />
      ) : height > 200 ? (
        <NoInfo />
      ) : (
        <></>
      )}
    </BaseContainer>
  );
};

const BaseContainer = styled.div<{ $isDragging?: boolean; height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  min-height: 100px;
  transition: ${({ $isDragging }) =>
    $isDragging ? 'none' : 'height 0.3s ease'};
  border-top-left-radius: 35px;
  border-top-right-radius: 25px;
  background-color: #fff;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
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

export default BottomSheet;
