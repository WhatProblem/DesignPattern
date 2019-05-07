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