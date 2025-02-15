import React from 'react';
import styled from 'styled-components';
import { ListProps } from '../interface';

const ListContainer: React.FC<ListProps> = ({ item, onClick }) => {
  if (!item) return null;
  const grade = item.inspections[0]?.riskLevel.includes('A')
    ? 'A'
    : item.inspections[0]?.riskLevel.includes('B')
    ? 'B'
    : item.inspections[0]?.riskLevel.includes('C')
    ? 'C'
    : item.inspections[0]?.riskLevel.includes('D')
    ? 'D'
    : 'F';
  return (
    <Container onClick={onClick}>
      <TopWrapper>
        <TitleWrapper>
          <Title>{item.name}</Title>
          <Num>{item.managementNo}</Num>
        </TitleWrapper>
        <GradeValue grade={grade}>{grade}</GradeValue>
      </TopWrapper>
      <AddressWrapper>
        <Label>주소</Label>
        <AddressValue>
          {item.location.province} {item.location.city} {item.location.district}
        </AddressValue>
      </AddressWrapper>
      <AddressWrapper>
        <Label></Label>
        <AddressValue>{item.location.address}</AddressValue>
      </AddressWrapper>
    </Container>
  );
};

export default ListContainer;

const Container = styled.div`
  width: 100%;
  padding: 15px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[300]};
`;
const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Label = styled.div`
  min-width: 30px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: ${({ theme }) => theme.colors.grey[600]};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
const Num = styled.div`
  font-size: 14px;
  color: #7e7e7e;
`;
const AddressWrapper = styled(InfoRow)`
  align-items: flex-start;
`;
const Value = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: ${({ theme }) => theme.colors.grey[700]};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
const AddressValue = styled(Value)`
  line-height: 1.4;
`;

const GradeValue = styled(Value)<{ grade: string }>`
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
  font-weight: 600;
`;
