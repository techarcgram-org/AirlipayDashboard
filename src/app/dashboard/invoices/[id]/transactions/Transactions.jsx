import React from "react";
import Modal from "@/components/Modal/Modal";

const Transactions = ({ isModalOpen, setIsModalOpen }) => {
  // MODAL
  const closeModal = () => setIsModalOpen(false);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Invoice Transactions"
    >
      <div>hello</div>
    </Modal>
  );
};

export default Transactions;
