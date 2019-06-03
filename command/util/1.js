/* 将创建模块的逻辑封装在一个对象里，
这个对象提供一个参数化的请求接口，
通过调用这个接口并传递一些参数实现调用对象内部的一些方法 */

/* 
// 案例1
var CanvasCommand = (function () {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d')
    var Action = {
        fillStyle: function (c) {
            ctx.fillStyle = c
        },
        fillRect: function (x, y, width, height) {
            ctx.fillRect(x, y, width, height)
        },
        strokeStyle: function (c) {
            ctx.strokeStyle = c
        },
        strokeRect: function (x, y, width, height) {
            ctx.strokeRect(x, y, width, height)
        },
        fillText: function (text, x, y) {
            ctx.fillText(text, x, y)
        },
        beginPath: function () {
            ctx.beginPath()
        },
        moveTo: function (x, y) {
            ctx.moveTo(x, y)
        },
        lineTo: function (x, y) {
            ctx.lineTo(x, y)
        },
        arc: function (x, y, r, begin, end, dir) {
            ctx.arc(x, y, r, begin, end, dir)
        },
        fill: function () {
            ctx.fill()
        },
        stroke: function () {
            ctx.stroke()
        }
    }
    return {
        execute: function (msg) {
            var len = msg.length
            if (!msg) return
            if (len) {
                for (var i = 0; i < len; i++) {
                    // callee是一个指针，指向arguments对象的函数（execute）
                    arguments.callee(msg[i])
                }
            } else {
                msg.param = Object.prototype.toString.call(msg.param) === '[object Array]' ? msg.param : [msg.param]
                Action[msg.command].apply(Action, msg.param)
            }
        }
    }
})()

CanvasCommand.execute([
    { command: 'fillStyle', param: 'red' },
    { command: 'fillRect', param: [20, 20, 100, 100] },
    { command: 'strokeStyle', param: 'blue' },
    { command: 'strokeRect', param: [130, 20, 100, 100] }
])
 */



/* 
// 案例2: 传统方式
var CommandObj = {
    attack: function () {
        console.log('攻击')
    },
    defense: function () {
        console.log('防御')
    },
    jump: function () {
        console.log('跳跃')
    },
    crouch: function () {
        console.log('蹲下')
    },
    makeCommand: function (receiver, state) {
        return function () {
            receiver[state]()
        }
    },
    commands: {
        '119': 'jump', // W
        '115': 'crouch', // S
        '97': 'defense', // A
        '100': 'attack', //D
    },
    commandStack: [], // 保存命令的堆栈
}

// 执行操作并记录（入栈）
document.onkeypress = function (ev) {
    var keyCode = ev.keyCode,
        command = CommandObj.makeCommand(CommandObj, CommandObj.commands[keyCode])
    if (command) {
        command()
        CommandObj.commandStack.push(command)
    }
}

document.getElementById('btn').onclick = function () {
    var command,
        cmdStack = CommandObj.commandStack
    while (command = cmdStack.shift()) {
        command()
    }
}
 */

 
// 案例3：智能命令模式
var CommandObj = {
    attack: {
        execute: function () {
            console.log('攻击')
        }
    },
    defense: {
        execute: function () {
            console.log('防御')
        }
    },
    jump: {
        execute: function () {
            console.log('跳跃')
        }
    },
    crouch: {
        execute: function () {
            console.log('蹲下')
        }
    },
    makeCommand: function (receiver, state) {
        return receiver[state]
    },
    commands: {
        '119': 'jump', // W
        '115': 'crouch', // S
        '97': 'defense', // A
        '100': 'attack', //D
    },
    commandStack: [], // 保存命令的堆栈
    execute: function () { // 执行宏命令
        var len = this.commandStack.length,
            cmd = this.commandStack
        for (var i = 0; i < len; i++) {
            cmd[i]['execute']()
        }
    }
}
document.onkeypress = function (ev) {
    var keyCode = ev.keyCode,
        command = CommandObj.makeCommand(CommandObj, CommandObj.commands[keyCode])
    if (command) {
        command['execute']()
        CommandObj.commandStack.push(command)
    }
}

document.getElementById('btn').onclick = function () {
    CommandObj.execute()
}