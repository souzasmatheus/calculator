/*
1 - Basic arithmetic - DONE
2 - Decimals - DONE
3 - Takes parenthesis - DONE
4 - Basic trigonometry (sin, cos, tan) typed by keyboard or button
5 - Takes inputs like 1.2 + (5 x 2) / sin(5)
6 - Nice UI
*/

// Variables
const buttons = document.querySelectorAll('.key')
const enter = document.querySelector('.key-enter')
const sciKeys = document.querySelectorAll('.sci-key')

let string = ''
let sciMode = false
let sciType = ''

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

// Specific functions

buttons.forEach((button) => button.addEventListener('click', () => {
    if (sciMode === false) {
        string += button.innerHTML
    } else {
        handleScience(sciType)(Number(button.innerText))
        sciMode = false
        sciType = ''
    }
}))

enter.addEventListener('click', () => {
    console.log(eval(string))
})

sciKeys.forEach((key) => key.addEventListener('click', () => {
    sciMode = true
    sciType = key.innerText
}))