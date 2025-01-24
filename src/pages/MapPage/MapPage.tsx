import { useState, useMemo } from 'react';

import styled from 'styled-components';
import rawData from '../../assets/data.json';

import BottomSheet from './components/BottomSheet';
import MapComponent from './components/MapComponent';
import { CheckboxState, DataType } from './interface';

const MapPage = () => {
  // console.log(escarpmentData);
  // console.log(escarpmentData);
  const data = rawData as DataType[];
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [allTextShow, setAllTextShow] = useState<boolean>(false);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    all: true,
    상당구: true,
    서원구: true,
    청원구: true,
    흥덕구: true,
  });
  const filteredData = useMemo<DataType[]>(() => {
    if (checkboxes.all) return data;

    return data.filter((item) => {
      const checkedAreas = Object.entries(checkboxes)
        .filter(([key, value]) => key !== 'all' && value)
        .map(([key]) => key);

      return checkedAreas.some((area) => item.city.includes(area));
    });
  }, [checkboxes]);

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCheckboxes({
      all: checked,
      상당구: checked,
      서원구: checked,
      청원구: checked,
      흥덕구: checked,
    });
  };

  const handleSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    const newCheckboxes = {
      ...checkboxes,
      [name]: checked,
    };

    const allChecked = ['상당구', '서원구', '청원구', '흥덕구'].every(
      (area) => newCheckboxes[area as keyof Omit<CheckboxState, 'all'>]
    );

    setCheckboxes({
      ...newCheckboxes,
      all: allChecked,
    });
  };

  return (
    <BaseBackground>
      <MapComponent
        selectedMarkerId={selectedMarkerId}
        setSelectedMarkerId={setSelectedMarkerId}
        escarpmentData={filteredData}
        allTextShow={allTextShow}
      />
      <BottomSheet
        selectItem={
          selectedMarkerId !== null ? filteredData[selectedMarkerId] : null
        }
      />
      <ChooseContainer>
        <ChooseWrapper>
          <ChooseArea
            type="checkbox"
            checked={checkboxes.all}
            onChange={handleAllCheck}
            id="all"
          />
          <Label htmlFor="all">모두 선택</Label>
        </ChooseWrapper>
        <ChooseWrapper>
          <ChooseArea
            type="checkbox"
            name="상당구"
            checked={checkboxes.상당구}
            onChange={handleSingleCheck}
            id="상당구"
          />
          <Label htmlFor="상당구">상당구</Label>
        </ChooseWrapper>
        <ChooseWrapper>
          <ChooseArea
            type="checkbox"
            name="서원구"
            checked={checkboxes.서원구}
            onChange={handleSingleCheck}
            id="서원구"
          />
          <Label htmlFor="서원구">서원구</Label>
        </ChooseWrapper>
        <ChooseWrapper>
          <ChooseArea
            type="checkbox"
            name="청원구"
            checked={checkboxes.청원구}
            onChange={handleSingleCheck}
            id="청원구"
          />
          <Label htmlFor="청원구">청원구</Label>
        </ChooseWrapper>
        <ChooseWrapper>
          <ChooseArea
            type="checkbox"
            name="흥덕구"
            checked={checkboxes.흥덕구}
            onChange={handleSingleCheck}
            id="흥덕구"
          />
          <Label htmlFor="흥덕구">흥덕구</Label>
        </ChooseWrapper>
      </ChooseContainer>

      <AllShowButton
        $isSelect={allTextShow}
        onClick={() => {
          console.log(allTextShow);
          console.log(allTextShow);
          setAllTextShow(!allTextShow);
        }}
      >
        {allTextShow ? '전체표기' : '개별표기'}
      </AllShowButton>
    </BaseBackground>
  );
};

export default MapPage;

const BaseBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overscroll-behavior: none;
  position: relative;
`;

const AllShowButton = styled.button<{ $isSelect: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  box-shadow: 0px 0px 5px #444;
  font-weight: 550;
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.secondary : '#fff'};
  color: ${({ $isSelect, theme }) =>
    !$isSelect ? theme.colors.secondary : '#fff'};
  &:focus {
    outline: none;
  }
`;

const ChooseContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ChooseWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
const ChooseArea = styled.input``;
const Label = styled.label`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
