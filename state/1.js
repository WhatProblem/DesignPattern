/* 状态模式：区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变;
通常，我们都是封装对象的行为，而不是对象的状态，而状态模式就是封装对象的状态；
状态模式的关键是把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部 */

/* 
// 案例1：电灯程序
var Light = function () {
    this.state = 'off' // 给点等设置初始状态off
    this.button = null // 电源开关按钮
}
// 初始创建一个button
Light.prototype.init = function () {
    var button = document.createElement('button'), self = this
    button.innerHTML = '开关'
    this.button = document.body.appendChild(button)
    this.button.onclick = function () {
        self.buttonWasPressed()
    }
}
// // 常规电灯
// Light.prototype.buttonWasPressed = function() {
// if (this.state === 'off') {
// console.log('开灯')
// this.state = 'on'
// } else if (this.state === 'on') {
// console.log('关灯')
// this.state = 'off'
// }
// }
// 多规格点击点灯
Light.prototype.buttonWasPressed = function () {
    if (this.state === 'off') {
        console.log('弱光')
        this.state = 'weakLight'
    } else if (this.state === 'weakLight') {
        console.log('强光')
        this.state = 'strongLight'
    } else if (this.state === 'strongLight') {
        console.log('关灯')
        this.state = 'off'
    }
}
var light = new Light()
light.init()
 */



// 案例2：状态模式优化案例1
// 每种状态封装成单独的类，与状态有关的行为封装在对应的类中
var OffLightState = function (light) {
    this.light = light
}
OffLightState.prototype.buttonWasPressed = function () {
    console.log('弱光') // 与OffLightState有关的行为
    this.light.setState(this.light.weakLightState) // 切到弱光状态
}
var WeakLightState = function (light) {
    this.light = light
}
WeakLightState.prototype.buttonWasPressed = function () {
    console.log('强光')
    this.light.setState(this.light.strongLightState)
}
var StrongLightState = function (light) {
    this.light = light
}
StrongLightState.prototype.buttonWasPressed = function () {
    console.log('关灯')
    this.light.setState(this.light.offLightState)
}
// 设置立体化的状态对象，方便一眼看到有几种状态
var Light = function () {
    this.offLightState = new OffLightState(this)
    this.weakLightState = new WeakLightState(this)
    this.strongLightState = new StrongLightState(this)
    // this.currState = null
    this.button = null
}
// button按下，self.currState.buttonWasPressed()将请求委托给当前持有的状态对象去执行
Light.prototype.init = function () {
    var button = document.createElement('button'), self = this
    this.button = document.body.appendChild(button)
    this.button.innerHTML = '开关'
    this.currState = this.offLightState // 设置当前状态
    this.button.onclick = function () {
        self.currState.buttonWasPressed()
    }
}
Light.prototype.setState = function (newState) {
    this.currState = newState
}
var light = new Light()
light.init()