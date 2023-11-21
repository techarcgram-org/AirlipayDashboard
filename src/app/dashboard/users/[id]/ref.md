```JSX
import React from "react";
import Table from "./Table"; // Import the Table component

const usersDetails = [
  { id: 1, name: "John Doe", age: 30, email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "janesmith@example.com" },
  { id: 3, name: "Mike Johnson", age: 35, email: "mikejohnson@example.com" },
  { id: 4, name: "Sarah Adams", age: 28, email: "sarahadams@example.com" },
  { id: 5, name: "David Brown", age: 32, email: "davidbrown@example.com" },
  { id: 6, name: "Emily Davis", age: 27, email: "emilydavis@example.com" },
  { id: 7, name: "Michael Wilson", age: 41, email: "michaelwilson@example.com" },
  { id: 8, name: "Olivia Anderson", age: 29, email: "oliviaanderson@example.com" },
  { id: 9, name: "Daniel Thompson", age: 34, email: "danielthompson@example.com" },
  { id: 10, name: "Sophia Martinez", age: 26, email: "sophiamartinez@example.com" },
  { id: 11, name: "James Taylor", age: 37, email: "jamestaylor@example.com" },
  { id: 12, name: "Ava Hernandez", age: 31, email: "avahernandez@example.com" },
  { id: 13, name: "William Moore", age: 33, email: "williammoore@example.com" },
  { id: 14, name: "Mia Lee", age: 24, email: "mialee@example.com" },
  { id: 15, name: "Benjamin Clark", age: 39, email: "benjaminclark@example.com" },
  { id: 16, name: "Charlotte Lewis", age: 23, email: "charlottelewis@example.com" },
  { id: 17, name: "Alexander Walker", age: 36, email: "alexanderwalker@example.com" },
  { id: 18, name: "Grace Hall", age: 28, email: "gracehall@example.com" },
  { id: 19, name: "Henry Young", age: 32, email: "henryyoung@example.com" },
  { id: 20, name: "Lily Scott", age: 27, email: "lilyscott@example.com" },
  { id: 21, name: "Samuel Green", age: 43, email: "samuelgreen@example.com" },
  { id: 22, name: "Sofia Rodriguez", age: 29, email: "sofiarodriguez@example.com" },
  { id: 23, name: "Joseph Baker", age: 35, email: "josephbaker@example.com" },
  { id: 24, name: "Chloe Turner", age: 26, email: "chloeturner@example.com" },
  { id: 25, name: "Daniel White", age: 38, email: "danielwhite@example.com" },
  { id: 26, name: "Ella Adams", age: 30, email: "ellaadams@example.com" },
  { id: 27, name: "Andrew Davis", age: 33, email: "andrewdavis@example.com" },
  { id: 28, name: "Victoria Harris", age: 25, email: "victoriaharris@example.com" },
  { id: 29, name: "Jacob Wilson", age: 41, email: "jacobwilson@example.com" },
  { id: 30, name: "Avery Moore", age: 29, email: "averymoore@example.com" },
  { id: 31, name: "Sophia Martinez", age: 34, email: "sophiamartinez@example.com" },
  { id: 32, name: "Oliver Thompson", age: 27, email: "oliverthompson@example.com" },
  { id: 33, name: "Evelyn Taylor", age: 37, email: "evelyntaylor@example.com" },
  { id: 34, name: "Mason Hernandez", age: 31, email: "masonhernandez@example.com" },
  { id: 33, name: "Evelyn Taylor", age: 37, email: "evelyntaylor@example.com" },
  { id: 34, name: "Mason Hernandez", age: 31, email: "masonhernandez@example.com" },
  // Add more user objects here
];

const columnsDetails = [
  { id: "userInformation", section: "User Information", children: [
    { id: "name", header: "Name", field: "name" },
    { id: "age", header: "Age", field: "age" },
    { id: "email", header: "Email", field: "email" },
  ]},
  { id: "actions", section: "Actions", children: [
    { id: "edit", header: "Edit", action: "edit" },
    { id: "delete", header: "Delete", action: "delete" },
  ]},
];

const UsersPage = () => {
  const handleAction = (action, userId) => {
    if (action === "edit") {
      // console.log("Edit user:", userId);
      // Implement your edit logic here
    } else if (action === "delete") {
      // console.log("Delete user:", userId);
      // Implement your delete logic here
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <Table users={users} columns={columns} onAction={handleAction} />
    </div>
  );
};

export default UsersPage;
```
