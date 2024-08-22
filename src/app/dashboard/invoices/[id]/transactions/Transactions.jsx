import React from "react";
import Modal from "../../../../../components/Modal/Modal";
import styles from "./styles.module.css";
import moment from "moment";

const Transactions = ({ isModalOpen, setIsModalOpen, transactions }) => {
  // MODAL
  const closeModal = () => setIsModalOpen(false);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Invoice Transactions"
    >
      <div className={styles.transactions}>
        <div>
          <div>
            <table className="min-w-full divide-y divide-gray-200 border boder-solid">
              <thead className="bg-gray-50">
                <tr className="bg-[#979797]">
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Type
                  </th>
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Date
                  </th>
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Status
                  </th>
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Amount
                  </th>
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Fees
                  </th>
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Phone Number
                  </th>
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Operator
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions?.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {transaction?.transaction_type}
                      </td>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {moment(transaction?.created_at).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </td>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {transaction?.status}
                      </td>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {transaction?.amount} XAF
                      </td>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {transaction?.fees} XAF
                      </td>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {transaction?.phone_number}
                      </td>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {transaction?.operator}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Transactions;
