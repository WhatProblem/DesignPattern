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