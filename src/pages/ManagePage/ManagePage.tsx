import { useState } from 'react';
import styled from 'styled-components';
import SideComponents from './components/SideComponents';
import { SelectPageState } from './interface';
const ManagePage = () => {
  const [selectPage, setSelectPage] = useState<SelectPageState>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const ChooseIndex = (num: number) => {
    const newSelectPage = Array(9).fill(false);
    newSelectPage[num] = true;
    setSelectPage(newSelectPage as SelectPageState);
  };
  return (
    <ManageContainer>
      <SideComponents
        selectPage={selectPage}
        ChooseIndex={ChooseIndex}
      ></SideComponents>
    </ManageContainer>
  );
};

export default ManagePage;
const ManageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
