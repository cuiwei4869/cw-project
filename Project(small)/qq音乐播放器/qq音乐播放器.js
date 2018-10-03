$(function () {
    var progressBar = $('.function-middle-bar'),
        progressLine = $('.function-middle-bar .line'),
        progressDot = $('.function-middle-bar .dot'),
        voiceBar = $('.btn-voice .progressBar'),
        voiceLine = $('.btn-voice .line'),
        voiceDot = $('.btn-voice .dot');
    audio = $('audio');
    var player = new Player(audio);
    var progress = new Progress(progressBar, progressLine, progressDot);
    var voiceProgress = new Progress(voiceBar, voiceLine, voiceDot);
    var lyric;
    var lyricScorll = 50;

    // 1.加载歌曲列表
    setMusicList();
    function setMusicList() {
        $.ajax({
            url: 'music.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                player.musicinfo = data;
                // 3.1遍历获取到的数据，创建每一条音乐
                var musicList = $('.content-in-left-bottom ul')
                $.each(data, function (index, ele) {
                    var items = createMusic(index, ele);
                    musicList.append(items);
                })
                // 3.2初始化歌曲信息
                initMusicInfo(data[0]);
                // 3.3初始化歌词信息
                initLyricInfo(data[0]);
            },
            error: function (e) {
                console.log('error' + e);
            }
        });
    }

    // 初始化歌词信息函数
    function initLyricInfo(data) {
        lyric = new Lyric(data.link_lrc);
        var $lyric = $('.lyricsBox');
        // 清空上一首的歌词信息
        $lyric.html('');
        // 同时让box回滚到最开始的位置
        $lyric.css({
            marginTop: 0
        });
        lyric.loadLyric(function () {
            // 创建歌词列表
            $.each(lyric.lyrics, function (index, ele) {
                var items = $('<p>' + ele + '</p>')
                $lyric.append(items);
            });
        });
    }

    // 初始化歌曲信息函数
    function initMusicInfo(music) {
        var album = music.album,
            cover = music.cover,
            name = music.name,
            singer = music.singer,
            time = music.time;
        $('.content-in-right-pic>img').attr('src', cover);
        $('.content-in-right-pic>img').attr('title', name);
        $('.content-in-right .singer-info span:nth-child(1) a').text(name);
        $('.content-in-right .singer-info span:nth-child(2) a').text(singer);
        $('.content-in-right .singer-info span:nth-child(3) a').text(album);
        $('.function-middle-top>a:nth-child(1)').text(name);
        $('.function-middle-top>a:nth-child(3)').text(singer);
        $('.function-middle-top span:last-child').text('00:00 / ' + time);
        $('.box').css({
            background: 'url(' + cover + ') no-repeat 0 0',
            backgroundSize: 'cover'
        });
        // 初始化收藏
        if (music.collected) {
            $('.function-right .btn-collect1').addClass('btn-collect2');
        } else {
            $('.function-right .btn-collect1').removeClass('btn-collect2');
        }

    }
    // 2.初始化事件监听
    initEvent();

    function initEvent() {
        //2. 给歌曲添加移入移出事件(动态创建的元素要用时间委托)
        $('.content-in-left-bottom').delegate('.bottom-list>.list', 'mouseenter', function () {
            $(this).find('.tools').stop().fadeIn(100);
            $(this).find('.delete').css({
                fontSize: 0,
                background: 'url(imgs/delete.png) no-repeat 5px 5px',
                backgroundSize: '23px 23px',
                border: '1.3px solid #fff'
            });
        });
        $('.content-in-left-bottom').delegate('.bottom-list>.list', 'mouseleave', function () {
            $(this).find('.tools').stop().fadeOut(100);
            $(this).find('.delete').css({
                fontSize: 14,
                background: 'none',
                border: 'none'
            });
        });
        // 3.给选择框添加点击事件(时间委托)
        $('.content-in-left-bottom').delegate('.list-check>span', 'click', function () {
            // 如果点击的是全选,则全部选中
            if ($(this).attr('class').indexOf('spanAll') > -1) {
                if ($(this).attr('class').indexOf('selected') > -1) {
                    $(this).parents('.list-first').siblings().find('.span').removeClass('selected');
                } else {
                    $(this).parents('.list-first').siblings().find('.span').addClass('selected');
                }
            }
            if ($(this).attr('class').indexOf('selected') > -1) {
                $(this).removeClass('selected');
                $(this).parents('.list').siblings().eq(0).find('.spanAll').removeClass('selected');
            } else {
                $(this).addClass('selected');
            }
        });
        // 4.给歌曲列表的播放暂停按钮添加点击事件
        $('.content-in-left-bottom').delegate('.list-name .icon', 'click', function () {
            var siblings = $(this).parents('li.list').siblings();
            var check = $(this).parents('li.list').find('.list-number');
            var item = $(this).parents('li.list').get(0);
            if ($(this).attr('class').indexOf('play') > -1) {
                // 切换播放，同时让其他歌曲的图标变为暂停
                siblings.find('.stop').removeClass('stop').addClass('play');
                $(this).removeClass('play');
                $(this).addClass('stop');
                // 同时让底部的按钮同步
                $('.btn-play1').removeClass('btn-play1').addClass('btn-play2')
                // 同时让列表的文字高亮,并且其它列表的文字不高亮
                $(this).parents('.list').css('color', 'rgba(255,255,255)');
                siblings.css('color', 'rgba(255,255,255,0.5)')
                // 同时让里面的按钮一直显示，并且其它列表的按钮消失
                // $(this).parents('li.list').find('.tools').stop().fadeIn(100);
                // 点击播放以后让序号变为动图,并且其它列表的动图消失
                if (check.attr('class').indexOf('wave') == -1) {
                    check.addClass('wave');
                    siblings.find('.list-number').removeClass('wave');
                }
                // 让音乐播放
                player.playMusic(item.index, item.music);
                // 切换歌曲信息
                initMusicInfo(item.music);
                // 切换歌词信息
                initLyricInfo(item.music);
            } else if ($(this).attr('class').indexOf('stop') > -1) {
                // 切换播放，同时让其他歌曲的图标变为暂停
                $(this).removeClass('stop');
                $(this).addClass('play');
                // 同时让底部的按钮同步
                $('.btn-play2').removeClass('btn-play2').addClass('btn-play1')
                // 同时让列表的文字不高亮
                $(this).parents('.list').css('color', 'rgba(255,255,255,0.5)');
                // 同时让列表的按钮不显示
                // 同时让序号动图消失
                if (check.attr('class').indexOf('wave') > -1) {
                    check.removeClass('wave')
                }
                // 让音乐暂停
                player.playMusic(item.index, item.music);

            }
        });
        //5 给底部按钮添加点击事件
        // 5.1 给播放按钮添加点击事件
        var bottomBtnPlay = $('.function-left a:nth-child(2)');

        bottomBtnPlay.click(function () {
            // 判断当前有没有播放音乐
            if (player.currentIndex == -1) {
                // 没有播放过音乐，从第一首开始播放
                $('.bottom-list .list').eq(0).find('.tools .icon:last-child').trigger('click');
            } else {
                $('.bottom-list .list').eq(player.currentIndex).find('.tools .icon:last-child').trigger('click');
            }
        });

        // 5.2 给上一首按钮添加点击事件
        $('.btn-pre').click(function () {
            $('.bottom-list .list').eq(player.preIndex()).find('.tools .icon:last-child').trigger('click');
        })
        // 5.3 给下一首按钮添加点击事件
        $('.btn-next').click(function () {
            $('.bottom-list .list').eq(player.nextIndex()).find('.tools .icon:last-child').trigger('click');
        });

        // 6.给删除音乐添加点击事件
        $('.content-in-left-bottom').delegate('.list-time .delete', 'click', function () {
            // 找到此按钮对应的音乐，删除整列
            var index = $(this).parents('.list').find('.list-number').text();
            $(this).parents('.list').remove();
            player.musicinfo.splice(index - 1, 1);
            var items = $('.content-in-left-bottom .list')
            player.changeNum(items);
            // 更新序号
            // // 如果删除的这一列刚好是正在播放的音乐
            if (index == player.currentIndex + 1) {
                // 那么开始播放下一首音乐
                player.currentIndex -= 1;
                $('.btn-next').trigger('click');
            }
            // // 如果删除的是正在播放音乐的前面的
            if (index < player.currentIndex + 1) {
                // 改变currentIndex
                player.currentIndex -= 1;
            }
        });
        // 7.给底部进度条添加点击事件
        progress.progressClick(function (percent) {
            player.setMusicTime(percent);
        });
        // 8.给音量进度条添加点击事件
        voiceProgress.progressClick(function (value) {
            player.musicVoice(value);
        });
        // 9.给底部进度条添加拖拽事件
        progress.progressMove(function (percent) {
            player.setMusicTime(percent);
        });
        // 10.给音量条添加拖拽事件
        voiceProgress.progressMove(function (value) {
            player.musicVoice(value);
        });
        // 11.监听底部进度条上面时间的改变
        player.underMusicTime(function (duration, currentTime, timeStr) {
            $('.function-middle-top span:last-child').text(timeStr);
            var percent = (currentTime / duration) * 100;
            percent = Math.round(percent * 10) / 10
            progress.setProgress(percent);
            var index = lyric.currentIndex(currentTime);
            var items = $('.lyrics p').eq(index);
            var items2 = $('.content>.lyrics p').eq(index);
            items2.addClass('cur');
            items2.siblings().removeClass('cur');
            items.addClass('cur');
            items.siblings().removeClass('cur');
            if (index <= 2) return;
            $('.lyricsBox').css({
                marginTop: (-index + 2) * lyricScorll
            });

        });
        // 12.监听声音按钮的点击
        $('.btn-voice .pic1').click(function () {
            $(this).toggleClass('pic2');
            if ($(this).attr('class').indexOf('pic2') > -1) {
                player.musicVoice(0);
            } else {
                player.musicVoice(1);
            }

        })
        // 13.监听上面功能栏的删除按钮的点击
        $('.content-in-left-top .tools:nth-child(4)').click(function () {
            // 点击以后删除被选中的歌曲一列
            $('.content-in-left-bottom .list-check .selected').parents('.list').find('.list-time .delete').trigger('click');
        });
        // 14.监听清空列表按钮的点击事件
        $('.content-in-left-top .tools:nth-child(5)').click(function () {
            // 点击以后删除所有歌曲
            $('.content-in-left-bottom .list').remove();
            // 同时让页面上的歌曲信息清空
            // 1.移除audio标签的歌曲信息
            $('audio').attr('src', '');
        });
        // 15.监听上方功能栏的收藏按钮的点击
        $('.content-in-left-top .tools:nth-child(1)').click(function() {
            // 点击以后收藏选中的歌曲
            var items = $('.content-in-left-bottom .list-check .selected').parents('.list');
            items.each(function(index,ele) {
                ele.music.collected = true;
            })
            // 初始化页面的歌曲信息
            var a = $('.content-in-left-bottom .list');
            if(player.currentIndex < 0) {
                var index = 0;
            }else{
                var index = player.currentIndex;
            }
            var music = a.eq(index).get(0).music;
            initMusicInfo(music);
        })
        // 16.监听下方功能栏收藏按钮的点击
        $('.function-right .btn-collect1').click(function () {
            $(this).toggleClass('btn-collect2');
            // 点击以后给当前播放的这一条音乐绑定一个属性
            // 获取当前播放的这一条音乐
            if (player.currentIndex == -1) {
                var index = 0;
            } else {
                var index = player.currentIndex;
            }
            if ($(this).attr('class').indexOf('btn-collect2') > -1) {
                $('.content-in-left-bottom .list').eq(index).get(0).music.collected = true;
            } else {
                $('.content-in-left-bottom .list').eq(index).get(0).music.collected = false;
            }
        });
        // 17.监听下方功能栏纯净模式的点击
        $('.function-right .btn-pure1').click(function() {
            // 切换图标
            $(this).toggleClass('btn-pure2');
            if($(this).attr('class').indexOf('btn-pure2') > -1) {
                // 开启纯净模式
                $('.content>.lyrics').fadeIn(100);
                $('.content-in').fadeOut(100);
                lyricScorll = 90;
            }else{
                // 不开启纯净模式
                $('.content>.lyrics').fadeOut(100);
                $('.content-in').fadeIn(100);
                lyricScorll = 50;
            };

        });
    }
    // 定义一个方法创建一条音乐
    function createMusic(index, music) {
        var item = $('<li class="list">\
        <div class="list-check"><span class="span"></span></div>\
        \<div class="list-number">'+ (index + 1) + ' ' + '</div> \
        <div class="list-name"\
            <span>'+ music.name + '</span>\
            <div class="tools">\
                <span class="icon share"></span>\
                <span class="icon down"></span>\
                <span class="icon add"></span>\
                <span class="icon play"></span>\
            </div>\
        </div>\
        <div class="list-singer">'+ music.singer + '</div>\
        <div class="list-time">\
            <span class="delete">'+ music.time + '</span>\
        </div>\
    </li>');

        item.get(0).index = index;
        item.get(0).music = music;

        return item;
    }
})


























