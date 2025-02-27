// LoadingMessage.tsx
import styled, { keyframes } from 'styled-components';

interface LoadingMessageProps {
  text: string;
}

const LoadingMessage = ({ text }: LoadingMessageProps) => {
  return (
    <LoadingContainer>
      <LoadingText>{text}</LoadingText>
      <LoadingDots>
        <Dot />
        <Dot />
        <Dot />
      </LoadingDots>
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 32px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const LoadingText = styled.span`
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
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
