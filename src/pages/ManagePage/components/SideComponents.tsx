import { FC, useState } from 'react';
import styled from 'styled-components';
import { SideComponentsProps } from '../interface';

const SideComponents: FC<SideComponentsProps> = ({
  selectPage,
  ChooseIndex,
}) => {
  const [toggle, setToggle] = useState<[boolean, boolean]>([false, false]);
  return (
    <SideContainer>
      <LogoWrapper>
        <Logo>SMC101LAB</Logo>
      </LogoWrapper>
      <IndexWrapper>
        <IndexContainer
          $isSelect={selectPage[0]}
          onClick={() => ChooseIndex(0)}
        >
          <IndexText>홈</IndexText>
        </IndexContainer>
        <ToggleIndexContainer
          onClick={() => {
            setToggle([!toggle[0], toggle[1]]);
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
              <IndexText>급경사지 조회</IndexText>
            </SubIndexContainer>
            <SubIndexContainer
              $isSelect={selectPage[2]}
              onClick={() => ChooseIndex(2)}
            >
              <IndexText>급경사지 추가</IndexText>
            </SubIndexContainer>
            <SubIndexContainer
              $isSelect={selectPage[3]}
              onClick={() => ChooseIndex(3)}
            >
              <IndexText>급경사지 수정/삭제</IndexText>
            </SubIndexContainer>
          </>
        )}
        <ToggleIndexContainer
          onClick={() => {
            setToggle([toggle[0], !toggle[1]]);
          }}
        >
          <ToggleIndexText $isOpen={toggle[1]}>회원관리</ToggleIndexText>
          <Arrow $isOpen={toggle[1]} />
        </ToggleIndexContainer>
        {toggle[1] && (
          <>
            <SubIndexContainer
              $isSelect={selectPage[4]}
              onClick={() => ChooseIndex(4)}
            >
              <IndexText>회원조회 및 승인</IndexText>
            </SubIndexContainer>
            <SubIndexContainer
              $isSelect={selectPage[5]}
              onClick={() => ChooseIndex(5)}
            >
              <IndexText>회원수정 및 삭제</IndexText>
            </SubIndexContainer>
          </>
        )}
        <IndexContainer
          $isSelect={selectPage[6]}
          onClick={() => ChooseIndex(6)}
        >
          <IndexText>지도</IndexText>
        </IndexContainer>
      </IndexWrapper>
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
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
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
    left: 0;
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
  padding: 5px 20px;
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.grey[200] : '#fff'};
`;
const IndexText = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
  }
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

const SubIndexContainer = styled.div<{ $isSelect: boolean }>`
  width: 100%;
  padding: 5px 0px;
  padding-left: 30px;
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.grey[200] : '#fff'};
`;
