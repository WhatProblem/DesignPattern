/* 
// demo1
var Single = function (name) {
    this.name = name
    this.instance = null
}
Single.prototype.getName = function () {
    console.log(this.name)
}
Single.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Single(name)
    }
    return this.instance
}
var a = Single.getInstance('name1')
var b = Single.getInstance('name2')
console.log(a === b) // true
 */


/* 
//  demo2: 实现无法修改的静态变量
// 实现私有变量保护，无法修改
var Conf = function () {
    var conf = {
        MAX_NUM: 100,
        MIN_NUM: 1,
        COUNT: 1000
    }
    return {
        get: function (name) {
            return conf[name] ? conf[name] : null
        }
    }
}()
var res = Conf
console.log(res.get('MAX_NUM')) // 100
console.log(res.get('MAX_NUM123')) // null
 */



//  demo3: 惰性单例--延迟创建,使用时创建
var LazySingle = function() {
    var _instance = null
    function Single() {
        return {
            publicMethod: function() {},
            publicProperty: '1.0'
        }
    }
    return function() {
        if (!_instance) {
            _instance = Single()
        }
        return _instance
    }
}()
console.log(LazySingle().publicProperty) // 1.0
