define(function(require, exports, module){
    var BaseScene = require('cqwrap/scenes').BaseScene,
        BgLayer = require('cqwrap/layers').BgLayer,
        PPTLayer = require('src/view/base').PPTLayer;

    var BaseSprite = require('cqwrap/sprites').BaseSprite;

    var MyLayer = PPTLayer.extend({
        init: function(){
            this._super();

            var size = director.getWinSize();

            var label = cc.createSprite('@Learning Cocos2dx-html5 \n with Cqwrap', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 350],
                fontSize: 44,
                size: [700, 128],
                textAlign: 'center'
            });

            this.addChild(label);

            var who = cc.createSprite('@mailto: akira.cn@gmail.com', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 1240],
                fontSize: 28,
                textAlign: 'center'
            });

            this.pushAction(function(){
                who .moveTo(0.5, cc.p(size.width/2, 240))  
                    .jumpTo(0.2, cc.p(size.width/2, 240), 50, 1)
                    .rotateTo(1.0, -5).rotateTo(1.0, 5).repeat(0, 2).act();
            });

            this.addChild(who);
            this.setNextScene(require('src/view/ppt_02'));
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