import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { TableCheckboxProps } from '../../../interface';

const TableCheckbox: React.FC<TableCheckboxProps> = ({
  indeterminate = false,
  checked = false,
  disabled = false,
  onChange,
  ...rest
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <CheckboxContainer>
      <StyledCheckbox
        type="checkbox"
        ref={ref}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
    </CheckboxContainer>
  );
};

export default TableCheckbox;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  width: 16px;
  height: 16px;
`;
