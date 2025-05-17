import { FC, useState } from 'react';
import styled from 'styled-components';
import { SideComponentsProps } from '../interface';

const SideComponents: FC<SideComponentsProps> = ({
  selectPage,
  ChooseIndex,
}) => {
  const [toggle, setToggle] = useState<boolean[]>([false, false, false]);
  return (
    <SideContainer>
      <LogoWrapper>
        <Logo>SMC101LAB</Logo>
      </LogoWrapper>
      <IndexWrapper>
        {/* <IndexContainer
          $isSelect={selectPage[0]}
          onClick={() => ChooseIndex(0)}
        >
          <TitleIndexText>홈</TitleIndexText>
        </IndexContainer> */}
        <ToggleIndexContainer
          onClick={() => {
            setToggle([!toggle[0], toggle[1], toggle[2]]);
          }}
        >
          <ToggleIndexText $isOpen={toggle[0]}>급경사지 관리</ToggleIndexText>
          <Arrow $isOpen={toggle[0]} />
        </ToggleIndexContainer>
        {toggle[0] && (
          <>
            <SubIndexContainer
              $isSelect={selectPage[1]}
              onClick={() => ChooseIndex(1)}
            >
              <IndexText $isSelect={selectPage[1]}>
                급경사지 조회/수정/삭제
              </IndexText>
            </SubIndexContainer>
            <SubIndexContainer
              $isSelect={selectPage[2]}
              onClick={() => ChooseIndex(2)}
            >
              <IndexText $isSelect={selectPage[2]}>급경사지 추가</IndexText>
            </SubIndexContainer>
          </>
        )}
        <ToggleIndexContainer
          onClick={() => {
            setToggle([toggle[0], !toggle[1], toggle[2]]);
          }}
        >
          <ToggleIndexText $isOpen={toggle[1]}>급경사지 이상값</ToggleIndexText>
          <Arrow $isOpen={toggle[1]} />
        </ToggleIndexContainer>
        {toggle[1] && (
          <>
            <SubIndexContainer
              $isSelect={selectPage[3]}
              onClick={() => ChooseIndex(3)}
            >
              <IndexText $isSelect={selectPage[3]}>빈값 찾기</IndexText>
            </SubIndexContainer>
            <SubIndexContainer
              $isSelect={selectPage[4]}
              onClick={() => ChooseIndex(4)}
            >
              <IndexText $isSelect={selectPage[4]}>중복값 찾기</IndexText>
            </SubIndexContainer>
            {/* <SubIndexContainer
              $isSelect={selectPage[5]}
              onClick={() => ChooseIndex(5)}
            >
              <IndexText $isSelect={selectPage[5]}>위치이상</IndexText>
            </SubIndexContainer> */}
          </>
        )}
        <ToggleIndexContainer
          onClick={() => {
            setToggle([toggle[0], toggle[1], !toggle[2]]);
          }}
        >
          <ToggleIndexText $isOpen={toggle[2]}>회원관리</ToggleIndexText>
          <Arrow $isOpen={toggle[2]} />
        </ToggleIndexContainer>
        {toggle[2] && (
          <>
            <SubIndexContainer
              $isSelect={selectPage[6]}
              onClick={() => ChooseIndex(6)}
            >
              <IndexText $isSelect={selectPage[6]}>회원조회 및 승인</IndexText>
            </SubIndexContainer>
            <SubIndexContainer
              $isSelect={selectPage[7]}
              onClick={() => ChooseIndex(7)}
            >
              <IndexText $isSelect={selectPage[7]}>회원수정 및 삭제</IndexText>
            </SubIndexContainer>
          </>
        )}
        <IndexContainer
          $isSelect={selectPage[8]}
          onClick={() => ChooseIndex(8)}
        >
          <TitleIndexText $isSelect={selectPage[8]}>지도</TitleIndexText>
        </IndexContainer>
      </IndexWrapper>
      <CopyrightWrapper>
        <CopyrightText>© 2025. SMC101LAB</CopyrightText>
      </CopyrightWrapper>
    </SideContainer>
  );
};
export default SideComponents;
const SideContainer = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    width: 0;
    display: none;
  }
  width: 15%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.grey[300]};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 10px;
  position: relative;
`;

const Logo = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ml};
  }
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: ${({ theme }) => theme.fonts.sizes.ts};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const LogoWrapper = styled.div`
  width: 100%;
  padding: 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IndexWrapper = styled.div`
  width: 100%;
  height: 50%;
`;

const ToggleIndexContainer = styled.div`
  width: 100%;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
    padding-left: 24px;
  }
`;

const ToggleIndexText = styled.div<{ $isOpen: boolean }>`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
  }
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ $isOpen, theme }) =>
    $isOpen ? theme.fonts.weights.bold : theme.fonts.weights.medium};
`;
const Arrow = styled.div<{ $isOpen: boolean }>`
  position: relative;
  &::before {
    position: absolute;
    transition: 0.4s all ease-in-out;
    left: -10px;
    top: ${({ $isOpen }) => ($isOpen ? '5px' : 0)};
    content: '';
    width: 10px;
    height: 10px;
    border-top: 2px solid #bdbdbd;
    border-right: 2px solid #bdbdbd;
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(315deg)' : 'rotate(135deg)'};
  }
`;

const IndexContainer = styled.div<{ $isSelect: boolean }>`
  width: 100%;
  padding: 0px 20px;
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.primary : '#fff'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
    padding-left: 24px;
  }
`;

const TitleIndexText = styled.div<{ $isSelect: boolean }>`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
  }
  color: ${({ $isSelect, theme }) =>
    $isSelect ? '#fff' : theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ $isSelect, theme }) =>
    $isSelect ? theme.fonts.weights.bold : theme.fonts.weights.medium};
  &:hover {
    color: ${({ $isSelect, theme }) =>
      $isSelect ? theme.colors.grey[700] : theme.colors.grey[700]};
  }
  padding: 8px 0px;
`;

const SubIndexContainer = styled.div<{ $isSelect: boolean }>`
  width: 100%;

  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.primary : '#fff'};

  cursor: pointer;
  transition: 0.1s all ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[200]};
    transform: scale(1.1);
  }
`;

const IndexText = styled.div<{ $isSelect: boolean }>`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
  }
  color: ${({ $isSelect, theme }) =>
    $isSelect ? '#fff' : theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  &:hover {
    color: ${({ theme }) => theme.colors.grey[700]};
  }
  padding: 5px 0px;
  padding-left: 30px;
`;

const CopyrightWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const CopyrightText = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
  }
  color: ${({ theme }) => theme.colors.grey[500]};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  text-align: center;
`;
