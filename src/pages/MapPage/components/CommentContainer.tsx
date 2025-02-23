import styled from 'styled-components';
import moreIcon from '../../../assets/Icons/more.svg';
import { CommentContainerProps } from '../interface';

const CommentContainer = ({ comment }: CommentContainerProps) => {
  return (
    <BaseContainer>
      <Header>
        <HeaderWrapper>
          <UserInfoWrapper>
            <Name>{comment.userId.name}</Name>
            <Tag>{comment.userId.organization}</Tag>
          </UserInfoWrapper>
          <DateText>
            {new Date(comment.createdAt).toLocaleDateString()}
          </DateText>
        </HeaderWrapper>
        <MoreButton>
          <MoreIcon src={moreIcon} alt="more" />
        </MoreButton>
      </Header>
      <ContentContainer>{comment.content}</ContentContainer>
      <ImgContainer>
        {comment.imageUrls.map((tmpurl, index) => {
          const url = `${import.meta.env.VITE_SERVER_ADDRESS}${tmpurl}`;
          return (
            <Img key={index} src={url} alt={`Comment image ${index + 1}`} />
          );
        })}
      </ImgContainer>
    </BaseContainer>
  );
};
export default CommentContainer;

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  gap: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[800]};
`;

const Tag = styled.div`
  padding: 2px 8px;
  background-color: ${({ theme }) => theme.colors.grey[100]};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const DateText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  color: ${({ theme }) => theme.colors.grey[400]};
`;

const MoreButton = styled.button`
  border: none;
  background: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
    border-radius: 50%;
  }
`;

const MoreIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.6;
`;

const ContentContainer = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  color: ${({ theme }) => theme.colors.grey[700]};
  line-height: 1.5;
  word-break: break-all;
`;

const ImgContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 8px;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grey[100]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey[300]};
    border-radius: 4px;
  }
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 8px;
`;
