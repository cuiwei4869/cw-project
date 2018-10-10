(function (window) {

    function Progress(progressBar, progressLine, progessDot) {
        return new Progress.prototype.init(progressBar, progressLine, progessDot);
    }

    Progress.prototype = {

        constructor: Progress,
        init: function (progressBar, progressLine, progressDot) {
            this.progressBar = progressBar;
            this.progressLine = progressLine;
            this.progressDot = progressDot;
        },
        isMove: false,
        progressClick: function (callback) {
            var $this = this;
            // 监听bar的点击
            this.progressBar.click(function (e) {
                // 获取bar距离窗口的默认距离
                var normalLeft = $(this).offset().left;
                // 获取点击位置距离窗口的距离
                var eLeft = e.pageX;
                // 设置line的长度
                $this.progressLine.css('width', eLeft - normalLeft);
                $this.progressDot.css('left', eLeft - normalLeft);
                var percent = (eLeft - normalLeft) / $this.progressBar.width();
                callback(percent);
            });
        },
        progressMove: function (callback) {
            var $this = this;
            // 1.监听鼠标按下
            $this.progressBar.mousedown(function () {
                $this.isMove = true;
                // 获取bar距离窗口的默认距离
                var normalLeft = $(this).offset().left;
                $(document).mousemove(function (e) {
                    // 2.监听鼠标拖拽
                    // 获取点击位置距离窗口的距离
                    var left = e.pageX - normalLeft;
                    // 设置line的长度
                    if (left > -5 && left < $this.progressBar.width()) {
                        $this.progressLine.css('width', left);
                        $this.progressDot.css('left', left);
                    }
                    $this.percent1 = left / $this.progressBar.width();
                })
                // 3.监听鼠标抬起
                $(document).mouseup(function () {
                    $(document).off('mousemove');
                    callback($this.percent1);
                    $this.isMove = false;

                })

            })
        },

        setProgress: function (value) {
            if(this.isMove) return;
            if (value < 0 || value > 100) return;
            this.progressLine.css('width', value + '%');
            this.progressDot.css('left', value + '%');
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window)