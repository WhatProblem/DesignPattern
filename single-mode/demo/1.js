// demo1
var Single = function (name) {
    this.name = name
    this.instance = null
}
Single.prototype.getName = function () {
    console.log(this.name)
}
Single.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Single(name)
    }
    return this.instance
}
var a = Single.getInstance('name1')
var b = Single.getInstance('name2')
console.log(a === b) // true
