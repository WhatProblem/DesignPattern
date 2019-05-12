// 适配器模式：新旧接口之间的兼容
// demo1: 原先接口统一暴露show方法，如果突然有一个改变了，变成了display方法，创建一个适配器
/* 
var adapter1 = {
    show: function () {
        console.log('适配器1')
    }
}
var adapter2 = {
    show: function () {
        console.log('适配器2')
    }
}
var render = function(fn) {
    fn.show()
}
render(adapter1)
render(adapter2)
 */

/* 
var adapter1 = {
   show: function () {
       console.log('适配器1')
   }
}
var adapter2 = {
   display: function () {
       console.log('适配器2')
   }
}
var adapter = {
   show: function () {
       return adapter2.display()
   }
}

var render = function(fn) {
   fn.show()
}
render(adapter1)
render(adapter)
*/



//  demo2: 后台返回数据结构发生变化
//  之前数据
var resp1 = {
    msg: 'success',
    code: 200,
    data: []
}
// 修改后数据
var resp2 = {
    msg: 'success',
    code: 200,
    data: { data: [] }
}
var adapter = function (resp2) {
    return {
        msg: resp2.msg,
        code: resp2.code,
        data: resp2.data.data
    }
}