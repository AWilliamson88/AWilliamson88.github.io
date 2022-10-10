const calcBtns = document.querySelector('.calc-pad');
const upper = document.querySelector('.upper');
const lower = document.querySelector('.lower');

// Main display value
var dispValue = "0";
// the current equation
let equation = null;

// Reset the display.
const resetDisplay = () => {
    lower.textContent = dispValue;
    upper.textContent = "";
}

// Update the display
const updateDisp = () => {
    lower.textContent = dispValue;
    upper.textContent = equation;
}
updateDisp();

// Add event listeners
calcBtns.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button') && !target.matches('i')) {
        return;
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisp();
        return;
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisp();
        return;
    }
    if (target.classList.contains('clear-all')) {
        clearAll();
        resetDisplay();
        updateDisp();
        return;
    }
    if (target.classList.contains('clear-one')) {
        clearOne();
        updateDisp();
        return;
    }
    if (target.classList.contains('equals')) {
        calculate();
        updateDisp();
        return;
    }
    inputNumber(target.value);
    updateDisp();
});

// Update the screen with the numbers
function inputNumber(number) {
    if (dispValue === '0') {
        // If the number is greater then 0 replace the display value.
        dispValue = (number != 0) ? number : '0';
    } else {
        // When the display value is not 0 concat the number to it.
        dispValue = dispValue + number;
    }
}

function inputDecimal(val) {
    // Only If the `dispValue` does not contain a decimal point append the decimal
    if (!dispValue.includes(val)) {
        dispValue += val;
    }
}

function handleOperator(Oper) {
    const operators = ["+", "-", "/", "*"]

    let lastValue = String(dispValue).slice(-1);
    if (operators.includes(lastValue)) {
        dispValue = dispValue.slice(0, -1) + Oper;
    } else {
        dispValue += Oper;
    }
}

function calculate() {
    equation = dispValue;
    dispValue = eval(dispValue);
}

function clearOne() {
    dispValue = String(dispValue).slice(0, -1);

    if (dispValue === "")
        dispValue = "0";
}

function clearAll() {
    dispValue = "0";
    equation = null;
    operator = null;
}
