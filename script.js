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
let equationString = ""; // new var to track equation display

// Select DOM elements
let allNums = document.querySelectorAll(".number");
let fourOps = document.querySelectorAll(".operator");
let equalButton = document.querySelector("#equal");
let resultBox = document.querySelector("#resultBox");
let displayResult = document.querySelector("#resultText");
let clearButton = document.querySelector("#clear");
let decimalButton = document.querySelector("#decimal");
let backspaceButton = document.querySelector("#backspace");

// Get input when number buttons are pressed
allNums.forEach((numButton) => {
  numButton.addEventListener("click", (e) => {
    let numPressed = e.target.textContent;

    // If pressing a number after `=`, start fresh
    if (currentOperator === null && previousInput !== null) {
      result = 0;
      previousInput = null;
      currentInput = null;
      equationString = "";
    }
    inputArr.push(numPressed);
    displayResult.textContent = equationString + inputArr.join("");
  });
});

// Prevent Decimal Button to add more than one dot
decimalButton.addEventListener("click", () => {
  if (!inputArr.includes(".")) {
    if (inputArr.length === 0) {
      //   inputArr.push("0");
      return;
    }
    inputArr.push(".");
    displayResult.textContent = equationString + inputArr.join("");
  }
});

// Backspace button event
backspaceButton.addEventListener("click", () => {
  if (inputArr.length > 0) {
    inputArr.pop(); // Remove last digit from current number
  } else if (equationString.length > 0 && currentOperator !== null) {
    // Remove operator from equationString
    equationString = equationString.slice(0, -1); // Remove " + "
    currentOperator = null;
  } else if (equationString.length > 0) {
    // If everything is empty, reset
    equationString = "";
    // equationString = equationString.slice(0, -1);
    previousInput = null;
  }

  displayResult.textContent = equationString + inputArr.join("");
});

// Function to transform input text array into a number
function joinNumbers(arr) {
  if (previousInput === null) {
    previousInput = parseFloat(arr.join(""));
  } else {
    currentInput = parseFloat(arr.join(""));
  }
}

// CONVERT A NUMBER TO STRING WILL AUTO REMOVE TRAILING ZEROS

// Function to handle decimal place
function formatNumber(num) {
  if (Number.isInteger(num)) return num.toString(); // No decimal needed for 10.00
  return parseFloat(num.toFixed(4)).toString(); // Ensure only 4 decimal place if needed
}

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
  //   displayResult.textContent = result;

  // Prepare for the next operation
  previousInput = result;
  currentInput = null;
}

// Refractored Operator Button Event Listener
fourOps.forEach((opButton) => {
  opButton.addEventListener("click", (e) => {
    let selectedOperator = e.target.id;

    if (inputArr.length > 0) joinNumbers(inputArr);
    inputArr = []; // Resest input array

    // If an operator was already selected, perform the calculation first
    if (previousInput !== null && currentInput !== null) {
      doCalculation();
      equationString = formatNumber(result) + e.target.textContent;
    } else if (previousInput !== null) {
      // If no second number yet, allow changing operator
      equationString = formatNumber(previousInput) + e.target.textContent;
    }

    // Store the selected operator
    currentOperator = selectedOperator;

    // Keep the display updated
    displayResult.textContent = equationString;
  });
});

// Equal button Event Listener Refractored
equalButton.addEventListener("click", (e) => {
  if (currentOperator !== null) {
    if (inputArr.length > 0) joinNumbers(inputArr);
    inputArr = [];
    doCalculation();
    equationString = formatNumber(result);
    displayResult.textContent = equationString;
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
  equationString = "";
}

// Add Event listener for Clear button
clearButton.addEventListener("click", clearCalculator);
