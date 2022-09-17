const calcBtns = document.querySelector('.calc-pad');
const upper = document.querySelector('.upper');
const lower = document.querySelector('.lower');


const calc = {
    dispValue: '0',
    firstInput: null,
    waitForSecondInput: false,
    operator: null,
};

// Reset the display.
const resetDisplay = () => {
    lower.textContent = calc.dispValue;
    upper.textContent = calc.firstInput;
}

// Update the display
const updateDisp = () => {
    lower.textContent = calc.dispValue;
    if (calc.firstInput !== null && calc.waitForSecondInput == true) {
        upper.textContent += calc.firstInput;
        upper.textContent += calc.operator;
    }
}
updateDisp();


// Add event listeners
calcBtns.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
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
    if (target.classList.contains('all-clear')) {
        allClear();
        resetDisplay();
        updateDisp();
        return;
    }
    if (target.classList.contains('delete')) {
        deleteOne();
        updateDisp();
        return;
    }
    inputNumber(target.value);
    updateDisp();
});



// Update the screen with the numbers
function inputNumber(number) {
    const { dispValue, waitForSecondInput } = calc;
    if (waitForSecondInput === true) {
        calc.dispValue = number;
        calc.waitForSecondInput = false;
    } else {
        if (dispValue === '0') {
            // If the number is greater then 0 replace the display value.
            calc.dispValue = (number > 0) ? number : '0';
        } else {
            // When the display value is not 0 concat the number to it.
            calc.dispValue = dispValue + number;
        }
    }
    console.log(calc);
}

function inputDecimal(val) {
    // Only If the `dispValue` does not contain a decimal point append the decimal
    if (!calc.dispValue.includes(val)) {
        calc.dispValue += val;
    }
}

function handleOperator(Oper) {
    const { firstInput, dispValue, operator } = calc
    const input = parseFloat(dispValue);
    console.log(firstInput);
    if (firstInput === null) {
        calc.firstInput = input;
        calc.dispValue = 0;
    } else if (operator) {
        //const output = performCalc[operator](firstInput, input);
        const func = performCalc[operator];
        if (func) {
            calc.dispValue = String(func(firstInput, input));
            calc.firstInput = input;
        }
        // calc.dispValue = String(output);
        // calc.firstInput = input;
    }
    calc.waitForSecondInput = true;
    calc.operator = Oper;
    console.log(calc);
}

const deleteOne = () => {

}

const allClear = () => {
    calc.dispValue = '0';
    calc.firstInput = null;
    calc.waitForSecondInput = false;
    calc.operator = null;
}

const performCalc = {
    '/': (firstInput, secondInput) => firstInput / secondInput,
    '*': (firstInput, secondInput) => firstInput * secondInput,
    '+': (firstInput, secondInput) => firstInput + secondInput,
    '-': (firstInput, secondInput) => firstInput - secondInput,
    '=': (firstInput, secondInput) => secondInput
};

