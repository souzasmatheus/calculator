/*
1 - Basic arithmetic - DONE
2 - Decimals - DONE
3 - Takes parenthesis - DONE
4 - Basic trigonometry (sin, cos, tan) typed by keyboard or button
5 - Takes inputs like 1.2 + (5 x 2) / sin(5) - DONE
6 - Nice UI
*/

// Variables - DOM
const numbers = document.querySelectorAll('.num-key')
const operands = document.querySelectorAll('.operand-key')
const sciKeys = document.querySelectorAll('.sci-key')
const enter = document.querySelector('.key-enter')
const display = document.querySelector('#calc-display')
const ce = document.querySelector('.reset-key')
const sin = document.querySelector('#sin')
const cos = document.querySelector('#cos')
const tan = document.querySelector('#tan')

// Variables - JS Manipulation
let string = ''
let sciMode = false
let sciType = ''
let sciString = ''
let displayValue = ''
let inside = {
    sin: 'off',
    cos: 'off',
    tan: 'off'
}

// General functions
const handleScience = (type) => (num) => {
    switch(type) {
        case 'sin':
            string += Math.sin(num).toFixed(2);
            break;
        case 'cos':
            string += Math.cos(num).toFixed(2);
            break;
        case 'tan':
            string += Math.tan(num).toFixed(2);
            break;
        default:
            return
    }
}

const isInsideTrigonometry = (value) => {
    switch(value) {
        case 'sin':
            inside.sin = 'on';
            break;
        case 'cos':
            inside.cos = 'on';
            break;
        case 'tan':
            inside.tan = 'on';
            break;
        default:
            return
    }
}

const isOutsideTrigonometry = (value) => {
    switch(value) {
        case 'sin':
            inside.sin = 'off';
            break;
        case 'cos':
            inside.cos = 'off';
            break;
        case 'tan':
            inside.tan = 'off';
            break;
        default:
            return
    }
}

const toggleInOut = (value) => {
    if (inside[value] === 'off') {
        isInsideTrigonometry(value)
    } else {
        isOutsideTrigonometry(value)
    }
}

// Specific functions - Exhibition
const updateDisplay = () => {
    display.innerHTML = displayValue
}

// Specific functions - Clicks
numbers.forEach((number) => number.addEventListener('click', () => {
    if (sciMode === false) {
        string += number.innerText
        displayValue += number.innerText
        updateDisplay()
    } else {
        sciString += number.innerText
        displayValue += number.innerText
        updateDisplay()
    }
}))

operands.forEach((operand) => operand.addEventListener('click', () => {
    const {sin, cos, tan} = inside

    if (sciMode === false) {
        string += operand.innerText
        displayValue += operand.innerText
        updateDisplay()
    } else if (sin === 'on' || cos === 'on' || tan === 'on') {
        sciString += operand.innerText
        displayValue += operand.innerText
        updateDisplay()
    }
}))

sciKeys.forEach((key) => key.addEventListener('click', () => {
    if (inside[key.innerText] === 'on') {
        handleScience(sciType)(eval(sciString))
        toggleInOut(key.innerText)
        sciMode = false
        sciType = ''
        displayValue += `)`
        updateDisplay()
        key.classList.remove('red')
    } else {
        toggleInOut(key.innerText)
        sciMode = true
        sciType = key.innerText
        displayValue += `${key.innerText}(`
        updateDisplay()
        key.classList.add('red')
    }
}))

enter.addEventListener('click', () => {
    if (sciMode === true) {
        handleScience(sciType)(eval(sciString))
        sciMode = false
        sciType = ''
        displayValue = eval(string)
        updateDisplay()
        string = displayValue
    } else {
        displayValue = eval(string)
        updateDisplay()
        string = displayValue
    }
})

ce.addEventListener('click', () => {
    string = ''
    sciMode = false
    sciType = ''
    sciString = ''
    displayValue = ''
    inside = {
        sin: 'off',
        cos: 'off',
        tan: 'off'
    }

    display.innerHTML = 0
    sin.classList.remove('red')
    cos.classList.remove('red')
    tan.classList.remove('red')
})

document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode
    switch(keyCode) {
        case 83:
            toggleInOut('sin')
            sciMode = true
            sciType = 'sin'
            displayValue += `sin(`
            updateDisplay()
            sin.classList.add('red')
            break;
        case 67:
            toggleInOut('cos')
            sciMode = true
            sciType = 'cos'
            displayValue += `cos(`
            updateDisplay()
            cos.classList.add('red')
            break;
        case 84:
            toggleInOut('tan')
            sciMode = true
            sciType = 'tan'
            displayValue += `tan(`
            updateDisplay()
            tan.classList.add('red')
            break;
    }
})