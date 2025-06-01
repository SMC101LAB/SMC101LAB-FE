import styled from 'styled-components';
import { InfotableProps } from '../interface';
import { useMapStore } from '../../../stores/mapStore';

const InfoTable = ({ selectItem }: InfotableProps) => {
  const { setSelectedMarkerId, setBottomSheetHeight } = useMapStore();
  const onCloseInfo = () => {
    setSelectedMarkerId(null);
    setBottomSheetHeight(200);
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
    : 'E';

  return (
    <InnerContainer>
      <HeaderWrapper>
        <TitleWrapper>
          <Title>{selectItem?.name || ''}</Title>
          <UpperAddressValue>
            {selectItem?.location?.province || ''}
            {selectItem?.location?.city || ''}
            {selectItem?.location?.district || ''}
            {selectItem?.location?.address || ''}
            {selectItem?.location?.mountainAddress === 'Y' ? '(산)' : ''}
          </UpperAddressValue>
        </TitleWrapper>

        <CloseButton onClick={onCloseInfo}>&times;</CloseButton>
      </HeaderWrapper>
      <ViewImgSection>
        <ImgContainer>
          {selectItem.priority?.images?.position?.url ? (
            <Img src={selectItem.priority.images.position.url} alt="위치도" />
          ) : (
            <NoImagePlaceholder>이미지 없음</NoImagePlaceholder>
          )}
          <ImgTag>위치도</ImgTag>
        </ImgContainer>
        <ImgContainer>
          {selectItem.priority?.images?.start?.url ? (
            <Img src={selectItem.priority.images.start.url} alt="시점" />
          ) : (
            <NoImagePlaceholder>이미지 없음</NoImagePlaceholder>
          )}
          <ImgTag>시점</ImgTag>
        </ImgContainer>
        <ImgContainer>
          {selectItem.priority?.images?.end?.url ? (
            <Img src={selectItem.priority.images.end.url} alt="종점" />
          ) : (
            <NoImagePlaceholder>이미지 없음</NoImagePlaceholder>
          )}
          <ImgTag>종점</ImgTag>
        </ImgContainer>
        <ImgContainer>
          {selectItem.priority?.images?.overview?.url ? (
            <Img src={selectItem.priority.images.overview.url} alt="전경" />
          ) : (
            <NoImagePlaceholder>이미지 없음</NoImagePlaceholder>
          )}
          <ImgTag>전경</ImgTag>
        </ImgContainer>
      </ViewImgSection>
      <ContentSection>
        <InfoRow>
          <Label>관리주체명</Label>
          <Value>{selectItem?.inspections?.serialNumber || ''}</Value>
        </InfoRow>

        <AddressWrapper>
          <Label>주소</Label>
          <ValueColumn>
            <AddressValue>
              {selectItem?.location?.province || ''}
              {selectItem?.location?.city || ''}
              {selectItem?.location?.district || ''}
              {selectItem?.location?.address || ''}

              {selectItem?.location?.mainLotNumber
                ? selectItem?.location?.subLotNumber
                  ? `   ${selectItem?.location?.mainLotNumber}-${selectItem?.location?.subLotNumber}`
                  : `   ${selectItem?.location?.mainLotNumber}`
                : ''}
            </AddressValue>
            <AddressValue>
              {selectItem?.location?.roadAddress
                ? `(${selectItem?.location?.roadAddress})`
                : ''}
            </AddressValue>
          </ValueColumn>
        </AddressWrapper>
        <Line />
        <InfoRow>
          <Label>최고수직고</Label>
          <Value>{selectItem.priority.maxVerticalHeight}</Value>
        </InfoRow>
        <InfoRow>
          <Label>종단길이</Label>
          <Value>{selectItem.priority.longitudinalLength}</Value>
        </InfoRow>
        <InfoRow>
          <Label>평균경사</Label>
          <Value>{selectItem.priority.averageSlope}</Value>
        </InfoRow>

        <InfoRow>
          <Label>점수</Label>
          <Value>{selectItem.priority.Score}</Value>
        </InfoRow>
        <InfoRow>
          <Label>등급</Label>
          <GradeValue $grade={grade}>{grade}</GradeValue>
        </InfoRow>

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
  flex-shrink: 0;
  white-space: nowrap;
`;

const UpperAddressValue = styled.div`
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
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
`;

const AddressWrapper = styled(InfoRow)`
  align-items: flex-start;
`;

const AddressValue = styled(Value)`
  line-height: 1.4;
`;
const ValueColumn = styled.div`
  display: flex;
  flex-direction: column;
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
      case 'E':
        return theme.colors.grade.E;
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

const ViewImgSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 12px 12px;
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'position position position'
      'start end overview';

    & > div:nth-child(1) {
      grid-area: position;
    }
    & > div:nth-child(2) {
      grid-area: start;
    }
    & > div:nth-child(3) {
      grid-area: end;
    }
    & > div:nth-child(4) {
      grid-area: overview;
    }
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 1; /* 정사각형 비율 유지 */
  object-fit: cover;
  border-radius: 8px;
`;

const ImgTag = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  text-align: center;
  color: ${({ theme }) => theme.colors.grey[800]};
`;
const NoImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  background-color: ${({ theme }) => theme.colors.grey[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grey[500]};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
`;
