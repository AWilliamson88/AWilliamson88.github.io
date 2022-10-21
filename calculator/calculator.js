class Calculator {
    #value = "0";
    #equation = null;
    calculator() {

    }

    get Value() {
        return this.#value;
    }

    get Equation() {
        return this.#equation;
    }

    // Update the screen with the numbers
    // If the number is greater then 0 replace the display value.
    // When the display value is not 0 concat the number to it.
    inputNumber(number) {
        if (this.#value === '0') {
            this.#value = (number != 0) ? number : '0';
        } else {
            this.#value = this.#value + number;
        }
    }

    // Only allows one decimal at a time.
    inputDecimal(val) {
        // Only If the `value` does not contain a decimal point append the decimal
        if (!String(this.#value).includes(val)) {
            this.#value += val;
        }
    }

    // If the previous value is already an operator replace it
    // with the new one. Otherwise add the operator.
    handleOperator(Oper) {
        const operators = ["+", "-", "/", "*"]

        let lastValue = String(this.#value).slice(-1);
        if (operators.includes(lastValue)) {
            this.#value = this.#value.slice(0, -1) + Oper;
        } else {
            this.#value += Oper;
        }
    }

    // Calculates and displays the result or "error".
    calculate() {
        this.#equation = this.#value;
        try {
            this.#value = eval(this.#value);
        } catch {
            this.#value = "error";
        }
    }

    // Removes the last char entered into the calculator.
    clearOne() {
        this.#value = String(this.#value).slice(0, -1);
        if (this.#value === "")
            this.#value = "0";
    }

    // Resets the calculator's value and equation.
    clearAll() {
        this.#value = "0";
        this.#equation = null;
    }

}
