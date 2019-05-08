/* 装饰者模式: 这种给对象动态增加职责的方式，并没有真正地改动对象自身，而是将对象放入另一个对象
之中，这些对象以一条链的方式进行引用，形成一个聚合对象。这些对象都拥有相同的接口（fire
方法），当请求达到链中的某个对象时，这个对象会执行自身的操作，随后把请求转发给链中的
下一个对象。 
在执行目标函数之前先对传入的参数函数进行加工执行
var plane = new Plane()
plane = new MissileDecorate(plane)
plane = new AtomDecorate(plane)
*/

/* 
// 案例1:
var Plane = function () { }
Plane.prototype.fire = function () {
    console.log('发射普通子弹')
}
// 增加两个装饰类
var MissileDecorate = function (plane) {
    this.plane = plane
}
MissileDecorate.prototype.fire = function () {
    this.plane.fire()
    console.log('发射导弹')
}
var AtomDecorate = function (plane) {
    this.plane = plane
}
AtomDecorate.prototype.fire = function () {
    this.plane.fire()
    console.log('发射原子弹')
}
var plane = new Plane()
plane = new MissileDecorate(plane)
plane = new AtomDecorate(plane)
plane.fire()
 */



/* 
// 案例2: JavaScript的装饰者模式
var plane = {
    fire: function () {
        console.log('发射普通子弹')
    }
}
var missileDecorate = function () {
    console.log('发射导弹')
}
var atomDecorate = function () {
    console.log('发射原子弹')
}
var fire1 = plane.fire
plane.fire = function () {
    fire1()
    missileDecorate()
}
var fire2 = plane.fire
plane.fire = function () {
    fire2()
    atomDecorate()
}
plane.fire()
 */



/* 
// 案例3： AOP装饰函数
// 常规方式：
var showLogin = function () {
    console.log('打开登录浮层')
    log(this.getAttribute('tag'))
}
var log = function (tag) {
    console.log('上报标签为：' + tag)
    // (new Image).src='http://xxx.com/report?tag='+tag // 代码上传
}
document.getElementById('button').onclick = showLogin
 */



/* 
// 案例4：AOP方式优化
Function.prototype.after = function (afterfn) {
    var self = this
    return function () {
        var ret = self.apply(this, arguments)
        afterfn.apply(this, arguments)
        return ret
    }
}
var showLogin = function () {
    console.log('打开登录浮层')
}
var log = function () {
    console.log('上报标签：' + this.getAttribute('tag'))
}
showLogin = showLogin.after(log) // 打开登录后上报数据
document.getElementById('button').onclick = showLogin
 */





// 案例5：装饰者模式实现表单验证提交
Function.prototype.before = function (beforefn) {
    var self = this
    return function () {
        if (beforefn.apply(this, arguments) === false) {
            // beforefn 返回false直接return，不执行后面
            return
        }
        return self.apply(this.arguments)
    }
}
var validata = function () {
    if (username.value === '') {
        alert('用户名不能为空')
        return false
    }
    if (password.value === '') {
        alert('密码不能为空')
        return false
    }
}

var formSubmit = function () {
    var param = {
        username: username.value,
        password: password.value
    }
    ajax('http://xxx.com/login', param)
}
formSubmit = formSubmit.before(validata)
submitBtn.onclick = function () {
    formSubmit()
}