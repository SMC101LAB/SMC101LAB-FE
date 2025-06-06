import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNotificationStore } from '../../../../hooks/notificationStore';
import { CommentUpdateModalProps } from '../../interface';

interface ImageFile {
  file: File | null;
  preview: string;
  id: string;
  isExisting: boolean;
  url?: string;
}
// React Native에서 전송하는 이미지 타입
interface MobileImageAsset {
  uri: string;
  width: number;
  height: number;
  type?: string;
  fileName?: string;
  dataUrl?: string;
}
const CommentUpdateModal = ({
  isModiOpen,
  setIsModiOpen,
  onSubmit,
  defaultComment,
  defaultImages,
  commentId,
}: CommentUpdateModalProps) => {
  const onClose = () => {
    setIsModiOpen(false);
  };
  const [comment, setComment] = useState(defaultComment);
  const [images, setImages] = useState<ImageFile[]>(() =>
    defaultImages.map((url) => ({
      file: null,
      preview: url,
      id: Math.random().toString(36).substring(7),
      isExisting: true,
      url: url,
    }))
  );

  const isReactNativeWebView =
    typeof window !== 'undefined' && window.ReactNativeWebView != null;
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  // 모달이 열릴 때마다 초기 상태로 재설정
  useEffect(() => {
    if (isModiOpen) {
      setComment(defaultComment);
      setImages(
        defaultImages.map((url) => ({
          file: null,
          preview: url,
          id: Math.random().toString(36).substring(7),
          isExisting: true,
          url: url,
        }))
      );
    }
  }, [isModiOpen]);

  // 디버깅용 로그
  useEffect(() => {
    console.log('Current images state:', images);
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input 엘리먼트 확인
    const fileInput = e.target;

    // 파일 목록 확인
    const files = Array.from(fileInput.files || []);

    if (files.length > 0) {
      const remainingSlots = 5 - images.length;
      if (remainingSlots <= 0) return;

      const filesToAdd = files.slice(0, remainingSlots);

      filesToAdd.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          setImages((prev) => {
            const newImages = [
              ...prev,
              {
                file,
                preview: reader.result as string,
                id: Math.random().toString(36).substring(7),
                isExisting: false,
              },
            ];
            return newImages;
          });
        };

        reader.onerror = (error) => {
          console.error(`Error reading file ${file.name}:`, error);
        };

        reader.readAsDataURL(file);
      });
    }

    // 파일 입력 초기화 (같은 파일 다시 선택 가능하도록)
    fileInput.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');

    const formData = new FormData();
    formData.append('commentId', commentId);
    formData.append('content', comment);

    // 기존 이미지 URL 추가
    const keepImageUrls = images
      .filter((img) => img.isExisting)
      .map((img) =>
        img.url?.replace(`${import.meta.env.VITE_SERVER_ADDRESS}`, '')
      )
      .filter(Boolean);

    console.log('Keeping existing images:', keepImageUrls);
    formData.append('keepImageUrls', JSON.stringify(keepImageUrls));

    // 새 이미지 파일 추가
    const newImages = images.filter((img) => !img.isExisting && img.file);
    console.log(
      'New images to upload:',
      newImages.map((img) => img.file?.name)
    );

    newImages.forEach((img) => {
      if (img.file) {
        console.log(`Adding file to FormData: ${img.file.name}`);
        formData.append('images', img.file);
      }
    });

    onSubmit(formData);
    onClose();
  };

  const removeImage = (idToRemove: string) => {
    console.log(`Removing image with id: ${idToRemove}`);
    setImages((prev) => prev.filter((img) => img.id !== idToRemove));
  };

  //사진 권한 요청
  useEffect(() => {
    const isReactNativeWebView =
      typeof window != 'undefined' && window.ReactNativeWebView != null;
    if (isReactNativeWebView) {
      window.ReactNativeWebView!.postMessage(
        JSON.stringify({ type: 'PHOTO_PERMISSIONS' })
      );
      return;
    }
  }, []);

  // 갤러리 열기 요청
  const openGallery = () => {
    if (window.ReactNativeWebView) {
      console.log('갤러리 열기 요청 전송');
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'OPEN_GALLERY',
          resetImages: false,
          maxImages: 5 - images.length,
        })
      );
    }
  };

  // React Native에서 오는 메시지 수신
  useEffect(() => {
    if (!isReactNativeWebView) return;

    const handleMobileMessage = async (event: any) => {
      try {
        // 이벤트 데이터 추출 (안드로이드와 iOS 처리 방식 통합)
        const data = JSON.parse(
          typeof event.data === 'string'
            ? event.data
            : event.nativeEvent?.data || '{}'
        );
        console.log('모바일에서 메시지 수신:', data.type);

        // 이미지 선택 메시지 처리
        if (data.type === 'IMAGES_SELECTED' && Array.isArray(data.images)) {
          console.log(`${data.images.length}개의 이미지 수신됨`);

          // 이미지 최대 개수 제한 확인
          const remainingSlots = 5 - images.length;
          if (remainingSlots <= 0) {
            console.log('이미지 최대 개수 초과');
            return;
          }

          // 추가할 이미지 수 계산
          const imagesToAdd = data.images.slice(0, remainingSlots);

          // 모바일 이미지 URI를 File 객체로 변환
          for (const mobileImage of imagesToAdd) {
            await fetchAndCreateImageFile(mobileImage);
          }
        }
      } catch (error) {
        showNotification('Error:', { severity: 'error' });

        console.error('모바일 메시지 처리 오류:', error);
      }
    };

    window.addEventListener('message', handleMobileMessage); // iOS용 이벤트 리스너
    document.addEventListener('message', handleMobileMessage as any); // Android용 이벤트 리스너

    return () => {
      window.removeEventListener('message', handleMobileMessage);
      document.removeEventListener('message', handleMobileMessage as any);
    };
  }, [isReactNativeWebView, images]);

  const fetchAndCreateImageFile = async (mobileImage: MobileImageAsset) => {
    try {
      // Base64 데이터가 없으면 처리 불가
      if (!mobileImage.dataUrl) {
        console.error('Base64 이미지 데이터가 없음');
        return;
      }

      // 파일명 처리
      let fileName = mobileImage.fileName || '';
      if (!fileName && mobileImage.uri) {
        const uriParts = mobileImage.uri.split('/');
        fileName =
          uriParts[uriParts.length - 1] || `mobile_image_${Date.now()}.jpg`;
      }

      // 확장자 확인
      const extension = fileName.split('.').pop()?.toLowerCase() || '';

      // MIME 타입 결정 - mobileImage.type는 잘못된 값("image")을 가지고 있으므로 사용하지 않음
      let mimeType: string;
      switch (extension) {
        case 'png':
          mimeType = 'image/png';
          break;
        case 'gif':
          mimeType = 'image/gif';
          break;
        case 'jpg':
        case 'jpeg':
        default:
          mimeType = 'image/jpeg';
          break;
      }

      // dataUrl에서 MIME 타입 추출 시도 (우선순위)
      const dataUrlParts = mobileImage.dataUrl.split(',');
      if (
        dataUrlParts[0] &&
        dataUrlParts[0].includes('data:') &&
        dataUrlParts[0].includes(';base64')
      ) {
        const mimeMatch = dataUrlParts[0].match(/data:([^;]+);base64/);
        if (mimeMatch && mimeMatch[1]) {
          mimeType = mimeMatch[1];
        }
      }

      // Base64 데이터 처리
      const base64Data = dataUrlParts[1];
      const byteString = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const intArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: mimeType }); //MIME 타입 설정
      const imageFile = new File([blob], fileName, {
        // File 객체 생성
        type: mimeType,
        lastModified: new Date().getTime(),
      });

      // 이미지 배열에 추가
      const preview = mobileImage.dataUrl || '';
      setImages((prev) => [
        ...prev,
        {
          file: imageFile,
          preview,
          id: Math.random().toString(36).substring(7),
          isExisting: false,
        },
      ]);
      return imageFile;
    } catch (error) {
      console.error('이미지 처리 오류:', error);
      return null;
    }
  };
  return (
    <ModalOverlay $isOpen={isModiOpen}>
      <ModalContent>
        <ModalHeader>
          <h2>결함사진 수정</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <CommentTextArea
              placeholder="결함사진에 대해 설명해주세요..."
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
                  id="updateImageUpload" // ID 변경
                  style={{ display: 'none' }} // hidden 대신 style 사용
                  multiple
                />
                <UploadLabel
                  htmlFor="updateImageUpload"
                  onClick={(e) => {
                    if (window.ReactNativeWebView) {
                      e.preventDefault();
                      openGallery();
                    }
                  }}
                >
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
              수정
            </SubmitButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CommentUpdateModal;

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
