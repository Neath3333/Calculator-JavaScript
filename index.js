let currentNumber = '0';
        let previousNumber = '';
        let operator = '';
        let waitingForNewNumber = false;
        let memory = 0;

        const equationDisplay = document.getElementById('equation');
        const resultDisplay = document.getElementById('result');
        const hamburger = document.getElementById('hamburger');
        const sideMenu = document.getElementById('sideMenu');
        const menuItems = document.querySelectorAll('.side-menu li');
        const calculator = document.querySelector('.Calculator');
        const buttonGrid = document.getElementById('button-grid');

        // Button layouts for each mode
        const buttonLayouts = {
            standard: [
                [{ label: '%', action: 'percentage' }, { label: 'CE', action: 'clearEntry' }, { label: 'C', action: 'clearAll' }, { label: '⌫', action: 'backspace' }],
                [{ label: '¹⁄ₓ', action: 'reciprocal' }, { label: 'x²', action: 'square' }, { label: '√x', action: 'squareroot' }, { label: '÷', action: 'setOperator', arg: '÷', class: 'operator' }],
                [{ label: '7', action: 'inputNumber', arg: '7', class: 'num' }, { label: '8', action: 'inputNumber', arg: '8', class: 'num' }, { label: '9', action: 'inputNumber', arg: '9', class: 'num' }, { label: '×', action: 'setOperator', arg: '×', class: 'operator' }],
                [{ label: '4', action: 'inputNumber', arg: '4', class: 'num' }, { label: '5', action: 'inputNumber', arg: '5', class: 'num' }, { label: '6', action: 'inputNumber', arg: '6', class: 'num' }, { label: '-', action: 'setOperator', arg: '-', class: 'operator' }],
                [{ label: '1', action: 'inputNumber', arg: '1', class: 'num' }, { label: '2', action: 'inputNumber', arg: '2', class: 'num' }, { label: '3', action: 'inputNumber', arg: '3', class: 'num' }, { label: '+', action: 'setOperator', arg: '+', class: 'operator' }],
                [{ label: '±', action: 'toggleSign' }, { label: '0', action: 'inputNumber', arg: '0', class: 'num' }, { label: '.', action: 'inputDecimal', class: 'num' }, { label: '=', action: 'calculate', class: 'equals' }]
            ],
            scientific: [
                [{ label: '2nd', action: 'noop' }, { label: 'π', action: 'insertConstant', arg: Math.PI }, { label: 'e', action: 'insertConstant', arg: Math.E }, { label: 'C', action: 'clearAll' }, { label: '⌫', action: 'backspace' }],
                [{ label: 'x²', action: 'square' }, { label: '¹⁄ₓ', action: 'reciprocal' }, { label: '|x|', action: 'absoluteValue' }, { label: 'exp', action: 'exponential' }, { label: 'mod', action: 'modulo' }],
                [{ label: '√x', action: 'squareroot' }, { label: '(', action: 'openParenthesis' }, { label: ')', action: 'closeParenthesis' }, { label: 'n!', action: 'factorial' }, { label: '÷', action: 'setOperator', arg: '÷', class: 'operator' }],
                [{ label: 'xʸ', action: 'power' }, { label: '7', action: 'inputNumber', arg: '7', class: 'num' }, { label: '8', action: 'inputNumber', arg: '8', class: 'num' }, { label: '9', action: 'inputNumber', arg: '9', class: 'num' }, { label: '×', action: 'setOperator', arg: '×', class: 'operator' }],
                [{ label: '10ˣ', action: 'power10' }, { label: '4', action: 'inputNumber', arg: '4', class: 'num' }, { label: '5', action: 'inputNumber', arg: '5', class: 'num' }, { label: '6', action: 'inputNumber', arg: '6', class: 'num' }, { label: '-', action: 'setOperator', arg: '-', class: 'operator' }],
                [{ label: 'log', action: 'logarithm' }, { label: '1', action: 'inputNumber', arg: '1', class: 'num' }, { label: '2', action: 'inputNumber', arg: '2', class: 'num' }, { label: '3', action: 'inputNumber', arg: '3', class: 'num' }, { label: '+', action: 'setOperator', arg: '+', class: 'operator' }],
                [{ label: 'ln', action: 'naturalLog' }, { label: '±', action: 'toggleSign' }, { label: '0', action: 'inputNumber', arg: '0', class: 'num' }, { label: '.', action: 'inputDecimal', class: 'num' }, { label: '=', action: 'calculate', class: 'equals' }]
            ],
            programmer: [
                [{ label: 'A', action: 'noop', class: 'hex-only' }, { label: '<<', action: 'bitShiftLeft' }, { label: '>>', action: 'bitShiftRight' }, { label: 'C', action: 'clearAll' }, { label: '⌫', action: 'backspace' }],
                [{ label: 'B', action: 'noop', class: 'hex-only' }, { label: '(', action: 'openParenthesis' }, { label: ')', action: 'closeParenthesis' }, { label: '%', action: 'percentage' }, { label: '÷', action: 'setOperator', arg: '÷', class: 'operator' }],
                [{ label: 'C', action: 'noop', class: 'hex-only' }, { label: '7', action: 'inputNumber', arg: '7', class: 'num' }, { label: '8', action: 'inputNumber', arg: '8', class: 'num' }, { label: '9', action: 'inputNumber', arg: '9', class: 'num' }, { label: '×', action: 'setOperator', arg: '×', class: 'operator' }],
                [{ label: 'D', action: 'noop', class: 'hex-only' }, { label: '4', action: 'inputNumber', arg: '4', class: 'num' }, { label: '5', action: 'inputNumber', arg: '5', class: 'num' }, { label: '6', action: 'inputNumber', arg: '6', class: 'num' }, { label: '-', action: 'setOperator', arg: '-', class: 'operator' }],
                [{ label: 'E', action: 'noop', class: 'hex-only' }, { label: '1', action: 'inputNumber', arg: '1', class: 'num' }, { label: '2', action: 'inputNumber', arg: '2', class: 'num' }, { label: '3', action: 'inputNumber', arg: '3', class: 'num' }, { label: '+', action: 'setOperator', arg: '+', class: 'operator' }],
                [{ label: 'F', action: 'noop', class: 'hex-only' }, { label: '±', action: 'toggleSign' }, { label: '0', action: 'inputNumber', arg: '0', class: 'num' }, { label: '.', action: 'inputDecimal', class: 'num' }, { label: '=', action: 'calculate', class: 'equals' }]
            ]
        };

        const actions = {
            inputNumber: (arg) => inputNumber(arg),
            inputDecimal: () => inputDecimal(),
            setOperator: (arg) => setOperator(arg),
            calculate: () => calculate(),
            clearAll: () => clearAll(),
            clearEntry: () => clearEntry(),
            backspace: () => backspace(),
            toggleSign: () => toggleSign(),
            percentage: () => percentage(),
            square: () => square(),
            squareroot: () => squareroot(),
            reciprocal: () => reciprocal(),
            factorial: () => factorial(),
            exponential: () => exponential(),
            power10: () => power10(),
            absoluteValue: () => absoluteValue(),
            naturalLog: () => naturalLog(),
            logarithm: () => logarithm(),
            insertConstant: (arg) => insertConstant(arg),
            modulo: () => modulo(),
            power: () => power(),
            openParenthesis: () => openParenthesis(),
            closeParenthesis: () => closeParenthesis(),
            bitShiftLeft: () => bitShiftLeft(),
            bitShiftRight: () => bitShiftRight(),
            noop: () => {}
        };

        function renderButtons(mode) {
            buttonGrid.innerHTML = '';
            const layout = buttonLayouts[mode];
            
            layout.forEach(row => {
                row.forEach(btnConfig => {
                    const btn = document.createElement('button');
                    btn.className = 'btn';
                    if (btnConfig.class) btn.className += ' ' + btnConfig.class;
                    btn.textContent = btnConfig.label;
                    btn.onclick = () => {
                        if (btnConfig.arg !== undefined) {
                            actions[btnConfig.action](btnConfig.arg);
                        } else {
                            actions[btnConfig.action]();
                        }
                    };
                    buttonGrid.appendChild(btn);
                });
            });
        }

        hamburger.addEventListener("click", () => sideMenu.classList.toggle("show"));

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuItems.forEach(li => li.classList.remove('active'));
                item.classList.add('active');
                sideMenu.classList.remove('show');
                const type = item.getAttribute('data-type');
                switchCalculatorMode(type);
            });
        });

        function updateDisplay() {
            resultDisplay.textContent = currentNumber;
        }

        function inputNumber(num) {
            if (waitingForNewNumber) {
                currentNumber = num;
                waitingForNewNumber = false;
            } else {
                currentNumber = currentNumber === '0' ? num : currentNumber + num;
            }
            updateDisplay();
        }

        function inputDecimal() {
            if (waitingForNewNumber) {
                currentNumber = '0.';
                waitingForNewNumber = false;
            } else if (!currentNumber.includes('.')) {
                currentNumber += '.';
            }
            updateDisplay();
        }

        function setOperator(op) {
            if (previousNumber && operator && !waitingForNewNumber) {
                calculate();
            }
            previousNumber = currentNumber;
            operator = op;
            waitingForNewNumber = true;
            equationDisplay.textContent = `${previousNumber} ${operator}`;
        }

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
                currentNumber = currentNumber.charAt(0) === '-' ? currentNumber.slice(1) : '-' + currentNumber;
                updateDisplay();
            }
        }

        function percentage() {
            currentNumber = (parseFloat(currentNumber) / 100).toString();
            updateDisplay();
        }

        function square() {
            currentNumber = (parseFloat(currentNumber) ** 2).toString();
            updateDisplay();
        }

        function squareroot() {
            const num = parseFloat(currentNumber);
            if (num < 0) { alert('Invalid input'); return; }
            currentNumber = Math.sqrt(num).toString();
            updateDisplay();
        }

        function reciprocal() {
            const num = parseFloat(currentNumber);
            if (num === 0) { alert('Cannot divide by zero'); return; }
            currentNumber = (1 / num).toString();
            updateDisplay();
        }

        function factorial() {
            let n = parseInt(currentNumber);
            if (n < 0) { alert("Invalid input"); return; }
            let result = 1;
            for (let i = 1; i <= n; i++) result *= i;
            currentNumber = result.toString();
            updateDisplay();
        }

        function exponential() {
            currentNumber = Math.exp(parseFloat(currentNumber)).toString();
            updateDisplay();
        }

        function power10() {
            currentNumber = Math.pow(10, parseFloat(currentNumber)).toString();
            updateDisplay();
        }

        function absoluteValue() {
            currentNumber = Math.abs(parseFloat(currentNumber)).toString();
            updateDisplay();
        }

        function naturalLog() {
            currentNumber = Math.log(parseFloat(currentNumber)).toString();
            updateDisplay();
        }

        function logarithm() {
            currentNumber = Math.log10(parseFloat(currentNumber)).toString();
            updateDisplay();
        }

        function insertConstant(val) {
            currentNumber = val.toString();
            updateDisplay();
        }

        function modulo() {}
        function cuberoot() {}
        function power() {}
        function openParenthesis() {}
        function closeParenthesis() {}
        function bitShiftLeft() {}
        function bitShiftRight() {}

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

        function switchCalculatorMode(mode) {
            calculator.setAttribute('data-mode', mode);
            document.getElementById('current-mode').textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
            renderButtons(mode);
        }

        // Initialize with standard mode
        renderButtons('standard');