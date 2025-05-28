import React from 'react';
import styled from 'styled-components';
import Title from '../../../components/Title';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useSteepSlopeStore } from '../../../../../stores/steepSlopeStore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TableToolbarProps } from '../../../interface';

const TableToolbar: React.FC<TableToolbarProps> = ({
  title,
  setSearchQuery,
  inputValue,
  setInputValue,
  selectedRegion,
  resetFilters,
  downloadExcel,
  isDownloading,
  totalCount,
}) => {
  const { openModal, openRegionModal } = useSteepSlopeStore();

  return (
    <>
      <HeaderContainer>
        <Title text={title}></Title>
        <HeaderWrapper>
          <FilterButton onClick={openModal}>
            <TuneRoundedIcon
              sx={{
                width: '18px',
                height: '18px',
                color: '#24478f',
              }}
            />
            <p>표시할 열 항목 설정</p>
          </FilterButton>
          <FilterButton onClick={openRegionModal}>
            <TravelExploreRoundedIcon
              sx={{
                width: '18px',
                height: '18px',
                color: '#24478f',
              }}
            />
            {selectedRegion
              ? `${selectedRegion.city} ${
                  selectedRegion.county === '모두' ? '' : selectedRegion.county
                }`
              : '지역선택'}
          </FilterButton>
          <FilterButton onClick={resetFilters}>
            <CachedRoundedIcon
              sx={{
                width: '18px',
                height: '18px',
                color: '#24478f',
              }}
            />
            <p>초기화</p>
          </FilterButton>
          <FilterButton onClick={downloadExcel} disabled={isDownloading}>
            <DownloadRoundedIcon
              sx={{
                width: '18px',
                height: '18px',
                color: '#24478f',
              }}
            />
            <p>{isDownloading ? '다운로드 중...' : '엑셀 다운로드'}</p>
          </FilterButton>
          <GradeButton />
          <SearchWrapper>
            <SearchInput>
              <SearchIcon onClick={() => setSearchQuery(inputValue)} />
              <input
                placeholder="검색..."
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(inputValue);
                  }
                }}
              />
            </SearchInput>
          </SearchWrapper>
        </HeaderWrapper>
      </HeaderContainer>
      <TableSubInfo>
        <TotalCount>총 {totalCount}개</TotalCount>
      </TableSubInfo>
    </>
  );
};

export default TableToolbar;

//헤더
const HeaderContainer = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterButton = styled.button`
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 0 8px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: #f3f4f6;
    transform: scale(1.06);
  }
`;

//검색바
const SearchWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.div`
  position: relative;

  input {
    width: 288px;
    padding: 8px 16px 8px 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }
`;

const SearchIcon = styled(SearchRoundedIcon)`
  position: absolute;
  width: 30px;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #bdbdbd;
  cursor: pointer;
`;

const TableSubInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 30px;
`;
const TotalCount = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: #374151;
  margin-bottom: 8px;
`;

const GradeButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedGrade, setSelectedGrade] = React.useState<string>('선택안함');
  const open = Boolean(anchorEl);
  const setGrade = useSteepSlopeStore((state) => state.setGrade);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    setGrade(grade);
    handleClose();
  };

  return (
    <>
      <FilterButton onClick={handleClick}>등급: {selectedGrade}</FilterButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleGradeSelect('선택안함')}>
          선택안함
        </MenuItem>
        <MenuItem onClick={() => handleGradeSelect('A')}>A</MenuItem>
        <MenuItem onClick={() => handleGradeSelect('B')}>B</MenuItem>
        <MenuItem onClick={() => handleGradeSelect('C')}>C</MenuItem>
        <MenuItem onClick={() => handleGradeSelect('D')}>D</MenuItem>
        <MenuItem onClick={() => handleGradeSelect('F')}>F</MenuItem>
      </Menu>
    </>
  );
};
