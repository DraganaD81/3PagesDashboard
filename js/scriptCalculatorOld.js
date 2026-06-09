'use strict';

// Page calculator

const btnDelete = document.querySelector('.btn-delete');
const btnPlus = document.querySelector('.btn-plus');
const btnMinus = document.querySelector('.btn-minus');
const btnMultiply = document.querySelector('.btn-multiply');
const btnDivide = document.querySelector('.btn-divide');
const btnEqual = document.querySelector('.btn-equal');
const btnNumber = document.querySelectorAll('.btn-number');
const inputedNumber = document.querySelector('.input-number');
const calculatorContainer = document.getElementById('calculator');

let finalSum;
let enteredNumber = '';
let actualNumber = [];
let finalNumber = '';
let indicator = '';
let numberOne = null;
let numberTwo = null;
let numberMemory = null;
const calculateNumber = function (a, b, indicator) {
  let sum;
  // if ((indicator = 'sum-plus')) {
  if (indicator === '') sum = a;
  else if (indicator === 'btn-plus') sum = a + b;
  else if (indicator === 'btn-minus') sum = a - b;
  else if (indicator === 'btn-multiply') sum = a * b;
  else if (indicator === 'btn-divide') sum = a / b;
  // }
  return sum;
};

calculatorContainer.addEventListener('click', function (e) {
  const button = e.target.closest('button');

  // Delete
  if (button.classList.contains('btn-delete')) {
    deleteNumber();

    // Plus
  } else if (button.classList.contains('btn-plus')) {
    saveActualNumber();
    console.log('pre kalkulacije', indicator);
    finalSum = calculateNumber(numberOne, numberTwo, indicator);
    inputedNumber.value = finalSum;
    indicator = 'btn-plus';

    // Minus
  } else if (button.classList.contains('btn-minus')) {
    saveActualNumber();
    finalSum = calculateNumber(numberOne, numberTwo, indicator);
    inputedNumber.value = finalSum;
    indicator = 'btn-minus';
  } else if (button.classList.contains('btn-multiply')) {
    saveActualNumber();
    if (!numberTwo) {
      finalSum = numberOne;
    } else if (numberTwo) {
      finalSum = calculateNumber(numberOne, numberTwo, indicator);
    }
    inputedNumber.value = finalSum;
    indicator = 'btn-multiply';

    // Divide
  } else if (button.classList.contains('btn-divide')) {
    saveActualNumber();
    finalSum = calculateNumber(numberOne, numberTwo, indicator);
    if (numberTwo === 0) inputedNumber.value = 'No dividing with 0';
    else inputedNumber.value = finalSum;
    indicator = 'btn-divide';

    // Equal
  } else if (button.classList.contains('btn-equal')) {
    saveActualNumber();
    finalSum = calculateNumber(numberOne, numberTwo, indicator);
    if (indicator === 'btn-divide' && numberTwo === 0)
      inputedNumber.value = 'No dividing with 0';
    else inputedNumber.value = finalSum;
  }
});

// Clicking numbers

const inputNumberInCalculator = function () {
  btnNumber.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      enteredNumber = enteredNumber + e.target.textContent;
      inputedNumber.value = enteredNumber;
    });
  });
};
inputNumberInCalculator();

const saveActualNumber = function () {
  actualNumber.push(Number(enteredNumber));
  if (!numberOne) {
    numberOne = actualNumber[actualNumber.length - 1];
    numberMemory = numberOne;
  } else if (numberOne) {
    numberOne = numberMemory;
    numberTwo = actualNumber[actualNumber.length - 1];
    numberMemory = calculateNumber(numberOne, numberTwo, indicator);
  }
  enteredNumber = '';
};

// Clicking C - Delete input
const deleteNumber = function () {
  btnDelete.addEventListener('click', function (e) {
    e.preventDefault;
    inputedNumber.value = '';
    enteredNumber = '';
    indicator = '';
    numberOne = null;
    numberTwo = null;
    numberMemory = null;
    finalSum = 0;
  });
};
