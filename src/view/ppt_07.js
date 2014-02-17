define(function(require, exports, module){
    var BaseScene = require('cqwrap/scenes').BaseScene,
        BgLayer = require('cqwrap/layers').BgLayer,
        PPTLayer = require('src/view/base').PPTLayer,
        RectSprite = require('src/view/base').RectSprite,
        ArrowSprite = require('src/view/base').ArrowSprite;

    var BaseSprite = require('cqwrap/sprites').BaseSprite;

    var MyLayer = PPTLayer.extend({
        init: function(){
            this._super();

            //加载游戏素材资源
            var cache = cc.SpriteFrameCache.getInstance();
                cache.addSpriteFrames("res/img/flappy_packer.plist", "res/img/flappy_packer.png");

            var size = director.getWinSize();

            var label = cc.createSprite('@精灵与动画 之\n扑腾小鸟', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 400],
                fontSize: 44,
                size: [700, 128],
                textAlign: 'center'
            });

            this.addChild(label);   

            this.pushAction(function(){
                //我是一只小小小小鸟
                var bird = cc.createSprite('bird1.png', {
                    anchor: [0.5, 0],
                    xy: [220, 250],
                    zOrder: 2,
                    scale: 0.5
                });

                this.addChild(bird); 
                this.bird = bird;  

                var code = cc.createSprite('res/img/code_bird_0.png', {
                    anchor: [0, 0],
                    xy: [350, 210],
                    zOrder: 2,
                    scale: 0.5
                });
                this.addChild(code); 
            });

            this.pushAction(function(){
                this.bird.animate(0.6, 'bird1.png', 'bird2.png', 'bird3.png').repeat().act();
                var code = cc.createSprite('res/img/code_bird_1.png', {
                    anchor: [0, 0],
                    xy: [100, 150],
                    zOrder: 2,
                    scale: 0.5
                });
                code.fadeOut(0.2).fadeIn(0.2).repeat(3).act();
                this.addChild(code); 
            });

            this.pushAction(function(){
                this.bird.moveBy(0.3, cc.p(0, -20)).reverse().repeat().act();
                var code = cc.createSprite('res/img/code_bird_2.png', {
                    anchor: [0, 0],
                    xy: [106, 120],
                    zOrder: 2,
                    scale: 0.5
                });
                code.fadeOut(0.2).fadeIn(0.2).repeat(3).act();
                this.addChild(code); 
            });

            this.pushAction(function(){
                var bird = this.bird;
                var birdX = bird.getPositionX();
                var birdY = bird.getPositionY();
                var fallTime = birdY / 300;

                bird.stopAllActions();
                bird.animate(0.2, 'bird1.png', 'bird2.png', 'bird3.png').repeat().act();

                var jumpHeight = Math.min(1280 - birdY, 120);
                bird.moveBy(0.2, cc.p(0, jumpHeight), cc.EaseOut, 2).act();

                bird.rotateTo(0.2, -20).act();
                bird.delay(0.2).moveTo(fallTime, cc.p(birdX, 50), cc.EaseIn, 2)
                    .then(function(){
                        bird.stopAllActions();
                    }).act();

                bird.delay(0.5).rotateTo(fallTime - 0.3, 90, 0, cc.EaseIn, 2).act();
            });
            this.setNextScene(require('src/view/ppt_08')); 
        }
    });

    var MyScene = BaseScene.extend({
        init:function () {
            this._super();

            var bg = new BgLayer('res/img/background.jpg');
            this.addChild(bg);

            var layer = new MyLayer();
            this.addChild(layer);
        }
    });

    module.exports = MyScene;
});