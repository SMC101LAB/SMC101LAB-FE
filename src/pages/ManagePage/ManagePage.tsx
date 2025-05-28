import { useState } from 'react';
import styled from 'styled-components';
import SideComponents from './components/SideComponents';
import { SelectPageState } from './interface';
import { Outlet, useNavigate } from 'react-router-dom';

const ManagePage = () => {
  const nav = useNavigate();
  const [selectPage, setSelectPage] = useState<SelectPageState>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const Page = [
    './home',
    './slope/list',
    './slope/add',
    './outlier/empty',
    './outlier/dup',
    './outlier/location',
    './member/list',
    './member/edit',
    './map',
  ];
  const ChooseIndex = (num: number) => {
    const newSelectPage = Array(9).fill(false);
    newSelectPage[num] = true;
    setSelectPage(newSelectPage as SelectPageState);
    nav(Page[num]);
  };
  return (
    <ManageContainer>
      <SideComponents
        selectPage={selectPage}
        ChooseIndex={ChooseIndex}
      ></SideComponents>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </ManageContainer>
  );
};

export default ManagePage;
const ManageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  width: 100%;
`;
