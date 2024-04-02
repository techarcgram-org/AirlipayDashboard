```Javascript
import React from "react";
import Table from "./Table";

const users = [
  { id: 1, name: "John Doe", status: "active" },
  { id: 2, name: "Jane Smith", status: "cancelled" },
  { id: 3, name: "Mike Johnson", status: "reviewed" },
  { id: 4, name: "John Smilga", status: "reviewed" },
  { id: 5, name: "Lionel Messi", status: "active" },
  { id: 6, name: "Mike Johnson", status: "reviewed" },
  // ...
];

const columns = [
  { id: "name", header: "Name", field: "name" },
  { id: "status", header: "Status", field: "status" },
  // ...
];

const App = () => {
  return (
    <div>
      <h1>User Table</h1>
      <Table users={users} columns={columns} />
    </div>
  );
};

export default App;

// ...

// Table body
<tbody className="bg-white divide-y divide-gray-200">
  {currentUsers.map((user) => (
    <tr key={user.id}>
      {columns.map((column) => {
        if (column.id === "edit") {
          // ...
        } else if (column.id === "delete") {
          // ...
        } else if (column.id === "status") { // Handle status column
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
              className={`p-2 md:p-4 lg:px-6 lg:py-4 whitespace-nowrap ${statusStyle}`}
            >
              <div className="text-sm text-gray-900">{status}</div>
            </td>
          );
        } else {
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
        }
      })}
    </tr>
  ))}
</tbody>

// ...
```
