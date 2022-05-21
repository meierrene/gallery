'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'René Meier',
  movements: [27, -9.99, 100000, 700000, -49.79, 99, 900000, -300],
  interestRate: 2,
  pin: 3333,
  movementsDates: [
    '2018-11-18T21:31:17.178Z',
    '2018-12-23T07:42:02.383Z',
    '2019-01-28T09:15:04.904Z',
    '2019-04-01T10:17:24.185Z',
    '2019-05-08T14:11:59.604Z',
    '2021-09-08T17:01:17.194Z',
    '2021-09-09T21:36:17.929Z',
    '2021-09-10T13:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account4 = {
  owner: 'Katia Meier',
  movements: [20, -9.99, 1000, 700, -50, 100, 900, -300],
  interestRate: 2,
  pin: 4444,
  movementsDates: [
    '2018-11-18T21:31:17.178Z',
    '2018-12-23T07:42:02.383Z',
    '2019-01-28T09:15:04.904Z',
    '2019-04-01T10:17:24.185Z',
    '2019-05-08T14:11:59.604Z',
    '2021-09-08T17:01:17.194Z',
    '2021-09-09T21:36:17.929Z',
    '2021-09-10T13:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

let checked = document.querySelector('.checkbox');
checked.addEventListener('click', function () {
  inputLoginPin.type === 'password'
    ? (inputLoginPin.type = 'text')
    : (inputLoginPin.type = 'password');
});

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const mov = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  mov.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.movementsDates[i]);
    const printDate = formatMovementDate(date, account.locale);
    const formattedMov = formatCur(mov, account.locale, account.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${printDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
  // Blanking fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  inputCloseUsername.value = inputClosePin.value = '';
  inputLoanAmount.value = '';
  inputTransferAmount.value = inputTransferTo.value = '';
};

const startLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 300;
  // Call the timer every second
  const timer = setInterval(function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When reachs 0 seconds, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      logout();
    }

    // Decrease one second
    time--;
  }, 1000);
  return timer;
};

const logout = function () {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long', //long
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  } else {
    alert('Invalid user or PIN');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add tranfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  } else {
    alert('Invalid user or amount');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();

    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  } else {
    alert('Invalid amount');
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    logout();
    alert('Account closed with success!');
  } else {
    alert('Invalid user or PIN');
  }
});

let sorted = false;
btnSort.addEventListener('click', function () {
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//--------------------------------------------------------------------------
// // Converting and Checking Numbers
// console.log(27 === 27.0);

// // Base 10 - 0 to 9, 1/10 = 0.1. 3/10 = 3.3333333
// // Binary base 2 - 0 and 1
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// // Conversion
// console.log(Number('27'));
// console.log(+'27');

// // Parsing
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('e27', 10));

// console.log(Number.parseInt('2.5rem'));
// console.log(Number.parseFloat('2.5rem'));

// // Check if value is NaN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(27 / 0));

// // Checking if value is a number (BEST METHOD)
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20X'));
// console.log(Number.isFinite(27 / 0));

// console.log(Number.isInteger(27));
// console.log(Number.isInteger(27.0));
// console.log(Number.isInteger(27 / 0));

//--------------------------------------------------------------------------
// // Math and Rounding

// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(27 ** (1 / 3)); // Also works for a cubic root

// console.log(Math.max(5, 10, 27, 23, 14));
// console.log(Math.max(5, 10, '27', 23, 14));
// console.log(Math.max(5, 10, '27px', 23, 14));

// console.log(Math.min(5, 10, 27, 23, 14));

// console.log(Math.PI * Number.parseFloat('10x') ** 2);
// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// // console.log(randomInt(18, 20));

// // Rounding integers to nearest integer
// console.log(Math.round(27.1));
// console.log(Math.round(27.9));

// // Rounding integers to higher integer
// console.log(Math.ceil(27.1));
// console.log(Math.ceil(-27.9));

// // Rounding integers to lower integer
// console.log(Math.floor(27.1));
// console.log(Math.floor(27.9));
// console.log(Math.floor(-27.9));

// // Similar as floor but this just removes the decimals beeing different for negative numbers
// console.log(Math.trunc(27.9));
// console.log(Math.trunc(-27.9));

// // Rounding decimals
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.345).toFixed(2));
// console.log(+(2.345).toFixed(2)); // Convert to number

//--------------------------------------------------------------------------
// // The remainder operator

// console.log(5 % 2); // Remainder is 1!
// console.log(5 / 2); // 5 = 2 * 2 + 1 => Is the remainder

// console.log(8 % 3); // Remainder is 2!
// console.log(8 / 3); // 8 = 2 * 3 + 2 => Is the remainder

// const isEven = n => n % 2 === 0;

// console.log(isEven(8));
// console.log(isEven(27));
// console.log(isEven(514));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'darkcyan';
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

//--------------------------------------------------------------------------
// // Working with bigInts

// console.log(2 ** 53 - 1); // Works up 53 bits
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 1); // Shows the wrong sum
// console.log(2 ** 53 + 2);
// console.log(2 ** 53 + 3);
// console.log(2 ** 53 + 4);

// console.log(45645646515645645645651654566541);
// console.log(45645646515645645645651654566541n);
// console.log(BigInt(45645646515645645645651654566541));

// // Operations
// const huge = 564156465646546545645616581564561n;
// const num = 27;
// console.log(10000n + 10000n);
// console.log(huge * 100000000000n);
// console.log(huge * BigInt(num));

// // Exceptions
// console.log(20n > 15); // Still works
// console.log(20n === 20); // False
// console.log(20n == 20); // True
// console.log(typeof 20n); // bigint

// console.log(huge + ' is REALLY big!!!');

// // Divisions
// console.log(10n / 3n); // Cuts the decimal part

//--------------------------------------------------------------------------
// // Creating dates

// const now = new Date();
// console.log(now);

// console.log(new Date('Apr 27 1988 20:20:00'));
// console.log(new Date('December 24, 1996'));
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5)); // (Year, Month[based 0], Day, Hour, Minute, Second)
// console.log(new Date());
// console.log(new Date(3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000));

// // Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth() + 1);
// console.log(future.getDate());
// console.log(future.getDay()); // Day of week
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime()); // 2142267780000
// console.log(new Date(2142267780000)); // Date from future variable
// console.log(Date.now());

// future.setFullYear(2040);
// console.log(future);

//--------------------------------------------------------------------------
// // Operation with Dates

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

// const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
// console.log(days1);

//--------------------------------------------------------------------------
// // Internationalizing Dates (Intl)

// const num = 3884764.23;
// const options = {
//   style: 'currency',
//   unit: 'celsius',
//   currency: 'EUR',
//   // useGrouping: false,
// };
// console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
// console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, options).format(num)
// );

//--------------------------------------------------------------------------
// // Timers: setTimeout and setInterval

// // setTimeout
// const ingredients = ['olives', 'spinach', 'tomato'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
//   3000,
//   ...ingredients
// );
// console.log('Waiting...');

// if (ingredients.includes('tomato')) clearTimeout(pizzaTimer);

// // setInterval
// const eachSec = setInterval(function () {
//   const now = new Date();
//   const options = {
//     second: 'numeric',
//     minute: 'numeric',
//     hour: 'numeric',
//   };
//   console.log(Intl.DateTimeFormat('en-UK', options).format(now));
// }, 1000);

//--------------------------------------------------------------------------
// Numeric Separators
// Feature ES2021

// 287,460,000,000
const diameter = 287_460_000_000;

console.log(diameter);

const price = 345_99;
console.log(price);

const tranferFee1 = 15_00;
const tranferFee2 = 1_500;

const PI = 3.14_15;
console.log(PI);

console.log(Number('230_000')); // NaN
console.log(+'230_000'); // NaN
console.log(parseInt('230_000')); // Only gets 230
