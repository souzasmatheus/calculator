/*
1 - Basic arithmetic
2 - Decimals
3 - Takes parenthesis
4 - Basic trigonometry (sin, cos, tan) typed by keyboard or button
5 - Takes inputs like 1.2 + (5 x 2) / sin(5)
6 - Nice UI
*/

// Variables

// General functions
const sum = (...args) => {
    let result = 0

    for (let i = 0; i < args.length; i++) {
        result += args[i]
    }

    return result
}

const subtract = (...args) => {
    let result = args[0]

    for (let i = 1; i < args.length; i++) {
        result -= args[i]
    }

    return result
}

const multiply = (...args) => {
    let result = args[0]

    for (let i = 1; i < args.length; i++) {
        result = result * args[i]
    }

    return result
}

const divide = (...args) => {
    let result = args[0]

    for (let i = 1; i < args.length; i++) {
        result = result / args[i]
    }

    return result
}

// Specific functions