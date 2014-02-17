define(function(require, exports, module){
    var BaseScene = require('cqwrap/scenes').BaseScene,
        BgLayer = require('cqwrap/layers').BgLayer,
        PPTLayer = require('src/view/base').PPTLayer;

    var BaseSprite = require('cqwrap/sprites').BaseSprite;

    var MyLayer = PPTLayer.extend({
        init: function(){
            this._super();

            var size = director.getWinSize();

            var label = cc.createSprite('@提纲', {
                anchor: [0.5, 0.5],
                xy: [size.width/2 - 150, 350],
                fontSize: 44,
                size: [700, 128],
                textAlign: 'center'
            });

            this.addChild(label);

            var text = [
                '基本概念',
                '快速上手',
                '精灵与动画',
                '响应事件',
                '高级玩法'
            ];

            var content = cc.createSprite('@' + text.join('\n'), {
                anchor: [0, 0.5],
                xy: [size.width/2, 140],
                fontSize: 28,
                size: [500, 328],
                textAlign: 'left'
            });

            this.addChild(content);

            this.setNextScene(require('src/view/ppt_03'));
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