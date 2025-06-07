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

export const ErrorText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.cl};
  color: ${({ theme }) => theme.colors.error};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  padding: 5px 5px;
  cursor: pointer;
  user-select: none;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const Checkbox = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.colors.grey[400]};
  border-radius: 3px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${HiddenCheckbox}:checked + & {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }

  &::after {
    content: '';
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  ${HiddenCheckbox}:checked + &::after {
    opacity: 1;
  }
`;

export const CheckboxLabel = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.grey[700]};

  ${CheckboxWrapper}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
