 class Calculator {
    constructor(prevOpandTextElement, curOpandTextElement ) {
        this.prevOpandTextElement = prevOpandTextElement
        this.curOpandTextElement = curOpandTextElement
        this.clear()
    }
    
    clear() {
        this.curOpand = ''
        this.prevOpand = ''
        this.operations = undefined
    }

    delete() {
        this.curOpand = this.curOpand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.curOpand.includes('.')) return
        this.curOpand = this.curOpand.toString() + number.toString()
    }

    chooseOp(operations) {
        if (this.curOpand === '') return
        if (this.prevOpand !== '') {
            this.compute()
        }
        this.operations = operations
        this.prevOpand = this.curOpand
        this.curOpand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOpand)
        const cur = parseFloat(this.curOpand)
        if (isNaN(prev) || isNaN(cur)) return
        switch (this.operations) {
            case '+':
                computation = prev + cur
                break
            case '-':
                computation = prev - cur
                break
            case '*':
                computation = prev * cur
                break
            case '÷':
                computation = prev / cur
                break
            default:
                return
        }
        this.curOpand = computation
        this.operations = undefined
        this.prevOpand = ''
    }

    getDisplayNum(num) {
        const stringNum = num.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const dceimaldigits = stringNum.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (dceimaldigits != null) {
            return `${integerDisplay}.${dceimaldigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.curOpandTextElement.innerText = 
        this.getDisplayNum(this.curOpand)
        if (this.operations != null) {
            this.prevOpandTextElement.innerText =
            `${this.getDisplayNum(this.prevOpand)} ${this.operations}`
        } else {
            this.prevOpandTextElement.innerText = ''
        }
    }
 }

 
 const numberButtons = document.querySelectorAll('[data-num]')
 const operationsButtons = document.querySelectorAll('[data-op]')
 const equalsButtons = document.querySelector('[data-eq]')
 const deleteButtons = document.querySelector('[data-del]')
 const allClearButtons = document.querySelector('[data-ac]')
 const prevOpandTextElement = document.querySelector('[data-po]')
 const curOpandTextElement = document.querySelector('[data-co]')

const calculator = new Calculator (prevOpandTextElement, curOpandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})