$(function () {
    // 存放灰太狼和小灰灰出现位置的坐标[top, left].
    var position = [[114, 97], [141, 184], [160, 16], [192, 100], [222, 13], [212, 197], [296, 205], [294, 28], [273, 116]];
    // 存放灰太狼和小灰灰的渐变图片
    var father = ['img/h0.png', 'img/h1.png', 'img/h2.png', 'img/h3.png', 'img/h4.png', 'img/h5.png', 'img/h6.png', 'img/h7.png', 'img/h8.png', 'img/h9.png'];
    var son = ['img/x0.png', 'img/x1.png', 'img/x2.png', 'img/x3.png', 'img/x4.png', 'img/x5.png', 'img/x6.png', 'img/x7.png', 'img/x8.png', 'img/x9.png'];
    // 1.给开始游戏按钮添加点击事件
    $('.startGame').click(function () {
        $(this).fadeOut(100);
        // 1.1开始游戏以后让时间滚动条长度开始减少
        progressBar();
        // 1.2随机出现灰太狼或者小灰灰
        wolfAnimation();
        // 1.2.1 改变图片

    })
    // 2.给重新开始按钮添加点击事件
    $('.gameOver>button').click(function () {
        $('.gameOver').slideUp(800);
        // 2.1点击重新开始以后重新开始游戏
        // 2.1.1调用滚动条函数
        progressBar();
        //调用处理灰太狼动画的方法
        wolfAnimation();
    })
    // 3.给游戏规则添加点击事件
    $('.gameRules').click(function () {
        $('.rules').slideDown(1000);
    })

    // 3.1给游戏规则里面的关闭添加点击事件
    $('.rules>.close').click(function () {
        $('.rules').fadeOut(1000);
    })


    // 封装滚动条相关函数
    function progressBar() {
        // 每次开始前将滚动条长度还原
        $('.progressBar').width(182);
        window.timer = setInterval(function () {
            //滚动条滚动
            $('.progressBar').width(function (index, w) {
                return w -= 1;
            });
            //如果滚动条长度没有，游戏结束
            if ($('.progressBar').width() <= 0) {
                clearInterval(timer);
                $('.gameOver').fadeIn(800);
                // 停止灰太狼的动画
                stopWolfAnimation();
            }
        }, 300);
    }
    // 封装生成狼的函数
    var wolfTimer
    function wolfAnimation() {
        // 创建一个图片
        var wolfImage = $('<img src="" class="wolfImage">');
        // 随机获取图片位置
        var posIndex = Math.round(Math.random() * 8);
        // 设置图片显示位置
        wolfImage.css({
            position: 'absolute',
            left: position[posIndex][1],
            top: position[posIndex][0]
        })
        // 随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? father : son;
        // 设置图片的内容 
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function () {
            if (window.wolfIndex > window.wolfIndexEnd) {
                wolfImage.remove();
                clearInterval(wolfTimer);
                wolfAnimation();
            }
            wolfImage.attr('src', wolfType[wolfIndex]);
            wolfIndex++;
        }, 300);
        // 将图片添加到界面上
        $('.wrapper').prepend(wolfImage);

        // 调用处理游戏规则的方法
        gameRules(wolfImage);
    }

    function gameRules(wolfImage) {
        wolfImage.one('click', function () {
            // 修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            // 拿到当前点击图片的地址
            var src = $(this).attr('src');
            // 根据图片地址判断是否是灰太狼
            var flag = src.indexOf('h') >= 0;
            // 根据点击的图片类型增减分数
            if (flag) {
                $('.score').text(parseInt($('.score').text()) + 10);
            } else {
                $('.score').text(parseInt($('.score').text()) - 10);
            }
        })
    }

    function stopWolfAnimation() {
        $('.wolfImage').remove();
        clearInterval(wolfTimer);
    }














})














































































