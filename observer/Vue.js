class Vue {
    constructor(options = {}) {
        // 数据绑定--绑定所有属性到实例上
        this.$el = options.el
        this.methods = options.methods
        let data = this.data = options.data
        Object.keys(data).forEach(key => {
            this.proxyData(key)
        })

        this.watcherTask = {} // 需要监听/订阅的任务列表
        this.subscribe(data) // 初始化订阅内容
        this.observer(data) // 初始化劫持所有data数据
    }

    // 绑定data到vue实例
    proxyData(key) {
        let self = this
        Object.defineProperty(self, key, {
            enumerable: true,
            configurable: false,
            get: function () {
                return self['data'][key]
            },
            set: function (newValue) {
                self['data'][key] = newValue
            }
        })
    }

    // 数据劫持--发现属性值改变立马更新数据
    observer(data) {
        let self = this
        Object.keys(data).forEach(key => {
            let val = data[key]
            Object.defineProperty(data, key, {
                configurable: false,
                enumerable: true,
                get: function () {
                    return val
                },
                set: function (newValue) {
                    val = newValue
                    self.watcherTask[key].forEach(item => {
                        item.update(val)
                    })
                }
            })
        })
    }

    // 订阅内容
    subscribe(subscribes = {}) {
        let subs = subscribes
        let self = this
        Object.keys(subs).forEach(sub => {
            this.watcherTask[sub] = [] // 订阅任务
            self.watcherTask[sub].push(new Watcher(callback))
        })
        // 订阅方法修改的数据
        Object.keys(this.methods).forEach(method => {
            this.methods[method] = this.methods[method].bind(this)
        })
    }
}
function callback(item) {
    console.log(item)
}
class Watcher {
    constructor(callback) {
        this.cb = callback
    }
    update(item) {
        console.log('数据改变，自动执行')
        this.cb(item)
    }
}

let vue = new Vue({
    el: 'document',
    data: {
        form: 1,
        fragment: '<i>斜体<i>',
        obj: {
            test: 123
        }
    },
    methods: {
        changeValue() {
            console.log(this.form)
            this.form++
        }
    }
})
vue.form = 123
vue.obj = { test: 789 }
vue.methods.changeValue()
// console.log(vue.form)