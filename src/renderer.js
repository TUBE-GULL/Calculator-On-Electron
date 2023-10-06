const { ipcRenderer } = require('electron');

document.addEventListener('keydown', handleKeyPress);

const actionWindow = window.document.querySelector('.action_window');
const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowLeft', 'ArrowRight',];
const mathematicalOperators = ['-', '+', '/', '*']

// sorting extra clicks
const checkingClickRegistrations = (event) => {
    const button = event.key.toLowerCase();
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
    //check for duplication of mathematical operators + period
    if (mathematicalOperators.includes(button)) {
        statementOutput(button)
    }
};
//statementOutput
const statementOutput = (event) => {
    const latestValues = actionWindow.value.slice(-1)
    console.log(latestValues)
    if (!mathematicalOperators.includes(latestValues) && latestValues !== '.') {
        actionWindow.value += event
    }
}
//check for duplication of period + mathematical operators  
const checkExpression = (event) => {
    const expressions = actionWindow.value;
    const operands = expressions.split(new RegExp(`[${mathematicalOperators.join('')}]`, 'g'));
    const number = operands.pop()
    const latestValues = actionWindow.value.slice(-1)
    if (!mathematicalOperators.includes(latestValues) && !number.includes(event)) {
        actionWindow.value += event;
    }
};
//registering clicks with button
// actionWindow.addEventListener('keydown', (event) => {
//     checkingClickRegistrations(event)
// });
//registering keyboard clicks
function handleKeyPress(event) {
    checkingClickRegistrations(event)
};
//Function for passing numbers to the water window
const clickhandlerNumber = (num) => {
    if (mathematicalOperators.includes(num)) {
        statementOutput(num)
    } else {
        actionWindow.value += num;
    }


};
//Full window cleaning function
const deleteAllsymbols = () => {
    actionWindow.value = ''
};
//Function to delete one character
const eraseOnesymbol = () => {
    actionWindow.value = actionWindow.value.slice(0, -1)
};
// Main function
const calculateExpression = () => {
    //operator precedence rules
    const operatorPriority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };
    //mathematical expressions
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
    //
    const expressions = actionWindow.value;
    const arrayExpressions = expressions.split(/([+\-*/])/).map((token) => token.trim());       //split the string with special characters and get the result in an array
    const operators = expressions.match(new RegExp(`[${mathematicalOperators.join('')}]`, 'g'));//extracts all values ​​of mathematical operators via regular expressions
    operators.sort((a, b) => operatorPriority[b] - operatorPriority[a]); // sorting operators in an array according to precedence rules

    while (operators.length !== 0) {
        let operator = operators.shift()
        let index = arrayExpressions.indexOf(operator)
        const num1 = arrayExpressions.splice(index - 1, 1)[0];
        const num2 = arrayExpressions.splice(index, 1)[0];
        index = arrayExpressions.indexOf(operator)
        arrayExpressions[index] = mathematicalExpression(+num1, +num2, operator)
    };

    const result = arrayExpressions[0]
    return actionWindow.value = +result.toFixed(2)
}

const minimize_Btn_Click = (event) => {
    ipcRenderer.send('minimize-window');

}
const close_Btn_Click = (event) => {
    ipcRenderer.send('close-window');
}

const minimizeBtn = document.querySelector('.minimize-button');
const closeBtn = document.querySelector('.close-button');
minimizeBtn.addEventListener('click', minimize_Btn_Click);
closeBtn.addEventListener('click', close_Btn_Click);

// const win = remote.getCurrentWindow(); //получает текущее открытое окно
// win.minimize(); //сворачивает окно
// win.close() //закрывает окно