define(function(require, exports, module){
    var BaseScene = require('cqwrap/scenes').BaseScene,
        BgLayer = require('cqwrap/layers').BgLayer,
        PPTLayer = require('src/view/base').PPTLayer;

    var BaseSprite = require('cqwrap/sprites').BaseSprite;

    var MyLayer = PPTLayer.extend({
        init: function(){
            this._super();

            var size = director.getWinSize();

            var label = cc.createSprite('@Thanks\nQ & A', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 350],
                fontSize: 44,
                size: [700, 128],
                textAlign: 'center'
            });

            this.addChild(label);

            var download = cc.createSprite('res/img/download.png', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 150],
                scale: 0.75
            });

            this.addChild(download);

            this.pushAction(function(){

            });
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