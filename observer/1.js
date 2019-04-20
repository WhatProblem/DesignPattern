// 观察者模式/订阅发布模式：简单理解，一旦对象发生变化，函数自动执行
// JS中的事件就是经典的发布-订阅模式的实现

// 订阅
document.body.addEventListener('click', function () {
    console.log('click1');
}, false);

document.body.addEventListener('click', function () {
    console.log('click2');
}, false);

// 发布
document.body.click(); // click1 click2
