import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import Title from '../../components/Title';
import { slopeManageAPI } from '../../../../apis/slopeManage';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import RestoreIcon from '@mui/icons-material/Restore';
import { useNotificationStore } from '../../../../hooks/notificationStore';
import AddSlope from '../components/AddSlopeContainer';
import { FileInputContainerProps } from '../../interface';

const SteepSlopeAdd: React.FC = () => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 전역 알림
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  // 드래그 시작 핸들러
  const handleDragStart = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragActive(true);
  };

  // 드래그 종료 핸들러
  const handleDragEnd = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragActive(false);
  };

  // 파일 드롭 핸들러
  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragActive(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // 파일 선택 핸들러
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // 파일 처리 함수
  const handleFile = (file: File): void => {
    setUploadedFile(file);
    setFileName(file.name);
    console.log('선택된 파일:', file);
  };

  // 파일 입력창 클릭
  const handleContainerClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 업로드 취소
  const handleCancelUpload = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setUploadedFile(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 파일 업로드 실행
  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (!uploadedFile) return;

    setIsUploading(true);

    try {
      console.log('파일 업로드 시작:', uploadedFile);
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const data = await slopeManageAPI.uploadExcelSlope(formData);
      showNotification(`${data.message}\n${data.count}건 추가되었습니다.`, {
        severity: 'success',
      });
      // 업로드 성공 후 상태 초기화
      setUploadedFile(null);
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      showNotification('파일 업로드 오류', {
        severity: 'error',
      });
      console.error('파일 업로드 오류:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // 이미지복구 및 코멘트 복구 병렬 실행
  const handleImageRestore = async (): Promise<void> => {
    setIsRestoring(true);

    try {
      console.log('백업 복구 시작 (병렬 처리)...');

      // 두 API를 병렬로 실행
      const results = await Promise.allSettled([
        slopeManageAPI.restoreImg(),
        slopeManageAPI.restoreComment(),
      ]);

      // 결과 처리
      const [imageResult, commentResult] = results;

      // 이미지 복구 결과 처리
      if (imageResult.status === 'fulfilled') {
        showNotification(
          `이미지 복구 완료\n(복구된 이미지: ${imageResult.value.summary.restoredImages}개 / 이미지와 연결된 급경사지: ${imageResult.value.summary.restoredSlopes}개)`,
          { severity: 'success' }
        );
      } else {
        console.error('이미지 복구 실패:', imageResult.reason);
        showNotification('이미지 복구 실패', { severity: 'error' });
      }

      // 코멘트 복구 결과 처리
      if (commentResult.status === 'fulfilled') {
        showNotification('코멘트 복구 완료', { severity: 'success' });
      } else {
        console.error('코멘트 복구 실패:', commentResult.reason);
        showNotification('코멘트 복구 실패', { severity: 'error' });
      }

      // 전체 결과 요약
      const successCount = results.filter(
        (r) => r.status === 'fulfilled'
      ).length;
      const totalCount = results.length;

      if (successCount === totalCount) {
        showNotification('모든 백업 복구가 완료되었습니다!', {
          severity: 'success',
        });
      } else if (successCount > 0) {
        showNotification(`일부 복구 완료 (${successCount}/${totalCount})`, {
          severity: 'warning',
        });
      } else {
        showNotification('모든 복구 작업이 실패했습니다.', {
          severity: 'error',
        });
      }
    } catch (error) {
      // allSettled는 절대 reject되지 않음
      console.error('예상치 못한 오류:', error);
      showNotification('예상치 못한 오류가 발생했습니다.', {
        severity: 'error',
      });
    } finally {
      setIsRestoring(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddSlope isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Container>
        <HeaderContainer>
          <Title text={'급경사지 추가(엑셀업로드)'}></Title>
          <SubmitButton onClick={() => setIsOpen(!isOpen)}>
            직접 추가
          </SubmitButton>
        </HeaderContainer>

        <ContentGrid>
          {/* Excel 업로드 섹션 */}
          <UploadSection>
            <SectionTitle>Excel 데이터 업로드</SectionTitle>
            <FileInputContainer
              $isDragActive={isDragActive}
              $hasFile={!!uploadedFile}
              onDragEnter={handleDragStart}
              onDragOver={(event: DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                setIsDragActive(true);
              }}
              onDragLeave={handleDragEnd}
              onDrop={handleDrop}
            >
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileSelect}
              />

              {uploadedFile ? (
                <FileInfo>
                  <FileName>{fileName}</FileName>
                  <FileSize>
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </FileSize>
                  <ButtonContainer>
                    <UploadButton onClick={handleUpload} disabled={isUploading}>
                      {isUploading ? '업로드 중...' : '업로드'}
                    </UploadButton>
                    <CancelButton onClick={handleCancelUpload}>
                      취소
                    </CancelButton>
                  </ButtonContainer>
                </FileInfo>
              ) : (
                <UploadArea onClick={handleContainerClick}>
                  <CloudUploadRoundedIcon
                    sx={{ width: '50px', height: '50px' }}
                  />
                  <UploadText>
                    <p>클릭 혹은 파일을 이곳에 드롭하세요.</p>
                  </UploadText>
                </UploadArea>
              )}
            </FileInputContainer>
          </UploadSection>

          {/* 이미지 백업 복구 섹션 */}
          <BackupSection>
            <SectionTitle>백업 연결</SectionTitle>
            <BackupRestoreCard $isRestoring={isRestoring}>
              <BackupIconLarge $isRestoring={isRestoring}>
                <RestoreIcon
                  sx={{ width: '32px', height: '32px', color: 'white' }}
                />
              </BackupIconLarge>

              <BackupTitle>이미지 & 결함사진(댓글) 복구</BackupTitle>
              <BackupDescription>
                급경사지 데이터가 초기화 된 경우
                <br />
                기존에 등록했던 이미지와 결함사진(댓글)을 복원합니다
              </BackupDescription>

              <RestoreButton
                onClick={handleImageRestore}
                disabled={isRestoring}
                $isRestoring={isRestoring}
              >
                {isRestoring ? '복구 중...' : '복구 실행'}
              </RestoreButton>

              {isRestoring && (
                <ProgressContainer>
                  <ProgressBar />
                </ProgressContainer>
              )}
            </BackupRestoreCard>
          </BackupSection>
        </ContentGrid>
      </Container>
    </>
  );
};

export default SteepSlopeAdd;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 20px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 0 20px;
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackupSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[800] || '#495057'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FileInputContainer = styled.div<FileInputContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  height: 250px;
  border-radius: 15px;
  border: 3px dashed
    ${({ theme, $isDragActive, $hasFile }) =>
      $isDragActive
        ? '#24478f'
        : $hasFile
        ? theme.colors.grey[300]
        : theme.colors.grey[200]};
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  background-color: ${({ $isDragActive }) =>
    $isDragActive ? 'rgba(36, 71, 143, 0.05)' : 'transparent'};
`;

const BackupRestoreCard = styled.div<{ $isRestoring: boolean }>`
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.grey[200] || '#e9ecef'};
  border-radius: 15px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  min-height: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: #24478f;
    box-shadow: 0 4px 12px rgba(36, 71, 143, 0.1);
  }

  ${({ $isRestoring }) =>
    $isRestoring &&
    `
    border-color: #24478f;
    box-shadow: 0 4px 12px rgba(36, 71, 143, 0.1);
  `}
`;

const BackupIconLarge = styled.div<{ $isRestoring: boolean }>`
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  padding: 16px;
  background: linear-gradient(135deg, #24478f, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $isRestoring }) =>
    $isRestoring &&
    `
    animation: pulse 1.5s infinite;
  `}

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const BackupTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[900] || '#212529'};
  margin-bottom: 8px;
`;

const BackupDescription = styled.p`
  color: ${({ theme }) => theme.colors.grey[600] || '#6c757d'};
  margin-bottom: 20px;
  line-height: 1.5;
  font-size: 14px;
`;

const RestoreButton = styled.button<{ $isRestoring: boolean }>`
  background: linear-gradient(135deg, #24478f, #3b82f6);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  width: 100%;
  max-width: 200px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(36, 71, 143, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProgressContainer = styled.div`
  background: ${({ theme }) => theme.colors.grey[200] || '#e9ecef'};
  border-radius: 10px;
  overflow: hidden;
  height: 6px;
  margin-top: 16px;
  width: 100%;
  max-width: 200px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #24478f, #3b82f6);
  width: 0%;
  animation: progress 2s ease-in-out infinite;

  @keyframes progress {
    0% {
      width: 0%;
    }
    50% {
      width: 70%;
    }
    100% {
      width: 100%;
    }
  }
`;

// 파일이 없을 때 표시되는 영역
const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const UploadText = styled.div`
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const FileName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const FileSize = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey[600]};
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const UploadButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}DD;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey[400]};
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const SubmitButton = styled(Button)`
  background: #24478f;
  color: white;
  border: none;
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  &:hover {
    opacity: 0.9;
  }
`;
