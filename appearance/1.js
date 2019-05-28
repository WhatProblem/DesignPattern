/* 外观模式：为一组复杂的子系统接口提供一个更高级的统一接口
通过这个接口使得子系统接口的访问更容易
*/

/* 
// 案例1：点击事件的外观模式实现
function addEvent(dom, type, fn) {
if (dom.addEventListener) {
dom.addEventListener(type, fn, false)
} else if (dom.attachEvent) {
dom.attachEvent('on' + type, fn)
} else {
dom['on' + type] = fn
}
}

var myBtn = document.querySelector('#myBtn')
addEvent(myBtn, 'click', function () {
console.log('绑定第一个事件')
})
var myBtn = document.querySelector('#myBtn')
addEvent(myBtn, 'click', function () {
console.log('绑定第二个事件')
})
var myBtn = document.querySelector('#myBtn')
addEvent(myBtn, 'click', function () {
console.log('绑定第三个事件')
})
*/



// 案例2：兼容低版本IE的e.preventDefault和e.target
var getEvent = function (event) {
    return event || window.event
}
var getTarget = function (event) {
    var event = getEvent(event)
    return event.target || event.srcElement
}
var preventDefault = function (event) {
    var event = getEvent(event)
    if (event.preventDefault) {
        event.preventDefault()
    } else {
        event.returnValue = false
    }
}