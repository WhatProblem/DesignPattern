/* 
// 单例模式
var Singleton = function (name) {
    this.name = name
    this.instance = null
}
Singleton.prototype.getName = function () {
    console.log(this.name)
}
Singleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singleton(name)
    }
    return this.instance
}
var a = Singleton.getInstance('name1')
var b = Singleton.getInstance('name2')
console.log(a === b)
 */

/* 
var Singleton = function (name) {
    this.name = name
}
Singleton.prototype.getName = function () {
    console.log(this.name)
}
Singleton.getInstance = (function () {
    console.log(123123)
    var instance = null
    return function (name) {
        console.log(9999999999999)
        if (!instance) {
            instance = new Singleton(name)
        }
        return instance
    }
})()

var a = Singleton.getInstance('name1')
var b = Singleton.getInstance('name2')
console.log(a.name)
 */



/* 
// 在页面中创建唯一div节点
var CreateDiv = (function () {
    var instance
    var CreateDiv = function (html) {
        if (instance) {
            return instance
        }
        this.html = html
        this.init()
        return instance = this
    }
    CreateDiv.prototype.init = function () {
        var div = document.createElement('div')
        div.innerHTML = this.html
        document.body.appendChild(div)
    }
    return CreateDiv
})()
var a = new CreateDiv('name1')
var b = new CreateDiv('name2')
console.log(a === b) // true
 */



/* 
// 代理实现单例模式
var CreateDiv = function (html) {
    this.html = html
    this.init()
}
CreateDiv.prototype.init = function () {
    var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
}
// 引入代理类
var ProxySingleCreateDiv = (function () {
    var instance
    return function (html) {
        if (!instance) {
            instance = new CreateDiv(html)
        }
        return instance
    }
})()
var a = new ProxySingleCreateDiv('name1')
var b = new ProxySingleCreateDiv('name2')
console.log(a === b)
 */



/* 
// 使用命名空间
var namespace1 = {
    a() {
        console.log(1)
    },
    b() {
        console.log(2)
    }
}
 */



/* 
// 动态创建命名空间
var MyApp = {}
MyApp.namespace = function (name) {
    var parts = name.split('.')
    var current = MyApp
    for (var i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {}
        }
        current = current[parts[i]]
    }
}
MyApp.namespace('event')
MyApp.namespace('dom.style')
console.dir(MyApp)
 */



/* 
// 创建一个唯一的div
var getSingle = function (fn) {
    var result
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}
var createLoginLayer = function () {
    var div = document.createElement('div')
    div.innerHTML = '这是元素文本内容'
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
}
var createSingleLoginLayer = getSingle(createLoginLayer)
document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createSingleLoginLayer()
    loginLayer.style.display = 'block'
}
 */
