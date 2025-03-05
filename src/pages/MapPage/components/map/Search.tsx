import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchComponentProps } from '../../interface';
import LeftModal from './LeftModal';
import MenuIcon from '@mui/icons-material/MenuRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
const SearchComponent = ({ onSearch }: SearchComponentProps) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchInput);
    }
  };
  const handleSearch = () => {
    onSearch(searchInput);
  };

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const onCloseLeftModal = () => {
    setIsLeftOpen(false);
  };
  return (
    <>
      <SearchContainer>
        <InputContainer>
          <MenuIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsLeftOpen(true);
            }}
          />

          <SearchInput
            placeholder="검색..."
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        </InputContainer>
        <SearchIconWrapper>
          <SearchIcon
            sx={{
              width: 23,
              zIndex: 1,
              color: '#fff',
            }}
            onClick={() => handleSearch()}
          />
        </SearchIconWrapper>
      </SearchContainer>
      <LeftModal isOpen={isLeftOpen} onClose={onCloseLeftModal} />
    </>
  );
};

export default React.memo(SearchComponent);

const SearchContainer = styled.div`
  position: absolute;
  top: 45px;
  left: 10px;
  display: flex;
  gap: 8px;
  padding: 5px 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding-left: 10px;
  width: 55vw;
`;

const SearchInput = styled.input`
  padding: 5px 15px;
  border-radius: 15px;
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.colors.grey[700]};
  &:focus {
    outline: none;
  }
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 40px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  &:active {
    transform: scale(1.1);
  }
`;
