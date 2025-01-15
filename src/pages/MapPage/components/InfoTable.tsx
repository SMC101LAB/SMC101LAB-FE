import styled from 'styled-components';
import { SelectItemProps } from '../interface';

const InfoTable: React.FC<SelectItemProps> = ({ selectItem }) => {
  if (!selectItem) return null;
  return (
    <InnerContainer>
      <TitleWrapper>
        <Title>{selectItem.steepSlopeName}</Title>
        <Num>{selectItem.mainLotNumber}</Num>
      </TitleWrapper>

      <ContentSection>
        <InfoRow>
          <Label>관리번호</Label>
          <Value>{selectItem.managementNo}</Value>
        </InfoRow>
        <InfoRow>
          <Label>시행청명</Label>
          <Value>{selectItem.implementationOffice}</Value>
        </InfoRow>
        <InfoRow>
          <Label>소관부서명</Label>
          <Value>{selectItem.departmentName}</Value>
        </InfoRow>
        <InfoRow>
          <Label>관리주체</Label>
          <Value>{selectItem.managementTypeCode}</Value>
        </InfoRow>
        <AddressWrapper>
          <Label>주소</Label>
          <AddressValue>
            {selectItem.province} {selectItem.city} {selectItem.district}
            {selectItem.detailAddress}
          </AddressValue>
        </AddressWrapper>
        <InfoRow>
          <Label>등급</Label>
          <GradeValue grade={selectItem.grade}>{selectItem.grade}</GradeValue>
        </InfoRow>
        <InfoRow>
          <Label>좌표</Label>
          <Value>
            {selectItem.lat}, {selectItem.lng}
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

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
`;

const Title = styled.div`
  font-size: 22px;
  color: #0b5275;
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
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Label = styled.div`
  min-width: 80px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const Value = styled.div`
  font-size: 14px;
  color: #333;
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
