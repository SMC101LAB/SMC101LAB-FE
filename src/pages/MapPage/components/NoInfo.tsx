import styled from 'styled-components';
import noInfoIcon from '../../../assets/noInfo.png';

const NoInfo = () => (
  <NoInfoContainer>
    <NoneIcon src={noInfoIcon} />
    <NoInfoTitle>등록된 주소가 없습니다.</NoInfoTitle>
  </NoInfoContainer>
);
export default NoInfo;

const NoInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
`;
const NoInfoTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const NoneIcon = styled.img`
  width: 32px;
`;
