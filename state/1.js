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


/* 
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
 */




/* 
// 案例3：状态模式模拟文件上传
window.external.upload = function (state) {
    console.log(state)
}
var plugin = (function () {
    var plugin = document.createElement('embed')
    plugin.style.display = 'none'
    plugin.type = 'application/txftn-webkit'
    plugin.sign = function () {
        console.log('开始扫描文件')
    }
    plugin.pause = function () {
        console.log('暂停文件上传')
    }
    plugin.uploading = function () {
        console.log('开始文件上传')
    }
    plugin.del = function () {
        console.log('删除文件上传')
    }
    plugin.done = function () {
        console.log('文件上传成功')
    }
    document.body.appendChild(plugin)
    return plugin
})()
// 创建Upload构造函数，在其中为每种状态子类创建一个实例对象
var Upload = function (fileName) {
    this.plugin = plugin
    this.fileName = fileName
    this.button1 = null
    this.button2 = null
    this.signState = new SignState(this) // 设置初始状态为waiting
    this.uploadingState = new UploadingState(this)
    this.pauseState = new PauseState(this)
    this.doneState = new DoneState(this)
    this.errorState = new ErrorState(this)
    this.currState = this.signState // 设置当前状态
}
// Upload.prototype.init负责初始化创建与上传流程有关的DOM节点
Upload.prototype.init = function () {
    var self = this
    this.dom = document.createElement('div')
    this.dom.innerHTML = '<span>文件名称:' + this.fileName + '</span>\
<button data-action="button1">扫描中</button>\
<button data-action="button2">删除</button>'
    document.body.appendChild(this.dom)
    this.button1 = this.dom.querySelector('[data-action="button1"]')
    this.button2 = this.dom.querySelector('[data-action="button2"]')
    this.bindEvent()
}
// 具体按钮事件，Context不作具体操作，而是把请求委托给当前的状态类执行
Upload.prototype.bindEvent = function () {
    var self = this
    this.button1.onclick = function () {
        self.currState.clickHandler1()
    }
    this.button2.onclick = function () {
        self.currState.clickHandler2()
    }
}
Upload.prototype.sign = function () {
    this.plugin.sign()
    this.currState = this.signState
}
Upload.prototype.uploading = function () {
    this.button1.innerHTML = '正在上传，点击暂停'
    this.plugin.uploading()
    this.currState = this.uploadingState
}
Upload.prototype.pause = function () {
    this.button1.innerHTML = '已暂停，点击继续上传'
    this.plugin.pause()
    this.currState = this.pauseState
}
Upload.prototype.done = function () {
    this.button1.innerHTML = '上传完成'
    this.plugin.done()
    this.currState = this.doneState
}
Upload.prototype.error = function () {
    this.button1.innerHTML = '上传失败'
    this.currState = this.errorState
}
Upload.prototype.del = function () {
    this.plugin.del()
    this.dom.parentNode.removeChild(this.dom)
}
// 实现各个状态类
var StateFactory = (function () {
    var State = function () { }
    State.prototype.clickHandler1 = function () {
        throw new Error('子类必须重写父类的clickHandler1方法')
    }
    State.prototype.clickHandler2 = function () {
        throw new Error('子类必须重写父类的clickHandler2方法')
    }
    return function (param) {
        var F = function (uploadObj) {
            this.uploadObj = uploadObj
        }
        F.prototype = new State()
        for (var i in param) {
            F.prototype[i] = param[i]
        }
        return F
    }
})()
var SignState = StateFactory({
    clickHandler1: function () {
        console.log('扫描中，点击无效')
    },
    clickHandler2: function () {
        console.log('文件正在上传，不能删除')
    }
})
var UploadingState = StateFactory({
    clickHandler1: function () {
        this.uploadObj.pause()
    },
    clickHandler2: function () {
        console.log('文件正在上传中，不能删除')
    }
})
var PauseState = StateFactory({
    clickHandler1: function () {
        this.uploadObj.uploading()
    },
    clickHandler2: function () {
        this.uploadObj.del()
    }
})
var DoneState = StateFactory({
    clickHandler1: function () {
        console.log('文件已完成上传，点击无效')
    },
    clickHandler2: function () {
        this.uploadObj.del()
    }
})
var ErrorState = StateFactory({
    clickHandler1: function () {
        console.log('文件上环失败，点击无效')
    },
    clickHandler2: function () {
        this.uploadObj.del()
    }
})
// 测试
var uploadObj = new Upload('JavaScript设计模式与开发实践')
uploadObj.init()
window.external.upload = function (state) {
    uploadObj[state]()
}
window.external.upload('sign')
setTimeout(() => {
    window.external.upload('uploading') // 1秒后开始上传
}, 1000);
setTimeout(() => {
    window.external.upload('done') // 5秒后上传完成
}, 5000);
 */



/* 
// 案例4：js版本状态机实现关灯程序
var Light = function () {
this.currState = FSM.off // 设置当前状态
this.button = null
}
Light.prototype.init = function () {
var button = document.createElement('button'),
self = this
button.innerHTML = '已关灯'
this.button = document.body.appendChild(button)
this.button.onclick = function () {
self.currState.buttonWasPressed.call(self) // 把请求委托给FSM状态机
}
}
var FSM = {
off: {
buttonWasPressed: function () {
console.log('关灯')
this.button.innerHTML = '下一次按我是开灯'
this.currState = FSM.on
}
},
on: {
buttonWasPressed: function () {
console.log('开灯')
this.button.innerHTML = '下一次按我是关灯'
this.currState = FSM.off
}
}
}
var light = new Light()
light.init()
*/



// 案例5：另一种方式实现案例4
var delegate = function (client, delegation) {
    return {
        buttonWasPressed: function () { // 将客户端的操作委托给delegation对象
            return delegation.buttonWasPressed.apply(client, arguments)
        }
    }
}
var FSM = {
    off: {
        buttonWasPressed: function () {
            console.log('关灯')
            this.button.innerHTML = '下一次按我是开灯'
            this.currState = this.onState
        }
    },
    on: {
        buttonWasPressed: function () {
            console.log('开灯')
            this.button.innerHTML = '下一次按我是关灯'
            this.currState = this.offState
        }
    }
}
var Light = function () {
    this.offState = delegate(this, FSM.off)
    this.onState = delegate(this, FSM.on)
    this.currState = this.offState
    this.button = null
}
Light.prototype.init = function () {
    var button = document.createElement('button'), self = this
    button.innerHTML = '已关灯'
    this.button = document.body.appendChild(button)
    this.button.onclick = function () {
        self.currState.buttonWasPressed()
    }
}
var light = new Light()
light.init()