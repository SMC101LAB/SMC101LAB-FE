import CommentContainer from './CommentContainer';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CommentAddModal from './CommentModal';
import { slopeCommentAPI } from '../../../apis/slopeMap';
import { CommentData } from '../interface';
import NoInfo from './NoInfo';

interface CommentListProps {
  slopeId: string;
}

const CommentList = ({ slopeId }: CommentListProps) => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await slopeCommentAPI.getComment(slopeId);
        setCommentData(data);
      } catch (error) {
        console.log('코멘트 조회 실패', error);
      }
    };
    fetchComment();
  }, [slopeId]);
  const [isRegist, setIsRegist] = useState(false);
  return (
    <BaseContainer>
      <CommentAddModal
        isOpen={isRegist}
        onClose={() => {
          setIsRegist(false);
        }}
        onSubmit={() => {}}
      />
      <RegistButton
        onClick={() => {
          setIsRegist(true);
        }}
      >
        글 등록/사진 등록
      </RegistButton>
      {commentData.length === 0 ? (
        <NoInfo text={'등록된 내용이 없습니다.'} />
      ) : (
        commentData.map((item) => (
          <CommentContainer key={item._id} comment={item} />
        ))
      )}
    </BaseContainer>
  );
};

export default CommentList;

const BaseContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RegistButton = styled.button`
  width: 60%;
  height: 40px;
  min-height: 40px;
  border-radius: 10px;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  transition: 0.2s all;
  &:active {
    transform: scale(1.1);
  }
`;
