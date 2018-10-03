(function (window) {

    function Player(audio) {
        return new Player.prototype.init(audio);
    }

    Player.prototype = {
        constructor: Player,
        musicinfo: [],
        init: function (audio) {
            this.$audio = audio;
            this.audio = audio.get(0);
        },
        currentIndex: -1,
        playMusic: function (index, music) {
            // 判断是否是同一首音乐
            if (this.currentIndex == index) {
                if (this.audio.paused) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            } else {
                // 不是同一首音乐
                this.$audio.attr('src', music.link_url);
                this.audio.play();
                this.currentIndex = index;

            }
        },
        // 点击底部上一首
        preIndex: function () {
            var index = this.currentIndex - 1;
            if (this.currentIndex <= 0) {
                index = this.musicinfo.length - 1;
            }
            return index;
        },
        // 点击底部下一首
        nextIndex: function () {
            var index = this.currentIndex + 1;
            if (this.currentIndex >= this.musicinfo.length - 1) {
                index = 0;
            }
            return index;
        },
        changeNum: function (items) {
            $.each(items, function (index, ele) {
                // ele是dom元素，要先转换为jquery元素；
                $(ele).find('.list-number').text(index + 1);
                items.each(function (index, ele) {
                    ele.index = index;
                })
            })
        },

        // 监听底部进度条上面时间的改变
        underMusicTime: function (callback) {
            var $this = this;
            this.$audio.on('timeupdate', function () {
                var duration = $this.audio.duration;
                var currentTime = $this.audio.currentTime;
                var timeStr = $this.formatTime(duration, currentTime);
                return callback(duration, currentTime, timeStr);
            })
        },
        // 定义个格式化时间的方法
        formatTime: function (duration, currentTime) {
            var durationMin = parseInt(duration / 60);
            var durationSec = parseInt(duration % 60);
            var currentMin = parseInt(currentTime / 60);
            var currentSec = parseInt(currentTime % 60);
            if (durationMin < 10) {
                durationMin = '0' + durationMin;
            }
            if (durationSec < 10) {
                durationSec = '0' + durationSec;
            }
            if (currentMin < 10) {
                currentMin = '0' + currentMin;
            }
            if (currentSec < 10) {
                currentSec = '0' + currentSec;
            }
            return currentMin + ':' + currentSec + ' / ' + durationMin + ':' + durationSec;
        },
        //歌曲跳转到指定的位置
        setMusicTime: function (percent) {
            if(isNaN(percent)) return;
            this.audio.currentTime = this.audio.duration * percent;
        },
        // 设置声音大小
        musicVoice: function (value) {
            if (isNaN(value) || value > 1 || value < 0) return;
            this.audio.volume = value;
        }




    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;



})(window)