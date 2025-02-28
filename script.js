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

// Function to transform input text array into a number
function joinNumbers(arr) {
  if (previousInput === null) {
    previousInput = parseFloat(arr.join(""));
  } else {
    currentInput = parseFloat(arr.join(""));
  }
}

// Refractored Operator Button Event Listener
fourOps.forEach((opButton) => {
  opButton.addEventListener("click", (e) => {
    if (inputArr.length > 0) joinNumbers(inputArr);
    inputArr = []; // Resest input array

    if (previousInput !== null && currentInput !== null) {
      doCalculation();
    }

    // Store the selected operator
    currentOperator = e.target.id;

    // Keep the display updated
    displayResult.textContent = previousInput;
  });
});

// Refractored Calculation Function
// It does not need arguments. It directly modifies global vars
function doCalculation() {
  if (
    previousInput !== null &&
    currentInput !== null &&
    currentOperator !== null
  ) {
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
  }
  //   Update the display
  displayResult.textContent = result;

  // Prepare for the next operation
  previousInput = result;
  currentInput = null;
}

// Equal button Event Listener Refractored
equalButton.addEventListener("click", (e) => {
  if (currentOperator !== null) {
    if (inputArr.length > 0) joinNumbers(inputArr);
    inputArr = [];
    doCalculation();
    currentOperator = null; // Reset operator after calculation
  }
});

// Function to clear everything
function clearCalculator() {
  inputArr = [];
  currentInput = null;
  previousInput = null;
  result = 0;
  currentOperator = null;
  displayResult.textContent = "0";
}

// Add Event listener for Clear button
clearButton.addEventListener("click", clearCalculator);
