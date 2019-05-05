/* 设计模式的主题总是把不变的事物和变化的事物分离开来；
一般来说，命令模式都会在command 对象中保存一个接收者来负责真正执行客户的请求，
这种情况下命令对象是“傻瓜式”的，它只负责把客户的请求转交给接收者来执行，这种模式的好
处是请求发起者和请求接收者之间尽可能地得到了解耦’；
聪明”的命令对象可以直接实现请求，
智能命令对象：不再需要接收者的存在 */

/* 
// 案例1：命令模式解除请求与接收的耦合
var button1 = document.getElementById('button1')
var button2 = document.getElementById('button2')
var button3 = document.getElementById('button3')
// setCommand负责向按钮上安装命令
var setCommand = function (button, command) {
    button.onclick = function () {
        command.execute()
    }
}
var MenuBar = {
    refresh() {
        console.log('刷新目录')
    }
}
var SubMenu = {
    add() {
        console.log('增加子菜单')
    },
    del() {
        console.log('删除子菜单')
    }
}
var RefreshMenuBarCommand = function (receiver) {
    this.receiver = receiver
}
RefreshMenuBarCommand.prototype.execute = function () {
    this.receiver.refresh()
}
var AddSubMenuCommand = function (receiver) {
    this.receiver = receiver
}
AddSubMenuCommand.prototype.execute = function () {
    this.receiver.add()
}
var DelSubMenuCommand = function (receiver) {
    this.receiver = receiver
}
DelSubMenuCommand.prototype.execute = function () {
    this.receiver.del()
}
var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar)
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);
setCommand(button1, refreshMenuBarCommand)
setCommand(button2, addSubMenuCommand)
setCommand(button3, delSubMenuCommand)
 */



/* 
// 案例2：命令模式另一种实现
var button1 = document.getElementById('button1')
var button2 = document.getElementById('button2')
var button3 = document.getElementById('button3')
var bindClick = function (button, func) {
    button.onclick = func
}
var MenuBar = {
    refresh() {
        console.log('刷新菜单界面')
    }
}
var SubMenu = {
    add() {
        console.log('增加子菜单')
    },
    del() {
        console.log('删除子菜单')
    }
}
bindClick(button1, MenuBar.refresh)
bindClick(button2, SubMenu.add)
bindClick(button3, SubMenu.del)
 */




/* 
// 案例3：撤销和重做--实现具体录播功能
var Ryu = {
    attack() {
        console.log('攻击')
    },
    defense() {
        console.log('防御')
    },
    jump() {
        console.log('跳跃')
    },
    crouch() {
        console.log('蹲下')
    }
}
var makeCommand = function (receiver, state) {// 创建命令
    return function () {
        receiver[state]()
    }
}
var commands = {
    '119': 'jump', // W
    '115': 'crouch', // S
    '97': 'defense', // A
    '100': 'attack', // D
}
var commandStack = [] // 保存命令的堆栈
document.onkeypress = function (ev) {
    var keyCode = ev.keyCode,
        command = makeCommand(Ryu, commands[keyCode])
    if (command) {
        command()
        commandStack.push(command)
    }
}
document.getElementById('replay').onclick = function () {
    var command
    while (command = commandStack.shift()) {
        command()
    }
}
 */




// 案例4：宏命令实现按顺序执行
// 宏命令是一组命令的集合
var closeDoorCommand = {
    execute() {
        console.log('关门')
    }
}
var openPcCommand = {
    execute() {
        console.log('打开电脑')
    }
}
var openQQcommand = {
    execute() {
        console.log('登录QQ')
    }
}
var MacroCommand = function () {
    return {
        commandsList: [],
        add: function (command) {
            this.commandsList.push(command)
        },
        execute: function () {
            for (var i = 0; i < this.commandsList.length; i++) {
                var command = this.commandsList[i]
                command.execute()
            }
        }
    }
}
var macroCommand = MacroCommand()
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQcommand)
macroCommand.execute()