const gameStart = {
    key: 'gameStart',
    preload: function() {
        //this 指向new Phaser, image() 第一个参数：图片的key, 第二个参数： 路径
        this.load.image('bg1', './images/bg/bg1.png');
        this.load.image('bg2', './images/bg/bg2.png');
        this.load.image('bg3', './images/bg/bg3.png');
        this.load.image('bg4', './images/bg/bg4.png');
        this.load.image('footer', './images/bg/footer.png');
        this.load.spritesheet('player', './images/player.png', {frameWidth: 144, frameHeight: 120});
        this.load.image('logo', './images/ui/txt-title.png');
        this.load.image('startBtn', './images/ui/btn-press-start.png');
        this.load.image('playerEnd', './images/ui/player-end.png');
    },
    create: function() {
        this.bg4 = this.add.tileSprite(cw/2, ch/2, cw, ch, 'bg4');
        this.bg3 = this.add.tileSprite(cw/2, ch/2, cw, ch, 'bg3');
        this.bg2 = this.add.tileSprite(cw/2, ch/2, cw, ch, 'bg2');
        this.bg1 = this.add.tileSprite(cw/2, ch/2, cw, ch, 'bg1');
        this.footer = this.add.tileSprite(cw/2, 360+45, cw, 90, 'footer');
        this.logo = this.add.image(cw/2, ch/2 - 80, 'logo');
        this.startBtn = this.add.image(cw/2, ch/2 + 10, 'startBtn');
        this.playerEnd = this.add.image(cw/2, ch/2 + 90, 'playerEnd');
        this.logo.setScale(0.5);
        this.startBtn.setScale(0.5);
        this.playerEnd.setScale(0.5);
        this.startBtn.setInteractive();
        this.startBtn.on('pointerdown', () => {
            //跳转场景
            this.scene.start('gamePlay');
        });
    },
    update: function() {
        this.bg1.tilePositionX += 2;
        this.bg2.tilePositionX += 3;
        this.bg3.tilePositionX += 4;
        this.bg4.tilePositionX += 4;
        this.footer.tilePositionX += 2;
    },
};