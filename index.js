let currentNumber = '0';
let previousNumber = '';
let operator = '';
let waintingForNewNumber = false;
let memory = 0;

const equationDisplay = document.getElementById('equation');
const resultDisplay = document.getElementById('result');

function updateDisplay() {
    resultDisplay.textContent = currentNumber;
}
function inputNumber(num) {
    if (waintingForNewNumber) {
        currentNumber = num;
        waintingForNewNumber = false;
    } else {
        currentNumber = currentNumber === '0' ? num : currentNumber + num;
    }
    updateDisplay();
}
function inputDecimal() {
    if (waintingForNewNumber) {
        currentNumber = '0.';
        waintingForNewNumber = false;
    } else if (!currentNumber.indexOf('.') === -1) {
        currentNumber += '.';
    }
    updateDisplay();
}
function setOperator(op) {
    if (previousNumber && operator && !waintingForNewNumber) {
        calculate();
    }

    previousNumber = currentNumber;
    operator = op;
    waintingForNewNumber = true;
    equationDisplay.textContent = `${previousNumber} ${operator}`;
}

function calculate() {
    if (!operator || !previousNumber);
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    let result = 0;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    operator = '';
    previousNumber = '';
    waitingForNewNumber = true;
    equationDisplay.textContent = '';
    updateDisplay();
}

function clearAll() {
    currentNumber = '0';
    previousNumber = '';
    operator = '';
    waitingForNewNumber = false;
    equationDisplay.textContent = '';
    updateDisplay();
}
function clearEntry() {
    currentNumber = '0';
    updateDisplay();
}

function backspace() {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = '0';
    }
    updateDisplay();
}

function toggleSign() {
    if (currentNumber !== '0') {
        currentNumber = currentNumber.charAt(0) === '-'
            ? currentNumber.slice(1)
            : '-' + currentNumber;
        updateDisplay();
    }
}

function percentage() {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    updateDisplay();
}
function squareRoot() {
    const num = parseFloat(currentNumber);
    if (num < 0) {
        alert('Invalid input');
        return;
    }
    currentNumber = Math.sqrt(num).toString();
    updateDisplay();
}
function square() {
    const num = parseFloat(currentNumber);
    currentNumber = (num * num).toString();
    updateDisplay();
}

function reciprocal() {
    const num = parseFloat(currentNumber);
    if (num === 0) {
        alert('Cannot divide by zero');
        return;
    }
    currentNumber = (1 / num).toString();
    updateDisplay();
}

document.getElementById('mplus').onclick = function () {
    memory += parseFloat(currentNumber);
    updateMemoryButtons();
};

document.getElementById('mminus').onclick = function () {
    memory -= parseFloat(currentNumber);
    updateMemoryButtons();
};

document.getElementById('ms').onclick = function () {
    memory = parseFloat(currentNumber);
    updateMemoryButtons();
};

document.getElementById('mr').onclick = function () {
    currentNumber = memory.toString();
    updateDisplay();
};

document.getElementById('mc').onclick = function () {
    memory = 0;
    updateMemoryButtons();
};

function updateMemoryButtons() {
    const hasMemory = memory !== 0;
    document.getElementById('mc').disabled = !hasMemory;
    document.getElementById('mr').disabled = !hasMemory;
    document.getElementById('mlist').disabled = !hasMemory;
}
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+') {
        setOperator('+');
    } else if (key === '-') {
        setOperator('-');
    } else if (key === '*') {
        setOperator('×');
    } else if (key === '/') {
        event.preventDefault();
        setOperator('÷');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        backspace();
    }
});