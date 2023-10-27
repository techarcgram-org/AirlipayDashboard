// Generate a random date and time within a specified range
function getRandomDateTime(start, end) {
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toLocaleDateString();
}

// Generate a random employee name
function getRandomEmployeeName() {
  const employeeNames = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Brown",
    "David Davis",
    "Tenjoh Glen",
  ];
  const randomIndex = Math.floor(Math.random() * employeeNames.length);
  return employeeNames[randomIndex];
}

// Generate a random amount with currency
function getRandomAmount() {
  const amount = Math.floor(Math.random() * (170000 - 20000 + 1) + 20000);
  return `XAF ${amount}`;
}

// Generate a random destination account (telephone number)
function getRandomDestinationAccount() {
  const phoneNumber = "67" + Math.floor(10000000 + Math.random() * 90000000);
  return phoneNumber;
}

// Generate an array of 33 objects with transaction details
function generateTransactions() {
  const transactions = [];
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 9, 31);

  for (let i = 0; i < 33; i++) {
    const date = getRandomDateTime(startDate, endDate);
    const employeeName = getRandomEmployeeName();
    const amount = getRandomAmount();
    const transactionID = i + 1;
    const destinationAccount = getRandomDestinationAccount();
    const totalAmountTransferred = amount;

    const transaction = {
      date,
      employeeName,
      amount,
      transactionID,
      destinationAccount,
      totalAmountTransferred,
    };

    transactions.push(transaction);
  }

  return transactions;
}

// Generate an array of 33 transaction objects
const transactions = generateTransactions();
console.log(transactions);
export default transactions