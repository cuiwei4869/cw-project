(function (window) {

    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }

    Lyric.prototype = {

        constructor: Lyric,
        init: function (path) {
            this.path = path;
        },
        loadLyric: function (callback) {
            var $this = this;
            $.ajax({
                url: $this.path,
                dataType: 'text',
                success: function (data) {
                    $this.cutLyric(data);
                    callback();
                },
                error: function (e) {
                    console.log('error' + e);
                }
            });
        },
        // 处理歌词相关方法
        times: [],
        lyrics: [],
        index: -1,
        cutLyric: function (data) {
            var array = data.split('\n');
            var $this = this;
            // 一定要情况上一首的信息
            $this.times = [];
            $this.lyrics = [];
            $this.index = -1;
            // console.log(array); 
            var timeReg = /\[(\d{2}\:[0-5][0-9]\.\d{2})\]/;
            // var timeReg = /^\[\d*:\d*\.\d*\]$/;
            $.each(array, function (index, ele) {
                // 处理歌词
                var lyr = ele.split(']');
                // 排除空字符串
                if (lyr[1] != '') {
                    $this.lyrics.push(lyr[1]);
                    // 处理时间
                    var res = timeReg.exec(ele);
                    // 排除res等于空的情况
                    if (res != null) {
                        var timeStr = res[1];
                        var res2 = timeStr.split(':');
                        var min = parseInt(res2[0]) * 60;
                        var sec = parseFloat(res2[1]);
                        var time = parseFloat(Number(min + sec).toFixed(2));
                        $this.times.push(time);
                    };
                };

            })
        },
        currentIndex: function (currentTime) {
            if (currentTime >= this.times[0]) {
                this.index++;
                this.times.shift();
            }
            return this.index;
        }

    }
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window)