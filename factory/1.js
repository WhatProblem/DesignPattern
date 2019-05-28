/* 通过简单工厂来创建一些对象
可以让这些对象共用一些资源而又私有一些资源
简单工厂模式：使用场合通常限制在创建单一对象
*/

/* 
// 案例1：相同属性或方法--简单工厂模式
function createBook(name, time, type) {
var o = new Object()
o.name = name
o.time = time
o.type = type
o.getName = function () {
console.log(this.name)
}
return o
}
var book1 = createBook('js book', 2014, 'js')
var book2 = createBook('css book', 2013, 'css')
book1.getName()
book2.getName()
*/


// 案例2：带有私有属性和方法
function createPop(type, text) {
    var o = new Object()
    o.content = text
    o.show = function () {
        console.log(text)
    }
    if (type === 'alert') {
        o.showAlert = function () {
            console.log('alert', text)
        }
    }
    if (type === 'prompt') {
        o.showPrompt = function () {
            console.log('prompt', text)
        }
    }
    if (type === 'confirm') {
        o.showConfirm = function () {
            console.log('confirm', text)
        }
    }
    return o
}
var userNameAlert = createPop('alert', '用户名只能是26个字母和数字')
userNameAlert.showAlert()
