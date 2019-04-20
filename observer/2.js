var observer = {
    subscribes: [],
    // 订阅
    subscribe: function (type, fn) {
        if (!this.subscribes[type]) {
            this.subscribes[type] = []
        }
        typeof fn === 'function' && this.subscribes[type].push(fn)
    },
    // 发布：携带一些信息发布出去
    publish: function () {
        var type = [].shift.call(arguments)
        // console.log(type)
        // console.log(arguments)
        // var type = Array.from(arguments).shift()
        var fns = this.subscribes[type]
        // 不存在的订阅类型，以及订阅时，为传入回调的
        if (!fns || !fns.length) {
            return
        }
        // 挨个处理调用
        for (var i = 0; i < fns.length; i++) {
            fns[i].apply(this, arguments)
        }
    },

    // 删除订阅
    remove: function (type, fn) {
        // debugger
        if (typeof type === 'undefined') {
            this.subscribes = []
            return
        }
        var fns = this.subscribes[type]
        if (!fns || !fns.length) {
            return
        }
        if (typeof fn === 'undefined') {
            fns.length = 0
            return
        }
        for (var j = 0; j < fns.length; j++) {
            if (fns[j] === fn) {
                fns.splice(j, 1)
            }
        }
    }
}

function fn(arg) {
    console.log('订阅内容', arg)
}
observer.subscribe('JOB1', fn)
// observer.remove('JOB1')
// observer.remove('JOB1',fn)
// observer.remove()
observer.publish('JOB1', 80)
