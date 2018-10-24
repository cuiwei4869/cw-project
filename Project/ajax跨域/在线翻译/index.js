// 处理字符串

// var url = 'http://api.fanyi.baidu.com/api/trans/vip/translate',
//     q = 'apple',
//     q1 = encodeURI("你今天好漂亮"),
//     from = 'auto',
//     to = 'zh',
//     appid = '20181018000221205',
//     key = 'fN1iZv3G3_SwFCpBLTOX',
//     salt = Math.round(Math.random() * 100000);
// // 拼接字符串
// var str = appid + q + salt + key;
// console.log(str);
// var utf8Str = encodeURI(str);
// console.log(utf8Str);
// var sign = md5(utf8Str);
// console.log(sign);
// var arr = ['?q=' + q, 'from=' + from, 'to=' + to, 'appid=' + appid, 'salt=' + salt, 'sign=' + sign];
// var arrStr = arr.join('&');
// // console.log(arr);
// var URL = url + arrStr;
// console.log(URL);

// $.ajax({
//     url: URL,
//     type: "get",
//     // contentType: "application/json; charset=utf-8",
//     dataType: "jsonp",
//     jsonpCallback: 'callback',
//     success: function (data) {
//         console.info(data);
//     },
//     error: function (xhr, ajaxOptions, thrownError) {
//         console.info("error.");
//     }
// });
// function callback(data) {
//     console.log("jQuery请求成功！");
// }
// function message(data) {
//     console.log("script标签形式请求成功！");
//     console.log(data);
// }



$(function () {
    /**
     * 1.点击翻译按钮
     * 2.获取输入框的内容
     * 3.进行跨域请求
     * 4.处理请求返回的数据
     * 5.将数据显示在输出框中
     */
    // 1.获取输入框的内容
    var input = $('.input>textarea'),
        output = $('.output>textarea'),
        button = $('button'),
        query = '',
        str = '',
        sign = '',
        appid = '20181018000221205',
        key = 'fN1iZv3G3_SwFCpBLTOX',
        salt = Math.round((new Date).getTime()),
        from = 'auto',
        to = 'en';

    button.click(function () {
        query = input.val();
        str = appid + query + salt + key;
        sign = md5(str);
        $.ajax({
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },
            success: function(data) {
                var dst = data.trans_result[0].dst;
                output.val(dst);
            }
        })
    })




















})
