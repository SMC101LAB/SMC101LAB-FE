import React from 'react';
import FilterModal from '../ColumnFilterModal';
import DeleteConfirmModal from '../DeleteModal';
import EditModal from '../EditModal';
import RegionFilterModal from '../RegionFilterModal';
import { TableModalProps } from '../../../interface';

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
  selectedRows,
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
        selectedRows={selectedRows}
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
