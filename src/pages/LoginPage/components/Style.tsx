import styled from 'styled-components';

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 18px 10px;
  border: 0px;
  color: ${({ theme }) => theme.colors.grey[700]};
  background-color: ${({ theme }) => theme.colors.grey[200]};

  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  margin-top: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`;
