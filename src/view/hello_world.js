define(function(require, exports, module){
    var BaseScene = require('cqwrap/scenes').BaseScene,
        GameLayer = require('cqwrap/layers').GameLayer,
        Button = require('cqwrap/buttons').Button;

    var BaseSprite = require('cqwrap/sprites').BaseSprite;

    var MyLayer = GameLayer.extend({
        init: function(){
            this._super();

            var size = director.getWinSize();

            var label = cc.createSprite('@Hello World', {
                anchor: [0.5, 0.5],
                xy: [size.width/2, 600],
                fontSize: 64
            });

            this.addChild(label);

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

            var drawNode = cc.DrawNode.create();
            
            // star poly (doesn't trigger bug... order is important un tesselation is supported.
            o=180;
            w=20;
            h=50;
            star = [
                cc.p(o,o), cc.p(o+w,o-h), cc.p(o+w*2, o),       // lower spike
                cc.p(o + w*2 + h, o+w ), cc.p(o + w*2, o+w*2),  // right spike
                cc.p(o +w, o+w*2+h), cc.p(o,o+w*2),             // top spike
                cc.p(o -h, o+w)                                 // left spike
            ];
            drawNode.drawPoly(star, cc.c4f(1,0,0,0.5), 1, cc.c4f(0,0,1,1) );

            //drawNode.drawDot(cc.p(o, o), 100, cc.c4f( Math.random(), Math.random(), Math.random(), 1));
            //drawNode.setStyle('scaleY', 0.8);
            
            this.addChild(drawNode);

            var cache = cc.SpriteFrameCache.getInstance();
            cache.addSpriteFrames("res/img/birds.json", "res/img/birds.png");

            var bird = cc.createSprite('res/img/bird1.png', {
                xy: [300, 400]
            });

            var AnimationTask = require('cqwrap/animate').AnimationTask;

            var flapTask = new AnimationTask().animate(1.5, 'bird%d.png', 1, 3)
                .repeat();

            /*var bird = cc.createSprite('bird1.png', {
                xy: [300, 400]
            });

            bird.animate(0.5, 'bird1.png', 'bird2.png', 'bird3.png').repeat().act();*/

            bird.act(flapTask);
            this.addChild(bird);

            this.delegate(bird);

            var moveTask = new AnimationTask().moveBy(0.5, cc.p(0, 20)).reverse().repeat();
            //bird.act(moveTask);

            var tasks = [flapTask, moveTask];
            
            bird.on('click',  function(){
                bird.stop(tasks[0]);
                bird.act(tasks.reverse()[0]);
            });

            bird.on('mouseenter', function(){
                if(cc.canvas && cc.canvas.style)
                    cc.canvas.style.cursor = 'pointer';
            });

            bird.on('mouseleave', function(){
                if(cc.canvas && cc.canvas.style)
                    cc.canvas.style.cursor = '';
            });
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