import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";

const Table = ({ users, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredUsers = users.filter((user) =>
    columns.some((column) =>
      user[column.field]
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Change page
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setCurrentPage(1); // Reset to the first page
    setSearchQuery(e.target.value);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setCurrentPage(1); // Reset to the first page
    setItemsPerPage(parseInt(e.target.value));
  };

  // Handle edit entry
  const handleEdit = (userId) => {
    // Perform edit action for the given userId
    console.log("Edit user:", userId);
  };

  // Handle delete entry
  const handleDelete = (userId) => {
    // Perform delete action for the given userId
    console.log("Delete user:", userId);
  };

  return (
    <div className="p-2 pb-2 relative right-4" >
      <div className="mb-4 flex justify-between items-center">
        <div>
          <span className="mr-2">Show:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-2 py-1 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <span className="mx-2">entries</span>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        <thead className="bg-gray-50">
          <tr className="bg-[#979797]">
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className="p-2 md:px-6 md:py-3 text-left text-xs font-medium text-[#000000] capitalize tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user.id}>
              {columns.map((column) => {
                if (column.id === "edit") {
                  return (
                    <td
                      key={column.id}
                      className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap"
                    >
                      <button
                        onClick={() => handleEdit(user.id)} // Add handleEdit function
                        className="text-green-600 underline"
                      >
                        <FiEdit2 />
                      </button>
                    </td>
                  );
                }
                if (column.id === "delete") {
                  return (
                    <td
                      key={column.id}
                      className="p-2 justify-center items-center whitespace-nowrap"
                    >
                      <button
                        onClick={() => handleDelete(user.id)} // Add handleDelete function
                        className="text-red-500 underline"
                      >
                        <BsFillTrashFill />
                      </button>
                    </td>
                  );
                }
                if (column.id === "status") {
                  // Handle status column
                  const status = user[column.field];
                  let statusStyle = "";
                  if (status === "active") {
                    statusStyle = "bg-green-300";
                  } else if (status === "cancelled") {
                    statusStyle = "bg-red-300";
                  } else if (status === "reviewed") {
                    statusStyle = "bg-yellow-300";
                  }

                  return (
                    <td
                      key={column.id}
                      className={` lg:p-2 mt-2 whitespace-nowrap flex items-center justify-center mx-2 ${statusStyle}`}
                    >
                      <div className="text-sm text-white font-bold capitalize">{status}</div>
                    </td>
                  );
                }
                return (
                  <td
                    key={column.id}
                    className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap"
                  >
                    <div className="text-sm text-gray-900">
                      {user[column.field]}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex flex-row justify-end items-center">
        <div className="flex items-center justify-around">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-700"
          >
            Previous
          </button>
          <div className="ml-2">
            {currentPage} / {totalPages}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 disabled:bg-gray-500 focus:ring-blue-400 bg-blue-700"
          >
            Next
          </button>
        </div>
        {/* <div>
          Page {currentPage} of {totalPages}
        </div> */}
      </div>
    </div>
  );
};

export default Table;
