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

            var label = cc.createSprite('@基本概念 之 \n Sprites & Anchor', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 400],
                fontSize: 44,
                size: [700, 128],
                textAlign: 'center'
            });

            this.addChild(label);   

            this.pushAction(function(){
                var rect = new RectSprite(cc.c4f(0,0.5,0,1)
                    , cc.c4f(0,0.5,1,1), 'anchor\n 0, 0');

                rect.setStyle({
                    size: [100, 100],
                    xy: [180, 100],
                    anchor: [0, 0],
                    opacity: 0
                });
                this.addChild(rect);    

                this.delegate(rect, 'touchstart', function(touch, target){
                    target.scaleBy(1.0, 0.5).reverse()
                        .rotateBy(2.0, 360).act();
                });

                rect = new RectSprite(cc.c4f(0,0.5,0,1)
                    , cc.c4f(0,0.5,1,1), 'anchor\n 0.5, 0.5');

                rect.setStyle({
                    size: [100, 100],
                    xy: [380, 270],
                    anchor: [0.5, 0.5],
                    opacity: 0
                });
                this.addChild(rect); 

                this.delegate(rect, 'touchstart', function(touch, target){
                    target.scaleBy(1.0, 0.5).reverse()
                        .rotateBy(2.0, 360).act();
                }); 

                rect = new RectSprite(cc.c4f(0,0.5,0,1)
                    , cc.c4f(0,0.5,1,1), 'anchor\n 1.0, 1.0');

                rect.setStyle({
                    size: [100, 100],
                    xy: [580, 150],
                    anchor: [1.0, 1.0],
                    opacity: 0
                });
                this.addChild(rect);  

                this.delegate(rect, 'touchstart', function(touch, target){
                    target.scaleBy(1.0, 0.5).reverse()
                        .rotateBy(2.0, 360).act();
                });
            });

            this.setNextScene(require('src/view/ppt_06')); 
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