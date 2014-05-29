define(function(require, exports, module){
    var BaseScene = require('cqwrap/scenes').BaseScene,
    GameLayer = require('cqwrap/layers').GameLayer;

    var BaseSprite = require('cqwrap/sprites').BaseSprite;
    var PageView = require('cqwrap/scroll').PageView;

    var MyLayer = GameLayer.extend({
        init: function(){
            this._super();
            var size = director.getWinSize();

            var pageView = new PageView(cc.size(size.width, size.height/2),
                size.width/2, 5);

            this.addChild(pageView);

            var drawNode = cc.DrawNode.create();
            this.addChild(drawNode);

            for(var i = 0; i <= pageView.getMaxPage(); i++){
                var pageLayer = pageView.getPageLayer(i);

                var text = cc.createSprite('@page' + (i+1), {
                    anchor: [0.5, 0.5],
                    xy: [size.width/4, size.height/4],
                    fontSize: 36
                });

                pageLayer.addChild(text);
                pageLayer.setStyle('backgroundColor', cc.c3b(cc.random(255), cc.random(255), cc.random(255)));
                
                drawNode.drawDot(cc.p(size.width/2+(i-3)*50, 120),10,cc.c4f(0.3,0.3,0.3,1));
            }

            pageView.setAnchorPoint(cc.p(0.5, 0.5));
            pageView.setStyle({
                'xy': [0, size.height/4],
            });

            pageView.on('change', function(newPage, oldPage){
                //cc.log(newPage);
                drawNode.clear();
                for(var i = 0; i <= pageView.getMaxPage(); i++){
                    if(i === newPage){
                        drawNode.drawDot(cc.p(size.width/2+(i-3)*50, 120),10,cc.c4f(0.6,0.3,0.6,1));
                    }else{
                        drawNode.drawDot(cc.p(size.width/2+(i-3)*50, 120),10,cc.c4f(0.3,0.3,0.3,1));
                    }
                }
            });

            pageView.setPage(2);
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