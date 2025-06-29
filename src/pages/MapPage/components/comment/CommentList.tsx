import CommentContainer from './CommentContainer';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CommentAddModal from './CommentCreateModal';
import { slopeCommentAPI } from '../../../../apis/slopeMap';
import { CommentData, CommentListProps } from '../../interface';
import NoInfo from '../NoInfo';

const CommentList = ({ historyNumber }: CommentListProps) => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleCreate = async (content: string, images: File[]) => {
    try {
      const formData = new FormData();
      formData.append('historyNumber', historyNumber);
      formData.append('content', content);

      // 이미지 파일들 추가
      images.forEach((image) => {
        formData.append('images', image);
      });

      await slopeCommentAPI.createComment(formData);

      // 생성 후 코멘트 목록 다시 조회
      const newData = await slopeCommentAPI.getComment(historyNumber);
      setCommentData(newData);
      setIsAddOpen(false);
    } catch (error) {
      console.log('코멘트 생성 실패', error);
    }
  };
  //코멘트 조회
  const fetchComment = async () => {
    try {
      const data = await slopeCommentAPI.getComment(historyNumber);
      setCommentData(data);
    } catch (error) {
      console.log('코멘트 조회 실패', error);
    }
  };
  useEffect(() => {
    fetchComment();
  }, [historyNumber]);
  console.log(commentData);
  return (
    <BaseContainer>
      <CommentAddModal
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        onSubmit={(content, images) => handleCreate(content, images)}
      />
      <CreateButton
        onClick={() => {
          setIsAddOpen(true);
        }}
      >
        결함사진 등록
      </CreateButton>
      {commentData.length === 0 ? (
        <NoInfo text={'등록된 내용이 없습니다.'} />
      ) : (
        commentData.map((item) => (
          <CommentContainer
            key={item._id}
            comment={item}
            fetchComment={fetchComment}
          />
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
const CreateButton = styled.button`
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
