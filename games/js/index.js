console.log(gamePlay)
const config = {
    type: Phaser.AUTO,
    width: cw,
    height: ch,
    parent: 'app',
    scene: [
        gameStart,
        gamePlay,
    ],
    physics: {
        default: 'arcade', //设置物理引擎
        arcade: {
            gravity: {
                y: 700,   //重力值
            },
        }
    },
}

const game = new Phaser.Game(config);