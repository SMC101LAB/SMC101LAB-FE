import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import Title from '../../components/Title';
import { slopeManageAPI } from '../../../../apis/slopeManage';
import AddSlope from '../components/AddSlopeContainer';
import { Slope } from '../../../../apis/slopeMap';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { useNotificationStore } from '../../../../hooks/notificationStore';
interface FileInputContainerProps {
  $isDragActive?: boolean;
  $hasFile?: boolean;
  theme?: any;
}

const SteepSlopeAdd: React.FC = () => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  //전역 알림
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
  const handleAdd = async (newSlopeData: Slope) => {
    try {
      await slopeManageAPI.createSlope(newSlopeData);
    } catch (error) {
      console.error('파일 업로드 오류:', error);
    }
  };
  return (
    <Container>
      <HeaderContainer>
        <Title text={'급경사지 추가(엑셀업로드)'}></Title>
      </HeaderContainer>
      <InputContainerWrapper>
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
              <FileSize>{(uploadedFile.size / 1024).toFixed(2)} KB</FileSize>
              <ButtonContainer>
                <UploadButton onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? '업로드 중...' : '업로드'}
                </UploadButton>
                <CancelButton onClick={handleCancelUpload}>취소</CancelButton>
              </ButtonContainer>
            </FileInfo>
          ) : (
            <UploadArea onClick={handleContainerClick}>
              <CloudUploadRoundedIcon sx={{ width: '50px', height: '50px' }} />
              <UploadText>
                <p>클릭 혹은 파일을 이곳에 드롭하세요.</p>
              </UploadText>
            </UploadArea>
          )}
        </FileInputContainer>
      </InputContainerWrapper>
      <Line />
      <HeaderContainer>
        <Title text={'급경사지 추가(직접 업로드)'}></Title>
      </HeaderContainer>
      <AddSlope onSubmit={handleAdd} />
    </Container>
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
const Line = styled.div`
  margin-top: 30px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.grey[200]};
`;
const HeaderContainer = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 16px;
`;
const InputContainerWrapper = styled.div`
  padding: 0 20px;
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
    $isDragActive ? 'rgba(51, 102, 255, 0.05)' : 'transparent'};
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
