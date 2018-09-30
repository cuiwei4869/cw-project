var displayBox = document.getElementById('displayBox');
var AC = document.getElementById('AC');
var transfer = document.getElementById('what');
var percent = document.getElementById('percent');
var divide = document.getElementById('divide');
var seven = document.getElementById('seven');
var eight = document.getElementById('eight');
var nine = document.getElementById('nine');
var multiply = document.getElementById('multiply');
var four = document.getElementById('four');
var five = document.getElementById('five');
var six = document.getElementById('six');
var minus = document.getElementById('minus');
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var add = document.getElementById('add');
var zero = document.getElementById('zero');
var point = document.getElementById('point');
var equal = document.getElementById('equal');
var key = true;
var realNums = '';
var result = 0;
var timer;
var innerStr = '';
go();
function go() {
    calculator();
    timer = setInterval('fontSize()',100);
}
function fontSize() {
    console.log('sandy');
    innerStr = displayBox.innerText;
    if(innerStr.length >= 7){
        displayBox.style.fontSize = 40 + 'px';
        if(innerStr.length >= 9){
            displayBox.style.fontSize = 30 + 'px';
            if(innerStr.length >= 15){
                displayBox.style.fontSize = 20 + 'px';
            }
        }
    }
}
function calculator() {
    AC.addEventListener('click', function (e) {
        displayBox.innerText = '';
        realNums = '';
        result = 0;
        clearInterval(timer);
        timer = setInterval('fontSize()',100);
    }, false);
    transfer.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += 'Are you SB?';
        realNums += '';
    }, false);
    percent.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '%';
        realNums += '%';
    }, false);
    divide.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '÷';
        realNums += '/';
    }, false);
    seven.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '7';
        realNums += '7';
    }, false);
    eight.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '8';
        realNums += '8';
    }, false);
    nine.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '9';
        realNums += '9';
    }, false);
    multiply.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '×';
        realNums += '*';
    }, false);
    four.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '4';
        realNums += '4';
    }, false);
    five.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '5';
        realNums += '5';
    }, false);
    six.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '6';
        realNums += '6';
    }, false);
    minus.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '-';
        realNums += '-';
    }, false);
    one.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '1';
        realNums += '1';
    }, false);
    two.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '2';
        realNums += '2';
    }, false);
    three.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '3';
        realNums += '3';
    }, false);
    add.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '+';
        realNums += '+';
    }, false);
    zero.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '0';
        realNums += '0';
    }, false);
    point.addEventListener('click', function (e) {
        if (!key) {
            displayBox.innerText = '';
            realNums = '';
            result = 0;
            key = true;
            clearInterval(timer);
            timer = setInterval('fontSize()',100);
        }
        displayBox.innerText += '.';
        realNums += '.';
    }, false);
    equal.addEventListener('click', function (e) {
        key = false;
        result = calculate();
        displayBox.innerText = result;
    }, false);
}

function calculate() {
    var str = realNums;
    return eval(str);
}












