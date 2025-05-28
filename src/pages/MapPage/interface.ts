import { Slope } from '../../apis/slopeMap';

export interface CommentData {
  _id: string;
  slopeId: string;
  userId: UserInfo;
  content: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface UserInfo {
  _id: string;
  name: string;
  organization: string;
  isAdmin: boolean;
}

//props관련
export interface InfotableProps {
  selectItem: Slope | null;
}
export interface ListProps {
  item: Slope | null;
  onClick?: () => void;
}

export interface SearchComponentProps {
  onSearch: (value: string) => void;
}
export interface NoInfoProps {
  text: string;
}
export interface CommentContainerProps {
  comment: CommentData;
  fetchComment: () => Promise<void>;
}
export interface SearchResultProps {
  resultCount: number;
  gradeCount: {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
  };
}
export interface CommentAddModalProps {
  onSubmit: (comment: string, images: File[]) => void;
}
export interface DeleteModalProps {
  onSubmit: () => void;
}
export interface CommentListProps {
  slopeId: string;
}
export interface CommentUpdateModalProps {
  onSubmit: (formData: FormData) => void;
  defaultComment: string;
  defaultImages: string[];
  commentId: string;
}
//모달 관련

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UserDelete {
  _id: string;
  isAdmin: string;
  name: string;
  organization: string;
  phone: string;
}

export interface LeftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface TermsofUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
