import { CreditCardIcon } from "@heroicons/react/24/solid";
import images from "./images"

const sidebarData = [
  {
    id: 1,
    name: "Dashboard",
    route: "/",
    image: images.home,
    // icon:<CreditCardIcon />
  },
  {
    id: 2,
    name: "Clients",
    route: "/client",
    image: images.client,
  },
  {
    id: 3,
    name: "Admins",
    image: images.group,
    route: "/admins",
  },
  {
    id: 4,
    name: "Users",
    route: "/users",
    image: images.person,
  },
  {
    id: 5,
    name: "User Withdrawals",
    route: "/user/:id/withdraw",
    image: images.processing,
  },
  {
    id: 6,
    name: "User Airlipays",
    image: images.processing,
    route: "/ailipay",
  },
  {
    id: 7,
    name: "Clients Payment",
    route: "/client/payment",
    image: images.payment,
  },
  {
    id: 8,
    name: "Banks",
    route: "/banks",
    image: images.bank,
  },
  {
    id: 9,
    name: "Address",
    image: images.address,
    route: "/address",
  },
];

const usersTable = [
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "active",
  },
  {
    id: 8,
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Facebook",
    status: "active",
  },
  {
    id: 9,
    name: "Sophia Martin",
    email: "sophia.martin@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "reviewed",
  },
  {
    id: 10,
    name: "James Anderson",
    email: "james.anderson@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Facebook",
    status: "reviewed",
  },
  {
    id: 11,
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "cancelled",
  },
  {
    id: 12,
    name: "Matthew Taylor",
    email: "matthew.taylor@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "active",
  },
  {
    id: 13,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "reviewed",
  },
  {
    id: 14,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "active",
  },
  {
    id: 15,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "active",
  },
  {
    id: 16,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "cancelled",
  },
  {
    id: 17,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "cancelled",
  },
  {
    id: 18,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "active",
  },
  {
    id: 19,
    name: "David Lee",
    email: "david.lee@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "reviewed",
  },
  {
    id: 20,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "active",
  },
  {
    id: 21,
    name: "Christopher Brown",
    email: "christopher.brown@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "reviewed",
  },
  {
    id: 22,
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "cancelled",
  },
  {
    id: 23,
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "reviewed",
  },
  {
    id: 24,
    name: "Sophia Martin",
    email: "sophia.martin@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "active",
  },
  {
    id: 25,
    name: "James Anderson",
    email: "james.anderson@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "cancelled",
  },
  {
    id: 26,
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "active",
  },
  {
    id: 27,
    name: "Matthew Taylor",
    email: "matthew.taylor@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
    status: "active",
  },
];

const clientsTable = [
  {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    // role: "Admin",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    status: "active",
  },
  {
    id: 6,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    // role: "User",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Google",
    status: "active",
  },
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    // role: "Admin",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    status: "reviewed",
  },
  {
    id: 8,
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    // role: "User",
    // address: "Limbe",
    contact: "670203775",
    employerId: "YouTube",
    status: "reviewed",
  },
  {
    id: 9,
    name: "Sophia Martin",
    email: "sophia.martin@example.com",
    // role: "User",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    "status":"cancelled"
  },
  {
    id: 10,
    name: "James Anderson",
    email: "james.anderson@example.com",
    // role: "Admin",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Facebook",
    status: "cancelled",
  },
  {
    id: 11,
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    // role: "User",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    status: "active",
  },
  {
    id: 12,
    name: "Matthew Taylor",
    email: "matthew.taylor@example.com",
    // role: "Admin",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    status: "cancelled",
  },
  {
    id: 13,
    name: "John Doe",
    email: "john.doe@example.com",
    // role: "Admin",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    status: "cancelled",
  },
  {
    id: 14,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    // role: "User",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    status: "active",
  },
  {
    id: 15,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    // role: "Admin",
    // address: "Limbe",
    contact: "620161833",
    employerId: "Airlipay",
    status: "reviewed",
  },
  {
    id: 16,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    // role: "User",
    // address: "Limbe",
    contact: "620161833",
    employerId: "Airlipay",
    status: "active",
  },
  {
    id: 17,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    // role: "Admin",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    status: "active",
  },
  {
    id: 18,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    // role: "User",
    // address: "Limbe",
    contact: "620161833",
    employerId: "Airlipay",
    status: "cancelled",
  },
  {
    id: 19,
    name: "David Lee",
    email: "david.lee@example.com",
    // role: "Admin",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    status: "active",
  },
  {
    id: 20,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    // role: "User",
    // address: "Limbe",
    contact: "670203775",
    employerId: "Airlipay",
    status: "cancelled",
  },
  {
    id: 21,
    name: "Christopher Brown",
    email: "christopher.brown@example.com",
    // role: "Admin",
    // address: "Limbe",
    contact: "620161833",
    employerId: "Airlipay",
    status: "reviewed",
  },
];

const columns = [
  { id: "name", header: "Name", field: "name" },
  { id: "email", header: "Email", field: "email" },
  { id: "role", header: "Role", field: "role" },
  { id: "address", header: "Address", field: "address" },
  { id: "contact", header: "Contact", field: "contact" },
  { id: "employer", header: "Employer", field: "employer" },
  { id: "edit", header: "Edit", field: "" },
  { id: "delete", header: "Delete", field: "" },
  { id: "status", header: "Status", field: "status" },
  // Add more column objects as needed
];

const clientColumns = [
  { id: "name", header: "Name", field: "name" },
  { id: "employerId", header: "ClientId", field: "employerId" },
  { id: "email", header: "Email Address", field: "email" },
  // { id: "role", header: "Role", field: "role" },
  // { id: "address", header: "Address", field: "address" },
  { id: "contact", header: "Phone Number", field: "contact" },
  { id: "status", header: "Status", field: "status" },
];

const data = {
  sidebarData,
  usersTable,
  columns,
  clientColumns,
  clientsTable
}

export default data