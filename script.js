let currentNum = '';
let previousNum = ''; 
let operator = ''; 

const clear = document.querySelector(".C-btn")
clear.addEventListener('click', ()=>{
    currentNum='';
    previousNum='';
    operator='';
    currentDisplay.textContent=0;
    previousDisplay.textContent='';
})

const equalBtn = document.querySelector(".equal-btn")
equalBtn.addEventListener('click', ()=>{
    if(currentNum != '' && previousNum!=''){
        calc();
    }
});

const decimal = document.querySelector('.decimal-btn')
decimal.addEventListener('click', () => {
    addDecimal();
})

function addDecimal() {
    if(!currentNum.includes('.')) {
        currentNum+='.'
        currentDisplay.textContent = currentNum; 
    }
}

const operators = document.querySelectorAll('.operator')

const numberBtns = document.querySelectorAll('.number')

const currentDisplay = document.querySelector('.current')
const previousDisplay = document.querySelector('.previous')

numberBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if(currentNum != '' && previousNum!='' && operator === ''){
        previousNum='';
        currentDisplay.textContent = currentNum;
    }
    if(currentNum.length <= 11){
        currentNum += number;
        currentDisplay.textContent = currentNum;
    };
}; 

operators.forEach(btn=> {
    btn.addEventListener('click', (e)=>{
        handleOperator(e.target.textContent);
    });
});

function handleOperator(a){
    if(previousNum === ''){
        previousNum = currentNum;
        operatorContinue(a);
    } else if (currentNum === ''){
        operatorContinue(a);
    } else {
        calc();
        operator = a;
        currentDisplay.textContent = '0';
        previousDisplay.textContent = previousNum + '' + operator;        
    }
}

function calc() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
    
    if(operator === '÷'){
        if(currentNum <= 0){
            previousNum='Nah Dawgie'
            limitDisplay()
            return
        } else {
            previousNum /= currentNum;
        }
    } else if(operator === '×'){
        previousNum *= currentNum;
    } else if(operator === '−'){
        previousNum -= currentNum;
    } else if(operator === '+'){
        previousNum += currentNum;
    }
    
    previousNum = previousNum.toString();
    limitDisplay()
}

function limitDisplay(){
    if(previousNum.length <=11){
        currentDisplay.textContent = previousNum;
    } else {
        currentDisplay.textContent = previousNum.slice(0,11) + '...';
    }
    previousDisplay.textContent = '';
    operator = '';
    currentNum = '';
}

function operatorContinue(input){
    operator = input; 
    previousDisplay.textContent = previousNum + ' ' + operator; 
    currentDisplay.textContent = 0;
    currentNum = '';
}


