import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface CommentAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string, images: File[]) => void;
}

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

const CommentAddModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CommentAddModalProps) => {
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<ImageFile[]>([]);
  //모달이 열릴 때 초기상태로 복원
  useEffect(() => {
    if (isOpen) {
      setComment('');
      setImages([]);
    }
  }, [isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const remainingSlots = 5 - images.length;
      const filesToAdd = files.slice(0, remainingSlots);

      filesToAdd.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [
            ...prev,
            {
              file,
              preview: reader.result as string,
              id: Math.random().toString(36).substring(7),
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      comment,
      images.map((img) => img.file)
    );
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setComment('');
    setImages([]);
  };

  const removeImage = (idToRemove: string) => {
    setImages((prev) => prev.filter((img) => img.id !== idToRemove));
  };

  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2>코멘트 작성</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <CommentTextArea
              placeholder="코멘트를 입력해주세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormGroup>

          <ImageUploadSection>
            <ImagePreviewGrid>
              {images.map((img) => (
                <PreviewContainer key={img.id}>
                  <PreviewImage src={img.preview} alt="Preview" />
                  <RemoveImageButton
                    type="button"
                    onClick={() => removeImage(img.id)}
                  >
                    &times;
                  </RemoveImageButton>
                </PreviewContainer>
              ))}
            </ImagePreviewGrid>

            {images.length < 5 && (
              <UploadContainer>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="imageUpload"
                  hidden
                  multiple
                />
                <UploadLabel htmlFor="imageUpload">
                  <span>📷</span>
                  사진 첨부하기 ({images.length}/5)
                </UploadLabel>
              </UploadContainer>
            )}
          </ImageUploadSection>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={!comment.trim()}>
              등록
            </SubmitButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

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
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;

  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  height: 128px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ImageUploadSection = styled.div`
  margin-bottom: 24px;
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
`;

const PreviewContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const UploadContainer = styled.div`
  margin-top: 12px;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: #f3f4f6;
  }

  span {
    font-size: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(Button)`
  background: #2563eb;
  color: white;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }
`;

const CancelButton = styled(Button)`
  background: #e5e7eb;
  color: #374151;

  &:hover {
    background: #d1d5db;
  }
`;

export default CommentAddModal;
