import styled from 'styled-components';
import SteepSlopeEmpty from '../components/OutlierEmpty';
import StepSlopeDup from '../components/OutlierDup';
const SteepSlopeOutlier = () => {
  return (
    <Container>
      <SteepSlopeEmpty />
      <StepSlopeDup />
    </Container>
  );
};

export default SteepSlopeOutlier;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`;
