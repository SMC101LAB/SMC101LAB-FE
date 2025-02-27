import styled from 'styled-components';
import { InfotableProps } from '../interface';

const InfoTable: React.FC<InfotableProps> = ({ selectItem, onCloseInfo }) => {
  if (!selectItem) return null;
  const grade = selectItem.disaster?.riskLevel.includes('A')
    ? 'A'
    : selectItem.disaster?.riskLevel.includes('B')
    ? 'B'
    : selectItem.disaster?.riskLevel.includes('C')
    ? 'C'
    : selectItem.disaster?.riskLevel.includes('D')
    ? 'D'
    : 'F';
  return (
    <InnerContainer>
      <HeaderWrapper>
        <TitleWrapper>
          <Title>{selectItem.name}</Title>
          <Num>{selectItem.managementNo}</Num>
        </TitleWrapper>

        <CloseButton onClick={onCloseInfo}>&times;</CloseButton>
      </HeaderWrapper>
      <ContentSection>
        <InfoRow>
          <Label>관리번호</Label>
          <Value>{selectItem.managementNo}</Value>
        </InfoRow>
        <InfoRow>
          <Label>시행청명</Label>
          <Value>{selectItem.management.organization}</Value>
        </InfoRow>
        <InfoRow>
          <Label>소관부서명</Label>
          <Value>{selectItem.management.department}</Value>
        </InfoRow>

        <AddressWrapper>
          <Label>주소</Label>
          <AddressValue>
            {selectItem.location.province} {selectItem.location.city}{' '}
            {selectItem.location.district}
            {selectItem.location.address}
          </AddressValue>
        </AddressWrapper>
        <InfoRow>
          <Label>등급</Label>
          <GradeValue grade={grade}>{grade}</GradeValue>
        </InfoRow>
        <InfoRow>
          <Label>좌표</Label>
          <Value>
            {selectItem.location.coordinates.start.coordinates[1]},{' '}
            {selectItem.location.coordinates.start.coordinates[0]}
          </Value>
        </InfoRow>
      </ContentSection>
    </InnerContainer>
  );
};

export default InfoTable;

const InnerContainer = styled.div`
  padding: 20px;
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding-bottom: 15px;
  flex-grow: 1;
`;

const Title = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const Num = styled.div`
  font-size: 14px;
  color: #7e7e7e;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 25px 0px;
  border-bottom: 1px solid #eee;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Label = styled.div`
  min-width: 80px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: ${({ theme }) => theme.colors.grey[600]};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: ${({ theme }) => theme.colors.grey[700]};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

const AddressWrapper = styled(InfoRow)`
  align-items: flex-start;
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

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 36px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
  padding: 8px 15px;
`;
