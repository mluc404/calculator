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
let plusButton = document.querySelector("#plus");
let equalButton = document.querySelector("#equal");
let resultBox = document.querySelector("#resultBox");
let displayResult = document.querySelector("#resultText");

// Get input when number buttons are pressed
allNums.forEach((numButton) => {
  numButton.addEventListener("click", (e) => {
    let numPressed = e.target.id;
    inputArr.push(numPressed);
    displayResult.textContent = inputArr.join("");
    // joinNumbers(inputArr);
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

let k = 0;
plusButton.addEventListener("click", (e) => {
  console.log("====Plus button====");
  if (inputArr.length > 0) joinNumbers(inputArr);
  inputArr = [];
  k++;
  console.log("Plus button clicks", k);
  operationArr.push("plus");
  console.log(operationArr);

  if (operationArr.length > 1) {
    console.log("previousInput", previousInput);
    console.log("currentInput", currentInput);
    console.log("result before: ", result);
    doCalculation(previousInput, currentInput, operationArr[0]);
    console.log("result after", result);
    previousInput = result;
    displayResult.textContent = result;
    resultBox.appendChild(displayResult);
    currentInput = null;
    operationArr.splice(0, 1);
    console.log(operationArr);
  } else {
    joinNumbers(inputArr);
  }

  //   if (currentOperator !== null) {
  //     console.log("Current operator:", currentOperator);
  //     doCalculation(previousInput, currentInput);
  //     previousInput = result;
  //     displayResult.textContent = result;
  //     resultBox.appendChild(displayResult);
  //     currentInput = null;
  //     currentOperator = "plus";
  //     joinNumbers(inputArr);
  //   } else {
  //     currentOperator = "plus";
  //     joinNumbers(inputArr);
  //   }

  //   console.log("inputAr", inputArr);
  console.log("previousInput", previousInput);
  console.log("currentInput", currentInput);
  console.log("result", result);
  console.log("=====================");
});

// Function when pressing equal button
function doCalculation(previousInput, currentInput, currentOperator) {
  result = previousInput + currentInput;
}

equalButton.addEventListener("click", (e) => {
  joinNumbers(inputArr);
  inputArr = [];
  doCalculation(previousInput, currentInput);
  displayResult.textContent = result;
  resultBox.appendChild(displayResult);
  previousInput = result;
  currentInput = null;
  console.log("====Equal button====");
  console.log("previousInput", previousInput);
  console.log("currentInput", currentInput);
  console.log("===End of Equal btn===");
});

// Function to display result
