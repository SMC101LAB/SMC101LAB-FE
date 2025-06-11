import { create } from 'zustand';

export type ImageType = 'position' | 'start' | 'end' | 'overview';

interface ImageData {
  url?: string;
  createdAt?: string;
}

interface ImgViewerStore {
  isOpen: boolean;
  currentImageUrl: string | null;
  currentImageType: ImageType | null;
  images: Record<ImageType, ImageData> | null; // 이미지 데이터 저장

  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
  openImage: (imageUrl: string, imageType: ImageType) => void;

  // 이미지 데이터 설정 (컴포넌트 진입 시)
  setImageData: (images: Record<ImageType, ImageData>) => void;

  // 존재하는 이미지들만 순서대로 배열로 반환
  getAvailableImages: () => ImageType[];

  // 현재 이미지의 인덱스 반환 (0부터 시작)
  getCurrentIndex: () => number;

  // 이전 이미지 타입 반환 (없으면 null)
  getPrevImageType: () => ImageType | null;

  // 다음 이미지 타입 반환 (없으면 null)
  getNextImageType: () => ImageType | null;

  // 현재 몇 번째 / 전체 몇 개 정보
  getImagePosition: () => { current: number; total: number };

  // 이전/다음 버튼 활성화 여부
  canGoPrev: () => boolean;
  canGoNext: () => boolean;
}

export const useImgViewerStore = create<ImgViewerStore>((set, get) => ({
  isOpen: false,
  currentImageUrl: null,
  currentImageType: null,
  images: null,

  setIsOpen: (isOpen: boolean) => set({ isOpen: isOpen }),

  onClose: () => {
    set({
      isOpen: false,
      currentImageUrl: null,
      currentImageType: null,
    });
  },

  openImage: (imageUrl: string, imageType: ImageType) => {
    set({
      isOpen: true,
      currentImageUrl: imageUrl,
      currentImageType: imageType,
    });
  },

  setImageData: (images: Record<ImageType, ImageData>) => {
    set({ images });
  },

  getAvailableImages: () => {
    const { images } = get();
    if (!images) return [];

    const imageOrder: ImageType[] = ['position', 'end', 'overview', 'start'];
    return imageOrder.filter((type) => images[type]?.url);
  },

  getCurrentIndex: () => {
    const { currentImageType, getAvailableImages } = get();
    if (!currentImageType) return -1;

    const availableImages = getAvailableImages();
    return availableImages.indexOf(currentImageType);
  },

  getPrevImageType: () => {
    const { getCurrentIndex, getAvailableImages } = get();
    const availableImages = getAvailableImages();
    const currentIndex = getCurrentIndex();

    if (currentIndex <= 0) return null;
    return availableImages[currentIndex - 1];
  },

  getNextImageType: () => {
    const { getCurrentIndex, getAvailableImages } = get();
    const availableImages = getAvailableImages();
    const currentIndex = getCurrentIndex();

    if (currentIndex >= availableImages.length - 1) return null;
    return availableImages[currentIndex + 1];
  },

  getImagePosition: () => {
    const { getCurrentIndex, getAvailableImages } = get();
    const availableImages = getAvailableImages();
    const currentIndex = getCurrentIndex();

    return {
      current: currentIndex + 1, // 1부터 시작
      total: availableImages.length,
    };
  },

  canGoPrev: () => {
    const { getCurrentIndex } = get();
    return getCurrentIndex() > 0;
  },

  canGoNext: () => {
    const { getCurrentIndex, getAvailableImages } = get();
    const availableImages = getAvailableImages();
    const currentIndex = getCurrentIndex();
    return currentIndex < availableImages.length - 1;
  },
}));
