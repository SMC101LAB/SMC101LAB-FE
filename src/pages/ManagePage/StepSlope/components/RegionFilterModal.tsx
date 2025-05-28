import styled from 'styled-components';
import { useState } from 'react';
import { CityOptions, CountyOptions } from './regionData';
import { RegionFilterModalProps } from '../../interface';

const RegionFilterModal = ({
  isOpen,
  onClose,
  onRegionSelect,
}: RegionFilterModalProps) => {
  const [selectedCity, setSelectedCity] = useState<string>('지역');
  const [selectedCounty, setSelectedCounty] = useState<string>('모두');

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedCounty('모두');
  };

  const handleCountySelect = (county: string) => {
    setSelectedCounty(county);
    onRegionSelect(selectedCity, county);
    onClose();
  };

  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2>지역 선택</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <RegionContainer>
          <RegionColumn>
            {CityOptions.map((city) => (
              <RegionItem
                key={city.value}
                $isSelected={selectedCity === city.value}
                onClick={() => handleCitySelect(city.value)}
              >
                {city.label}
              </RegionItem>
            ))}
          </RegionColumn>
          <RegionColumn>
            {CountyOptions[selectedCity]?.map((county) => (
              <RegionItem
                key={county}
                $isSelected={selectedCounty === county}
                onClick={() => handleCountySelect(county)}
                $isAll={county === '모두'}
              >
                {county}
              </RegionItem>
            ))}
          </RegionColumn>
        </RegionContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RegionFilterModal;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  max-height: 80vh;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #111827;
  }
`;

const RegionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  height: 500px;
  overflow: hidden;
`;

const RegionColumn = styled.div`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 8px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const RegionItem = styled.div<{ $isSelected: boolean; $isAll?: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 4px;
  background-color: ${(props) =>
    props.$isSelected ? '#e5e7eb' : 'transparent'};
  color: ${(props) => (props.$isSelected ? '#111827' : '#374151')};
  transition: all 0.2s ease-in-out;
  font-weight: ${(props) => (props.$isAll ? '600' : 'normal')};

  &:hover {
    background-color: ${(props) => (props.$isSelected ? '#e5e7eb' : '#f3f4f6')};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;
