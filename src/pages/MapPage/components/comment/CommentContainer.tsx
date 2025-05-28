import styled from 'styled-components';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { CommentContainerProps } from '../../interface';
import { slopeCommentAPI } from '../../../../apis/slopeMap';
import CommentDeleteModal from './CommentDeleteModal';
import CommentUpdateModal from './CommentUpdateModal';
import { useCommentStore } from '../../../../stores/commentStore';

const CommentContainer = ({ comment, fetchComment }: CommentContainerProps) => {
  const { isMoreOpen, setIsMore, setIsDelete, setIsModi } = useCommentStore();

  //수정 삭제에 접근 가능한지
  const accessible = (): boolean => {
    const userId = localStorage.getItem('_id') || '';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    return userId === comment.userId._id || isAdmin;
  };
  //삭제 핸들
  const handleDelete = async () => {
    try {
      await slopeCommentAPI.deleteComment(comment._id);
      await fetchComment();
    } catch (error) {
      console.log('급경사지 코멘트 삭제 오류', error);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await slopeCommentAPI.updateComment(formData);
      await fetchComment();
      setIsModi(false);
    } catch (error) {
      console.log('코멘트 수정 오류', error);
    }
  };

  return (
    <>
      {/* 삭제모달 */}
      <CommentDeleteModal
        onSubmit={() => {
          handleDelete();
          setIsMore(false);
          setIsDelete(false);
        }}
      />
      {/*수정모달 */}
      <CommentUpdateModal
        onSubmit={handleUpdate}
        defaultComment={comment.content}
        defaultImages={comment.imageUrls.map(
          (url) => `${import.meta.env.VITE_SERVER_ADDRESS}${url}`
        )}
        commentId={comment._id}
      />
      <BaseContainer>
        <Header>
          <HeaderWrapper>
            <UserInfoWrapper>
              <Name>{comment.userId.name}</Name>
              <TagWrapper>
                {comment.userId.isAdmin && <AdminTag>관리자</AdminTag>}
                <Tag>{comment.userId.organization}</Tag>
              </TagWrapper>
            </UserInfoWrapper>
            <DateText>
              {new Date(comment.createdAt).toLocaleDateString()}
            </DateText>
          </HeaderWrapper>
          <MoreButtonContainer $isDisplay={accessible()}>
            <MoreButton
              onClick={() => {
                setIsMore(true);
              }}
            >
              <MoreIcon
                sx={{ width: '20px', height: '20px', opacity: '0.6' }}
              />
            </MoreButton>
            {isMoreOpen && (
              <>
                <MoreMenuCancel
                  onClick={() => {
                    setIsMore(false);
                  }}
                ></MoreMenuCancel>
                <MoreMenu>
                  <MenuItem
                    onClick={() => {
                      setIsModi(true);
                      setIsMore(false);
                    }}
                  >
                    수정하기
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setIsDelete(true);
                      setIsMore(false);
                    }}
                  >
                    삭제하기
                  </MenuItem>
                </MoreMenu>
              </>
            )}
          </MoreButtonContainer>
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
      </BaseContainer>{' '}
    </>
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
  gap: 14px;
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[800]};
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Tag = styled.div`
  padding: 2px 8px;
  background-color: ${({ theme }) => theme.colors.grey[200]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: ${({ theme }) => theme.colors.grey[700]};
`;
const AdminTag = styled.div`
  padding: 2px 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: ${({ theme }) => theme.colors.white};
`;

const DateText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: ${({ theme }) => theme.colors.grey[400]};
`;
const MoreButtonContainer = styled.div<{ $isDisplay: boolean }>`
  position: relative;
  display: ${({ $isDisplay }) => ($isDisplay ? 'block' : 'none')};
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

const MoreIcon = styled(MoreHorizRoundedIcon)`
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
const MoreMenu = styled.div`
  position: absolute;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
  min-width: 100px;
`;
const MoreMenuCancel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;
const MenuItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  color: ${({ theme }) => theme.colors.grey[700]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }

  &:first-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  }
`;
