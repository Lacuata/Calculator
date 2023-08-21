// Implement this function to calculate the expression
const operators = ['+', '-', '*', '/'];
export const calculateExpression = (expression) => {
    // console.log('calculateExpression called with expression:', expression);
    if (!expression) {
        return null; // Handle case of empty expression
    }
    const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);

    // console.log('Tokens:', tokens);

    let currentNumber = parseFloat(tokens[0]);
    let currentOperator = null;

    for (let i = 1; i < tokens.length; i++) {
        const token = tokens[i];
        
      
        if (isOperator(token)) {
            currentOperator = token;
        } else {
            const nextNumber = parseFloat(token);
            if (currentOperator) {
                currentNumber = performOperation(currentNumber, currentOperator, nextNumber);
                currentOperator = null;
            }
        }
    }
    console.log(currentNumber)
    return currentNumber;
}

const isOperator = (char) => {
    return operators.includes(char);
}

const performOperation =(a, operator, b) => {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            throw new Error(`Invalid operator: ${operator}`);
    }
}


