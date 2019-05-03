// 策略模式：定义一系列的算法，把他们一个个封装起来，并且他们可以相互替换
// 将不变的部分和变化的部分分开，将算法的使用和算法的实现分开
// 策略模式要包括两部分，一：一组策略类，封装具体算法，负责计算过程
// 二：环境类Context,接受客户请求，将请求委托给某一策略类，维持对某个策略对象的引用

/* 
// 案例1：计算奖金
// 缺点：复用性差
var calculateBonus = function (performanceLevel, salary) {
    if (performanceLevel === 'S') {
        return salary * 4
    }
    if (performanceLevel === 'A') {
        return salary * 3
    }
    if (performanceLevel === 'B') {
        return salary * 2
    }
}
calculateBonus( 'B', 20000 ); // 输出：40000
calculateBonus( 'S', 6000 ); // 输出：24000 
 */



/* 
//  案例2：使用组合函数优化
// 缺点：依然很庞大
var performanceS = salary => salary * 4
var performanceA = salary => salary * 3
var performanceB = salary => salary * 2
var calculateBonus = function (performanceLevel, salary) {
    if (performanceLevel === 'S') {
        return performanceS(salary)
    }
    if (performanceLevel === 'A') {
        return performanceA(salary)
    }
    if (performanceLevel === 'B') {
        return performanceB(salary)
    }
}
console.log(calculateBonus('A', 10000)) // 30000
 */


/* 
// 案例3：使用策略模式重构
// 1.封装策略类
var performanceS = function () { }
performanceS.prototype.calculate = function (salary) {
    return salary * 4
}
var performanceA = function () { }
performanceA.prototype.calculate = function (salary) {
    return salary * 3
}
var performanceB = function () { }
performanceB.prototype.calculate = function (salary) {
    return salary * 2
}
// 2.环境类Context接受具体请求
var Bonus = function () {
    this.salary = null      // 原始值--salery
    this.strategy = null    // 等级对应的策略对象
}
Bonus.prototype.setSalary = function (salary) {
    this.salary = salary    // 设置原始值
}
Bonus.prototype.setStrategy = function (strategy) {
    this.strategy = strategy // 设置等级
}
Bonus.prototype.getBonus = function () { // 取得奖金
    // 计算奖金委托给策略对象
    return this.strategy.calculate(this.salary)
}
var bonus = new Bonus()
bonus.setSalary(10000) // 设置原始值
bonus.setStrategy(new performanceS()) // 设置策略对象
console.log(bonus.getBonus())
 */


/* 
//  面向对象版本的策略模式
var strategies = {
    S: salary => salary * 4,
    A: salary => salary * 3,
    B: salary => salary * 2
}
var calculateBonus = (level, salary) => strategies[level](salary)
console.log(calculateBonus('S', 20000)) // 80000
console.log(calculateBonus('A', 10000)) // 30000
 */


/* 
//  案例4：小球运动动画封装
// t: 已消耗时间
// b: 原始位置
// c: 目标位置
// d: 持续总时间
var tween = {
    linear: (t, b, c, d) => c * t / d + b,
    easeIn: (t, b, c, d) => c * (t /= d) * t + b,
    strongEaseIn: (t, b, c, d) => c * (t /= d) * t * t * t * t + b,
    strongEaseOut: (t, b, c, d) => c * ((t = t / d - 1) * t * t * t * t) + b,
    sineaseIn: (t, b, c, d) => c * (t /= d) * t * t + b,
    sineaseOut: (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b
}
var Animate = function (dom) {
    this.dom = dom;             // 进行运动的 dom 节点
    this.startTime = 0;         // 动画开始时间
    this.startPos = 0;          // 动画开始时，dom 节点的位置，即 dom 的初始位置
    this.endPos = 0;            // 动画结束时，dom 节点的位置，即 dom 的目标位置
    this.propertyName = null;   // dom 节点需要被改变的 css 属性名
    this.easing = null;         // 缓动算法
    this.duration = null;       // 动画持续时间
}
Animate.prototype.start = function (propertyName, endPos, duration, easing) {
    this.startTime = +new Date; // 动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom 节点初始位置
    this.propertyName = propertyName; // dom 节点需要被改变的 CSS 属性名
    this.endPos = endPos; // dom 节点目标位置
    this.duration = duration; // 动画持续事件
    this.easing = tween[easing]; // 缓动算法

    var self = this
    var timeId = setInterval(() => { // 启动定时器
        if (self.step() === false) {
            clearInterval(timeId)
        }
    }, 19);
}
Animate.prototype.step = function () {
    var t = +new Date
    if (t >= this.startTime + this.duration) {
        this.update(this.endPos)
        return false
    }
    // pos：小球当前位置
    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)
    this.update(pos)    // 更新小球的CSS属性值
}
Animate.prototype.update = function (pos) {
    this.dom.style[this.propertyName] = pos + 'px'
}
var div = document.getElementById('div')
var animate = new Animate(div)
animate.start('left', 500, 1000, 'strongEaseOut')
animate.start('top', 1500, 500, 'strongEaseIn')
 */





//  案例5：表单验证
// 传统方式：
// var registerForm = document.getElementById('registerForm')
// registerForm.onsubmit = function () {
//     if (registerForm.userName.value === '') {
//         console.log('用户名不能为空')
//         return false
//     }
//     if (registerForm.password.value === '') {
//         console.log('密码不能为空')
//         return false
//     }
//     if (registerForm.phoneNumber.value === '') {
//         console.log('联系方式不能为空')
//         return false
//     }
// }

/* 
// 策略模式校验
var strategies = {
    isNonEmpty(value, errorMsg) { // 不为空
        if (value === '') {
            return errorMsg
        }
    },
    minLength(value, length, errorMsg) { // 限制最小长度
        if (value.length < length) {
            return errorMsg
        }
    },
    isMobile(value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg
        }
    }
}

var Validator = function () {
    this.cache = [] // 保存校验规则
}
Validator.prototype.add = function (dom, rule, errorMsg) {
    var ary = rule.split(':') // 分开规则值
    this.cache.push(function () { // 校验规则包装，存入cache
        var strategy = ary.shift()
        ary.unshift(dom.value)
        ary.push(errorMsg)
        return strategies[strategy].apply(dom, ary)
    })
}
Validator.prototype.start = function () {
    for (var i = 0; i < this.cache.length; i++) {
        var validataFunc = this.cache[i]
        var msg = validataFunc()
        if (msg) {
            return msg
        }
    }
}

var validataFunc = function () {
    var validator = new Validator() // 创建validator的Context对象

    validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
    validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')
    validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确')

    var errorMsg = validator.start() // 获取验证结果
    return errorMsg // 返回校验结果
}

var registerForm = document.getElementById('registerForm')
registerForm.onsubmit = function () {
    var errorMsg = validataFunc()
    if (errorMsg) { // 有返回值代表未通过校验
        console.log(errorMsg)
        return false
    }
}
 */


//  策略模式--同一输入框校验多个规则
// 策略对象封装
var strategies = {
    isNonEmpty(value, errorMsg) { // 不为空
        if (value === '') {
            return errorMsg
        }
    },
    minLength(value, length, errorMsg) { // 限制最小长度
        if (value.length < length) {
            return errorMsg
        }
    },
    isMobile(value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg
        }
    }
}

// Context封装
var Validator = function () {
    this.cache = []
}
Validator.prototype.add = function (dom, rules) {
    var self = this
    for (var i = 0; i < rules.length; i++) {
        (function (rule) {
            var strategyAry = rule.strategy.split(':')
            self.cache.push(function () {
                var strategy = strategyAry.shift()
                strategyAry.unshift(dom.value)
                strategyAry.push(errorMsg)
                return strategies[strategy].apply(dom, strategyAry)
            })
        })(rules[i])
    }
}
Validator.prototype.start = function () {
    for (var i = 0; i < this.cache.length; i++) {
        var validataFunc = this.cache[i]
        var errorMsg = validataFunc()
        if (errorMsg) {
            return errorMsg
        }
    }
}

// 提交
var registerForm = document.getElementById('registerForm');
var validataFunc = function () {
    var validator = new Validator();
    validator.add(registerForm.userName, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空'
    }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能小于 10 位'
    }]);
    validator.add(registerForm.password, [{
        strategy: 'minLength:6',
        errorMsg: '密码长度不能小于 6 位'
    }]);
    validator.add(registerForm.phoneNumber, [{
        strategy: 'isMobile',
        errorMsg: '手机号码格式不正确'
    }]);
    var errorMsg = validator.start();
    return errorMsg;
}
registerForm.onsubmit = function () {
    var errorMsg = validataFunc();
    if (errorMsg) {
        console.log(errorMsg);
        return false;
    }
}