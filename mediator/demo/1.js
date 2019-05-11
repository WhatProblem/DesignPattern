// 创建移动中介者对象
var moveTar = document.getElementById('moveTar') // 移动目标
var MoveMediator = function () {
    var moveMsg = {}    // 消息对象
    return {
        // 订阅消息
        register: function (type, action) {
            if (moveMsg[type]) {
                moveMsg[type].push(action)
            } else {
                moveMsg[type] = []
                moveMsg[type].push(action)
            }
        },
        // 发送消息
        send: function (type) {
            if (moveMsg[type]) {
                for (var i = 0; i < moveMsg[type].length; i++) {
                    moveMsg[type][i] && moveMsg[type][i]()
                }
            }
        }
    }
}()

MoveMediator.register('left', function () {
    moveTar.style.left = moveTar.offsetLeft - 10 + 'px'
})
MoveMediator.register('up', function () {
    moveTar.style.top = moveTar.offsetTop - 10 + 'px'
})
MoveMediator.register('right', function () {
    moveTar.style.left = moveTar.offsetLeft + 10 + 'px'
})
MoveMediator.register('down', function () {
    moveTar.style.top = moveTar.offsetTop + 10 + 'px'
})
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e.keyCode === 37) {
        MoveMediator.send('left')
    } else if (e.keyCode === 38) {
        MoveMediator.send('up')
    } else if (e.keyCode === 39) {
        MoveMediator.send('right')
    } else if (e.keyCode === 40) {
        MoveMediator.send('down')
    }
}