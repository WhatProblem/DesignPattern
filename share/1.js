/* 享元模式： 享元模式要求将对象的属性划分为内部状态与外部
状态（状态在这里通常指属性），享元模式的目标是尽量减少共享对象的数量
减少大量类似对象*/

/* 
// 案例1：传统创建对象
var Model = function (sex, underwear) {
    this.sex = sex
    this.underwear = underwear
}
Model.prototype.takePhoto = function () {
    console.log('sex=' + this.sex, 'underwear=' + this.underwear)
}
for (var i = 1; i <= 50; i++) {
    var maleModel = new Model('male', 'underwear' + i)
    maleModel.takePhoto()
}
for (var i = 1; i <= 50; i++) {
    var femaleModel = new Model('female', 'underwear' + i)
    femaleModel.takePhoto()
}
 */


/* 
// 案例2：优化案例1，减少对象创建--只需要创建两个对象，防止内存泄露
var Model = function (sex) {
    this.sex = sex
}
Model.prototype.takePhoto = function () {
    console.log('sex=' + this.sex, ' underwear=' + this.underwear)
}
// 创建对象
var maleModel = new Model('male'), femaleModel = new Model('female')
for (var i = 1; i <= 50; i++) {
    maleModel.underwear = 'underwear' + i
    maleModel.takePhoto()
}
for (var j = 1; j <= 50; j++) {
    femaleModel.underwear = 'underwear' + j
    femaleModel.takePhoto()
}
 */



/* 
// 案例3：文件上传案例--传统方式，创建多个对象
var id = 0
window.startUpload = function (uploadType, files) { // uploadType--区分上传类型：Flash/控件
    for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var uploadObj = new Upload(uploadType, file.fileName, file.fileSize)
        uploadObj.init(id++) // 给upload对象设置一个唯一的id
    }
}
var Upload = function (uploadType, fileName, fileSize) {
    this.uploadType = uploadType
    this.fileName = fileName
    this.fileSize = fileSize
    this.dom = null
}
Upload.prototype.init = function (id) {
    var self = this
    this.id = id
    this.dom = document.createElement('div')
    this.dom.innerHTML = '<span>文件名称:' + this.fileName + ', 文件大小: ' + this.fileSize + '</span>' +
        '<button class="delFile">删除</button>'
    this.dom.querySelector('.delFile').onclick = function () {
        self.delFile()
    }
    document.body.appendChild(this.dom)
}
Upload.prototype.delFile = function () {
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom)
    }
    if (window.confirm('确定删除该文件吗？' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom)
    }
}
startUpload('plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.html',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    }
])

startUpload('flash', [
    {
        fileName: '4.txt',
        fileSize: 1000
    },
    {
        fileName: '5.html',
        fileSize: 3000
    },
    {
        fileName: '6.txt',
        fileSize: 5000
    }
])
 */



/* 
// 案例4：文件上传优化
var Upload = function (uploadType) {
    this.uploadType = uploadType
}
Upload.prototype.deFile = function (id) {
    uploadManager.setExternalState(id, this)
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom)
    }
    if (window.confirm('确定删除该文件吗？' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom)
    }
}
// 定义工厂创建upload对象
var UploadFactory = (function () {
    var createdFlyWeightObjs = {}
    return {
        create: function (uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType]
            }
            return createdFlyWeightObjs[uploadType] = new Upload(uploadType)
        }
    }
})()
// 管理器封装外部状态
var uploadManager = (function () {
    var uploadDatabase = {}
    return {
        add: function (id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType)
            var dom = document.createElement('div')
            dom.innerHTML = '<span>文件名称:' + fileName + ', 文件大小: ' + fileSize + '</span>' +
                '<button class="delFile">删除</button>'
            dom.querySelector('.delFile').onclick = function () {
                flyWeightObj.deFile(id)
            }
            document.body.appendChild(dom)
            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            }
            return flyWeightObj
        },
        setExternalState: function (id, flyWeightObj) {
            var uploadData = uploadDatabase[id]
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i]
            }
        }
    }
})()
// 触发上传动作的startUpload函数
var id = 0
window.startUpload = function (uploadType, files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize)
    }
}
// 测试上传
startUpload('plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.html',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    }
])
 */



/* 
// 案例5：对象池实现--类似享元模式思想
var toolTipFactory = (function () {
    var toolTipPool = [] // toolTip对象池
    return {
        create: function () {
            if (toolTipPool.length === 0) { // 对象池为空
                var div = document.createElement('div') // 创建一个dom
                document.body.appendChild(div)
                return div
            } else {
                return toolTipPool.shift() // 从对象池取出一个Dom
            }
        },
        recover: function (toolTipDom) {
            return toolTipPool.push(toolTipDom)
        }
    }
})()

var ary = [], str = ['A', 'B']
for (var i = 0; i < str.length; i++) {
    var toolTip = toolTipFactory.create()
    toolTip.innerHTML = str[i]
    ary.push(toolTip)
}
// 首先回收两个气泡对象到对象池
for (var j = 0; j < ary.length; j++) {
    toolTipFactory.recover(ary[j])
}
// 再创建6个小气泡
var str = ['A', 'B', 'C', 'D', 'E', 'F']
for (var i = 0; i < str.length; i++) {
    var toolTip = toolTipFactory.create()
    toolTip.innerHTML = str[i]
}
 */



/* 
// 案例6：通用对象实现
var objectPoolFactory = function (createObjFn) {
    var objectPool = []
    return {
        create: function () {
            var obj = objectPool.length === 0 ?
                createObjFn.apply(this, arguments) : objectPool.shift()
            return obj
        },
        recover: function (obj) {
            objectPool.push(obj)
        }
    }
}
// 创建一个装载一些iframe的对象池
var iframeFactory = objectPoolFactory(function () {
    var iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    iframe.onload = function () {
        iframe.onload = null // 防止iframe重复加载
        iframeFactory.recover(iframe) // iframe加载完成之后收回节点
    }
    return iframe
})
var iframe1 = iframeFactory.create()
iframe1.src = 'http://baidu.com'
var iframe2 = iframeFactory.create()
iframe2.src = 'http://www.whatproblem.xyz'
// setTimeout(function(){
var iframe3 = iframeFactory.create()
iframe3.src = 'http://163.com'
// }, 3000);
 */