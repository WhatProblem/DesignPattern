/* 
var o = {}
Object.defineProperty(o, 'a', {
    value: 37,
    writable: true, // false不可更改赋值
    enumerable: true, // false不可用于for...in，Object.keys()
    configurable: true // false: 不可删除
})
// delete o.a
// console.log(o.a)
// for (let key in o) {
// console.log(key)
// }
// console.log(Object.keys(o))
o.a = 123
console.log(o)
 */

var bValue, o = { b: 1 }
Object.defineProperty(o, 'a', {
    get: function () {
        console.log(this)
        console.log('开始读取')
        return bValue
    },
    set: function (newValue) {
        console.log('开始赋值')
        bValue = newValue
    }
})
o.a = 123
console.log(o.a)