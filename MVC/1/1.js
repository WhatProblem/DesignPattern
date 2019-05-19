// 创建一个“类”生成器
/* 
var Class = function () {
    console.log(123)
    var klass = function () {
        this.init.apply(this, arguments)
    }
    klass.prototype.init = function () {
        console.log(456)
    }
    return klass
}
var Person = new Class()
Person.prototype.init = function () {
    console.log(789)
}
Person.prototype.breath = function() {
    console.log('呼吸')
}
Person.fn = Person.prototype
Person.fn.rename = function() {
    console.log('测试重命名prototype')
}
var p = new Person()
p.find = function(id) {
    console.log(id)
}
p.init()
p.breath()
p.rename()
p.find(1)
 */


/* 
//  给类库扩展方法
var Class = function () {
    var klass = function () {
        this.init.apply(this, arguments)
    }
    klass.prototype.init = function () {
        console.log('初始化执行')
    }
    klass.fn = klass.prototype
    klass.fn.parent = klass
    klass.extend = function (obj) {
        var extended = obj.extended
        for (var i in obj) {
            klass[i] = obj[i]
        }
        if (extended) {
            extended(klass)
        }
    }
    klass.include = function (obj) {
        var included = obj.included
        for (var i in obj) {
            klass.fn[i] = obj[i]
        }
        if (included) {
            included(klass)
        }
    }
    return klass
}
var Person = new Class
Person.extend({ // 添加类私有属性
    find: function (id) { console.log(id) },
    exists: function (id) { console.log(id) },
    extended: function (klass) { console.log(klass, '被扩展了') }
})
Person.find(123)
Person.include({ // 添加类共有属性--prototype原型上
    save: function (id) { console.log('保存：', id) },
    destroy: function (id) { console.log('销毁：', id) }
})
var p = new Person
Person.find(1)
p.save(456)
 */




/* 
//  类的继承--基于原型
var Animal = function () { }
Animal.prototype.breath = function () {
    console.log('breath')
}
var Dog = function () {
    this.id = 123
 }
Dog.prototype = new Animal
Dog.prototype.wang = function() {console.log('wang tail')}
Dog.prototype.constructor = Dog
var dog = new Dog()
console.log(dog.constructor === Dog)
console.log(dog.id)
dog.breath()
 */




/* 
//  解释--防止污染parent的原因
function Animal() {}
Animal.prototype.species = '小动物'
function Cat() {}
Cat.prototype = Animal.prototype
Cat.prototype.constructor = Cat
console.log(Cat.prototype.constructor)
console.log(Animal.prototype.constructor).00

 */


/* 
// 类库添加继承
var Class  = function (parent) {
    var klass = function () {
        this.init.apply(this,arguments)
    }
    if (parent) { // 防止污染parent
        // var subclass = function () {}
        // subclass.prototype = parent.prototype
        // klass.prototype = new subclass
    }
    klass.prototype.init = function() {}
    klass.fn = klass.prototype
    klass.fn.parent = klass
    klass._super = klass.__proto__
    return klass
}
var Animal = new Class
Animal.prototype.breath = function () {console.log('breath')}
var Cat = new Class(Animal)
var tom = new Cat
tom.breath()
 */

