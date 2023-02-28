'use strict';

const screen = document.querySelector('.screen');
const calcBtn = document.querySelectorAll('.calc_button');

let display = 0;
let displayBuffer = '0';
let prevOperator;

const buttonClick = function (value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = displayBuffer;
};

const handleSymbol = function (symbol) {
  switch (symbol) {
    case 'C':
      displayBuffer = '0';
      display = 0;
      break;
    case '=':
      if (prevOperator === null) {
        return;
      }
      flushOperation(parseInt(displayBuffer));
      prevOperator = null;
      displayBuffer = display;
      break;
    case '\u2190':
      if (displayBuffer.length === 1) {
        displayBuffer = '0';
      } else {
        displayBuffer = displayBuffer.toString().slice(0, -1);
      }
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
  }
};
const handleNumber = function (value) {
  if (displayBuffer === '0') {
    displayBuffer = value;
  } else {
    displayBuffer += value;
  }
};

const handleMath = function (symbol) {
  if (displayBuffer === '0') {
    return;
  }
  const intBuffer = parseInt(displayBuffer);
  if (display === 0) {
    display = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  prevOperator = symbol;
  displayBuffer = '0';
};

const flushOperation = function (intBuffer) {
  if (prevOperator === '+') {
    display += intBuffer;
  } else if (prevOperator === '-') {
    display -= intBuffer;
  } else if (prevOperator === '×') {
    display *= intBuffer;
  } else if (prevOperator === '÷ ') {
    display /= intBuffer;
  }
};

const init = function () {
  calcBtn.forEach(btn =>
    btn.addEventListener('click', function (e) {
      buttonClick(btn.innerText);
    })
  );
};
init();
//show calculated value on screen
