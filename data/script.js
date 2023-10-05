document.addEventListener('keydown', handleKeyPress);

const actionWindow = window.document.querySelector('.action_window');
const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowLeft', 'ArrowRight',];
const mathematicalOperators = ['-', '+', '/', '*']

// сортировка лишних нажатий 
const checkingClickRegistrations = (event) => {
    const button = event.key.toLowerCase();//тут я использую приведения к нижнему регистру
    // console.log(button)
    if (button === 'backspace') {
        eraseOnesymbol();
    }
    if (button === 'delete') {
        deleteAllsymbols();
    }
    if (allowedKeys.includes(button)) {
        actionWindow.value += button
    }
    if (button === 'enter') {
        calculateExpression()
    }
    if (button === '.') {
        checkExpression('.')
    }
    if (mathematicalOperators.includes(button)) {
        const latestValues = actionWindow.value.slice(-1)
        if (!mathematicalOperators.includes(latestValues)) {
            actionWindow.value += button
        }
    }
};

const checkExpression = (event) => {
    const expressions = actionWindow.value;
    const operands = expressions.split(new RegExp(`[${mathematicalOperators.join('')}]`, 'g'));
    const number = operands.pop()
    const latestValues = actionWindow.value.slice(-1)
    if (!mathematicalOperators.includes(latestValues)) {
        if (!number.includes(event)) {
            actionWindow.value += event;
        }
    }
};
actionWindow.addEventListener('keydown', (event) => {
    checkingClickRegistrations(event)
});
function handleKeyPress(event) {
    checkingClickRegistrations(event)
};
const clickhandlerNumber = (num) => {
    actionWindow.value += num;
};
const deleteAllsymbols = () => {
    actionWindow.value = ''
};
const eraseOnesymbol = () => {
    actionWindow.value = actionWindow.value.slice(0, -1)
};

const calculateExpression = () => {
    const operatorPriority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };
    const mathematicalExpression = (num1, num2, operator) => {
        if (operator === '+') {
            return num1 + num2;
        }
        if (operator === '-') {
            return num1 - num2;
        }
        if (operator === '/') {
            return num1 / num2;
        }
        if (operator === '*') {
            return num1 * num2;
        }
    };
    const expressions = actionWindow.value;
    const arrayExpressions = expressions.split(/([+\-*/])/).map((token) => token.trim());
    const operators = expressions.match(new RegExp(`[${mathematicalOperators.join('')}]`, 'g'));
    operators.sort((a, b) => operatorPriority[b] - operatorPriority[a]);

    while (operators.length !== 0) {
        let operator = operators.shift()
        let index = arrayExpressions.indexOf(operator)
        const num1 = arrayExpressions.splice(index - 1, 1)[0];
        const num2 = arrayExpressions.splice(index, 1)[0];
        index = arrayExpressions.indexOf(operator)
        arrayExpressions[index] = mathematicalExpression(+num1, +num2, operator)
    };

    console.log(`результат -${arrayExpressions}`);
    const result = arrayExpressions[0]
    return actionWindow.value = +result.toFixed(2)
}


