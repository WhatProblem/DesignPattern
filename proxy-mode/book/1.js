// 常规代码,默认A为目标
/* 
var Flower = function () { }
var xiaoming = {
    sendFlower(target) {
        var flower = new Flower()
        target.receiverFlower(flower)
    }
}
var A = {
    receiverFlower(flower) {
        console.log('A收到目标：', flower)
    }
}
xiaoming.sendFlower(A)
 */


/* 
// 使用B作为A的代理
var Flower = function () { }
var xiaoming = {
    sendFlower(target) {
        var flower = new Flower()
        target.receiverFlower(flower)
    }
}
var A = {
    receiverFlower(flower) {
        console.log('A目标收到', flower)
    }
}
// B代理产生
var B = {
    receiverFlower(flower) {
        A.receiverFlower(flower)
    }
}
xiaoming.sendFlower(B)
 */



/* 
// B代理控制A执行时机
var Flower = function () { }
var xiaoming = {
    sendFlower(target) {
        var flower = new Flower()
        target.receiverFlower(flower)
    }
}
var B = {
    receiverFlower(flower) {
        A.listenGoodMood(() => {
            A.receiverFlower(flower)
        })
    }
}
var A = {
    receiverFlower(flower) {
        console.log('A目标收到', flower)
    },
    listenGoodMood(fn) {
        setTimeout(() => {
            fn()
        }, 5000)
    }
}
xiaoming.sendFlower(B)
 */


/* 
//  保护代理和虚拟代理--在需要new操作的时候执行new，节省内存开销
var Flower = function () { }
var xiaoming = {
    sendFlower(target) {
        target.receiverFlower()
    }
}
var B = {
    receiverFlower() {
        A.listenGoodMood(() => {
            var flower = new Flower()
            A.receiverFlower(flower)
        })
    }
}

var A = {
    receiverFlower(flower) {
        console.log('A目标收到', flower)
    },
    listenGoodMood(fn) {
        setTimeout(() => {
            fn()
        }, 3000)
    }
}
xiaoming.sendFlower(B)
 */



/* 
//  虚拟代理实现图片预加载--详情见index.html中script/1.js
var myImage = (function () { // img Node节点创建
    var imgNode = document.createElement('img')
    document.body.appendChild(imgNode)
    return {
        setSrc(src) {
            imgNode.src = src
        }
    }
})()
var proxyImage = (function () {
    var img = new Image
    img.onload = function () {
        myImage.setSrc(this.src)
    }
    return {
        setSrc(src) {
            myImage.setSrc('./react.gif')
            setTimeout(() => {
                img.src = src
            }, 5000)
        }
    }
})()
proxyImage.setSrc('./react.jpg')
 */



/* 
// 虚拟代理，合并http请求详--情见index.html中script/1.js
var synchronousFile = function (id) {
    console.log('开始同步文件,id为：', id)
}
var proxySynchronousFile = (function () {
    var cache = [], timer
    return function (id) {
        cache.push(id)
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            synchronousFile(cache.join(','))
            clearTimeout(timer)
            timer = null
            cache.length = 0
        }, 2000);
    }
})()
var checkBox = document.getElementsByTagName('input')
for (var i = 0; i < checkBox.length; i++) {
    checkBox[i].onclick = function () {
        if (this.checked === true) {
            proxySynchronousFile(this.id)
        }
    }
}
 */



/* 
// 缓存代理
// 缓存代理可以为一些开销大的运算结果提供暂时的存储，
// 在下次运算时，如果传递进来的参数跟之前一致，
// 则可以直接返回前面存储的运算结果
var mult = function () {
    console.log('开始执行就算')
    var a = 1
    for (var i = 0; i < arguments.length; i++) {
        a = a * arguments[i]
    }
    return a
}
mult(2, 3)
// 缓存代理函数
var proxyMult = (function () {
    var cache = []
    return function () {
        var args = Array.prototype.join.call(arguments, ',')
        if (args in cache) {
            console.log(cache)
            console.log('是否执行')
            return cache[args]
        }
        return cache[args] = mult.apply(this, arguments)
    }
})()
proxyMult(1,2,3,4)
proxyMult(1,2,3,4)
 */




/* 
//  高阶函数动态创建代理
// 这些计算方法被当作参数传入一个专门用于创建缓存代理的工厂中， 
// 这样一来，我们就可以为乘法、加法、减法等创建缓存代理
// 计算乘积
var mult = function () {
    var a = 1
    for (var i = 0; i < arguments.length; i++) {
        a *= arguments[i]
    }
    return a
}
//计算求和 
var plus = function () {
    var a = 0
    for (var i = 0; i < arguments.length; i++) {
        a += arguments[i]
    }
    return a
}
// 创建缓存代理的工厂
var createProxyFactory = function (fn) {
    var cache = []
    return function () {
        var args = Array.prototype.join.call(arguments, ',')
        console.log(cache)
        if (args in cache) {
            console.log('执行次数')
            return cache[args]
        }
        return cache[args] = fn.apply(this, arguments)
    }
}
var proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus)
proxyMult(1, 2, 3, 4)
proxyMult(1, 2, 3, 4)
proxyPlus(1, 2, 3, 4)
proxyPlus(1, 2, 3, 4)
 */