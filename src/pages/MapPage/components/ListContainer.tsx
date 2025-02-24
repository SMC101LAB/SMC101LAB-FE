import React from 'react';
import styled from 'styled-components';
import { ListProps } from '../interface';

const ListContainer: React.FC<ListProps> = ({ item, onClick }) => {
  if (!item) return null;
  const grade = item.disaster?.riskLevel.includes('A')
    ? 'A'
    : item.disaster?.riskLevel.includes('B')
    ? 'B'
    : item.disaster?.riskLevel.includes('C')
    ? 'C'
    : item.disaster?.riskLevel.includes('D')
    ? 'D'
    : 'F';
  return (
    <Container onClick={onClick}>
      <Wrapper>
        <GradeBackground grade={grade}>
          <GradeText grade={grade}>{grade}</GradeText>
        </GradeBackground>
        <MainInnerContainer>
          <TitleWrapper>
            <Title>{item.name}</Title>
            <Num>{item.managementNo}</Num>
          </TitleWrapper>
          <div>
            <AddressText>
              {item.location.province} {item.location.city}
              {item.location.district}
            </AddressText>
            <SmallAddressText>{item.location.address}</SmallAddressText>
          </div>
        </MainInnerContainer>
      </Wrapper>
    </Container>
  );
};

export default ListContainer;

const Container = styled.div`
  width: 100%;
  padding: 15px 20px;
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: 15px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const MainInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const GradeBackground = styled.div<{ grade: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ grade }) => {
    switch (grade) {
      case 'A':
        return 'rgba(46, 204, 113, 0.15)'; // #2ecc71 with opacity
      case 'B':
        return 'rgba(241, 196, 15, 0.15)'; // #f1c40f with opacity
      case 'C':
        return 'rgba(230, 126, 34, 0.15)'; // #e67e22 with opacity
      case 'D':
        return 'rgba(231, 76, 60, 0.15)'; // #e74c3c with opacity
      default:
        return 'rgba(51, 51, 51, 0.15)'; // #333333 with opacity
    }
  }};
`;
const GradeText = styled.div<{ grade: string }>`
  font-size: 20px;
  font-weight: 600;
  color: ${({ grade }) => {
    switch (grade) {
      case 'A':
        return '#2ecc71';
      case 'B':
        return '#f1c40f';
      case 'C':
        return '#e67e22';
      case 'D':
        return '#e74c3c';
      default:
        return '#333';
    }
  }};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ml};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const Num = styled.div`
  font-size: 14px;
  color: #7e7e7e;
`;

// const TopWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding-bottom: 15px;
// `;
// const InfoRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
// `;

// const Label = styled.div`
//   min-width: 30px;
//   font-size: ${({ theme }) => theme.fonts.sizes.ms};
//   color: ${({ theme }) => theme.colors.grey[600]};
//   font-weight: ${({ theme }) => theme.fonts.weights.medium};
// `;

// const AddressWrapper = styled(InfoRow)`
//   align-items: flex-start;
// `;
const AddressText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: ${({ theme }) => theme.colors.grey[700]};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
const SmallAddressText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.cl};
  color: ${({ theme }) => theme.colors.grey[600]};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
// const AddressValue = styled(Value)`
//   line-height: 1.4;
// `;
