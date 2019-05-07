// 职责链模式：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间
// 的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止

/* 
// 案例1：传统购物模式
var order = function (orderType, pay, stock) {
    if (orderType === 1) { // 500定金购买模式
        if (pay === true) { // 已经支付定金
            console.log('500元定金预购，得到100元优惠券')
        } else { // 未支付定金，降级到普通购买模式
            if (stock > 0) { // 用于普通购买的手机还有库存
                console.log('普通购买，无优惠')
            } else {
                console.log('手机库存不足')
            }
        }
    } else if (orderType === 2) { // 200元定金购买模式
        if (pay === true) {
            console.log('200元定金预定，得到500元优惠券')
        } else {
            if (stock > 0) {
                console.log('普通购买，无优惠券')
            } else {
                console.log('手机库存不足')
            }
        }
    } else if (orderType === 3) {
        if (stock > 0) {
            console.log('普通购买，无优惠券')
        } else {
            console.log('手机库存不足')
        }
    }
}
order(1, true, 500)
 */




/* 
// 案例2：用职责链方式重构案例1
// 缺点：请求在链条中的传递顺序非常不灵活，请求耦合在业务函数中
var order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100元优惠券')
    } else {
        order200(orderType, pay, stock)
    }
}
var order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50元优惠券')
    } else {
        orderNormal(orderType, pay, stock)
    }
}
var orderNormal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券')
    } else {
        console.log('手机库存不足')
    }
}
order500(1, true, 500); // 输出：500 元定金预购, 得到100 优惠券
order500(1, false, 500); // 输出：普通购买, 无优惠券
order500(2, true, 500); // 输出：200 元定金预购, 得到500 优惠券
order500(3, false, 500); // 输出：普通购买, 无优惠券
order500(3, false, 0); // 输出：手机库存不足
 */




// 案例3：重构案例2，灵活的职责链模式
var order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100元优惠券')
    } else {
        return 'nextSuccessor'
    }
}
var order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50元优惠券')
    } else {
        return 'nextSuccessor'
    }
}
var orderNormal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券')
    } else {
        console.log('手机库存不足')
    }
}
// 我们定义一个构造函数Chain,实例属性this.successor表示链中的下一个节点
// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点
var Chain = function (fn) {
    this.fn = fn
    this.successor = null
}
Chain.prototype.setNextSuccessor = function (successor) {
    return this.successor = successor
}
Chain.prototype.passRequest = function () {
    var ret = this.fn.apply(this, arguments)
    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }
    return ret
}
// // 3个订单函数包装成职责链节点
// var chainOrder500 = new Chain(order500)
// var chainOrder200 = new Chain(order200)
// var chainOrderNormal = new Chain(orderNormal)
// // 指定节点在职责链中的顺序
// chainOrder500.setNextSuccessor(chainOrder200)
// chainOrder200.setNextSuccessor(chainOrderNormal)

// chainOrder500.passRequest(1, true, 500); // 输出：500 元定金预购，得到100 优惠券
// chainOrder500.passRequest(2, true, 500); // 输出：200 元定金预购，得到50 优惠券
// chainOrder500.passRequest(3, true, 500); // 输出：普通购买，无优惠券
// chainOrder500.passRequest(1, false, 0); // 输出：手机库存不足

// 异步职责链
Chain.prototype.next = function () {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}
var fn1 = new Chain(function () {
    console.log(1);
    return 'nextSuccessor';
});
var fn2 = new Chain(function () {
    console.log(2);
    var self = this;
    setTimeout(function () {
        self.next();
    }, 1000);
});
var fn3 = new Chain(function () {
    console.log(3);
});
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();