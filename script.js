class Calculator{
    constructor(prevOpTextElement, currOpTextElement){
        this.prevOpTextElement = prevOpTextElement
        this.currOpTextElement = currOpTextElement
        this.Clear()
    }
    Clear(){
        this.prevOp = ''
        this.currOp = ''
        this.operation = undefined
    }
    Delete(){
        this.currOp = this.currOp.toString().slice(0, -1)
    }
    AppendNumber(number){
        if(number === '.' && this.currOp.includes('.') ) return
        this.currOp = this.currOp.toString() + number.toString()
    }
    ChooseOp(operation){
        if(this.currOp === '') return
        // Check if the currentOp, meaning current number, is nothing, do nothing
        if(this.prevOp !== '') {this.Compute() } //3 numbers situation
        // Once you have alerady 2 number with an operation
        // well compute and now you keep adding an operation, we proceed
        this.operation = operation
        this.prevOp = this.currOp
        this.currOp = ''
    }
    Compute(){
        let computation
        const prev = parseFloat(this.prevOp)
        const curr = parseFloat(this.currOp)
        if (isNaN(prev)||isNaN(curr)) return
        // check if it is missing first or second number to complete operation
        switch (this.operation) 
        {
            case '+':
                    computation = prev + curr
                break;
            case '-':
                    computation = prev - curr
                break;
            case '*':
                    computation = prev * curr
                break;
            case '÷':
                    computation = prev / curr
                break;
            default:
                return
        }    
        this.currOp = computation
        this.operation = undefined
        this.prevOp = ''
    }

    getDisplay(number){
        const floatNum = parseFloat(number)
        if (isNaN(floatNum)) return ''
        return floatNum.toLocaleString('es')

    }
 
    UpdateDisplay(){
        this.currOpTextElement.innerText = this.getDisplay(this.currOp)
        if (this.operation != null) { 
            this.prevOpTextElement.innerText = 
            `${this.getDisplay(this.prevOp)} ${this.operation}`
        } else {
            this.prevOpTextElement.innerText = ''
        }//this is to clean the sceen once you realize the operation
        // this.prevOpTextElement.innerText = this.prevOp
    }

    // UpdateDisplay(){
    //     this.currOpTextElement.innerText = this.currOp
    //     if (this.operation != null) {
    //         this.prevOpTextElement.innerText = `${this.prevOp} ${this.operation}`
    //     }
    //     // this.prevOpTextElement.innerText = this.prevOp
    // }

}
// properties
const numberButtons    = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allclear]')
const prevOpTextElement = document.querySelector('[data-prevop]')
const currOpTextElement = document.querySelector('[data-currop]')
// code
const calculator = new Calculator(prevOpTextElement, currOpTextElement)

numberButtons.forEach
(   button =>
    {button.addEventListener
        ('click', () =>
        {
            calculator.AppendNumber(button.innerText)
            calculator.UpdateDisplay()
        }
        )
    }
)
operationButtons.forEach
(   button =>
    {button.addEventListener
        ('click', () =>
        {
            calculator.ChooseOp(button.innerText)
            calculator.UpdateDisplay()
        }
        )
    }
)

equalButton.addEventListener('click', button => 
{
    calculator.Compute()
    calculator.UpdateDisplay()
})

deleteButton.addEventListener('click', button => 
{
    calculator.Delete() 
    calculator.UpdateDisplay()
})

allClearButton.addEventListener('click', button => 
{
    calculator.Clear() 
    calculator.UpdateDisplay()
})