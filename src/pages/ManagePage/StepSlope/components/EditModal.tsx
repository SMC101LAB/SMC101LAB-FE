import { Slope } from '../../../../apis/slopeMap';
import { useState, useEffect } from 'react';
import SlopeForm from './SlopeForm';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedSlope: Slope) => void;
  selectedRow: Slope | null;
}

const EditModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedRow,
}: EditModalProps) => {
  const [editedData, setEditedData] = useState<Slope | null>(null);

  useEffect(() => {
    if (selectedRow) {
      setEditedData(selectedRow);
    }
  }, [selectedRow]);

  if (!isOpen || !editedData) return null;

  const handleSubmit = (data: Slope) => {
    onSubmit(data);
    onClose();
  };

  return (
    <SlopeForm
      titleText="급경사지 정보 수정"
      initialData={editedData}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="저장"
    />
  );
};

export default EditModal;
