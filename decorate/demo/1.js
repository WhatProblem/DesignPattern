// 装饰者模式：在不改变原对象的基础上，通过对其进行包装拓展（添加属性或方法）
// 使原有对象可以满足用户更复杂的需求


// demo1：通过装饰者添加新方法新属性
var decor = document.getElementById('decorator2')
decor.onclick = decor1
var decorator = function (decor, fn) {
    if (typeof decor.onclick === 'function') {
        var oldClick = decor.onclick
        decor.onclick = function () {
            oldClick()
            fn()
        }
    } else {
        decor.onclick = fn
    }
}
decorator(decor, decor2)
function decor1() {
    console.log('常规函数')
}
function decor2() {
    console.log('不修改原函数基础上，通过装饰器添加新属性方法')
}
var decor3 = document.getElementById('decorator3')
decorator(decor3, function () {
    console.log('通过装饰器为函数添加新方法')
})



// demo2: 使用装饰者对input添加focus与blur事件
var input = document.getElementById('input')
var decoInput = function (input, fn1, fn2) {
    if (typeof input.oninput === 'function' || typeof input.onblur === 'function') {
        var oldFn = input.oninput || fn1
        var oldFn = input.onblur || fn2
    } else {
        input.oninput = fn1
        input.onblur = fn2
    }
}
decoInput(input, function () {
    console.log('输入框添加input方法')
}, function () {
    console.log('输入框添加blur方法')
})