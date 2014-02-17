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

            var size = director.getWinSize();

            var label = cc.createSprite('@基本概念 之 \n Director、Scenes、Layers', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 400],
                fontSize: 44,
                size: [700, 128],
                textAlign: 'center'
            });

            this.addChild(label);

            var directorSprite = cc.createSprite('res/img/director.png', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 120]
            });

            this.addChild(directorSprite);

            this.pushAction(function(){
                directorSprite.setStyle({
                    texture: 'res/img/director2.png'
                });

                var rect = new RectSprite(cc.c4f(0,0.5,0,1), cc.c4f(0,0.5,1,1), 'scene');
                rect.setStyle({
                    size: [140, 50],
                    xy: [100, 100],
                    anchor: [0, 0],
                    opacity: 0
                });
                this.addChild(rect);

                var arrow1 = new ArrowSprite(350, 90, cc.c4f(0, 1, 0, 1));
                arrow1.setStyle({
                    xy: [170, 160],
                    anchor: [0, 0]
                });
                this.addChild(arrow1);

                rect = new RectSprite(cc.c4f(0,0.5,0,1), cc.c4f(0,0.5,1,1), 'layer1');
                rect.setStyle({
                    size: [140, 50],
                    xy: [550, 100],
                    anchor: [0, 0],
                    opacity: 0
                });
                this.addChild(rect);

                rect = new RectSprite(cc.c4f(0,0.5,0,1), cc.c4f(0,0.5,1,1), 'layer2');
                rect.setStyle({
                    size: [140, 50],
                    xy: [550, 160],
                    anchor: [0, 0],
                    opacity: 0
                });
                this.addChild(rect);

                rect = new RectSprite(cc.c4f(0,0.5,0,1), cc.c4f(0,0.5,1,1), 'layer3');
                rect.setStyle({
                    size: [140, 50],
                    xy: [550, 220],
                    anchor: [0, 0],
                    opacity: 0
                });
                this.addChild(rect);                
            });    

            this.setNextScene(require('src/view/ppt_04')); 
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