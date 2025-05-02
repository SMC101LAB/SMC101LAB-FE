import React from 'react';
import { Slope } from '../../../../../apis/slopeMap';
import FilterModal from '../ColumnFilterModal';
import DeleteConfirmModal from '../DeleteModal';
import EditModal from '../EditModal';
import RegionFilterModal from '../RegionFilterModal';
import { Table as TableInstance } from '@tanstack/react-table';

interface TableModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  table: TableInstance<any>;
  isRegionModalOpen: boolean;
  closeRegionModal: () => void;
  handleRegionSelect: (city: string, county: string) => void;
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  handleDelete: () => void;
  selectedRow: Slope | null;
  isEditModalOpen: boolean;
  closeEditModal: () => void;
  handleEdit: (updatedSlope: Slope) => void;
}

const TableModals: React.FC<TableModalProps> = ({
  isModalOpen,
  closeModal,
  table,
  isRegionModalOpen,
  closeRegionModal,
  handleRegionSelect,
  isDeleteModalOpen,
  closeDeleteModal,
  handleDelete,
  selectedRow,
  isEditModalOpen,
  closeEditModal,
  handleEdit,
}) => {
  return (
    <>
      <FilterModal isOpen={isModalOpen} onClose={closeModal} table={table} />
      <RegionFilterModal
        isOpen={isRegionModalOpen}
        onClose={closeRegionModal}
        onRegionSelect={handleRegionSelect}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        selectedRow={selectedRow}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEdit}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default TableModals;
