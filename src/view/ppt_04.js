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

            var label = cc.createSprite('@基本概念 之 \n Resolution Design', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 400],
                fontSize: 44,
                size: [700, 128],
                textAlign: 'center'
            });

            this.addChild(label);   

            this.pushAction(function(){
                var rect = new RectSprite(cc.c4f(0,0.5,0,1)
                    , cc.c4f(0,0.5,1,1), 'device\n320*240');
                rect.setStyle({
                    size: [320, 240],
                    xy: [180, 100],
                    anchor: [0, 0],
                    opacity: 0
                });
                this.addChild(rect);                   
            });

            this.pushAction(function(){
                var noBorder = new RectSprite(cc.c4f(0,0,0,0.5)
                    , cc.c4f(0,0.5,0,1), 'resolution\n800*480\nno-border');
                noBorder.setStyle({
                    size: [400, 240],
                    xy: [140, 100],
                    anchor: [0, 0],
                    opacity: 0
                });
                this.addChild(noBorder); 
                this.noBorder = noBorder;
            });

            this.pushAction(function(){
                this.noBorder.removeFromParent(true);

                var showAll = new RectSprite(cc.c4f(0.5,0,0,0.5)
                    , cc.c4f(0,0.5,0,1), 'resolution\n800*480\nshow-all');

                showAll.setStyle({
                    size: [320, 192],
                    xy: [180, 100 + (240 - 192)/2],
                    anchor: [0, 0],
                    opacity: 0
                });
                this.addChild(showAll); 
            });

            this.setNextScene(require('src/view/ppt_05')); 
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