// 迭代器模式：迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示
// 现在大部分流行语言都有内置迭代器

/* 
// 案例1：jquery中的迭代器
$.each([1, 2, 3], function (i, n) {
    console.log('当前下表为：' + i)
    console.log('当前值为：' + n)
})
 */


/* 
//  案例2：内部迭代器--判断两个数组元素是否完全相等
var compare = function (ary1, ary2) {
    if (ary1.length !== ary1.length) {
        throw new Error('ary1 和 ary2不相等')
    }
    each(ary1, function (i, n) {
        if (n !== ary2[i]) {
            throw new Error('ary1 和 ary2 不相等')
        }
    })
    console.log('ary1 和 ary2 不相等')
}
compare([1, 2, 3], [1, 2, 4]) //  throw new Error ( 'ary1 和 ary2 不相等' )
 */


/* 
// 案例3：外部迭代器-- 判断两个数组是否完全相等
// 外部迭代器比较灵活
var Iterator = function (obj) {
    var current = 0
    var next = function () {
        current++
    }
    var isDone = function () {
        return current >= obj.length
    }
    var getCurrItem = function () {
        return obj[current]
    }
    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
}
// compare函数实现
var compare = function (iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
            throw new Error('iterator1 和 iterator2 不相等')
        }
        iterator1.next()
        iterator2.next()
    }
    console.log('iterator1 和 iterator2 相等')
}
var iterator1 = Iterator([1, 2, 3])
var iterator2 = Iterator([1, 2, 3])
compare(iterator1, iterator2) // iterator1 和 iterator2 相等
 */


/* 
// 案例4：迭代类数组对象和字面量对象
// for in 迭代普通字面量对象的属性
// 借鉴jquery
$.each = function (obj, callback) {
    var value, i = 0, length = obj.length, isArray = isArrayLike(obj)
    if (isArray) {
        for (i = 0; i < length; i++) {
            value = callback.call(obj[i], i, obj[i])
            if (value === false) {
                break
            }
        }
    } else {
        for (var i in obj) {
            value = callback.call(obj[i], i, obj[i])
            if (value === false) {
                break
            }
        }
    }
    return obj
}
 */


/* 
// 案例5：倒叙迭代器
var reverseEach = function (ary, callback) {
    for (var l = ary.length - 1; l >= -0; l--) {
        callback.call(ary[l],l, ary[l])
    }
}
reverseEach([0, 1, 2], function (i, n) {
    console.log(n)
})
 */




//  案例6：终止迭代器
var each = function (ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        if (callback(i, ary[i]) === false) {
            break
        }
    }
}
each([1, 2, 3, 4, 5], function (i, n) {
    if (n > 3) {
        return false
    }
    console.log(n) // 1 2 3
})
