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
        if(number === '.' && this.currOp.includes('.') ) return //ignore if there is already a point
        this.currOp = this.currOp.toString() + number.toString()
    }
    ChooseOp(operation){
        if(this.currOp === '') return //ignore if there is no first number
        // Check if the currentOp, meaning current number, is nothing, do nothing
        if(this.prevOp !== '') {this.Compute() } // calcule when there already 2 number and we add a 3rd numbers, then calcule what's already there (3 num situation)
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
            `${this.getDisplay(this.prevOp)} ${this.operation}`//add a point each 3 digits
        } else {
            this.prevOpTextElement.innerText = ''// once a operator has been picked, free this space to write a new number to add to the calculation 
        }//this is to clean the sceen once you realize the operation
        // this.prevOpTextElement.innerText = this.prevOp
    }
}
// properties
//number and operation buttons (adding string)
const numberButtons    = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
//calculate or so sth (editting data)
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allclear]')
//string to see what is going on
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