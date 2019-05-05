/* 设计模式--发布订阅模式 */

/* 
var salesOffices = {} // 发布者
salesOffices.clientList = [] // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function (fn) { // 增加订阅者
    this.clientList.push(fn) // 订阅信息添加进缓存列表
}

salesOffices.trigger = function () { // 发布消息
    for (var i = 0; i < this.clientList.length; i++) {
        var fn = this.clientList[i]
        fn.apply(this, arguments)
    }
}

salesOffices.listen(function (price, squareMeter) {
    console.log('订阅者一：')
    console.log('价格：' + price)
    console.log('面积：' + squareMeter)
})
salesOffices.listen(function (price, squareMeter) {
    console.log('订阅者二：')
    console.log('价格：' + price)
    console.log('面积：' + squareMeter)
})

salesOffices.trigger(2000000, 88)
salesOffices.trigger(3000000, 120)
 */


/* 
// 指定订阅信息的发布订阅模式、类似DOM事件
var salesOffices = {}
salesOffices.clientList = {}
salesOffices.listen = function (key, fn) {
    if (!this.clientList[key]) {
        this.clientList[key] = []
    }
    this.clientList[key].push(fn)
}
salesOffices.trigger = function () { // 发布消息
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key] // 取出消息对应的回调函数集合
    if (!fns || fns.length === 0) { // 没有订阅消息，返回
        return false
    }
    for (var i = 0; i < fns.length; i++) {
        var fn = fns[i]
        fn.apply(this, arguments)
    }
}

salesOffices.listen('squareMeter88', function (price) {
    console.log('价格：' + price)
})
salesOffices.listen('squareMeter120', function (price) {
    console.log('价格：' + price)
})
salesOffices.trigger('squareMeter88', 88)
salesOffices.trigger('squareMeter120', 120)
 */



/* 
// 发布订阅模式--通用实现
// 提取发布订阅功能
var event = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key]
        if (!fns || fns.length === 0) {
            return false
        }
        for (var i = 0; i < fns.length; i++) {
            var fn = fns[i]
            fn.apply(this, arguments)
        }
    }
}
// installEvent函数为所有对象安装发布-订阅功能
var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i]
    }
}
var salesOffices = {}
installEvent(salesOffices)
salesOffices.listen('squareMeter88', function (price) {
    console.log('价格：' + price)
})
salesOffices.listen('squareMeter120', function (price) {
    console.log('价格：' + price)
})
salesOffices.trigger('squareMeter88', 2000000)
salesOffices.trigger('squareMeter120', 3000000)
 */



/* 
// 取消订阅事件
var event = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key]
        if (!fns || fns.length === 0) {
            return false
        }
        for (var i = 0; i < fns.length; i++) {
            var fn = fns[i]
            fn.apply(this, arguments)
        }
    },
    remove: function (key, fn) {
        var fns = this.clientList[key]
        if (!fns) { // 如果key对应的消息没有被人订阅，则直接返回
            return false
        }
        if (!fn) { // 如果没有传入具体的回调函数，标识取消key对应的所有订阅
            fns && (fns.length = 0)
        } else {
            for (var i = fns.length - 1; i >= 0; i--) {
                var _fn = fns[i]
                if (_fn === fn) {
                    fns.splice(i, 1)
                }
            }
        }
    }
}
// installEvent函数为所有对象安装发布-订阅功能
var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i]
    }
}
var salesOffices = {}
installEvent(salesOffices)
salesOffices.listen('squareMeter88', fn1 = function (price) { // 小明订阅消息
    console.log('价格= ' + price)
})
salesOffices.listen('squareMeter88', fn2 = function (price) { // 小红订阅消息
    console.log('价格= ' + price)
})
salesOffices.remove('squareMeter88', fn1) // 删除小明的订阅
salesOffices.trigger('squareMeter88', 2000000) // 输出：2000000
 */



// 全局发布订阅对象
var Event = (function () {
    var clientList = {},
        listen, trigger, remove
    listen = function (key, fn) {
        if (!clientList[key]) {
            clientList[key] = []
        }
        clientList[key].push(fn)
    }
    trigger = function () {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key]
        if (!fns || fns.length === 0) {
            return false
        }
        for (var i = 0; i < fns.length; i++) {
            var fn = fns[i]
            fn.apply(this, arguments)
        }
    }
    remove = function (key, fn) {
        var fns = clientList[key]
        if (!fns) {
            return false
        }
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            for (var i = fns.length - 1; i >= 0; i--) {
                var _fn = fns[i]
                if (_fn === fn) {
                    fns.splice(i, 1)
                }
            }
        }
    }
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})()
Event.listen('squareMeter88', function (price) {
    console.log('价格=' + price)
})
Event.trigger('squareMeter88', 2000000)