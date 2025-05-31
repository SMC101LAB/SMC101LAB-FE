import styled from 'styled-components';
import { Slope } from '../../../../apis/slopeMap';
import { useEffect, useState, useRef } from 'react';
import { slopeManageAPI } from '../../../../apis/slopeManage';
import { useNotificationStore } from '../../../../hooks/notificationStore';
import { useQueryClient } from '@tanstack/react-query';

interface ImgsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRow: Slope | null;
}

interface ImageData {
  id: string;
  file: File;
  url: string;
  name: string;
  isNew: boolean; // 새로 추가된 이미지인지 여부
}

interface ImageCategory {
  key: string;
  name: string;
}

// 이미지 상태 타입
type ImageAction = 'none' | 'add' | 'delete' | 'update';

interface ImageState {
  data: ImageData | null;
  action: ImageAction; // 이 이미지에 대한 액션
  existingUrl?: string;
}

const imageCategories: ImageCategory[] = [
  { key: 'position', name: '위치도' },
  { key: 'start', name: '시점' },
  { key: 'end', name: '종점' },
  { key: 'overview', name: '전경' },
];

const ImgsModal = ({ isOpen, onClose, selectedRow }: ImgsModalProps) => {
  const queryClient = useQueryClient();
  const [selectedData, setSelectedData] = useState<Slope | null>(null);
  const [categoryImages, setCategoryImages] = useState<
    Record<string, ImageState>
  >({
    position: { data: null, action: 'none' },
    start: { data: null, action: 'none' },
    end: { data: null, action: 'none' },
    overview: { data: null, action: 'none' },
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // 알림 함수
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  // 초기 이미지 로드 (기존 서버의 이미지가 있다면)
  useEffect(() => {
    if (selectedRow) {
      setSelectedData(selectedRow);

      const initialImages: Record<string, ImageState> = {
        position: {
          data: null, // File 객체가 아니므로 null
          action: 'none',
          existingUrl:
            selectedData?.priority?.images?.position?.url || undefined,
        },
        start: {
          data: null,
          action: 'none',
          existingUrl: selectedData?.priority?.images?.start?.url || undefined,
        },
        end: {
          data: null,
          action: 'none',
          existingUrl: selectedData?.priority?.images?.end?.url || undefined,
        },
        overview: {
          data: null,
          action: 'none',
          existingUrl:
            selectedData?.priority?.images?.overview?.url || undefined,
        },
      };

      setCategoryImages(initialImages);
    }
  }, [selectedRow]);
  // hidden input들을 생성하여 각 카테고리별 파일 업로드 처리
  const createFileInputs = () => {
    return imageCategories.map((category) => (
      <input
        key={category.key}
        ref={(el) => (fileInputRefs.current[category.key] = el)}
        type="file"
        accept="image/*"
        onChange={handleFileUpload(category.key)}
        style={{ display: 'none' }}
      />
    ));
  };

  // 특정 카테고리에 이미지 추가/수정
  const addImageToCategory = (category: string, file: File) => {
    const newImage: ImageData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      isNew: true,
    };

    // 기존 이미지가 있다면 URL 해제
    const existingImageState = categoryImages[category];
    if (existingImageState.data) {
      URL.revokeObjectURL(existingImageState.data.url);
    }

    setCategoryImages((prev) => ({
      ...prev,
      [category]: {
        data: newImage,
        action: existingImageState.data ? 'update' : 'add',
      },
    }));
  };

  // 파일 업로드 핸들러
  const handleFileUpload =
    (category: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        addImageToCategory(category, files[0]);
      }
      // input 값 초기화
      if (fileInputRefs.current[category]) {
        fileInputRefs.current[category]!.value = '';
      }
    };

  // 저장 함수 - FormData 생성 및 API 호출
  const handleSave = async () => {
    if (!selectedData?.slopeInspectionHistory?.historyNumber) {
      showNotification('관리번호가 없습니다.', { severity: 'error' });
      return;
    }

    setIsSaving(true);

    try {
      const formData = new FormData();
      const deletePositions: string[] = [];

      // 각 카테고리별로 처리
      Object.entries(categoryImages).forEach(([category, imageState]) => {
        const { data, action } = imageState;

        switch (action) {
          case 'add':
          case 'update':
            // 새 이미지 추가 또는 기존 이미지 수정
            if (data && data.file) {
              formData.append(category, data.file);
            }
            break;

          case 'delete':
            // 삭제할 카테고리 추가
            deletePositions.push(category);
            break;

          case 'none':
          default:
            // 변경사항 없음
            break;
        }
      });

      // 삭제할 포지션들 추가
      deletePositions.forEach((position) => {
        formData.append('deletePositions', position);
      });

      // API 호출
      await slopeManageAPI.updateAllImg({
        formData,
        historyNumber: selectedData.slopeInspectionHistory.historyNumber,
      });
      await queryClient.invalidateQueries({
        queryKey: ['slopes'],
      });

      showNotification('이미지가 성공적으로 저장되었습니다.', {
        severity: 'success',
      });
      onClose();
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      showNotification('이미지 저장 중 오류가 발생했습니다.', {
        severity: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // 붙여넣기 이벤트 핸들러
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            // 첫 번째 빈 카테고리에 추가
            const emptyCategory = imageCategories.find(
              (cat) => !categoryImages[cat.key].data
            );
            if (emptyCategory) {
              addImageToCategory(emptyCategory.key, file);
              break;
            }
          }
        }
      }
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (category: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      addImageToCategory(category, files[0]);
    }
  };

  // 이미지 삭제 확인 모달 열기
  const openDeleteModal = (category: string) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
    setDeleteConfirmText('');
  };

  // 이미지 삭제 실행
  const handleDeleteConfirm = () => {
    if (categoryToDelete && deleteConfirmText === '삭제') {
      const existingImageState = categoryImages[categoryToDelete];

      // URL 해제
      if (existingImageState.data) {
        URL.revokeObjectURL(existingImageState.data.url);
      }

      setCategoryImages((prev) => ({
        ...prev,
        [categoryToDelete]: {
          data: null,
          action: existingImageState.data?.isNew ? 'none' : 'delete',
        },
      }));

      setDeleteModalOpen(false);
      setCategoryToDelete(null);
      setDeleteConfirmText('');
    }
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
    setDeleteConfirmText('');
  };

  // 컴포넌트 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      Object.values(categoryImages).forEach((imageState) => {
        if (imageState.data) {
          URL.revokeObjectURL(imageState.data.url);
        }
      });
    };
  }, []);

  // 변경사항이 있는지 확인
  const hasChanges = Object.values(categoryImages).some(
    (imageState) => imageState.action !== 'none'
  );

  return (
    <>
      <ModalOverlay $isOpen={isOpen}>
        <ModalContent onPaste={handlePaste} tabIndex={0}>
          <FixedHeader>
            <ModalHeader>
              <h2>급경사지 이미지 관리</h2>
              <CloseButton onClick={onClose}>&times;</CloseButton>
            </ModalHeader>
          </FixedHeader>

          <ScrollableContent>
            {selectedData && (
              <InfoSection>
                <InfoItem>
                  <InfoLabel>급경사지명:</InfoLabel>
                  <InfoValue>{selectedData.name || '정보 없음'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>관리번호:</InfoLabel>
                  <InfoValue>{selectedData.managementNo}</InfoValue>
                </InfoItem>
                <AddressWrapper>
                  <InfoLabel>주소:</InfoLabel>
                  <AddressValue>
                    {selectedData?.location?.province || ''}
                    {selectedData?.location?.city || ''}
                    {selectedData?.location?.district || ''}
                    {selectedData?.location?.address || ''}
                    {selectedData?.location?.mainLotNumber
                      ? selectedData?.location?.subLotNumber
                        ? `   ${selectedData?.location?.mainLotNumber}-${selectedData?.location?.subLotNumber}`
                        : `   ${selectedData?.location?.mainLotNumber}`
                      : ''}
                  </AddressValue>
                </AddressWrapper>
              </InfoSection>
            )}

            <ImagesSection>
              <ImageCategoriesContainer>
                {imageCategories.map((category) => {
                  const imageState = categoryImages[category.key];
                  const image = imageState.data;

                  return (
                    <ImageCategory key={category.key}>
                      <CategoryHeader>
                        <CategoryTitle>
                          {category.name}
                          {imageState.action !== 'none' && (
                            <ActionIndicator $action={imageState.action}>
                              {imageState.action === 'add' && ' (추가)'}
                              {imageState.action === 'update' && ' (수정)'}
                              {imageState.action === 'delete' && ' (삭제 예정)'}
                            </ActionIndicator>
                          )}
                        </CategoryTitle>
                      </CategoryHeader>
                      <CategoryContent>
                        <UploadPlaceholder
                          onDragOver={handleDragOver}
                          onDrop={handleDrop(category.key)}
                        >
                          <PlaceholderText>
                            파일을 마우스로 끌어 오세요
                            <br />
                            CTRL+C/CTRL+V
                          </PlaceholderText>
                        </UploadPlaceholder>
                        <ImagePreviewArea>
                          {(image || imageState.existingUrl) &&
                          imageState.action !== 'delete' ? (
                            <>
                              <CategoryImage
                                src={image ? image.url : imageState.existingUrl}
                                alt={image ? image.name : category.name}
                              />
                              <DeleteImageButton
                                onClick={() => openDeleteModal(category.key)}
                              >
                                ×
                              </DeleteImageButton>
                            </>
                          ) : (
                            <PreviewPlaceholder>
                              급경사지 등록대상
                              <br />
                              사진({category.name})
                              {imageState.action === 'delete' && <br />}
                              {imageState.action === 'delete' && '삭제 예정'}
                            </PreviewPlaceholder>
                          )}
                        </ImagePreviewArea>
                      </CategoryContent>
                    </ImageCategory>
                  );
                })}
              </ImageCategoriesContainer>
            </ImagesSection>
          </ScrollableContent>

          <FixedFooter>
            <FooterButtonGroup>
              <SaveButton
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
              >
                {isSaving ? '저장 중...' : '저장'}
              </SaveButton>
              <CancelButton onClick={onClose}>취소</CancelButton>
            </FooterButtonGroup>
          </FixedFooter>

          {/* Hidden file inputs */}
          {createFileInputs()}
        </ModalContent>
      </ModalOverlay>

      {/* 삭제 확인 모달 */}
      <DeleteModalOverlay $isOpen={deleteModalOpen}>
        <DeleteModalContent>
          <DeleteModalHeader>
            <h3>이미지 삭제</h3>
            <CloseButton onClick={closeDeleteModal}>&times;</CloseButton>
          </DeleteModalHeader>
          <DeleteMessage>
            이미지를 삭제하시려면 입력창에 <BoldText>삭제</BoldText>라고 입력해
            주세요.
          </DeleteMessage>
          <DeleteInput>
            <input
              type="text"
              placeholder="삭제"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
            />
          </DeleteInput>
          <DeleteButtonGroup>
            <ConfirmButton
              onClick={handleDeleteConfirm}
              disabled={deleteConfirmText !== '삭제'}
            >
              확인
            </ConfirmButton>
            <CancelButton onClick={closeDeleteModal}>취소</CancelButton>
          </DeleteButtonGroup>
        </DeleteModalContent>
      </DeleteModalOverlay>
    </>
  );
};

export default ImgsModal;
// 기본 모달 스타일
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
  border-radius: 8px;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  outline: none;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #111827;
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

// 정보 섹션 스타일
const InfoSection = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #374151;
  width: 90px;
  padding-right: 10px;
`;

const InfoValue = styled.span`
  color: #111827;
`;

const AddressWrapper = styled(InfoItem)`
  align-items: flex-start;
`;

const AddressValue = styled(InfoValue)`
  line-height: 1.4;
`;

// 우측 이미지 섹션
const ImagesSection = styled.div`
  flex: 1;
`;
const ActionIndicator = styled.span<{ $action: ImageAction }>`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => {
    switch (props.$action) {
      case 'add':
        return '#059669';
      case 'update':
        return '#d97706';
      case 'delete':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  }};
`;
const ImageCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 500px;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

const ImageCategory = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const CategoryTitle = styled.span`
  font-weight: 600;
  color: #374151;
`;

const CategoryContent = styled.div`
  display: flex;
  padding: 12px;
  gap: 12px;
  height: 150px;
`;

const UploadPlaceholder = styled.div`
  flex: 1;
  border: 2px dashed #d1d5db;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  &:hover {
    border-color: #9ca3af;
  }
`;

const PlaceholderText = styled.div`
  color: #6b7280;
  font-size: 16px;
  line-height: 1.4;
`;

const ImagePreviewArea = styled.div`
  flex: 1;
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  height: 80px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const PreviewPlaceholder = styled.div`
  color: #dc2626;
  font-size: 12px;
  text-align: center;
  line-height: 1.3;
  font-weight: 500;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const DeleteImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

// 삭제 확인 모달 스타일
const DeleteModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const DeleteModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

const DeleteModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    font-size: 18px;
    color: #111827;
  }
`;

const DeleteMessage = styled.p`
  margin-bottom: 20px;
  line-height: 1.5;
  color: #374151;
`;

const BoldText = styled.span`
  font-weight: 600;
  color: #dc2626;
`;

const DeleteInput = styled.div`
  margin-bottom: 16px;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

const DeleteButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ConfirmButton = styled(Button)`
  background: #24478f;
  color: white;
`;

const CancelButton = styled(Button)`
  background: #e5e7eb;
  color: #374151;

  &:hover {
    background: #d1d5db;
  }
`;

const FixedHeader = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 12px;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 18px;
`;

const FixedFooter = styled.div`
  position: sticky;
  bottom: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 16px 16px;
  z-index: 10;
`;

const FooterButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const SaveButton = styled.button`
  background: #24478f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #1d3660;
  }
`;
