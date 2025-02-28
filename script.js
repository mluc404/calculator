// Project: Calculator

// Data & Actions

// 1. Data (State) – What information do we need to store?
// currentInput → The current number being entered.
// previousInput → The number stored before an operation.
// operator → Stores the selected operation (+, -, *, /).
// result → The final calculated value.
// shouldResetScreen → A flag to clear the screen after an operation.

// 2. Actions (Functions) – What operations do we need to perform?
// handleNumberInput(number) → Updates currentInput when a number button is clicked.
// handleOperator(operator) → Stores the current input as previousInput, sets the operator, and prepares for the next input.
// doCalculation() → Performs the calculation based on previousInput, operator, and currentInput, then updates result.
// updateDisplay() → Updates the UI with the current number, result, or error messages.
// clearCalculator() → Resets all stored values and the display.
// handleDecimal() → Ensures only one decimal point is added to a number.
// handleBackspace() → Deletes the last entered digit.
// handleEquals() → Executes doCalculation() and displays the result.

// Declare variables to store inputs
let inputArr = [];
let currentInput = null;
let previousInput = null;
let result = 0;
let currentOperator = null;
let operationArr = [];

// Select DOM elements
let allNums = document.querySelectorAll(".number");
let fourOps = document.querySelectorAll(".operator");
let plusButton = document.querySelector("#plus");
let equalButton = document.querySelector("#equal");
let resultBox = document.querySelector("#resultBox");
let displayResult = document.querySelector("#resultText");
let clearButton = document.querySelector("#clear");

// Get input when number buttons are pressed
allNums.forEach((numButton) => {
  numButton.addEventListener("click", (e) => {
    if (currentOperator === null) {
      result = 0;
      previousInput = null;
      currentInput = null;
    }
    let numPressed = e.target.id;
    inputArr.push(numPressed);
    displayResult.textContent = inputArr.join("");
  });
});

// Function to transform text array into a number
function joinNumbers(arr) {
  if (previousInput === null) previousInput = parseFloat(arr.join(""));
  else currentInput = parseFloat(arr.join(""));
  //   inputArr = [];
}

// function when + is clicked
// if currentInput is not null -> then do the previous calculation with prevInput and currentinput and then store that result in previous input
// join Numbers and assign it to previousInput
// clear the inputArr

// if the current operator is not null
// do the previous calculation
// assign that result to previousInput
// capture the operator being pressed just now

// Each operator button
fourOps.forEach((opButton) => {
  opButton.addEventListener("click", (e) => {
    if (inputArr.length > 0) joinNumbers(inputArr);
    inputArr = [];

    if (previousInput !== null && currentInput !== null) {
      doCalculation(previousInput, currentInput, currentOperator);

      displayResult.textContent = result;
      previousInput = result;
      currentInput = null;

      currentOperator = e.target.id;
    } else {
      currentOperator = e.target.id;
      displayResult.textContent = previousInput;
    }
    resultBox.appendChild(displayResult);
  });
});

// plusButton.addEventListener("click", (e) => {
//   if (inputArr.length > 0) joinNumbers(inputArr);
//   inputArr = [];

//   if (previousInput !== null && currentInput !== null) {
//     doCalculation(previousInput, currentInput, currentOperator);

//     displayResult.textContent = result;
//     previousInput = result;
//     currentInput = null;

//     currentOperator = e.target.id;
//   } else {
//     currentOperator = e.target.id;
//     displayResult.textContent = previousInput;
//   }
//   resultBox.appendChild(displayResult);
// });

// Calculation function
function doCalculation(previousInput, currentInput, currentOperator) {
  switch (currentOperator) {
    case "plus":
      result = previousInput + currentInput;
      break;
    case "minus":
      result = previousInput - currentInput;
      break;
    case "multiply":
      result = previousInput * currentInput;
      break;
    case "divide":
      result = previousInput / currentInput;
      break;
  }
  //   result = previousInput + currentInput;
  //   displayResult.textContent = result;
  //   previousInput = result;
  //   currentInput = null;
  //   return result, displayResult, previousInput, currentInput
}

// Equal button behavior
equalButton.addEventListener("click", (e) => {
  console.log("====Equal button====");

  if (currentOperator !== null) {
    if (inputArr.length > 0) joinNumbers(inputArr);
    inputArr = [];

    if (previousInput !== null && currentInput !== null) {
      doCalculation(previousInput, currentInput, currentOperator);
      resultBox.appendChild(displayResult);

      displayResult.textContent = result;
      previousInput = result;
      currentInput = null;

      currentOperator = null;
    }
  }

  console.log("previousInput", previousInput);
  console.log("currentInput", currentInput);
  console.log("===End of Equal btn===");
});

// Function to clear everything
function clearCalculator() {
  inputArr = [];
  currentInput = null;
  previousInput = null;
  result = 0;
  currentOperator = null;
  operationArr = [];
  displayResult.textContent = "0";
}

// Add Event listener to clear button
clearButton.addEventListener("click", clearCalculator);
