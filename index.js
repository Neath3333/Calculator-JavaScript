// ===== Calculator State =====
let currentNumber = '0';
let previousNumber = '';
let operator = '';
let waitingForNewNumber = false;
let memory = 0;



// ===== DOM Elements =====
const equationDisplay = document.getElementById('equation');
const resultDisplay = document.getElementById('result');
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const menuItems = document.querySelectorAll('.side-menu li');
const memoryRow = document.getElementById('memory-row');

// ===== Side Menu Toggle =====
hamburger.addEventListener("click", () => sideMenu.classList.toggle("show"));

// ===== Menu Item Selection =====
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(li => li.classList.remove('active'));
        item.classList.add('active');

        sideMenu.classList.remove('show');
        const type = item.getAttribute('data-type');
        switchCalculatorMode(type);
    });
});

// ===== Display =====
function updateDisplay() {
    resultDisplay.textContent = currentNumber;
}

// ===== Input Numbers =====
function inputNumber(num) {
    if (waitingForNewNumber) {
        currentNumber = num;
        waitingForNewNumber = false;
    } else {
        currentNumber = currentNumber === '0' ? num : currentNumber + num;
    }
    updateDisplay();
}

// ===== Input Decimal =====
function inputDecimal() {
    if (waitingForNewNumber) {
        currentNumber = '0.';
        waitingForNewNumber = false;
    } else if (!currentNumber.includes('.')) {
        currentNumber += '.';
    }
    updateDisplay();
}

// ===== Operators =====
function setOperator(op) {
    if (previousNumber && operator && !waitingForNewNumber) {
        calculate();
    }
    previousNumber = currentNumber;
    operator = op;
    waitingForNewNumber = true;
    equationDisplay.textContent = `${previousNumber} ${operator}`;
}

// ===== Calculation =====
function calculate() {
    if (!operator || !previousNumber) return;

    let prev = parseFloat(previousNumber);
    let current = parseFloat(currentNumber);
    let result = 0;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷':
            if (current === 0) { alert('Cannot divide by zero'); return; }
            result = prev / current; break;
        case 'mod': result = prev % current; break;
        case '^': result = Math.pow(prev, current); break;
        default: return;
    }

    currentNumber = result.toString();
    operator = '';
    previousNumber = '';
    waitingForNewNumber = true;
    equationDisplay.textContent = '';
    updateDisplay();
}

// ===== Clear Functions =====
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

// ===== Backspace =====
function backspace() {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = '0';
    }
    updateDisplay();
}

// ===== Toggle Sign =====
function toggleSign() {
    if (currentNumber !== '0') {
        currentNumber = currentNumber.charAt(0) === '-' ? currentNumber.slice(1) : '-' + currentNumber;
        updateDisplay();
    }
}

// ===== Percentage =====
function percentage() {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    updateDisplay();
}

// ===== Square =====
function square() {
    currentNumber = (parseFloat(currentNumber) ** 2).toString();
    updateDisplay();
}

// ===== Square Root =====
function squareroot() {
    const num = parseFloat(currentNumber);
    if (num < 0) { alert('Invalid input'); return; }
    currentNumber = Math.sqrt(num).toString();
    updateDisplay();
}

// ===== Reciprocal =====
function reciprocal() {
    const num = parseFloat(currentNumber);
    if (num === 0) { alert('Cannot divide by zero'); return; }
    currentNumber = (1 / num).toString();
    updateDisplay();
}

// ===== Factorial =====
function factorial() {
    let n = parseInt(currentNumber);
    if (n < 0) { alert("Invalid input"); return; }
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    currentNumber = result.toString();
    updateDisplay();
}

// ===== Exponential =====
function exponential() {
    currentNumber = Math.exp(parseFloat(currentNumber)).toString();
    updateDisplay();
}

// ===== Power of 10 =====
function power10() {
    currentNumber = Math.pow(10, parseFloat(currentNumber)).toString();
    updateDisplay();
}

// ===== Absolute Value =====
function absoluteValue() {
    currentNumber = Math.abs(parseFloat(currentNumber)).toString();
    updateDisplay();
}

// ===== Natural Log =====
function naturalLog() {
    currentNumber = Math.log(parseFloat(currentNumber)).toString();
    updateDisplay();
}

// ===== Base-10 Log =====
function logarithm() {
    currentNumber = Math.log10(parseFloat(currentNumber)).toString();
    updateDisplay();
}

// ===== Trigonometry =====
let angleInDegrees = true;
function toggleAngleMode() {
    angleInDegrees = !angleInDegrees;
    document.getElementById('angle-toggle').textContent = angleInDegrees ? 'DEG' : 'RAD';
}

function sine() {
    let x = parseFloat(currentNumber);
    if (angleInDegrees) x = x * Math.PI / 180;
    currentNumber = Math.sin(x).toString();
    updateDisplay();
}

function cosine() {
    let x = parseFloat(currentNumber);
    if (angleInDegrees) x = x * Math.PI / 180;
    currentNumber = Math.cos(x).toString();
    updateDisplay();
}

function tangent() {
    let x = parseFloat(currentNumber);
    if (angleInDegrees) x = x * Math.PI / 180;
    currentNumber = Math.tan(x).toString();
    updateDisplay();
}

// ===== Parentheses =====
function openParenthesis() { /* optional */ }
function closeParenthesis() { /* optional */ }

// ===== Memory Functions =====
document.getElementById('mplus').onclick = () => { memory += parseFloat(currentNumber); updateMemoryButtons(); };
document.getElementById('mminus').onclick = () => { memory -= parseFloat(currentNumber); updateMemoryButtons(); };
document.getElementById('ms').onclick = () => { memory = parseFloat(currentNumber); updateMemoryButtons(); };
document.getElementById('mr').onclick = () => { currentNumber = memory.toString(); updateDisplay(); };
document.getElementById('mc').onclick = () => { memory = 0; updateMemoryButtons(); };

function updateMemoryButtons() {
    const hasMemory = memory !== 0;
    document.getElementById('mc').disabled = !hasMemory;
    document.getElementById('mr').disabled = !hasMemory;
    document.getElementById('mlist').disabled = !hasMemory;
}

// ===== Keyboard Support =====
document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key >= '0' && key <= '9') inputNumber(key);
    else if (key === '.') inputDecimal();
    else if (key === '+') setOperator('+');
    else if (key === '-') setOperator('-');
    else if (key === '*') setOperator('×');
    else if (key === '/') { event.preventDefault(); setOperator('÷'); }
    else if (key === 'Enter' || key === '=') calculate();
    else if (key === 'Escape') clearAll();
    else if (key === 'Backspace') backspace();
});

// ===== Mode Switching =====
function switchCalculatorMode(mode) {
    const standard = document.getElementById('standard-buttons');
    const scientific = document.getElementById('scientific-buttons');
    const programmerMode = document.getElementById('programmer-mode');
    const memoryRow = document.getElementById('memory-row');

    if(mode === 'standard'){
        standard.style.display = 'grid';
        scientific.style.display = 'none';
        programmerMode.style.display = 'none';
        memoryRow.style.display = 'flex';
    } else if(mode === 'scientific'){
        standard.style.display = 'none';
        scientific.style.display = 'grid';
        programmerMode.style.display = 'none';
        memoryRow.style.display = 'flex';
    } else if(mode === 'programmer'){
        standard.style.display = 'none';
        scientific.style.display = 'none';
        programmerMode.style.display = 'block'; // show container
        memoryRow.style.display = 'none';
    }

    document.getElementById('current-mode').textContent = mode.charAt(0).toUpperCase() + mode.slice(1);

    // highlight menu
    const menuItems = document.querySelectorAll('.side-menu li');
    menuItems.forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(`.side-menu li[data-type="${mode}"]`);
    if(activeItem) activeItem.classList.add('active');
}
