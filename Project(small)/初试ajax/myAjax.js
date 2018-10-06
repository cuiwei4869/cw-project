function objToStr(obj) {
    obj.t = new Date().getTime();
    var res = [];
    for (var key in obj) {
        res.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return res.join('&');
}

function myAjax(type, url, obj, timeout, success, error) {
    // 0.将对象转换成字符串
    var str = objToStr(obj);

    // 1.创建一个异步对象
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari 
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // code for IE6, IE5 
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (type.toLowerCase() == 'get') {
        // 2.设置请求方式和请求地址
        xmlhttp.open(type, url + '?' + str, true);
        // 以下方法必须放在open额send之间
        // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // 3.发送请求
        xmlhttp.send();
    } else if (type.toLowerCase() == 'post') {
        // 2.设置请求方式和请求地址
        xmlhttp.open(type, url, true);
        // 以下方法必须放在open额send之间
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // 3.发送请求
        xmlhttp.send(str);
    }
    // 4.监听状态的变化
    xmlhttp.onreadystatechange = function (e) {
        // 5.处理返回的结果
        if (xmlhttp.readyState == 4) {
            clearInterval(timer);
            // 判断是否请求成功
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
                success(xmlhttp);
            } else {
                error(xmlhttp);
            }
        }
    }
    // 判断外界是否传入了超时时间
    if (timeout) {
        var timer = setInterval(function () {
            console.log('中断请求');
            xmlhttp.abort();
            clearInterval(timer);
        }, timeout);
    }



}