// Generate a random bank name
function getRandomBankName() {
  const bankNames = [
    "Bank of America",
    "Chase Bank",
    "Wells Fargo",
    "CitiBank",
    "HSBC",
    "Barclays",
    "TD Bank",
  ];
  const randomIndex = Math.floor(Math.random() * bankNames.length);
  return bankNames[randomIndex];
}

// Generate a random account number
function getRandomAccountNumber() {
  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return accountNumber.toString();
}

// Generate a random balance
function getRandomBalance() {
  const balance = Math.random() * 100000;
  return balance.toFixed(2);
}

// Generate an array of 17 objects with bank account details
function generateBankAccounts() {
  const bankAccounts = [];

  for (let i = 0; i < 17; i++) {
    const bankName = getRandomBankName();
    const accountNumber = getRandomAccountNumber();
    const balance = getRandomBalance();

    const account = {
      bankName,
      accountNumber,
      balance,
    };

    bankAccounts.push(account);
  }

  return bankAccounts;
}

// Generate an array of 17 bank account objects
const bankAccounts = generateBankAccounts();
export default bankAccounts
