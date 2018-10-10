//扫雷 20 * 10
var startBox = document.getElementById('start');
var startBtn = document.getElementById('startBtn');
var timeBox = document.getElementById('timeBox');
var mineBox = document.getElementById('mineBox');
var mineArea = document.getElementById('mineArea');
var win = document.getElementsByClassName('win')[0];
var mineWrapper;
var useTime = 0;
var count = 30;
game();
function game() {
    startBtn.addEventListener('click', function () {
        document.addEventListener('click', function () {
            winOrLost();
        }, false)
        timer = setInterval(time, 1000);
        mineArea.innerHTML = '';
        startBox.style.display = 'none';
        timeBox.innerText = '用时：0';
        mineBox.innerText = '剩余：' + count;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 20; j++) {
                var mineWrapper = document.createElement('div');
                mineWrapper.className = i + '-' + j + ' ' + 'mine';
                mineArea.appendChild(mineWrapper);
            }
        }
        createMine();
        createNumber();
        noLei = document.getElementsByName('noLei');
        isLei = document.getElementsByName('isLei');
        clickNoMine();
    }, false);
}
function createMine() {
    mineArea.oncontextmenu = function () {
        return false;
    }
    var mineArr = document.getElementsByClassName('mine');
    for (var k = 1; k <= count; k++) {
        var randomX = Math.floor(Math.random() * 10);
        var randomY = Math.floor(Math.random() * 10) * 2;
        var isMine = document.getElementsByClassName(randomX + '-' + randomY)[0];
        if (!isMine.classList.contains('isMine')) {
            isMine.classList.add('isMine');
            isMine.setAttribute('name', 'isLei');
            isMine.addEventListener('click', function () {
                clearInterval(timer);
                setTimeout("reloadGame()", 1000);
            }, false)
            isMine.addEventListener('mouseup', function (e) {
                var a = 0;
                e = e || window.event;
                if (e.button == 2) {
                    if (!e.target.classList.contains('flag') && !e.target.classList.contains('saw') && !e.target.classList.contains('saws')) {
                        e.target.classList.add('flag');
                    } else {
                        e.target.classList.remove('flag');
                    }
                    console.log(a);
                }
            }, false)
        } else {
            k--;
        }
    }
}
function createNumber() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 20; j++) {
            var thisCount = 0;
            var mine0 = document.getElementsByClassName(i + '-' + j)[0];
            var mine1 = document.getElementsByClassName((i - 1) + '-' + (j - 1))[0];
            var mine2 = document.getElementsByClassName((i - 1) + '-' + j)[0];
            var mine3 = document.getElementsByClassName((i - 1) + '-' + (j + 1))[0];
            var mine4 = document.getElementsByClassName(i + '-' + (j - 1))[0];
            var mine5 = document.getElementsByClassName(i + '-' + (j + 1))[0];
            var mine6 = document.getElementsByClassName((i + 1) + '-' + (j - 1))[0];
            var mine7 = document.getElementsByClassName((i + 1) + '-' + j)[0];
            var mine8 = document.getElementsByClassName((i + 1) + '-' + (j + 1))[0];
            if (mine1 && mine1.classList.contains('isMine')) {
                thisCount++;
            }
            if (mine2 && mine2.classList.contains('isMine')) {
                thisCount++;
            }
            if (mine3 && mine3.classList.contains('isMine')) {
                thisCount++;
            }
            if (mine4 && mine4.classList.contains('isMine')) {
                thisCount++;
            }
            if (mine5 && mine5.classList.contains('isMine')) {
                thisCount++;
            }
            if (mine6 && mine6.classList.contains('isMine')) {
                thisCount++;
            }
            if (mine7 && mine7.classList.contains('isMine')) {
                thisCount++;
            }
            if (mine8 && mine8.classList.contains('isMine')) {
                thisCount++;
            }
            if (!mine0.classList.contains('isMine')) {
                mine0.innerText = thisCount;
                mine0.setAttribute('name', 'noLei');
            }
        }
    }
}
function reloadGame() {
    startBox.style.display = 'block';
    for (var i = 0; i < count; i++) {
        isLei[i].classList.add('boom');
    }
    useTime = 0;
    countno = 0;
    countis = 0;
}
function time() {
    useTime++;
    timeBox.innerText = '用时：' + useTime;
    lastMine();
}
function clickNoMine() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 20; j++) {
            var mine0 = document.getElementsByClassName(i + '-' + j)[0];
            if (!mine0.classList.contains('isMine')) {
                (function (i, j) {
                    var mine0 = document.getElementsByClassName(i + '-' + j)[0];
                    var mine1 = document.getElementsByClassName((i - 1) + '-' + (j - 1))[0];
                    var mine2 = document.getElementsByClassName((i - 1) + '-' + j)[0];
                    var mine3 = document.getElementsByClassName((i - 1) + '-' + (j + 1))[0];
                    var mine4 = document.getElementsByClassName(i + '-' + (j - 1))[0];
                    var mine5 = document.getElementsByClassName(i + '-' + (j + 1))[0];
                    var mine6 = document.getElementsByClassName((i + 1) + '-' + (j - 1))[0];
                    var mine7 = document.getElementsByClassName((i + 1) + '-' + j)[0];
                    var mine8 = document.getElementsByClassName((i + 1) + '-' + (j + 1))[0];
                    mine0.addEventListener('click', function () {
                        around(mine0);
                    }, false);
                    mine0.addEventListener('mouseup', function (e) {
                        var a = 0;
                        e = e || window.event;
                        if (e.button == 2) {
                            if (!e.target.classList.contains('flag') && !e.target.classList.contains('saw') && !e.target.classList.contains('saws')) {
                                e.target.classList.add('flag');
                            } else {
                                e.target.classList.remove('flag');
                            }
                        }
                    }, false)
                })(i, j)

            }
        }
    }
}
function around(ele) {
    if (!ele.classList.contains('saw')) {
        ele.classList.add('saw');
        var str = ele.getAttribute('class');
        var strArr = str.split(' ');
        var coordinate = strArr[0];
        var X = parseInt(coordinate.split('-')[0]);
        var Y = parseInt(coordinate.split('-')[1]);
        var mine0 = document.getElementsByClassName(X + '-' + Y)[0];
        var mine1 = document.getElementsByClassName((X - 1) + '-' + (Y - 1))[0];
        var mine2 = document.getElementsByClassName((X - 1) + '-' + Y)[0];
        var mine3 = document.getElementsByClassName((X - 1) + '-' + (Y + 1))[0];
        var mine4 = document.getElementsByClassName(X + '-' + (Y - 1))[0];
        var mine5 = document.getElementsByClassName(X + '-' + (Y + 1))[0];
        var mine6 = document.getElementsByClassName((X + 1) + '-' + (Y - 1))[0];
        var mine7 = document.getElementsByClassName((X + 1) + '-' + Y)[0];
        var mine8 = document.getElementsByClassName((X + 1) + '-' + (Y + 1))[0];
        var num = mine0.innerText;
        if (num && num >= 0) {
            mine0.style.fontSize = '16px';
            if (num == 0) {
                if (mine1 && mine1.innerText == 0) {
                    clearAround(mine1);
                    around(mine1);
                }
                if (mine2 && mine2.innerText == 0) {
                    clearAround(mine2);
                    around(mine2);
                }
                if (mine3 && mine3.innerText == 0) {
                    clearAround(mine3);
                    around(mine3);
                }
                if (mine4 && mine4.innerText == 0) {
                    clearAround(mine4);
                    around(mine4);
                }
                if (mine5 && mine5.innerText == 0) {
                    clearAround(mine5);
                    around(mine5);
                }
                if (mine6 && mine6.innerText == 0) {
                    clearAround(mine6);
                    around(mine6);
                }
                if (mine7 && mine7.innerText == 0) {
                    clearAround(mine7);
                    around(mine7);
                }
                if (mine8 && mine8.innerText == 0) {
                    clearAround(mine8);
                    around(mine8);
                }
            }
        }
    }
}
function clearAround(ele) {
    var str = ele.getAttribute('class');
    var strArr = str.split(' ');
    var coordinate = strArr[0];
    var X = parseInt(coordinate.split('-')[0]);
    var Y = parseInt(coordinate.split('-')[1]);
    var mine0 = document.getElementsByClassName(X + '-' + Y)[0];
    var mine1 = document.getElementsByClassName((X - 1) + '-' + (Y - 1))[0];
    var mine2 = document.getElementsByClassName((X - 1) + '-' + Y)[0];
    var mine3 = document.getElementsByClassName((X - 1) + '-' + (Y + 1))[0];
    var mine4 = document.getElementsByClassName(X + '-' + (Y - 1))[0];
    var mine5 = document.getElementsByClassName(X + '-' + (Y + 1))[0];
    var mine6 = document.getElementsByClassName((X + 1) + '-' + (Y - 1))[0];
    var mine7 = document.getElementsByClassName((X + 1) + '-' + Y)[0];
    var mine8 = document.getElementsByClassName((X + 1) + '-' + (Y + 1))[0];
    if (mine0) {
        if (!mine0.classList.contains('saws')) {
            mine0.classList.add('saws');
        }
        mine0.style.fontSize = '16px';
    }
    if (mine1) {
        if (!mine1.classList.contains('saws')) {
            mine1.classList.add('saws');
        }
        mine1.style.fontSize = '16px';
    }
    if (mine2) {
        if (!mine2.classList.contains('saws')) {
            mine2.classList.add('saws');
        }
        mine2.style.fontSize = '16px';
    }
    if (mine3) {
        if (!mine3.classList.contains('saws')) {
            mine3.classList.add('saws');
        }
        mine3.style.fontSize = '16px';
    }
    if (mine4) {
        if (!mine4.classList.contains('saws')) {
            mine4.classList.add('saws');
        }
        mine4.style.fontSize = '16px';
    }
    if (mine5) {
        if (!mine5.classList.contains('saws')) {
            mine5.classList.add('saws');
        }
        mine5.style.fontSize = '16px';
    }
    if (mine6) {
        if (!mine6.classList.contains('saws')) {
            mine6.classList.add('saws');
        }
        mine6.style.fontSize = '16px';
    }
    if (mine7) {
        if (!mine7.classList.contains('saws')) {
            mine7.classList.add('saws');
        }
        mine7.style.fontSize = '16px';
    }
    if (mine8) {
        if (!mine8.classList.contains('saws')) {
            mine8.classList.add('saws');
        }
        mine8.style.fontSize = '16px';
    }
}
function winOrLost() {
    var lena = isLei.length;
    var lenb = noLei.length;
    var countno = 0;
    var countis = 0;
    for (var i = 0; i < lenb; i++) {
        if (!noLei[i].classList.contains('flag')) {
            countno++;
        }
    }
    for (var j = 0; j < lena; j++) {
        if (isLei[j].classList.contains('flag')) {
            countis++;
        }
    }
    console.log(countis + '   ' + countno)
    if (countis == lena && countno == lenb) {
        win.style.display = 'block';
    }
}
function lastMine() {
    var lena = isLei.length;
    var countis = 0;
    for (var j = 0; j < lena; j++) {
        if (isLei[j].classList.contains('flag')) {
            countis++;
        }
    }
    console.log('还剩：' + (30 - countis));
    mineBox.innerText = '剩余：' + (30 - countis);
}