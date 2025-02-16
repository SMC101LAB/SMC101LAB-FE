import React, { useState } from 'react';
import styled from 'styled-components';
import search from '../../../assets/Icons/searchWhite.svg';
import { SearchComponentProps } from '../interface';

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
  return (
    <SearchContainer>
      <SearchInput
        placeholder="검색..."
        value={searchInput}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <SearchIconWrapper>
        <SearchIcon src={search} alt="검색" onClick={() => handleSearch()} />
      </SearchIconWrapper>
    </SearchContainer>
  );
};

export default React.memo(SearchComponent);

const SearchContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 10px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  padding: 5px 15px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const SearchIcon = styled.img`
  width: 23px;
  z-index: 1;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  &:active {
    transform: scale(1.1);
  }
`;
