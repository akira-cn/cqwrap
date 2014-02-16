define(function(require, exports, module){
    var BaseScene = require('cqwrap/scenes').BaseScene,
        GameLayer = require('cqwrap/layers').GameLayer,
        Button = require('cqwrap/buttons').Button;

    var BaseSprite = require('cqwrap/sprites').BaseSprite;

    var MyLayer = GameLayer.extend({
        init: function(){
            this._super();

            var size = director.getWinSize();

            var sprite = cc.createSprite({
                texture: 'res/img/HelloWorld.png',
                anchor: [0.5, 0.5],
                xy: [size.width/2, size.height/2]
            });
            this.addChild(sprite);

            var closeBtn = new Button({
                texture: 'res/img/CloseNormal.png',
                anchor: [0.5, 0.5],
                xy: [size.width - 50, 50]
            }, function(){
                cc.log('close button clicked');
            });

            this.addChild(closeBtn);
            window.closeBtn = closeBtn;
        }
    });

    var MyScene = BaseScene.extend({
        init:function () {
            this._super();

            var layer = new MyLayer();
            this.addChild(layer);
        }
    });

    module.exports = MyScene;
});