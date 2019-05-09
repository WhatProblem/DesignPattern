/* ：当我们试图调用模块或者对象的某个接口时，却发现这个接口的格式并不符合目前的需求。
这时候有两种解决办法，第一种是修改原来的接口实现，但如果原来的模块很复杂，或者我们拿
到的模块是一段别人编写的经过压缩的代码，修改原接口就显得不太现实了。第二种办法是创建
一个适配器，将原接口转换为客户希望的另一个接口，客户只需要和适配器打交道 */


/* 
// 案例1：地图渲染
var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图')
    }
}
var baiduMap = {
    show: function () {
        console.log('开始渲染百度地图')
    }
}
var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show()
    }
}
renderMap(googleMap)
renderMap(baiduMap)
 */



/* 
// 案例2：改动地图渲染，百度地图，接口show改变为display
var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图')
    }
}
var baiduMap = {
    display: function () {
        console.log('开始渲染百度地图')
    }
}
var baiduMapAdapter = {
    show: function () {
        return baiduMap.display()
    }
}
var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show()
    }
}
renderMap(googleMap)
renderMap(baiduMapAdapter)
 */



/* 
// 案例3：城市改变案例
var getGuangdongCity = function () {
    var guangdongCity = [
        {
            name: 'shenzhen',
            id: 11
        },
        {
            name: 'guangzhou',
            id: 12
        }
    ]
    return guangdongCity
}
var render = function (fn) {
    console.log('开始渲染广东地图')
    console.log(JSON.stringify(fn()))
}
render(getGuangdongCity)
 */




// 案例4：数据结构改变--使用适配器重构上述
// var guangdongCity = {
// shenzhen: 11,
// guangzhou: 12,
// zhuhai: 13
// }
var getGuangdongCity = function () {
    var guangdongCity = [
        {
            name: 'shenzhen',
            id: 11
        },
        {
            name: 'guangzhou',
            id: 12
        }
    ]
    return guangdongCity
}
var render = function (fn) {
    console.log('开始渲染广东地图')
    console.log(JSON.stringify(fn()))
}
var addressAdapter = function (oldAddressfn) {
    var address = {}, oldAddress = oldAddressfn()
    for (var i = 0; i < oldAddress.length; i++) {
        var c = oldAddress[i]
        address[c.name] = c.id
    }
    return function () {
        return address
    }
}
render(addressAdapter(getGuangdongCity))