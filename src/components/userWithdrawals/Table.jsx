"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
// import Modal from "../common/modal";
// import { AddUser } from "..";
import { useDispatch } from "react-redux";
import {
  deleteClientById,
  updateClientById,
} from "@/app/GlobalRedux/Features/clientSlice";
import {
  removeAdmin,
  updateAdmin,
} from "@/app/GlobalRedux/Features/adminSlice";
import { removeUser, updateUser } from "@/app/GlobalRedux/Features/userSlice";

const Table = ({
  users,
  columns,
  filter,
  transactionTypes,
  employers,
  setTxnType,
  setEmployer,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  // const [currentUrl, setCurrentUrl] = useState("");
  const [currentUrlUser, setCurrentUrlUser] = useState("");
  const [status, setStatus] = useState({});

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredUsers = users.filter((user) =>
    columns.some((column) =>
      user[column.field]
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // current url
  useEffect(() => {
    const currentURL = window.location.href;
    // const dashboardIndex = currentURL.indexOf("/dashboard");
    // const urlFromDashboard = currentURL.substring(dashboardIndex);
    // setCurrentUrl(urlFromDashboard);

    const parts = currentURL.split("/");
    const index = parts.indexOf("dashboard");
    const desiredValue = parts[index + 1];
    setCurrentUrlUser(desiredValue);
  }, []);

  // open modal
  const openModal = () => {
    setModalOpen(true);
  };

  // close modal
  const closeModal = () => {
    setModalOpen(false);
  };

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
    // console.log(e.target.value);
    // setSearchQuery(e.target.value);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setCurrentPage(1); // Reset to the first page
    setItemsPerPage(parseInt(e.target.value));
  };

  // Handle update status
  const handleUpdateStatus = () => {
    try {
      const data = { id: status.id, accountStatus: status.status };
      if (currentUrlUser === "clients") {
        dispatch(updateClientById(data));
        window.location.reload();
      }
      if (currentUrlUser === "admins") {
        dispatch(updateAdmin(data));
        window.location.reload();
      }
      if (currentUrlUser === "users") {
        dispatch(updateUser(data));
        window.location.reload();
      }
      if (currentUrlUser === "payments") {
        //  dispatch(updateUser(data));
        window.location.reload();
      }
      if (currentUrlUser === "invoices") {
        //  dispatch(updateUser(data));
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleUpdateStatus();
  }, [status]);

  // Handle delete entry
  const handleDelete = (id) => {
    const userConfirmed = window.confirm("Do you want to proceed?");
    if (userConfirmed) {
      if (currentUrlUser === "clients") {
        dispatch(deleteClientById(id));
      }
      if (currentUrlUser === "admins") {
        dispatch(removeAdmin(id));
      }
      if (currentUrlUser === "users") {
        dispatch(removeUser(id));
      }
    } else {
      console.log("cancelled");
    }
  };

  return (
    <div className="mt-4">
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
          {filter && (
            <>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                onChange={(e) => setTxnType(e.target.value)}
              >
                <option>TRANSACTION TYPE</option>
                {transactionTypes?.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2 ml-2"
                onChange={(e) => setEmployer(e.target.value)}
              >
                <option>EMPLOYER</option>
                {employers?.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            </>
          )}
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200 border boder-solid">
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
                        // onClick={() => openModal()} // Add handleEdit function
                        onClick={() => {
                          router.push(
                            `/dashboard/${currentUrlUser}/${user.id}/edit`
                          );
                        }}
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
                      className="p-2 md:px-6 justify-around items-center whitespace-nowrap"
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
                  const status = user["account_status"];
                  let statusStyle = "";
                  if (status === "ACTIVE") {
                    statusStyle = "text-green-600";
                  } else if (status === "CANCELLED") {
                    statusStyle = "text-red-600";
                  } else if (status === "BANNED") {
                    statusStyle = "text-red-600";
                  } else if (status === "BLOCKED") {
                    statusStyle = "text-red-900";
                  } else if (status === "REVIEWED") {
                    statusStyle = "text-yellow-600";
                  } else if (status === "PENDING") {
                    statusStyle = "text-yellow-600";
                  } else if (status === "DEACTIVATED") {
                    statusStyle = "text-purple-600";
                  }
                  return (
                    <td
                      key={column.id}
                      // className={` lg:p-2 mt-2 whitespace-nowrap flex items-center justify-center mx-2 ${statusStyle}`}
                      className={` lg:p-2 mt-2 whitespace-nowrap flex items-center justify-center mx-2`}
                    >
                      {/* <div className="text-sm text-white font-bold capitalize">
                        {status}
                      </div> */}
                      <select
                        className={`w-32 px-2 py-1 border border-gray-300 rounded-md text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${statusStyle}`}
                        onChange={(e) =>
                          setStatus({ id: user.id, status: e.target.value })
                        }
                      >
                        <option>{status?.toUpperCase()}</option>
                        <option value={"PENDING"}>PENDING</option>
                        <option value={"ACTIVE"}>ACTIVE</option>
                        <option value={"BLOCKED"}>BLOCKED</option>
                        <option value={"BANNED"}>BANNED</option>
                        <option value={"DEACTIVATED"}>DEACTIVATED</option>
                      </select>
                    </td>
                  );
                }
                if (column.id === "address") {
                  return (
                    <td
                      key={column.id}
                      className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap"
                    >
                      <div className="text-sm text-gray-900">
                        <Link href="/dashboard/users/2">
                          {`${user["street"]}, ${user["city"]}, ${user["region"]} `}
                        </Link>
                      </div>
                    </td>
                  );
                }
                return (
                  <td
                    key={column.id}
                    className="p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap"
                  >
                    <div className="text-sm text-gray-900">
                      <Link
                        href={
                          user.id && currentUrlUser != "payments"
                            ? `/dashboard/${currentUrlUser}/${user.id}`
                            : user.id && currentUrlUser === "payments"
                            ? ""
                            : ""
                        }
                      >
                        {user[column.field]}
                      </Link>
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
