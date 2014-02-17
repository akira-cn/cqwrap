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

            var label = cc.createSprite('@快速上手', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 400],
                fontSize: 44,
                size: [700, 128],
                textAlign: 'center'
            });

            this.addChild(label);   

            this.pushAction(function(){
                var commands = [
                    'sudo npm install -g cqwrap',
                    'cqwrap -o my_game',
                    'cd my_game & ./server.sh',
                    'visit: http://localhost:8000'
                ];
                var label = cc.createSprite('@' + commands.join('\n'), {
                    anchor: [0.5, 0.5],
                    xy: [size.width/2, 300],
                    fontSize: 24,
                    size: [500, 128],
                    textAlign: 'left'
                });     

                this.addChild(label);           
            });

            this.setNextScene(require('src/view/ppt_07')); 
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