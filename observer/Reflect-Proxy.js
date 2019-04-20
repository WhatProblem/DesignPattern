// 借鉴ES6的Proxy实现观察者模式
// 很直观理解：函数自动观察数据对象，一旦对象有变化，函数就会自动执行

// 将观察数据包装
const observers = new Set()
const observe = fn => observers.add(fn)
const subscribe = obj => new Proxy(obj, {
    set: function (target, key, value, receiver) {
        const res = Reflect.set(target, key, value, receiver)
        observers.forEach(observer => observer())
        return res
    }
})
// 订阅数据
const obj = subscribe({
    name: '张三',
    age: 20
})
// 根据数据变化--自动执行的函数
function auto() {
    console.log(`${obj.name},${obj.age}`)
}
observe(auto)

obj.name = '李四'
// 自动执行auto输出 李四， 20