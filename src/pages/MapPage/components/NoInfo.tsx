import styled from 'styled-components';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { NoInfoProps } from '../interface';

const NoInfo = ({ text }: NoInfoProps) => (
  <NoInfoContainer>
    <NoneIcon />
    <NoInfoTitle>{text}</NoInfoTitle>
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
  margin-top: 20px;
`;
const NoInfoTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const NoneIcon = styled(ErrorOutlineRoundedIcon)`
  width: 32px;
`;
