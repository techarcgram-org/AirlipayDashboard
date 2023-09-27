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
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 5,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 6,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 7,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 8,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 9,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 10,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 11,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  {
    id: 12,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    address: "Limbe",
    contact: "670203775",
    employer: "Airlipay",
  },
  // Add more user objects as needed
];

const data = {
  sidebarData,
  usersTable
}

export default data