/* 组合模式将对象组合成树形结构，以表示“部分-整体”的层次结构。 除了用来表示树形结
构之外，组合模式的另一个好处是通过对象的多态性表现，使得用户对单个对象和组合对象的使
用具有一致性 */
// 拥有相同的接口,只有用一致的方式对待列表中的每个叶对象的时候，才适合使用组合模式
// 适合用做购物车的单选或者全选

/* 
// 案例1：带有子节点的复杂组合模式
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
var openAcCommand = {
    execute() {
        console.log('打开空调')
    }
}
// 电视音响连在一起，可以使用一个宏命令来组合打开电视音响
var openTvCommand = {
    execute() {
        console.log('打开电视')
    }
}
var openSoundCommand = {
    execute() {
        console.log('打开音响')
    }
}
var macroCommand1 = MacroCommand()
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand)
// 使用一个宏命令组合关门，开电脑，登录QQ
var closeDoorCommand = {
    execute() {
        console.log('关门')
    }
}
var openPcCommand = {
    execute() {
        console.log('开电脑')
    }
}
var openQQCommand = {
    execute() {
        console.log('登录QQ')
    }
}
var macroCommand2 = MacroCommand()
macroCommand2.add(closeDoorCommand)
macroCommand2.add(openPcCommand)
macroCommand2.add(openQQCommand)
// 把所有命令组合在一起
var macroCommand = MacroCommand()
macroCommand.add(openAcCommand)
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)
// 给按钮绑定组合命令
var setCommand = function (command) {
    document.getElementById('button').onclick = function () {
        command.execute()
    }
}(macroCommand)
 */




/* 
// 案例2：带有错误抛出的组合模式
// 子节点调用add()方法，抛出错误
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
var openTvCommand = {
    execute: function () {
        console.log('打开电视')
    },
    add: function () {
        throw new Error('叶对象不能添加子节点')
    }
}
var macroCommand = MacroCommand()
macroCommand.add(openTvCommand)
openTvCommand.add(macroCommand)
// macroCommand.execute()
 */



/* 
// 案例3：组合模式实现扫描文件夹和文件
// Folder文件夹类
var Folder = function (name) {
    this.name = name
    this.files = []
}
Folder.prototype.add = function (file) {
    this.files.push(file)
}
Folder.prototype.scan = function () {
    console.log('开始扫描文件夹：' + this.name)
    for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i]
        file.scan()
    }
}
// File文件类
var File = function (name) {
    this.name = name
}
File.prototype.add = function () {
    throw new Error('文件下面不能再添加文件')
}
File.prototype.scan = function () {
    console.log('开始扫描文件:' + this.name)
}
// 构建扫描文件夹
var folder = new Folder('学习资料')
var folder1 = new Folder('JavaScript')
var folder2 = new Folder('jQuery')

var file1 = new File('JavaScript 设计模式与开发实践')
var file2 = new File('精通jQuery')
var file3 = new File('重构与模式')
folder1.add(file1)
folder2.add(file2)
folder.add(folder1)
folder.add(folder2)
folder.add(file3)
var folder3 = new Folder('Nodejs')
var file4 = new File('深入浅出Node.js')
folder3.add(file4)
var file5 = new File('JavaScript 语言精髓与编程实践')
folder.add(folder3)
folder.add(file5)
folder.scan()
 */




// 案例4：带有删除文件功能的扫描文件
// Folder类
var Folder = function (name) {
    this.name = name
    this.parent = null // 增加this.parent属性
    this.files = []
}
Folder.prototype.add = function (file) {
    file.parent = this
    this.files.push(file)
}
Folder.prototype.scan = function () {
    console.log('开始扫描文件夹:' + this.name)
    for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i]
        file.scan()
    }
}
Folder.prototype.remove = function () {
    if (!this.parent) { // 根节点或者树外的游离节点
        return
    }
    for (var i = this.parent.files.length - 1; i >= 0; i--) {
        var file = this.parent.files[i]
        if (file === this) {
            this.parent.files.splice(i, 1)
        }
    }
}
// File类
var File = function (name) {
    this.name = name
    this.parent = null
}
File.prototype.add = function () {
    throw new Error('不能添加在文件下面')
}
File.prototype.scan = function () {
    console.log('开始扫描文件：' + this.name)
}
File.prototype.remove = function () {
    if (!this.parent) { // 根节点或游离节点
        return
    }
    for (var i = this.parent.files.length - 1; i >= 0; i--) {
        var file = files[i]
        if (file === this) {
            this.parent.files.splice(i, 1)
        }
    }
}
var folder = new Folder('学习资料')
var folder1 = new Folder('JavaScript')
var file1 = new Folder('深入浅出Node.js')
folder1.add(new File('JavaScript 设计模式与开发实践'))
folder.add(folder1)
folder.add(file1)
folder1.remove() //移除文件夹
folder.scan()