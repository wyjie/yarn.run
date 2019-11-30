const gamePlay = {
    key: 'gamePlay',
    preload: function() {
        //this 指向new Phaser, image() 第一个参数：图片的key, 第二个参数： 路径
        this.load.image('bg1', './images/bg/bg1.png');
        this.load.image('bg2', './images/bg/bg2.png');
        this.load.image('bg3', './images/bg/bg3.png');
        this.load.image('bg4', './images/bg/bg4.png');
        this.load.image('footer', './images/bg/footer.png');
        this.load.spritesheet('player', './images/player.png', {frameWidth: 144, frameHeight: 120});
        this.time = 30;
        this.speedLV = 1;
        this.stop = false;
    },
    create: function() {
        //sprite 将图片包装成游戏物件
        //tileSprite 将图片包装成游戏物件，而且具有重复的特性
        //x, y, 宽， 高， key
        this.bg4 = this.add.tileSprite(cw/2, ch/2, cw, ch, 'bg4');
        this.bg3 = this.add.tileSprite(cw/2, ch/2, cw, ch, 'bg3');
        this.bg2 = this.add.tileSprite(cw/2, ch/2, cw, ch, 'bg2');
        this.bg1 = this.add.tileSprite(cw/2, ch/2, cw, ch, 'bg1');
        this.footer = this.add.tileSprite(cw/2, 360+45, cw, 90, 'footer');

        this.player = this.physics.add.sprite(150, 150, 'player');
        //设置缩放
        this.player.setScale(0.7);
         //设置碰撞
        this.physics.add.collider(this.player, this.footer);
        //设置弹性 0-1
        this.player.setBounce(1);
        //设置碰撞边界
        this.player.setSize(100, 100);
        //设置运动边界
        this.player.setCollideWorldBounds(true);
        //设置运动动画
        this.anims.create({
            key: 'run',  //定义动画的key
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
            frameRate: 5, //一秒5次
            repeat: -1,  //重复次数 -1 一直重复
        });
        //加速动画
        this.anims.create({
            key: 'speed',  //定义动画的key
            frames: this.anims.generateFrameNumbers('player', {start: 4, end: 5}),
            frameRate: 5, //一秒5次
            repeat: -1,  //重复次数 -1 一直重复
        });
        this.timeText = this.add.text(cw-80, ch-30, `Time ${this.time}`, {color: "#fff", fontsize: '30px'});
        let timer = setInterval(() => {
            this.time--;
            this.timeText.setText(`Time ${this.time}`);
            if (this.time <= 20) {
                this.speedLV = 1.5;
            }
            if (this.time <= 0) {
                clearInterval(timer);
                this.stop = true;
            }
        }, 1000);
        
        //播放
        this.player.anims.play('run', true);

        //地板加入物理引擎
        this.physics.add.existing(this.footer);
        //设置地板静止
        this.footer.body.immovable = true;
        //地板的位置和旋转不会受加速度，阻力，重力的影响
        this.footer.body.moves = false;
    },
    update: function() {  //60fps
        if (this.stop) return;
        this.bg1.tilePositionX += 2 * this.speedLV;
        this.bg2.tilePositionX += 3 * this.speedLV;
        this.bg3.tilePositionX += 4 * this.speedLV;
        this.bg4.tilePositionX += 4 * this.speedLV;

        //keyDown
        const cursor = this.input.keyboard.createCursorKeys();
        if (cursor.right.isDown) {
            this.player.anims.play('speed', true);
            this.player.flipX = false;
            this.player.setVelocityX(200);
        }  else if (cursor.left.isDown) {
            this.player.anims.play('speed', true);
            this.player.flipX = true;// 水平翻转
            this.player.setVelocityX(-200);
        } else {
            this.player.anims.play('run', true);
            this.player.flipX = false;
            this.player.setVelocityX(0);
        }

        if (cursor.up.isDown && this.player.body.touching.down) {

        }
    },
};