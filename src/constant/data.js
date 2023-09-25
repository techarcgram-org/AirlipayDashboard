import images from "./images"

const sidebarData = [
  {
    id: 1,
    name: "Dashboard",
    route: "/",
    image: images.home,
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

const data = {
  sidebarData
}

export default data