import React from "react";
import Modal from "../../../../../components/Modal/Modal";
import styles from "./styles.module.css";

const UsersSummary = ({ isModalOpen, setIsModalOpen, transactions }) => {
  // MODAL
  const closeModal = () => setIsModalOpen(false);

  // Step 1: Aggregate the transactions by user
  const userSummaries = transactions.reduce((acc, transaction) => {
    const { user, amount, fees } = transaction;

    if (!acc[user?.id]) {
      acc[user?.id] = {
        name: user?.name,
        totalAmount: 0,
        totalFees: 0,
        totalSum: 0,
      };
    }

    acc[user?.id].totalAmount += amount;
    acc[user?.id].totalFees += fees;
    acc[user?.id].totalSum += amount + fees;

    return acc;
  }, {});

  // Step 2: Convert the aggregated data to an array for rendering
  const userSummariesArray = Object.values(userSummaries);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Users Summary">
      <div className={styles.transactions}>
        <div>
          <div>
            <table className="min-w-full divide-y divide-gray-200 border boder-solid">
              <thead className="bg-gray-50">
                <tr className="bg-[#979797]">
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    User
                  </th>
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Total Widthdrawals
                  </th>
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Total Fees
                  </th>
                  <th className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userSummariesArray?.map((summary, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {summary.name}
                      </td>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {summary.totalAmount} XAF
                      </td>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {summary.totalFees} XAF
                      </td>
                      <td className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap">
                        {summary.totalSum} XAF
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

export default UsersSummary;
