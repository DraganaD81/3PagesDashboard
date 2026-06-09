'use strict';

// Page calculator

const btnNumber = document.querySelectorAll('.btn-number');
const btnPlus = document.querySelector('.btn-plus');
const btnMinus = document.querySelector('.btn-minus');
const btnMultiply = document.querySelector('.btn-multiply');
const btnDivide = document.querySelector('.btn-divide');
const btnPercent = document.querySelector('.btn-percent');
const btnReset = document.querySelector('.btn-reset');
const btnDelete = document.querySelector('.btn-delete');
const btnEqual = document.querySelector('.btn-equal');
const btnDecimal = document.querySelector('.btn-decimal');
const inputBox = document.querySelector('.input-box');
const calculatorBtns = document.querySelector('.calculator-buttons');
const btn = document.querySelector('.btn');

let inputCharacter = '';

console.log(btnNumber.value);

const inputNumberInCalculator = function () {
  btnNumber.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      inputCharacter = inputCharacter + e.target.value;
      inputBox.value = inputCharacter;
    });
  });
};

inputNumberInCalculator();
