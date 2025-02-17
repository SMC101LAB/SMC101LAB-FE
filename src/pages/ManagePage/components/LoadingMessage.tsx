// LoadingMessage.tsx
import styled, { keyframes } from 'styled-components';

interface LoadingMessageProps {
  text: string;
}

const LoadingMessage = ({ text }: LoadingMessageProps) => {
  return (
    <LoadingContainer>
      <LoadingBox>
        <LoadingText>{text}</LoadingText>
        <LoadingDots>
          <Dot />
          <Dot />
          <Dot />
        </LoadingDots>
      </LoadingBox>
    </LoadingContainer>
  );
};

export default LoadingMessage;

const blink = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const LoadingText = styled.span`
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #6b7280;
  animation: ${blink} 1.4s infinite linear;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
