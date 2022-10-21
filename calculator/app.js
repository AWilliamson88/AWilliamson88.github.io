const calcBtns = document.querySelector('.calc-pad');
const upper = document.querySelector('.upper');
const lower = document.querySelector('.lower');

const calc = new Calculator();

// Reset the display.
const resetDisplay = () => {
    lower.textContent = calc.Value;
    upper.textContent = "";
}

// Update the display
const updateDisp = () => {
    lower.textContent = calc.Value;
    upper.textContent = calc.Equation;
}
updateDisp();

// Add event listeners
calcBtns.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button') && !target.matches('i')) {
        return;
    }
    if (target.classList.contains('operator')) {
        calc.handleOperator(target.value);
        updateDisp();
        return;
    }
    if (target.classList.contains('decimal')) {
        calc.inputDecimal(target.value);
        updateDisp();
        return;
    }
    if (target.classList.contains('clear-all')) {
        calc.clearAll();
        resetDisplay();
        updateDisp();
        return;
    }
    if (target.classList.contains('clear-one')) {
        calc.clearOne();
        updateDisp();
        return;
    }
    if (target.classList.contains('equals')) {
        calc.calculate();
        updateDisp();
        return;
    }
    calc.inputNumber(target.value);
    updateDisp();
});
