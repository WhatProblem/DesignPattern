// 模板方法模式是一种只需使用继承就可以实现的非常简单的模式
// 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类
// 在模板方法模式中，子类实现中的相同部分被上移到父类中，而将不同的部分留待子类来
// 实现。这也很好地体现了泛化的思想
// 理解：类似强类型语言中的抽象类的继承，父类是模板

/* 
// 案例1：制作咖啡
var Coffee = function () { }
Coffee.prototype.boilWater = function () {
    console.log('把水煮沸')
}
Coffee.prototype.brewCoffeeGriends = function () {
    console.log('用沸水冲泡咖啡')
}
Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子')
}
Coffee.prototype.addSugarAndMilk = function () {
    console.log('加糖和牛奶')
}
Coffee.prototype.init = function () {
    this.boilWater()
    this.brewCoffeeGriends()
    this.pourInCup()
    this.addSugarAndMilk()
}
var coffee = new Coffee()
coffee.init()
 */



/* 
// 案例2：制作茶
var Tea = function () { }
Tea.prototype.boilWater = function () {
    console.log('把水煮沸')
}
Tea.prototype.steepTeaBag = function () {
    console.log('用沸水浸泡茶叶')
}
Tea.prototype.pourInCup = function () {
    console.log('把茶水倒进杯子')
}
Tea.prototype.addLemon = function () {
    console.log('加柠檬')
}
Tea.prototype.init = function () {
    this.boilWater()
    this.steepTeaBag()
    this.pourInCup()
    this.addLemon()
}
var tea = new Tea()
tea.init()
 */


/* 
// 案例4：制作饮料抽象类--实现继承
var Beverage = function () { }
Beverage.prototype.boilWater = function () {
    console.log('把水煮沸')
}
Beverage.prototype.brew = function () { } // 空方法，应该由子类重写
Beverage.prototype.pourInCup = function () { } // 空方法，应该由子类重写
Beverage.prototype.addCondiments = function () { } // 空方法，应该由子类重写
Beverage.prototype.init = function () {
    this.boilWater()
    this.brew()
    this.pourInCup()
    this.addCondiments()
}
// 创建Coffee子类
var Coffee = function () { }
Coffee.prototype = new Beverage()
// 重写父类方法
Coffee.prototype.brew = function () {
    console.log('用沸水冲泡咖啡')
}
Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进被子')
}
Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶')
}
var coffee = new Coffee()
coffee.init()
 */



/* 
// 案例5：添加钩子方法
var Beverage = function () { }
Beverage.prototype.boilWater = function () {
    console.log('把水煮沸')
}
Beverage.prototype.brew = function () {
    throw new Error('子类必须重写brew方法')
}
Beverage.prototype.pourInCup = function () {
    throw new Error('子类必须重写pourInCup方法')
}
Beverage.prototype.addCondiments = function () {
    throw new Error('子类必须重写addCondiments方法')
}
Beverage.prototype.customerWantsCondiments = function () {
    return true // 默认需要调料
}
Beverage.prototype.init = function () {
    this.boilWater()
    this.brew()
    this.pourInCup()
    if (this.customerWantsCondiments()) { // 如果挂钩返回true，则需要调料
        this.addCondiments()
    }
}
// 创建子类
var CoffeeWithHook = function () { }
CoffeeWithHook.prototype = new Beverage()
CoffeeWithHook.prototype.brew = function () {
    console.log('用沸水冲泡咖啡')
}
CoffeeWithHook.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子')
}
CoffeeWithHook.prototype.addCondiments = function () {
    console.log('加糖和牛奶')
}
CoffeeWithHook.prototype.customerWantsCondiments = function () {
    return window.confirm('请问需要调料吗？')
}
var coffeeWithHook = new CoffeeWithHook()
coffeeWithHook.init()
 */




// 案例6：好莱坞原则
var Beverage = function (param) {
    var boilWater = function () {
        console.log('把水煮沸')
    }
    var brew = param.brew || function () {
        throw new Error('必须传递brew方法')
    }
    var pourInCup = param.pourInCup || function () {
        throw new Error('必须传递pourInCup方法')
    }
    var addCondiments = param.addCondiments || function () {
        throw new Error('必须传递addCondiments方法')
    }
    var F = function () { }
    F.prototype.init = function () {
        boilWater()
        brew()
        pourInCup()
        addCondiments()
    }
    return F
}

var Coffee = Beverage({
    brew: function () {
        console.log('用沸水冲泡咖啡')
    },
    pourInCup: function () {
        console.log('把咖啡倒进杯子')
    },
    addCondiments: function () {
        console.log('加糖和牛奶')
    }
})
var coffee = new Coffee()
coffee.init()

var Tea = Beverage({
    brew: function () {
        console.log('用沸水浸泡茶叶')
    },
    pourInCup: function () {
        console.log('把茶倒进杯子')
    },
    addCondiments: function () {
        console.log('加柠檬')
    }
})
var tea = new Tea()
tea.init()