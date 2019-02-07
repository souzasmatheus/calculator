// Helping functions
const getDOMElements = () => {
    return {
        numbers: document.querySelectorAll('.num-key'),
        operands: document.querySelectorAll('.operand-key'),
        sciKeys: document.querySelectorAll('.sci-key'),
        enter: document.querySelector('.key-enter'),
        display: document.querySelector('#calc-display'),
        ce: document.querySelector('.reset-key'),
        sin: document.querySelector('#sin'),
        cos: document.querySelector('#cos'),
        tan: document.querySelector('#tan'),
        document: document
    }
}

// Main class
class Calc {
    constructor(elements) {
        this.elements = elements
        this.string = ''
        this.sciMode = false
        this.sciType = ''
        this.sciString = ''
        this.displayValue = ''
        this.inside = {
            sin: 'off',
            cos: 'off',
            tan: 'off'
        }
    }
    
    // General functions
    handleScience(type) {
        return (num) => {
            switch(type) {
                case 'sin':
                    this.string += Math.sin(num).toFixed(2);
                    break;
                case 'cos':
                    this.string += Math.cos(num).toFixed(2);
                    break;
                case 'tan':
                    this.string += Math.tan(num).toFixed(2);
                    break;
                default:
                    return
            }
        }
    }

    isInsideTrigonometry(value) {
        switch(value) {
            case 'sin':
                this.inside.sin = 'on';
                break;
            case 'cos':
                this.inside.cos = 'on';
                break;
            case 'tan':
                this.inside.tan = 'on';
                break;
            default:
                return
        }
    }

    isOutsideTrigonometry(value) {
        switch(value) {
            case 'sin':
                this.inside.sin = 'off';
                break;
            case 'cos':
                this.inside.cos = 'off';
                break;
            case 'tan':
                this.inside.tan = 'off';
                break;
            default:
                return
        }
    }

    toggleInOut(value) {
        if (this.inside[value] === 'off') {
            this.isInsideTrigonometry(value)
        } else {
            this.isOutsideTrigonometry(value)
        }
    }

    // Specific functions - Exhibition
    updateDisplay() {
        const {display} = this.elements

        display.innerHTML = this.displayValue
    }

    // Specific functions - Clicks
    handleClicks() {
        const {numbers, operands, sciKeys, enter, ce, document} = this.elements

        numbers.forEach((number) => number.addEventListener('click', () => {
            if (this.sciMode === false) {
                this.string += number.innerText
                this.displayValue += number.innerText
                this.updateDisplay()
            } else {
                this.sciString += number.innerText
                this.displayValue += number.innerText
                this.updateDisplay()
            }
        }))
        
        operands.forEach((operand) => operand.addEventListener('click', () => {
            const {sin, cos, tan} = this.inside
        
            if (this.sciMode === false) {
                this.string += operand.innerText
                this.displayValue += operand.innerText
                this.updateDisplay()
            } else if (sin === 'on' || cos === 'on' || tan === 'on') {
                this.sciString += operand.innerText
                this.displayValue += operand.innerText
                this.updateDisplay()
            }
        }))
        
        sciKeys.forEach((key) => key.addEventListener('click', () => {
            if (this.inside[key.innerText] === 'on') {
                this.handleScience(this.sciType)(eval(this.sciString))
                this.toggleInOut(key.innerText)
                this.sciMode = false
                this.sciType = ''
                this.displayValue += `)`
                this.updateDisplay()
                key.classList.remove('red')
            } else {
                this.toggleInOut(key.innerText)
                this.sciMode = true
                this.sciType = key.innerText
                this.displayValue += `${key.innerText}(`
                this.updateDisplay()
                key.classList.add('red')
            }
        }))
        
        enter.addEventListener('click', () => {
            if (this.sciMode === true) {
                this.handleScience(this.sciType)(eval(this.sciString))
                this.sciMode = false
                this.sciType = ''
                this.displayValue = eval(this.string)
                this.updateDisplay()
                this.string = this.displayValue
            } else {
                this.displayValue = eval(this.string)
                this.updateDisplay()
                this.string = this.displayValue
            }
        })
        
        ce.addEventListener('click', () => {
            const {sin, cos, tan, display} = this.elements

            this.string = ''
            this.sciMode = false
            this.sciType = ''
            this.sciString = ''
            this.displayValue = ''
            this.inside = {
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
            const {sin, cos, tan} = this.inside

            switch(keyCode) {
                case 83:
                    this.toggleInOut('sin')
                    this.sciMode = true
                    this.sciType = 'sin'
                    this.displayValue += `sin(`
                    this.updateDisplay()
                    sin.classList.add('red')
                    break;
                case 67:
                    this.toggleInOut('cos')
                    this.sciMode = true
                    this.sciType = 'cos'
                    this.displayValue += `cos(`
                    this.updateDisplay()
                    cos.classList.add('red')
                    break;
                case 84:
                    this.toggleInOut('tan')
                    this.sciMode = true
                    this.sciType = 'tan'
                    this.displayValue += `tan(`
                    this.updateDisplay()
                    tan.classList.add('red')
                    break;
            }
        })
    }
}

new Calc(getDOMElements()).handleClicks()