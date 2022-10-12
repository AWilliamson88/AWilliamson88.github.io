class Calculator {
    #value = "0";
    #equation = null;
    calculator() {

    }

    get dispValue() {
        return this.#value;
    }

    get DispEquation() {
        return this.#equation;
    }

    // Update the screen with the numbers
    inputNumber(number) {
        if (this.#value === '0') {
            // If the number is greater then 0 replace the display value.
            this.#value = (number != 0) ? number : '0';
        } else {
            // When the display value is not 0 concat the number to it.
            this.#value = this.#value + number;
        }
    }

    inputDecimal(val) {
        // Only If the `value` does not contain a decimal point append the decimal
        if (!String(this.#value).includes(val)) {
            this.#value += val;
        }
    }

    handleOperator(Oper) {
        const operators = ["+", "-", "/", "*"]
        let lastValue = String(this.#value).slice(-1);
        if (operators.includes(lastValue)) {
            this.#value = this.#value.slice(0, -1) + Oper;
        } else {
            this.#value += Oper;
        }
    }

    calculate() {
        this.#equation = this.#value;
        try {
            this.#value = eval(this.#value);
        } catch {
            this.#value = "error";
        }
    }

    clearOne() {
        this.#value = String(this.#value).slice(0, -1);
        if (this.#value === "")
            this.#value = "0";
    }

    clearAll() {
        this.#value = "0";
        this.#equation = null;
    }

}
