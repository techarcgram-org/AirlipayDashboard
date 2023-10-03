
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
```