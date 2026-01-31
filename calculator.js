function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return null;
    }
    return a / b;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "×": return multiply(num1, num2);
        case "/": return divide(num1, num2);
        default: return undefined;
    }
}

let firstOperand = null;
let secondOperand = null;
let operator = null;
let mustResetDisplay = false;
let errorState = false;

const display = document.querySelector(".display");

function appendNumber(num) {
    if (errorState) {
        display.textContent = num;
        errorState = false;
        mustResetDisplay = false;
        return;
    }

    if (display.textContent === "0" || mustResetDisplay) {
        display.textContent = num;
        mustResetDisplay = false;
    } else {
        display.textContent += num;
    }
}

function appendDecimal() {
    if (errorState) {
        display.textContent = "0.";
        errorState = false;
        mustResetDisplay = false;
        return;
    }

    if (mustResetDisplay) {
        display.textContent = "0.";
        mustResetDisplay = false;
        return;
    }

    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}

function clear() {
    display.textContent = "0";
    firstOperand = null;
    secondOperand = null;
    operator = null;
    errorState = false;
}

function deleteNum() {
    if (display.textContent.length === 1) {
        display.textContent = "0";
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function convertOperation(operation) {
    switch (operation) {
        case "+": return "+";
        case "-": return "-";
        case "x": return "*";
        case "÷": return "/";
    }
}

function operationSetup(op) {
    if (errorState) {
        return;
    }

    if (operator !== null) {
        evaluate();
    }
    firstOperand = Number(display.textContent);
    operator = op;
    mustResetDisplay = true;
}

function evaluate() {
    if (operator === null || mustResetDisplay) {
        return;
    }
    secondOperand = Number(display.textContent);
    let result = operate(firstOperand, secondOperand, operator);

    if (result === null) {
        display.textContent = "Undefined";
        operator = null;
        mustResetDisplay = true;
        errorState = true;
        return;
    }

    display.textContent = Number(result.toFixed(7));
    operator = null;
    mustResetDisplay = true;
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const content = button.textContent;

        if (!isNaN(content)) {
            appendNumber(content);
        } else if (content === ".") {
            appendDecimal();
        } else if (content === "Clear") {
            clear();
        } else if (content === "Delete") {
            deleteNum();
        } else if (content === "=") {
            evaluate();
        } else {
            operationSetup(convertOperation(content));
        }
    });
});