import styled from 'styled-components';
import { ListProps } from '../interface';

const ListContainer = ({ item, onClick }: ListProps) => {
  if (!item) return null;
  const grade = item.priority?.grade.includes('A')
    ? 'A'
    : item.priority?.grade.includes('B')
    ? 'B'
    : item.priority?.grade.includes('C')
    ? 'C'
    : item.priority?.grade.includes('D')
    ? 'D'
    : 'F';
  return (
    <Container onClick={onClick}>
      <Wrapper>
        <GradeBackground $grade={grade}>
          <GradeText>{grade}</GradeText>
        </GradeBackground>
        <MainInnerContainer>
          <TitleWrapper>
            <Title>{item.name}</Title>
            <Num>{item.managementNo}</Num>
          </TitleWrapper>
          <AddressWrapper>
            <AddressText>
              {item.location.province} {item.location.city}
              {item.location.district}
            </AddressText>
            <SmallAddressText>{item.location.address}</SmallAddressText>
          </AddressWrapper>
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
  width: 100%;
  display: flex;
  gap: 30px;
  align-items: center;
`;

const MainInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  white-space: nowrap;
  overflow: hidden;
`;

const GradeBackground = styled.div<{ $grade: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ $grade, theme }) => {
    switch ($grade) {
      case 'A':
        return theme.colors.grade.A;
      case 'B':
        return theme.colors.grade.B;
      case 'C':
        return theme.colors.grade.C;
      case 'D':
        return theme.colors.grade.D;
      case 'F':
        return theme.colors.grade.F;
      default:
        return '#333';
    }
  }};
`;
const GradeText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[100]};
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

const AddressText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: ${({ theme }) => theme.colors.grey[700]};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
const AddressWrapper = styled.div`
  width: 100%;
`;
const SmallAddressText = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.sizes.cl};
  color: ${({ theme }) => theme.colors.grey[600]};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
