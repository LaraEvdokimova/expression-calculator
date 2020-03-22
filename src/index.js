function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let exprArr = [];
    let stackNumbers = [];
    let stackOperators = [];
    let tempResult;

    if (expr.includes(' ') === false) {
        expr = expr.split('');
    } else {
        expr = expr.split(' ');
    }

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] !== '') {
            if (expr[i] !== '+' &&
              expr[i] !== '-' &&
              expr[i] !== '/' &&
              expr[i] !== '*' &&
              expr[i] !== '(' &&
              expr[i] !== ')') {
                if ( isNaN(+expr[i]) ) throw new RangeError('ExpressionError: Brackets must be paired');
                exprArr.push(+expr[i]);
            } else {
                exprArr.push(expr[i]);
            }
        }
    }

    for (let i = 0; i < exprArr.length; i++) {
        if (typeof exprArr[i] === 'number') {
            stackNumbers.push(exprArr[i]);
        } else if (stackOperators.length === 0 || exprArr[i] === '(') {
            stackOperators.push(exprArr[i]);
        } else if ( (exprArr[i] === '+' || exprArr[i] === '-' || exprArr[i] === '*' || exprArr[i] === '/') &&
                    stackOperators[stackOperators.length - 1] === '(' ) {
            stackOperators.push(exprArr[i]);
        } else if ( (stackOperators[stackOperators.length - 1] === '+' ||
                    stackOperators[stackOperators.length - 1] === '-') &&
                    (exprArr[i] === '*' || exprArr[i] === '/') ) {
            stackOperators.push(exprArr[i]);
        } else if ( (stackOperators[stackOperators.length - 1] === '*' ||
                    stackOperators[stackOperators.length - 1] === '/' ||
                    stackOperators[stackOperators.length - 1] === '+' ||
                    stackOperators[stackOperators.length - 1] === '-') &&
                    (exprArr[i] === '+' || exprArr[i] === '-' || exprArr[i] === '*' || exprArr[i] === '/') ) {
            changeStacks();
            i--;
        } else if ( exprArr[i] === ')' && stackOperators[stackOperators.length - 1] !== '(' ) {
            changeStacks();
            i--;
        } else if ( exprArr[i] === ')' && stackOperators[stackOperators.length - 1] === '(' ) {
            stackOperators.pop();
        }
    }

    while (stackOperators.length > 0) {
        changeStacks();
    }

    return stackNumbers[0];

    function getTempResult(a, b, operator) {
        if (operator === '*') {
            return a * b;
        } else if (operator === '/') {
            if (b === 0) throw new RangeError('TypeError: Division by zero.');
            return a / b;
        } else if (operator === '+') {
            return a + b;
        } else if (operator === '-') {
            return a - b;
        }
    }

    function changeStacks() {
        tempResult = getTempResult(stackNumbers[stackNumbers.length - 2], stackNumbers[stackNumbers.length - 1], stackOperators[stackOperators.length - 1]);
        stackNumbers.pop();
        stackNumbers.pop();
        stackOperators.pop();
        stackNumbers.push(tempResult);
    }
}

module.exports = {
    expressionCalculator
};
