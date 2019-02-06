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

let string = '';

// Specific functions

buttons.forEach((button) => button.addEventListener('click', () => {
    string += button.innerHTML
}))

enter.addEventListener('click', () => {
    console.log(eval(string))
})