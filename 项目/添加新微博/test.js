$(function () {
    // 1.实时监听输入框里面是否有内容
    var text;
    $('body').delegate('.text>textarea', 'propertychange input', function () {
        // 1.1 有内容-->发布可以点击 无内容--> 发布不可以点击
        text = $('.text>textarea').val();
        if (text) {
            $('.text>button').prop('disabled', false);
        } else {
            $('.text>button').prop('disabled', true);
        }
    });
    // 2.有内容并且点击发布以后生成一条新的微博，将新的微博插入到最前面
    $('.text>button').click(function () {
        console.log('cuiwei');
        var newMicrolog = $('<div class="microblog">\
        <p class= "info">'+ text + '</p>\
        <p class="date">'+ presentDate() + '</p>\
            <p class="infoOperation">\
                <a class="collect" href="javascript:;">收藏</a>\
                <a class="transmit" href="javascript:;">0</a>\
                <a class="comment" href="javascript:;">评论</a>\
                <a class="praise" href="javascript:;">0</a>\
            </p>\
        </div>');
        $('.text').after(newMicrolog);
    })
    // 2.1添加获取当前事件的方法
    function presentDate(){
        var date = new Date();
        var nowDate = [date.getFullYear()+'-',
                        date.getMonth()+'-',
                        date.getDay() +' ',
                        date.getHours()+':',
                        date.getMinutes() + ':',
                        date.getSeconds()]
        var a = nowDate.join('');
        return a;
    }
    // 3.给收藏，转发，评论，点赞添加点击事件--动态生成的 要用事件委托
    $('body').delegate('.collect','click',function() {
        $(this).css({
            background: 'url(images/weibo/collect.png) no-repeat 70px 3px',
            backgroundSize: '15px 15px'
        })
    })
    $('body').delegate('.praise','click',function() {
        $(this).css({
            background: 'url(images/weibo/praise.png) no-repeat 70px 3px',
            backgroundSize: '15px 15px'
        });
        $(this).text('1');
    })
    $('body').delegate('.transmit','click',function() {
        $(this).css({
            background: 'url(images/weibo/transmit.png) no-repeat 70px 3px',
            backgroundSize: '15px 15px'
        })
        $(this).text('1');
    })




























})



