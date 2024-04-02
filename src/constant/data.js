import images from "./images";

const sidebarData = [
  {
    id: 1,
    name: "Dashboard",
    route: "/",
    image: images.home,
    // image:<CreditCardIcon fontSize={24} color="black" />
  },
  {
    id: 2,
    name: "Clients",
    route: "/clients",
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
    route: "/users/:id/withdraw",
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
    route: "/clients/payment",
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

const adminsTable = [
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    phoneNumber: "+237 (672)-499-932",
    adminId: "0000001",
  },
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    phoneNumber: "+237 (672)-499-932",
    adminId: "0000001",
  },
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    phoneNumber: "+237 (672)-499-932",
    adminId: "0000001",
  },
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    phoneNumber: "+237 (672)-499-932",
    adminId: "0000001",
  },
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    phoneNumber: "+237 (672)-499-932",
    adminId: "0000001",
  },
];

const clientsTable = [
  {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "670203775",
    clientId: "00000001",

  },
  {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "670203775",
    clientId: "00000001",

  }, {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "670203775",
    clientId: "00000001",

  }, {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "670203775",
    clientId: "00000001",

  },
];

const clientColumns = [
  { id: "name", header: "Name", field: "name" },
  { id: "email", header: "Email Address", field: "email" },
  { id: "contact", header: "Phone Number", field: "contact" },
  { id: "clientId", header: "Client ID", field: "clientId" },
  { id: "edit", header: "Edit", field: "" },
  { id: "delete", header: "Delete", field: "" },
];

const clientTransactionsColumns = [
  { id: "date", header: "Date", field: "date" },
  { id: "employeeName", header: "Employee Name", field: "employeeName" },
  { id: "amount", header: "Amount", field: "amount" },
  { id: "transactionId", header: "Transaction ID", field: "transactionId" },
  { id: "destinaionAccount", header: "Destinaion Account", field: "destinaionAccount" },
  // { id: "totalTransfered", header: "Total Transfered", field: "totalTransfered" },
];

const clientRoaster = [
  { id: "name", header: "Name", field: "name" },
  { id: "employeeId", header: "Employee ID", field: "employeeId" },
  { id: "email", header: "Email Address", field: "email" },
  { id: "phoneNumber", header: "Phone Number", field: "phoneNumber" },
  { id: "status", header: "Status", field: "status" },
];

const clientPaymentsTable = [
  {
    id: 1, status: "active", client: "AirliPay", payPeriodEnding: "06/09/2024",
    payDay: "06/09/2024", transactionId: "000000001",
    transferredBeforePayDay: "XAF 350,000"
  },
  {
    id: 2, status: "active", client: "AirliPay", payPeriodEnding: "06/09/2024",
    payDay: "06/09/2024", transactionId: "000000001",
    transferredBeforePayDay: "XAF 350,000"
  },
  {
    id: 3, status: "active", client: "AirliPay", payPeriodEnding: "06/09/2024",
    payDay: "06/09/2024", transactionId: "000000001",
    transferredBeforePayDay: "XAF 350,000"
  },
];

const clientPayments = [
  { id: "status", header: "Status", field: "status" },
  { id: "client", header: "Clent", field: "client" },
  { id: "payPeriodEnding", header: "Pay Period  Ending", field: "payPeriodEnding" },
  { id: "payDay", header: "Pay Day", field: "payDay" },
  {
    id: "transactionId",
    header: "Transaction ID",
    field: "transactionId",
  },
  {
    id: "transferredBeforePayDay",
    header: "Transferred Before Payday",
    field: "transferredBeforePayDay",
  },
];

const columns = [
  { id: "firstName", header: "First Name", field: "firstName" },
  { id: "lastName", header: "Last Name", field: "lastName" },
  { id: "email", header: "Email", field: "email" },
  { id: "phoneNumber", header: "Phone Number", field: "phoneNumber" },
  { id: "employer", header: "Employer", field: "employer" },
  { id: "userId", header: "User ID", field: "userId" },
  { id: "status", header: "Status", field: "status" },
  { id: "edit", header: "Edit", field: "" },
  { id: "delete", header: "Delete", field: "" },
  // Add more column objects as needed
];

const adminsColumns = [
  { id: "name", header: "Admin Name", field: "name" },
  { id: "email", header: "Email Address", field: "email" },
  { id: "phoneNumber", header: "Phone Number", field: "phoneNumber" },
  { id: "adminId", header: "Admin ID", field: "adminId" },
  { id: "edit", header: "Edit", field: "" },
  { id: "delete", header: "Delete", field: "" }
]

const usersTable = [
  {
    id: 7,
    name: "James Anderson",
    address: "Molyko Buea",
    email: "james.anderson@example.com",
    employee_id: "0000000001",
    employer: "Airlipay",
    status: "active",
  },
  {
    id: 7,
    name: "James Anderson",
    address: "Molyko Buea",
    email: "james.anderson@example.com",
    employee_id: "0000000001",
    employer: "Airlipay",
    status: "cancelled",
  },
  {
    id: 7,
    name: "James Anderson",
    address: "Molyko Buea",
    email: "james.anderson@example.com",
    employee_id: "0000000001",
    employer: "Airlipay",
    status: "banned",
  },
  {
    id: 7,
    name: "James Anderson",
    address: "Molyko Buea",
    email: "james.anderson@example.com",
    employee_id: "0000000001",
    employer: "Airlipay",
    status: "reviewed",
  },
  {
    id: 7,
    name: "James Anderson",
    address: "Molyko Buea",
    email: "james.anderson@example.com",
    employee_id: "0000000001",
    employer: "Airlipay",
    status: "pending",
  },
];

const userColumns = [
  { id: "name", header: "Name", field: "name" },
  { id: "email", header: "Email", field: "email" },
  { id: "address", header: "Address", field: "address" },
  { id: "employee_id", header: "Employee ID", field: "employee_id" },
  { id: "employer", header: "Employer", field: "employer" },
  { id: "status", header: "Status", field: "account_status" },
  { id: "edit", header: "Edit", field: "" },
  { id: "delete", header: "Delete", field: "" },
];

const usersDetails = [
  { id: 1, name: "John Doe", age: 30, email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "janesmith@example.com" },
  { id: 3, name: "Mike Johnson", age: 35, email: "mikejohnson@example.com" },
  { id: 4, name: "Sarah Adams", age: 28, email: "sarahadams@example.com" },
  { id: 5, name: "David Brown", age: 32, email: "davidbrown@example.com" },
  { id: 6, name: "Emily Davis", age: 27, email: "emilydavis@example.com" },
  {
    id: 7,
    name: "Michael Wilson",
    age: 41,
    email: "michaelwilson@example.com",
  },
  {
    id: 8,
    name: "Olivia Anderson",
    age: 29,
    email: "oliviaanderson@example.com",
  },
  {
    id: 9,
    name: "Daniel Thompson",
    age: 34,
    email: "danielthompson@example.com",
  },
  {
    id: 10,
    name: "Sophia Martinez",
    age: 26,
    email: "sophiamartinez@example.com",
  },
  { id: 11, name: "James Taylor", age: 37, email: "jamestaylor@example.com" },
  { id: 12, name: "Ava Hernandez", age: 31, email: "avahernandez@example.com" },
  { id: 13, name: "William Moore", age: 33, email: "williammoore@example.com" },
  { id: 14, name: "Mia Lee", age: 24, email: "mialee@example.com" },
  {
    id: 15,
    name: "Benjamin Clark",
    age: 39,
    email: "benjaminclark@example.com",
  },
  {
    id: 16,
    name: "Charlotte Lewis",
    age: 23,
    email: "charlottelewis@example.com",
  },
  {
    id: 17,
    name: "Alexander Walker",
    age: 36,
    email: "alexanderwalker@example.com",
  },
  { id: 18, name: "Grace Hall", age: 28, email: "gracehall@example.com" },
  { id: 19, name: "Henry Young", age: 32, email: "henryyoung@example.com" },
  { id: 20, name: "Lily Scott", age: 27, email: "lilyscott@example.com" },
  { id: 21, name: "Samuel Green", age: 43, email: "samuelgreen@example.com" },
  {
    id: 22,
    name: "Sofia Rodriguez",
    age: 29,
    email: "sofiarodriguez@example.com",
  },
  { id: 23, name: "Joseph Baker", age: 35, email: "josephbaker@example.com" },
  { id: 24, name: "Chloe Turner", age: 26, email: "chloeturner@example.com" },
  { id: 25, name: "Daniel White", age: 38, email: "danielwhite@example.com" },
  { id: 26, name: "Ella Adams", age: 30, email: "ellaadams@example.com" },
  { id: 27, name: "Andrew Davis", age: 33, email: "andrewdavis@example.com" },
  {
    id: 28,
    name: "Victoria Harris",
    age: 25,
    email: "victoriaharris@example.com",
  },
  { id: 29, name: "Jacob Wilson", age: 41, email: "jacobwilson@example.com" },
  { id: 30, name: "Avery Moore", age: 29, email: "averymoore@example.com" },
  {
    id: 31,
    name: "Sophia Martinez",
    age: 34,
    email: "sophiamartinez@example.com",
  },
  {
    id: 32,
    name: "Oliver Thompson",
    age: 27,
    email: "oliverthompson@example.com",
  },
  { id: 33, name: "Evelyn Taylor", age: 37, email: "evelyntaylor@example.com" },
  {
    id: 34,
    name: "Mason Hernandez",
    age: 31,
    email: "masonhernandez@example.com",
  },
  { id: 33, name: "Evelyn Taylor", age: 37, email: "evelyntaylor@example.com" },
  {
    id: 34,
    name: "Mason Hernandez",
    age: 31,
    email: "masonhernandez@example.com",
  },
];

const columnsDetails = [
  {
    id: "userInformation",
    section: "User Information",
    children: [
      { id: "name", header: "Name", field: "name" },
      { id: "age", header: "Age", field: "age" },
      { id: "email", header: "Email", field: "email" },
    ],
  },
  {
    id: "actions",
    section: "Actions",
    children: [
      { id: "edit", header: "Edit", action: "edit" },
      { id: "delete", header: "Delete", action: "delete" },
    ],
  },
];

const transactionColumns = [
  { id: "date", header: "Date", field: "date" },
  { id: "description", header: "Description (Purpose, last four)", field: "description" },
  { id: "amount", header: "Amount", field: "amount" },
  { id: "fee", header: "Fee", field: "fee" },
  { id: "balanceBefore", header: "Balance Before", field: "balanceBefore" },
  { id: "balanceAfter", header: "Balance After", field: "balanceAfter" },
];

const userTransactionColumns = [
  { id: "date", header: "Date", field: "date" },
  { id: "description", header: "Description (Type, last four)", field: "description" },
  { id: "amount", header: "Amount", field: "amount" },
  { id: "fee", header: "Fee", field: "fee" },
  { id: "beforeBalance", header: "Balance Before", field: "beforeBalance" },
  { id: "afterBalance", header: "Balance After", field: "afterBalance" },
];

const banksColumns = [
  { id: "bankName", header: "Bank Name", field: "bankName" },
  { id: "accountNumber", header: "AccountNumber", field: "accountNumber" },
  { id: "balance", header: "Balance", field: "balance" },
];

const paymentColumns = [
  { id: "date", header: "Payment date", field: "date" },
  { id: "employeeName", header: "Employee Name", field: "employeeName" },
  { id: "amount", header: "Amount", field: "amount" },
  { id: "transactionID", header: "Transaction ID", field: "transactionID" },
  {
    id: "destinationAccount",
    header: "Destination Account",
    field: "destinationAccount",
  },
  {
    id: "totalAmountTransferred",
    header: "Total Amount Transferred",
    filed: "totalAmountTransferred",
  },
];

const regionsInCameroon = [
  { value: "adamaoua", label: "Adamaoua" },
  { value: "centre", label: "Centre" },
  { value: "east", label: "East" },
  { value: "farNorth", label: "Far North" },
  { value: "littoral", label: "Littoral" },
  { value: "north", label: "North" },
  { value: "northwest", label: "Northwest" },
  { value: "west", label: "West" },
  { value: "south", label: "South" },
  { value: "southwest", label: "Southwest" },
];

const cameroonBanks = [
  { value: "afriland_first_bank", label: "Afriland First Bank" },
  { value: "banque_atlantique", label: "Banque Atlantique" },
  {
    value: "bicec",
    label:
      "Banque Internationale du Cameroun pour l'Epargne et le Crédit (BICEC)",
  },
  { value: "bnc", label: "Banque Nationale de Crédit (BNC)" },
  {
    value: "bsic",
    label:
      "Banque Sahélo-Saharienne pour l'Investissement et le Commerce (BSIC)",
  },
  { value: "cbc", label: "Commercial Bank of Cameroon (CBC)" },
  { value: "ecobank", label: "Ecobank Cameroon" },
  { value: "equity_bank", label: "Equity Bank Cameroon" },
  {
    value: "standard_chartered_bank",
    label: "Standard Chartered Bank Cameroon",
  },
  { value: "ubc", label: "Union Bank of Cameroon (UBC)" },
];

const sex = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
];

const dataStatic = {
  sidebarData,
  usersTable,
  adminsTable,
  adminsColumns,
  columns,
  clientColumns,
  clientTransactionsColumns,
  clientRoaster,
  clientsTable,
  clientPaymentsTable,
  clientPayments,
  usersDetails,
  columnsDetails,
  transactionColumns,
  userTransactionColumns,
  banksColumns,
  paymentColumns,
  cameroonBanks,
  regionsInCameroon,
  sex,
  userColumns,
};

export default dataStatic;
