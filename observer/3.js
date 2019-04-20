class Observer {
    constructor() {
        this.subscribes = [] // 订阅内容
    }

    // 订阅
    subscribe(type, fn) {
        if (!this.subscribes[type]) {
            this.subscribes[type] = []
        }
        typeof fn === 'function' && this.subscribes[type].push(fn)
    }

    // 发布：携带一些信息
    publish() {
        let type = [].shift.call(arguments)
        let fns = this.subscribes[type]
        if (!fns || !fns.length) {
            return
        }
        for (let i = 0; i < fns.length; i++) {
            fns[i].apply(this, arguments)
        }
    }

    // 删除订阅
    remove(type, fn) {
        if (typeof type === 'undefined') {
            this.subscribes = []
            return
        }
        let fns = this.subscribes[type]
        if (!fns || !fns.length) {
            return
        }
        if (typeof fn === 'undefined') {
            fns.length = 0
            return
        }
        for (let i = fns.length - 1; i >= 0; i--) {
            if (fns[i] === fn) {
                fns.splice(i, 1)
            }
        }
    }
}

let observe = new Observer()
function fn(arg) {
    console.log('订阅内容', arg)
}
observe.subscribe('JOB1', fn)
// observe.remove('JOB1')
// observe.remove('JOB1',fn)
// observe.remove()
observe.publish('JOB1', 80) // 订阅内容 80