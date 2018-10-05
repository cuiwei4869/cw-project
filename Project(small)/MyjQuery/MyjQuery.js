(function (window, undefined) {
    var njQuery = function (selector) {
        return new njQuery.prototype.init(selector);
    };
    njQuery.prototype = {
        constructor: njQuery,
        init: function (selector) {
            // 0.去除字符串两端的空格
            selector = njQuery.trim(selector);
            // console.log(this == njQuery);
            // console.log(this);
            // console.log(njQuery);
            // 1.传入''，null,undefined,NaN,0,false,返回空的jQuery对象
            if (!selector) {
                return this;
            }
            // 传入一个函数
            else if (njQuery.isFunction(selector)) {
                njQuery.ready(selector);
            }
            // 2.传入的是字符串
            else if (njQuery.isString(selector)) {
                // 2.1 判断是否是代码片段
                if (njQuery.isHTML(selector)) {
                    // 1.根据代码片段创建dom元素
                    var temp = document.createElement('div');
                    temp.innerHTML = selector;
                    // // 2.将创建好的一级元素添加到jQuery中
                    // for(var i = 0; i < temp.children.length; i ++) {
                    //     this[i] = temp.children[i];
                    // }
                    // // 3.给jQuery对象添加length属性
                    // this.length = temp.children.length;
                    [].push.apply(this, temp.children);
                    // 4.返回加工好的this(jQuery)
                    // return this;
                }
                // 2.2 判断是否是选择器
                else {
                    // 1.根据传入的选择器找对应的元素
                    var res = document.querySelectorAll(selector);
                    // 2.将找到的元素添加到jQuery上
                    // for (var i = 0; i < res.length; i++) {
                    //     this[i] = res[i];
                    // };
                    // this.length = res.length;
                    [].push.apply(this, res);
                    // 3.返回加工好的this
                    // return this;
                }
            }
            // 3.数组
            else if (njQuery.isArray(selector)) {
                // if (({}).toString.call(selector) == '[object Array]') {
                //     // 3.1真数组
                //     [].push.apply(this, selector);
                //     return this;
                // } else {
                //     // 3.2伪数组
                //     var arr = [].slice.apply(selector);
                //     [].push.apply(this, arr);
                //     return this;
                // }
                var arr = [].slice.apply(selector);
                [].push.apply(this, arr);
                // return this;
            }
            // 4.除上述类型以外
            else {
                this[0] = selector;
                this.length = 1;
                // return this;
            }
            return this;
        },
        jquery: '1.1.0',
        selector: '',
        length: 0,
        // [].push找到数组的push方法
        // 冒号前面的push将来由MyjQuery对象调用
        // 相当于 [].push.apply(this);
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function () {
            return [].slice.apply(this);
        },
        get: function (num) {
            // 没有传递参数
            if (arguments.length == 0) {
                return this.toArray();
            }
            // 传递正数
            else if (num >= 0) {
                return this[num];
            }
            // 传递负数
            else if (num < 0) {
                return this[this.length + num];
            }
        },
        eq: function (num) {
            // if(arguments.length == 0) {
            //     return njQuery();
            // }else{
            //     return njQuery(this.get(num));
            // }
            return njQuery(this.get(num));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        each: function (fn) {
            return njQuery.each(this, fn);
        },
    };
    njQuery.extend = njQuery.prototype.extend = function (obj) {
        // 谁调用extend，就是给谁加方法。类调用就是给类加静态方法，实例调用就是给实例加实例方法
        for (var key in obj) {
            this[key] = obj[key];
        }
    };
    // 工具方法
    njQuery.extend({
        isString: function (str) {
            return typeof (str) === 'string';
        },
        isHTML: function (str) {
            return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3;
        },
        trim: function (str) {
            if (typeof str !== 'string') {
                return str;
            }
            if (str.trim) {
                return str.trim();
            } else {
                return str.replace(/^\s+|\s+$/g, '');
            }
        },
        isObject: function (sele) {
            return typeof sele === 'object';
        },
        isWindow: function (sele) {
            return sele === window;
        },
        isArray: function (sele) {
            if (njQuery.isObject(sele) && !njQuery.isWindow(sele) && 'length' in sele) {
                return true;
            }
            return false;
        },
        isFunction: function (sele) {
            return typeof sele == 'function';
        },
        ready: function (fn) {
            // 判断DOM是否加载完毕
            if (document.readyState == "complete") {
                fn();
            } else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', function () {
                    fn();
                });
            } else {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState == "complete") {
                        fn();
                    };
                });
            };
        },
        each: function (obj, fn) {
            // 1.判断是否是数组
            if (njQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var res = fn.call(obj[i], i, obj[i]);
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }
            } else if (njQuery.isObject(obj)) {
                for (var key in obj) {
                    var res = fn.call(obj[key], key, obj[key]);
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }
            }
            return obj;
        },
        map: function (obj, fn) {
            var res = [];
            if (njQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var temp = fn(obj[i], i);
                    if (temp) {
                        res.push(temp);
                    }
                }
            } else if (njQuery.isObject(obj)) {
                for (var key in obj) {
                    var temp = fn(obj[key], key);
                    if (temp) {
                        res.push(temp);
                    }
                }
            }
            return res;
        },
        getStyle: function (dom, styleName) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(dom)[styleName];
            } else {
                return dom.currentStyle[styleName];
            }
        },
        addEvent: function (dom, name, callBack) {
            if (dom.addEventListener) {
                dom.addEventListener(name, callBack);
            } else {
                dom.attachEvent('on' + name, callBack);
            }
        }
    });
    // 筛选相关方法(DOM)
    njQuery.prototype.extend({
        empty: function () {
            this.each(function (index, ele) {
                ele.innerHTML = '';
            });
            // 方便链式编程
            return this;
        },
        remove: function (sele) {
            if (arguments.length == 0) {
                this.each(function (index, ele) {
                    // 找到遍历元素对应的父元素
                    var parents = ele.parentNode;
                    // 通过父元素删除他自己
                    parents.removeChild(ele);
                });
            } else {
                var $this = this;
                // 1.根据传入的选择器找到对应的元素
                // $(sele).each(function (key, value) {
                //     // 2.遍历找到的元素，获取对应的类型
                //     var type = value.tagName;
                //     var v = value;
                //     console.log(v);
                //     // 3.遍历指定的元素
                //     $this.each(function (key, value1) {
                //         // 4.获取指定元素的类型
                //         var type1 = value1.tagName;
                //         // console.log(type1);
                //         // 5.判断找到元素的类型和指定元素的类型
                //         if (type1 == type) {
                //             // 找到遍历元素对应的父元素
                //             var parents = v.parentNode;
                //             // 通过父元素删除他自己
                //             parents.removeChild(v);
                //         }
                //     })
                // })
                // 上述过程有bug 修改为下
                $(this).each(function (key, value1) {
                    var type1 = value1.tagName;
                    $(sele).each(function (key, value2) {
                        var type2 = value2.tagName;
                        if (type2 == type1) {
                            var parents = value2.parentNode;
                            parents.removeChild(value2);
                        }
                    });
                });
            }
            // 方便链式编程
            return this;
        },
        html: function (content) {
            if (arguments.length == 0) {
                return this[0].innerHTML;
            } else {
                this.each(function (index, value) {
                    value.innerHTML = content;
                })
            }
        },
        text: function (content) {
            if (arguments.length == 0) {
                var str = '';
                this.each(function (index, value) {
                    str += value.innerText;
                });
                return str;
            } else {
                this.each(function (index, value) {
                    value.innerText = content;
                });
            }
        },
        appendTo: function (sele) {
            // 1.统一将传入的数据转换为jQuery对象
            var $sele = $(sele);
            var $this = this;
            var res = [];
            // 2.遍历所有指定的元素
            $sele.each(function (index1, value1) {
                $this.each(function (index2, value2) {
                    if (index1 == 0) {
                        value1.appendChild(value2);
                        res.push(value2);
                    } else {
                        temp = value2.cloneNode(true);
                        value1.appendChild(temp);
                        res.push(temp);
                    }
                });
            });
            // for (var i = 0; i < $sele.length; i++) {
            //     var targetEle = $sele[i];
            //     // 遍历取出所有的元素
            //     for (var j = 0; j < this.length; j++) {
            //         var thisEle = this[j];
            //         // 判断当前是否是第零个指定的元素
            //         if (i === 0) {
            //             // 直接添加
            //             targetEle.appendChild(thisEle);
            //         } else {
            //             var temp = thisEle.cloneNode(true);
            //             targetEle.appendChild(temp);
            //         }
            //     }
            // }
            return $(res);
        },
        prependTo: function (sele) {
            // 1.统一将传入的数据转换为jQuery对象
            var $sele = $(sele);
            var $this = this;
            var res = [];
            // 2.遍历所有指定的元素
            $sele.each(function (index1, value1) {
                $this.each(function (index2, value2) {
                    if (index1 == 0) {
                        value1.insertBefore(value2, value1.firstChild);
                        res.push(value2);
                    } else {
                        temp = value2.cloneNode(true);
                        value1.insertBefore(temp, value1.firstChild);
                        res.push(temp);
                    }
                });
            });
            return $(res);
        },
        append: function (sele) {
            // 判断传入的是不是字符串
            var $this = this;
            if (njQuery.isString(sele)) {
                $this.each(function () {
                    this.innerHTML += sele;
                })
            } else {
                $(sele).appendTo(this);
            }
            return this;
        },
        prepend: function (sele) {
            // 判断传入的是不是字符串
            var $this = this;
            if (njQuery.isString(sele)) {
                $this.each(function (index, value) {
                    this.innerHTML = sele + this.innerHTML;
                });
            } else {
                $(sele).prependTo($this);
            }
            return $this;
        },
        insertBefore: function (sele) {
            // 1.统一将传入的数据转换为jQuery对象
            var $sele = $(sele);
            var $this = this;
            var res = [];
            // 2.遍历所有指定的元素
            $sele.each(function (index1, value1) {
                var parent = value1.parentNode;
                $this.each(function (index2, value2) {
                    if (index1 == 0) {
                        parent.insertBefore(value2, value1);
                        res.push(value2);
                    } else {
                        temp = value2.cloneNode(true);
                        parent.insertBefore(temp, value1);
                        res.push(temp);
                    }
                });
            });
            return $(res);
        },
        // 和insertBefore不同在于 只是调换了参数的位置而已
        before: function (sele) {
            $(sele).insertBefore($(this));
        },
        insertAfter: function (sele) {
            // 1.统一将传入的数据转换为jQuery对象
            var $sele = $(sele);
            var $this = this;
            var res = [];
            // 2.遍历所有指定的元素
            $sele.each(function (index1, value1) {
                var next = value1.nextElementSibling;
                $this.each(function (index2, value2) {
                    if (index1 == 0) {
                        $(value2).insertBefore($(next));
                        res.push(value2);
                    } else {
                        temp = value2.cloneNode(true);
                        $(temp).insertBefore($(next));
                        res.push(temp);
                    }
                });
            });
            return $(res);
        },
        // 和insertAfter不同在于 只是调换了参数的位置而已
        after: function (sele) {
            $(sele).insertAfter($(this));
        },
        replaceAll: function (sele) {
            // 遍历每一个被插入的对象
            var $this = this;
            // 将要插入的元素插入到后者的前面
            $($this).insertBefore($(sele));
            // 删除被插入的对象 完成替换
            $(sele).remove();

        },
        replaceWith: function (sele) {
            // 将sele插入this的前面
            $(sele).insertBefore(this);
            // 删除this
            $(this).remove();
        },
        next: function (expr, arr) {
            // 判断有没有参数进来
            var $this = this;
            var arr;
            if (arr) {
                arr = arr;
            } else {
                arr = [];
            }
            if (arguments.length == 0) {
                $this.each(function () {
                    // 如果没有参数 直接调用nextSiblings
                    console.log(this.nextElementSibling);
                    arr.push(this.nextElementSibling);
                });
            } else {
                // 如果有参数 把每一个相邻元素和参数对应的元素比较 一样就直接返回 乜有返回null
                $this.each(function () {
                    // 遍历每一个this 取得每一个this的nextSiblings
                    var flage = -1;
                    var nes = this.nextElementSibling;
                    // 遍历每一个expr 比较是否和找到的nextSiblings一样
                    $(expr).each(function () {
                        if (nes == this) {
                            arr.push(nes);
                            flage = 1;
                            return false;
                        }
                    });
                    if (flage == -1) {
                        if (nes == null) {
                            return true;
                        }
                        $this.next.call($(nes), expr, arr);
                    }

                });
            }
            return $(arr);
        },
        prev: function (expr, arr) {
            var $this = this;
            var arr;
            if (arr) {
                arr = arr;
            } else {
                arr = [];
            }
            if (arguments.length == 0) {
                $this.each(function () {
                    console.log(this.previousElementSibling);
                    arr.push(this.previousElementSibling);
                });
            } else {
                $this.each(function () {
                    var flage = -1;
                    var nes = this.previousElementSibling;
                    $(expr).each(function () {
                        if (nes == this) {
                            arr.push(nes);
                            flage = 1;
                            return false;
                        }
                    });
                    if (flage == -1) {
                        if (nes == null) {
                            return true;
                        }
                        $this.next.call($(nes), expr, arr);
                    }

                });
            }
            return $(arr);
        },
        clone: function (deep) {
            var res = [];
            // 判断是否是深复制
            if (deep) {
                // 深复制
                this.each(function (index, ele) {
                    var temp = ele.cloneNode(true);
                    // 遍历元素中的eventCache对象
                    $.each(ele.eventCache, function (name, array) {
                        // 遍历事件对应的数组
                        $.each(array, function (index, method) {
                            // 给复制的元素添加事件
                            $.addEvent(temp, name, method);
                        });
                    });
                    res.push(temp);
                });
            } else {
                // 浅复制
                // 遍历每一个this 并且复制它
                this.each(function (index, ele) {
                    var temp = ele.cloneNode(true);
                    res.push(temp);
                });
            }
            return $(res);
        }
    });
    // 操作属性相关的方法
    njQuery.prototype.extend({
        attr: function (attr, value) {
            var $this = this;
            // 1.判断是否是字符串
            if (njQuery.isString(attr)) {
                // 1.1是字符串 判断是一个还是两个参数
                if (arguments.length == 1) {
                    // 1.2是一个参数 直接返回第零个元素的对应的属性
                    return $this[0].getAttribute(attr);
                } else {
                    // 1.3是两个参数 遍历所有的this 给相应的属性赋予相应的value
                    $this.each(function () {
                        this.setAttribute(attr, value);
                    });
                }
                // 2.判断是否是对象
            } else if (njQuery.isObject(attr)) {
                // 2.1是对象 遍历每一个this同时在每一个this遍历这个对象，得到每一个key和value，给每一个this的属性赋予相应的值
                $this.each(function (key1, value1) {
                    $.each(attr, function (key2, value2) {
                        value1.setAttribute(key2, value2);
                    });
                });
            };
            return this;
        },
        prop: function (attr, value) {
            var $this = this;
            // 1.判断是否是字符串
            if (njQuery.isString(attr)) {
                // 1.1是字符串 判断是一个还是两个参数
                if (arguments.length == 1) {
                    // 1.2是一个参数 直接返回第零个元素的对应的属性
                    return $this[0][attr];
                } else {
                    // 1.3是两个参数 遍历所有的this 给相应的属性赋予相应的value
                    $this.each(function () {
                        this[attr] = value;
                    });
                }
                // 2.判断是否是对象
            } else if (njQuery.isObject(attr)) {
                // 2.1是对象 遍历每一个this同时在每一个this遍历这个对象，得到每一个key和value，给每一个this的属性赋予相应的值
                $this.each(function (key1, value1) {
                    $.each(attr, function (key2, value2) {
                        value1[key2] = value2;
                    });
                });
            };
            return this;
        },
        css: function (attr, value) {
            var $this = this;
            // 1.判断是否是字符串
            if (njQuery.isString(attr)) {
                // 1.1是字符串 判断是一个还是两个参数
                if (arguments.length == 1) {
                    // 1.2是一个参数 直接返回第零个元素的对应的属性
                    return njQuery.getStyle(this[0], attr);
                } else {
                    // 1.3是两个参数 遍历所有的this 给相应的属性赋予相应的value
                    $this.each(function () {
                        this.style[attr] = value;
                    });
                }
                // 2.判断是否是对象
            } else if (njQuery.isObject(attr)) {
                // 2.1是对象 遍历每一个this同时在每一个this遍历这个对象，得到每一个key和value，给每一个this的属性赋予相应的值
                $this.each(function (key1, value1) {
                    $.each(attr, function (key2, value2) {
                        value1.style[key2] = value2;
                    });
                });
            };
            return this;
        },
        val: function (content) {
            if (arguments.length === 0) {
                return this[0].value;
            } else {
                this.each(function (index, ele) {
                    ele.value = content;
                });
                return this;
            }
        },
        hasClass: function (name) {
            var flage = false;
            if (arguments.length == 0) { } else {
                this.each(function (index, ele) {
                    // 1.获取元素中class的值 并且给前后加上空格 方便之后进行判断
                    var className = ' ' + ele.className + ' ';
                    // 2.给指定的字符串前后也加上空格
                    name = ' ' + name + ' ';
                    // 3.通过indexOf判断是否包含某个字符串
                    if (className.indexOf(name) != -1) {
                        flage = true;
                        return false;
                    }
                });
            }
            return flage;
        },
        addClass: function (name) {
            // 1.判断有没有传参
            if (arguments.length == 0) {
                // 2.没有传参直接返回this
                return this;
            } else {
                // 3.有传参 直接将参数字符串按照空格切割
                var className = name.split(' ');
                // 4.遍历每一个this 判断每一个this是否包含className
                this.each(function (key, ele) {
                    $.each(className, function (index, value) {
                        if (!$(ele).hasClass(value)) {
                            ele.className = ele.className + ' ' + value;
                        }
                    });
                });
                return this;
            }
        },
        removeClass: function (name) {
            var $this = this;
            // 1.判断有没有传参
            if (arguments.length == 0) {
                // 2.没有传参的话 删除所有的类名
                $this.each(function () {
                    this.className = '';
                });
                return $this;
            } else {
                // 3.有传参的话 删除对应的类名
                var className = name.split(' ');
                console.log(className);
                // 4.遍历每一个this 判断每一个this是否包含className
                $this.each(function (key, ele) {
                    $.each(className, function (index, value) {
                        if ($(ele).hasClass(value)) {
                            // 利用正则表达式替换多个 不然一次只能替换一个
                            var reg = new RegExp(' ' + value, 'gim');
                            ele.className = ((' ' + ele.className + ' ').replace(reg, '')).trim();
                        }
                    });
                });
                return $this;
            }
        },
        toggleClass: function (name) {
            var $this = this;
            if (arguments.length == 0) {
                $this.each(function () {
                    this.className = '';
                });
                return $this;
            } else {
                var className = name.split(' ');
                console.log(className);
                $this.each(function (key, ele) {
                    $.each(className, function (index, value) {
                        if ($(ele).hasClass(value)) {
                            // 删除
                            $(ele).removeClass(value);
                        } else {
                            // 添加
                            $(ele).addClass(value);
                        }
                    });
                });
                return $this;
            }
        }
    });
    // 事件操作相关的方法
    njQuery.prototype.extend({
        on: function (name, callBack) {
            // 1.遍历取出所有的元素
            this.each(function (key, ele) {
                // 2.判断当前元素中是否保存有保存所有事件的对象
                if (!ele.eventCache) {
                    ele.eventCache = {};
                };
                // 3.判断当前对象中有没有对应类型的数组
                if (!ele.eventCache[name]) {
                    ele.eventCache[name] = [];
                    // 4.将回调函数添加到数组中
                    ele.eventCache[name].push(callBack);
                    // 5.添加对应的事件
                    njQuery.addEvent(ele, name, function () {
                        njQuery.each(ele.eventCache[name], function (key, value) {
                            value();
                        })
                    })
                } else {
                    // 6.将回调函数添加到数组中
                    ele.eventCache[name].push(callBack);
                }
            });
        },
        off: function (eventName, fn) {
            // 0.判断是否没有传参
            if (arguments.length == 0) {
                // 0.1没有传参的话 清空每一个对象的eventCache对象
                this.each(function (index, value) {
                    value.eventCache = {};
                });
                // 1.判断传入是否是一个参数
            } else if (arguments.length == 1) {
                // 1.1传入的是一个参数的话，清空每一个元素上eventCache对象的对应的eventName数组
                this.each(function (index, value) {
                    value.eventCache[eventName] = [];
                });
                // 2.判断传入是否是两个参数
            } else if (arguments.length == 2) {
                // 2.1传入的是两个参数的话，删除对应的事件的对应的事件函数
                this.each(function (index1, value1) {
                    $.each(value1.eventCache[eventName], function (index2, value2) {
                        if (value2 == fn) {
                            value1.eventCache[eventName].splice(index2, 1);
                        };
                    });
                });
            }
            // 3.最后返回this 方便链式编程
            return this;
        }
    });
    njQuery.prototype.init.prototype = njQuery.prototype;
    window.njQuery = window.$ = njQuery;
})(window);