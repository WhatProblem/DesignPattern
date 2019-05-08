// 中介者模式的作用就是解除对象与对象之间的紧耦合关系

/* 
// 案例1：泡泡堂游戏1
function Player(name) {
    this.name = name
    this.enemy = null // 敌人
}
Player.prototype.win = function () {
    console.log(this.name + 'won')
}
Player.prototype.lose = function () {
    console.log(this.name + 'lost')
}
Player.prototype.die = function () {
    this.lose()
    this.enemy.win()
}
// 创建两个玩家
var player1 = new Player('皮蛋')
var player2 = new Player('小乖')
player1.enemy = player2
player2.enemy = player1
player1.die()
 */



/* 
//  案例2：为案例1游戏增加队伍
var players = []                // 保存所有玩家
function Player(name, teamColor) {
    this.partners = []          // 队友列表
    this.enemies = []           // 敌人列表
    this.state = 'live'         // 玩家状态
    this.name = name            // 角色名称
    this.teamColor = teamColor  // 队伍颜色
}
Player.prototype.win = function () { // 玩家团队胜利
    console.log('winner:' + this.name)
}
Player.prototype.lose = function () { // 玩家团队失败
    console.log('loser:' + this.name)
}
Player.prototype.die = function () {   // 玩家死亡
    var all_dead = true
    this.state = 'dead'                // 设置玩家状态为死亡
    for (var i = 0; i < this.partners.length; i++) {
        if (this.partners[i]['state'] !== 'dead') {
            all_dead = false
            break
        }
    }
    if (all_dead === true) {
        this.lose() // 通知自己游戏失败
        for (var i = 0; i < this.partners.length; i++) { // 通知所有人游戏失败
            this.partners[i].lose()
        }
        for (var i = 0; i < this.enemies.length; i++) { // 通知所有袭人游戏胜利
            this.enemies[i].win()
        }
    }
}
// 定义一个工厂函数创建玩家
var playerFactory = function (name, teamColor) {
    var newPlayer = new Player(name, teamColor) // 创建新玩家
    for (var i = 0; i < players.length; i++) { // 通知所有玩家新角色加入
        var player = players[i]
        if (player.teamColor === newPlayer.teamColor) { // 同一队玩家
            player.partners.push(newPlayer)
            newPlayer.partners.push(player)
        } else {
            player.enemies.push(newPlayer)
            newPlayer.enemies.push(Player)
        }
    }
    players.push(newPlayer)
    return newPlayer
}
//红队：
var player1 = playerFactory('皮蛋', 'red'),
    player2 = playerFactory('小乖', 'red'),
    player3 = playerFactory('宝宝', 'red'),
    player4 = playerFactory('小强', 'red');
//蓝队：
var player5 = playerFactory('黑妞', 'blue'),
    player6 = playerFactory('葱头', 'blue'),
    player7 = playerFactory('胖墩', 'blue'),
    player8 = playerFactory('海盗', 'blue');
// 红队阵亡
player1.die();
player2.die();
player4.die();
player3.die(); 
 */




/* 
// 案例3：中介者模式改进案例2，更改为多玩家
// 操作转交给中介者对象
function Player(name, teamColor) {
    this.name = name // 角色名称
    this.teamColor = teamColor // 队伍颜色
    this.state = 'alive' // 玩家生存状态
}
Player.prototype.win = function () {
    console.log(this.name + 'won')
}
Player.prototype.lose = function () {
    console.log(this.name + 'lost')
}
// 玩家死亡
Player.prototype.die = function () {
    this.state = 'dead'
    playerDirector.reciveMessage('playerDead', this) // 给中介这发消息
}
// 移除玩家
Player.prototype.remove = function () {
    playerDirector.reciveMessage('removePlayer', this) // 给中介者发送消息，移除一个玩家
}
// 玩家换队
Player.prototype.changeTeam = function (color) {
    playerDirector.reciveMessage('changeTeam', this, color) // 给中介发送消息，玩家换队
}
// 创建玩家的工厂函数
var playerFactory = function (name, teamColor) {
    var newPlayer = new Player(name, teamColor) // 创造一个新的玩家对象
    playerDirector.reciveMessage('addPlayer', newPlayer)
    return newPlayer
}
// 中介者对象
var playerDirector = (function () {
    var players = {}, // 保存所有玩家
        operations = {} //中介者可以执行的操作
    // 新增一个玩家
    operations.addPlayer = function (player) {
        var teamColor = player.teamColor // 玩家的队伍颜色
        players[teamColor] = players[teamColor] || [] // 该颜色的玩家如果没成立，则新建一个队伍
        players[teamColor].push(player) // 添加玩家进队伍
    }
    // 移除一个玩家
    operations.removePlayer = function (player) {
        var teamColor = player.teamColor, // 玩家的队伍颜色
            teamPlayers = players[teamColor] || [] // 该队伍所有成员
        for (var i = teamPlayers.length - 1; i >= 0; i--) {
            if (teamPlayers[i] === player) {
                teamPlayers.splice(i, 1)
            }
        }
    }
    // 玩家换队
    operations.changeTeam = function (player, newTeamColor) {
        operations.removePlayer(player) // 从原队伍中删除
        player.teamColor = newTeamColor // 改变队伍颜色
        operations.addPlayer(player) // 增加到新队伍中
    }
    // 玩家死亡
    operations.playerDead = function (player) {
        var teamColor = player.teamColor,
            teamPlayers = players[teamColor] // 玩家所在队伍

        var all_dead = true
        for (var i = 0; i < teamPlayers.length; i++) {
            var player = teamPlayers[i]
            if (player.state !== 'dead') {
                all_dead = false
                break
            }
        }
        if (all_dead === true) { // 全部死亡
            for (var i = 0; i < teamPlayers.length; i++) {
                var player = teamPlayers[i]
                player.lose() // 本队所有玩家lose
            }
            for (var color in players) {
                if (color !== teamColor) {
                    var teamPlayers = players[color] // 其他队伍颜色
                    for (var i = 0; i < teamPlayers.length; i++) {
                        var player = teamPlayers[i]
                        player.win() // 其他队伍所有玩家win
                    }
                }
            }
        }
    }
    // 传递消息
    var reciveMessage = function () {
        var message = Array.prototype.shift.call(arguments) // arguments第一个参数为消息名称
        operations[message].apply(this, arguments)
    }
    return {
        reciveMessage: reciveMessage
    }
})()
// 红队：
var player1 = playerFactory('皮蛋', 'red'),
    player2 = playerFactory('小乖', 'red'),
    player3 = playerFactory('宝宝', 'red'),
    player4 = playerFactory('小强', 'red')
// 蓝队：
var player5 = playerFactory('黑妞', 'blue'),
    player6 = playerFactory('葱头', 'blue'),
    player7 = playerFactory('胖墩', 'blue'),
    player8 = playerFactory('海盗', 'blue')
// 执行
// player1.die();
// player2.die();
// player3.die();
// player4.die();
player1.changeTeam('blue');
player2.die();
player3.die();
player4.die();
 */





/* 
// 案例4：传统方式--购买商品
var goods = { // 手机库存
    'red|32G': 3,
    'red|16G': 0,
    'blue|32G': 1,
    'blue|16G': 6
}
var colorSelect = document.getElementById('colorSelect'),
    numberInput = document.getElementById('numberInput'),
    memorySelect = document.getElementById('memorySelect'),
    memoryInfo = document.getElementById('memoryInfo'),
    colorInfo = document.getElementById('colorInfo'),
    numberInfo = document.getElementById('numberInfo'),
    nextBtn = document.getElementById('nextBtn')
colorSelect.onchange = function () {
    var color = this.value, // 颜色
        number = numberInput.value, // 数量
        memory = memorySelect.value,
        stock = goods[color + '|' + memory] // 该颜色对应的当前库存
    colorInfo.innerHTML = color
    if (!color) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择手机颜色'
        return
    }
    if (!memory) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请选择内存大小';
        return;
    }
    if (((number - 0) | 0) !== number - 0) { // 用户输入的购买数量是否为正整数
        nextBtn.disabled = true
        nextBtn.innerHTML = '请输入正确的购买数量'
        return
    }
    if (number > stock) { // 当前选择数量没有超过库存量
        nextBtn.disabled = true
        nextBtn.innerHTML = '库存量不足'
        return
    }
    nextBtn.disabled = false
    nextBtn.innerHTML = '放入购物车'
}
numberInput.oninput = function () {
    var color = colorSelect.value, // 颜色
        number = this.value, // 数量
        stock = goods[color] // 该颜色手机对应的当前库存
    numberInfo.innerHTML = number
    if (!color) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择手机颜色'
        return
    }
    if (((number - 0) | 0) !== number - 0) { // 输入购买数量是否为整数
        nextBtn.disabled = true
        nextBtn.innerHTML = '请输入正确的购买数量'
        return
    }
    if (number > stock) { // 当前选择数量没有超过库存量
        nextBtn.disabled = true
        nextBtn.innerHTML = '库存不足'
        return
    }
    nextBtn.disabled = false
    nextBtn.innerHTML = '放入购物车'
}
memorySelect.onchange = function () {
    var color = colorSelect.value, // 颜色
        number = numberInput.value, // 数量
        memory = this.value,
        stock = goods[color + '|' + memory] // 该颜色手机对应的当前库存
    memoryInfo.innerHTML = memory
    if (!color) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择手机颜色'
        return
    }
    if (!memory) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择内存大小'
        return
    }
    if (((number - 0) | 0) !== number - 0) { // 输入购买数量是否为正整数
        nextBtn.disabled = true
        nextBtn.innerHTML = '请输入正确的购买数量'
        return
    }
    if (number > stock) { // 当前选择数量没有超过库存量
        nextBtn.disabled = true
        nextBtn.innerHTML = '库存不足'
        return
    }
    nextBtn.disabled = false
    nextBtn.innerHTML = '放入购物车'
};
 */



// 案例5：优化案例4--引入中介者
// 所有操作都通过中介者
var goods = {
    'red|32G': 3,
    'red|16G': 0,
    'blue|32G': 1,
    'blue|16G': 6,
}
// 中介者定义
var mediator = (function () {
    var colorSelect = document.getElementById('colorSelect'),
        memorySelect = document.getElementById('memorySelect'),
        numberInput = document.getElementById('numberInput'),
        colorInfo = document.getElementById('colorInfo'),
        memoryInfo = document.getElementById('memoryInfo'),
        numberInfo = document.getElementById('numberInfo'),
        nextBtn = document.getElementById('nextBtn')
    return {
        changed: function (obj) {
            var color = colorSelect.value, // 颜色
                memory = memorySelect.value, // 内存
                number = numberInput.value, // 数量
                stock = goods[color + '|' + memory]
            if (obj === colorSelect) { // 改变的是颜色下拉框
                colorInfo.innerHTML = color
            } else if (obj === memorySelect) {
                memoryInfo.innerHTML = memory
            } else if (obj === numberInput) {
                numberInfo.innerHTML = number
            }
            if (!color) {
                nextBtn.disabled = true
                nextBtn.innerHTML = '请选择手机颜色'
                return
            }
            if (!memory) {
                nextBtn.disabled = true
                nextBtn.innerHTML = '请选择内存大小'
                return
            }
            if (((number - 0) | 0) !== number - 0) { // 输入购买数量是否为正整数
                nextBtn.disabled = true
                nextBtn.innerHTML = '请输入正确的购买数量'
                return
            }
            if (number > stock) { // 当前选择数量没有超过库存量
                nextBtn.disabled = true
                nextBtn.innerHTML = '库存不足'
                return
            }
            nextBtn.disabled = false
            nextBtn.innerHTML = '放入购物车'
        }
    }
})()
colorSelect.onchange = function () {
    mediator.changed(this)
}
memorySelect.onchange = function () {
    mediator.changed(this);
};
numberInput.oninput = function () {
    mediator.changed(this);
};