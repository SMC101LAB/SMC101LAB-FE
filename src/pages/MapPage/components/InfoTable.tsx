import styled from 'styled-components';
import { InfotableProps } from '../interface';
import { useMapStore } from '../mapStore';

const InfoTable: React.FC<InfotableProps> = ({ selectItem }) => {
  const { setSelectedMarkerId } = useMapStore();
  const onCloseInfo = () => {
    setSelectedMarkerId(null);
  };
  if (!selectItem) return null;
  const grade = selectItem.priority?.grade?.includes('A')
    ? 'A'
    : selectItem.priority?.grade?.includes('B')
    ? 'B'
    : selectItem.priority?.grade?.includes('C')
    ? 'C'
    : selectItem.priority?.grade?.includes('D')
    ? 'D'
    : 'F';
  return (
    <InnerContainer>
      <HeaderWrapper>
        <TitleWrapper>
          <Title>{selectItem?.name || ''}</Title>
          <Num>{selectItem?.managementNo || ''}</Num>
        </TitleWrapper>

        <CloseButton onClick={onCloseInfo}>&times;</CloseButton>
      </HeaderWrapper>
      <ContentSection>
        <InfoRow>
          <Label>관리번호</Label>
          <Value>{selectItem?.managementNo || ''}</Value>
        </InfoRow>
        <InfoRow>
          <Label>시행청명</Label>
          <Value>{selectItem?.management?.organization || ''}</Value>
        </InfoRow>
        <InfoRow>
          <Label>소관부서명</Label>
          <Value>{selectItem?.management?.department || ''}</Value>
        </InfoRow>
        <AddressWrapper>
          <Label>주소</Label>
          <AddressValue>
            {selectItem?.location?.province || ''}
            {selectItem?.location?.city || ''}
            {selectItem?.location?.district || ''}
            {selectItem?.location?.address || ''}
          </AddressValue>
        </AddressWrapper>
        <Line />
        {selectItem?.priority?.usage && (
          <InfoRow>
            <Label>비탈면용도</Label>
            <Value>{selectItem.priority.usage}</Value>
          </InfoRow>
        )}
        <InfoRow>
          <Label>자연/인공 구분</Label>
          <Value>{selectItem.priority.slopeNature}</Value>
        </InfoRow>
        <InfoRow>
          <Label>비탈면유형</Label>
          <Value>{selectItem.priority.slopeType}</Value>
        </InfoRow>
        <InfoRow>
          <Label>등급</Label>
          <GradeValue $grade={grade}>{grade}</GradeValue>
        </InfoRow>
        <Line />

        <InfoRow>
          <Label>시점 좌표</Label>
          <Value>
            {selectItem?.location?.coordinates?.start?.coordinates?.[1] &&
            selectItem?.location?.coordinates?.start?.coordinates?.[0]
              ? `위도: ${selectItem.location.coordinates.start.coordinates[1]
                  .toFixed(6)
                  .toString()}°      
                경도: ${selectItem.location.coordinates.start.coordinates[0]
                  .toFixed(6)
                  .toString()}°`
              : '좌표 정보 없음'}
          </Value>
        </InfoRow>
        <InfoRow>
          <Label>종점 좌표</Label>
          <Value>
            {selectItem?.location?.coordinates?.end?.coordinates?.[1] &&
            selectItem?.location?.coordinates?.end?.coordinates?.[0]
              ? `위도: ${selectItem.location.coordinates.end.coordinates[1]
                  .toFixed(6)
                  .toString()}°      
                경도: ${selectItem.location.coordinates.end.coordinates[0]
                  .toFixed(6)
                  .toString()}°`
              : '좌표 정보 없음'}
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

const GradeValue = styled(Value)<{ $grade: string }>`
  color: ${({ $grade, theme }) => {
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

const Line = styled.div`
  border-bottom: 1px dashed ${({ theme }) => theme.colors.grey[200]};
`;
