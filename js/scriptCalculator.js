'use strict';

// Page calculator

const btnNumber = document.querySelectorAll('.btn-number');
const btnPercent = document.querySelector('.btn-percent');
const btnReset = document.querySelector('.btn-reset');
const btnDelete = document.querySelector('.btn-delete');
const btnEqual = document.querySelector('.btn-equal');
const btnDecimal = document.querySelector('.btn-decimal');
const inputBox = document.querySelector('.input-box');
// const calculatorBtns = document.querySelector('.calculator-buttons');
const btnOperators = document.querySelectorAll('.btn-operator');
// const btn = document.querySelector('.btn');

let inputCharacter = '';
let firstNumber = null;
let operation = '';
let isNewNumber = false;

btnNumber.forEach((button) => {
  button.addEventListener('click', function (e) {
    e.preventDefault();

    if (button === btnDecimal || e.target.value === '.') {
      return;
    }

    if (inputBox.value === 'Error' || inputBox.value === 'No dividing with 0') {
      inputCharacter = e.target.value;
      isNewNumber = false;
    } else if (isNewNumber) {
      inputCharacter = e.target.value;
      isNewNumber = false;
    } else {
      inputCharacter = inputCharacter + e.target.value;
    }

    inputBox.value = inputCharacter;
  });
});

btnDecimal.addEventListener('click', (e) => {
  e.preventDefault();

  inputCharacter = String(inputBox.value);

  if (inputCharacter === 'Error' || inputCharacter === 'No dividing with 0') {
    return;
  }

  if (inputCharacter.includes('.')) {
    return;
  }

  if (inputCharacter === '' || inputCharacter === '0' || isNewNumber) {
    inputCharacter = '0.';
    isNewNumber = false;
  } else {
    inputCharacter = inputCharacter + '.';
  }

  inputBox.value = inputCharacter;
});

btnOperators.forEach((button) => {
  button.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputBox.value === 'No dividing with 0') {
      return;
    }

    firstNumber = Number(inputBox.value);
    operation = e.target.value;
    isNewNumber = true;
  });
});

btnEqual.addEventListener('click', (e) => {
  e.preventDefault();

  const secondNumber = getCurrentNumber();
  let result = calculate(secondNumber);

  if (result === null) {
    inputBox.value = 'No dividing with 0';

    inputCharacter = '';
    firstNumber = null;
    operation = '';
    isNewNumber = true;

    return;
  }

  if (typeof result === 'number') {
    result = Number(result.toFixed(10));
  }

  inputBox.value = result;

  inputCharacter = result.toString();
  firstNumber = result;
  operation = '';
  isNewNumber = true;
});

btnReset.addEventListener('click', (e) => {
  e.preventDefault();

  inputBox.value = '0';
  inputCharacter = '';
  firstNumber = null;
  operation = '';
  isNewNumber = true;
});

btnDelete.addEventListener('click', (e) => {
  e.preventDefault();

  if (!isNewNumber) {
    inputCharacter = inputCharacter.slice(0, -1);
    inputBox.value = inputCharacter || '0';
  }
});

btnPercent.addEventListener('click', () => {
  const currentNumber = Number(inputCharacter);
  let percentValue;
  if (operation === '+' || operation === '-') {
    percentValue = (firstNumber * currentNumber) / 100;
  } else {
    percentValue = currentNumber / 100;
  }
  inputCharacter = percentValue.toString();
  inputBox.value = inputCharacter;
});

function calculate(secondNumber) {
  if (operation === '+') {
    return firstNumber + secondNumber;
  } else if (operation === '-') {
    return firstNumber - secondNumber;
  } else if (operation === '*') {
    return firstNumber * secondNumber;
  } else if (operation === '/') {
    if (secondNumber === 0) {
      return null;
    }
    return firstNumber / secondNumber;
  }
  return secondNumber;
}

function setOperation(newOperation) {
  const currentNumber = getCurrentNumber();

  if (firstNumber === null) {
    firstNumber = currentNumber;
  } else if (!isNewNumber) {
    firstNumber = calculate(currentNumber);

    if (typeof firstNumber === 'number') {
      firstNumber = Number(firstNumber.toFixed(10));
    }

    inputBox.value = firstNumber;
  }

  operation = newOperation;
  isNewNumber = true;

  inputCharacter = '';
}

function getCurrentNumber() {
  return Number(inputCharacter === '' ? 0 : inputCharacter);
}
