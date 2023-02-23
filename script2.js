var screen = document.querySelector('#screen');
var btn = document.querySelectorAll('.btn');
var ghostString = false;
var operationFlag = false;
var dotFlag = true;
var bracketFlag = false;
var strongOperationFlag = false;

document.addEventListener('keydown', (e) => { //Keyboard
    btntext = e.key;

    if (btntext >= 0 && btntext <= 9 && btntext != ' ') //Numbers
        Print_On_Screen(btntext);

    if (btntext == '+' || btntext == '-' || btntext == '/' || btntext == '*' || btntext == '%') //Operations
        Print_On_Screen(btntext);

    if (btntext == '.' || btntext == '(' || btntext == ')')
        Print_On_Screen(btntext);

    if (btntext == 'Enter')
        calculate();

    if (btntext == 'Backspace')
        backspc();

})

for (item of btn) { // Buttons
    item.addEventListener('click', (e) => {
        btntext = e.target.innerText;
        Print_On_Screen(btntext);
    })
}

function Print_On_Screen(btntext) { //Check
    if ((btntext == '+') || (btntext == '-') || (btntext == '÷') || (btntext == '×') || (btntext == '/') || (btntext == '*') || (btntext == '%')) {
        if (operationFlag) {
            if(!bracketFlag && !strongOperationFlag)
                calculate(btntext);
            if (btntext == '×')
                btntext = '*';
            else if (btntext == '÷')
                btntext = '/';
            
            if(btntext == '*' || btntext == '/' || btntext == '%') {
                strongOperationFlag = true;
            }


            operationFlag = false;
            dotFlag = true;
            ghostString = false;
            screen.value += btntext;
        }
    }
    else if (btntext == '.') {
        if (dotFlag) {
            dotFlag = false;
            screen.value += btntext;
        }
        ghostString = false;
    }
    else if (screen.value == '0')
        screen.value = btntext;
    else if (btntext == '(') {
        bracketFlag = true;
        screen.value += btntext;
    }
    else if (btntext == ')') {
        bracketFlag = false;
        screen.value += btntext;
    }
    else {
        operationFlag = true;
        screen.value += btntext;
    }


    if (!isNaN(btntext) && ghostString) {
        screen.value = btntext;
        ghostString = false;
    }
}

function sin() {
    screen.value = Math.sin(screen.value);
}

function cos() {
    screen.value = Math.cos(screen.value);
}

function tan() {
    screen.value = Math.tan(screen.value);
}

function pow() {
    screen.value = Math.pow(screen.value, 2);
}

function sqrt() {
    screen.value = Math.sqrt(screen.value, 2);
}

function log() {
    screen.value = Math.log(screen.value);
}

function pi() {
    Print_On_Screen(22/7);
}

function e() {
    screen.value += 2.71828182846;
}

function fact() {
    let i, num, f;
    f = 1
    num = screen.value;
    for (i = 1; i <= num; i++) {
        f = f * i;
    }

    i = i - 1;

    screen.value = f;
}

function calculate() {
    ghostString = true;
    try {
        screen.value = eval(screen.value);
        if (isNaN(screen.value))
            screen.value = 'ERROR';
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            screen.value = 'ERROR';
        }
    }

    if (!operationFlag)
        screen.value = 'Complete the equation plz';
    
    operationFlag = false;
    dotFlag = true;
    bracketFlag = false;
    strongOperationFlag = false;
}

function backspc() {
    screen.value = screen.value.substr(0, screen.value.length - 1);
}