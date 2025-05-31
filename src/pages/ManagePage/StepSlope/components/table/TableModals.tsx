import React from 'react';
import FilterModal from '../ColumnFilterModal';
import DeleteConfirmModal from '../DeleteModal';
import EditModal from '../EditModal';
import RegionFilterModal from '../RegionFilterModal';
import { TableModalProps } from '../../../interface';
import ImgsModal from '../ImgsModal';

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
  isImgsModalOpen,
  closeImgsModal,
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
      <ImgsModal
        isOpen={isImgsModalOpen}
        onClose={closeImgsModal}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default TableModals;
