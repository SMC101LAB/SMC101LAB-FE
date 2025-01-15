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
        {/* <InfoRow>
          <Label>관리주체</Label>
          <Value>{selectItem.managementTypeCode}</Value>
        </InfoRow> */}
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
  padding-bottom: 15px;

  border-bottom: 1px solid #eee;
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
