// Generate a random date within a specified range
function getRandomDate(start, end) {
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime);
  return randomDate.toLocaleDateString();
}

// Generate a random number within a specified range
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Generate an array of 20 objects with random data
function generateTransactions() {
  const transactions = [];
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 9, 31);

  for (let i = 0; i < 20; i++) {
    const id = i + 1;
    const date = getRandomDate(startDate, endDate);
    // const date = "26/09/2002"
    const description = `Transaction ${id}`;
    const amount = getRandomNumber(-1000, 1000);
    const fee = getRandomNumber(0, 10);
    const balanceBefore = getRandomNumber(0, 10000);
    const balanceAfter = balanceBefore + amount - fee;

    const transaction = {
      id,
      date,
      description,
      amount,
      fee,
      balanceBefore,
      balanceAfter,
    };

    transactions.push(transaction);
  }

  return transactions;
}

// Generate an array of 20 objects with random data
function generateUserTransactions() {
  const transactions = [];
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 9, 31);

  for (let i = 0; i < 20; i++) {
    const id = i + 1;
    const date = getRandomDate(startDate, endDate);
    // const date = "26/09/2002"
    const description = `Transaction ${id}`;
    const amount = getRandomNumber(-1000, 1000);
    const fee = getRandomNumber(0, 10);
    const user = "Alvin Ana";
    const employer = "AirliPay";

    const transaction = {
      id,
      date,
      description,
      amount,
      fee,
      user,
      employer,
    };

    transactions.push(transaction);
  }

  return transactions;
}

// Generate an array of 20 objects
const transactions = generateTransactions();
const userTransactions = generateUserTransactions()
// console.log(transactions);

export { userTransactions }
export default transactions
