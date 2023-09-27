import React, { useState } from "react";

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

  return (
    <div>
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
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap"
                >
                  <div className="text-sm text-gray-900">
                    {user[column.field]}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700"
        >
          Previous
        </button>
        <span className="px-3 py-1">{currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
