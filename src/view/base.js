
define(function(require, exports, module){
    var GameLayer = require('cqwrap/layers').GameLayer;
    var BaseSprite = require('cqwrap/sprites').BaseSprite;

    var PPTLayer = GameLayer.extend({
        pushAction: function(act){
            this._actions.push(act);
        },
        init: function(){
            this._super();
            this._actions = [];
            this.delegate(this, 'touchstart', function(){
                var action = this._actions.shift();
                if(action){
                    action.apply(this, arguments);
                }
                if(this._actions.length <= 0){
                    this._actions.push(action);
                }
            });
        },
        setNextScene: function(NextScene){
            this.pushAction(function(){
                var transations = [
                    cc.TransitionSlideInR,
                    cc.TransitionSlideInB,
                    cc.TransitionSlideInT,
                    cc.TransitionSlideInL,
                    cc.TransitionCrossFade,
                    cc.TransitionFade,
                    cc.TransitionFadeTR,
                    cc.TransitionZoomFlipX,
                    cc.TransitionZoomFlipY
                ];
                var transation = cc.random(transations);
                var scene = transation.create(1.0, new NextScene());
                director.pushScene(scene);
            });
        },
        backClicked: function(){
            director.popScene();
        }
    });

    var RectSprite = BaseSprite.extend({
        init: function(border, bg, text, fontSize){
            this._super();
            this._border = border;
            this._bg = bg;
            this._text = text || '';
            this._fontSize = fontSize || 24;
        },
        onEnter: function(){
            this._super();
            //cc.log(this.getBoundingBox()); 
            var drawNode = cc.DrawNode.create(); 
            var size = this.getContentSize();
            var points = [
                cc.p(0, 0),
                cc.p(size.width, 0),
                cc.p(size.width, size.height),
                cc.p(0, size.height)
            ];
            drawNode.drawPoly(points, this._border, 1, this._bg ); 
            drawNode.setZOrder(-1);
            this.addChild(drawNode);   

            if(this._text){
                var labelScene1 = cc.createSprite('@'+this._text, {
                    anchor: [0.5, 0.5],
                    xy: [size.width/2, size.height/2],
                    fontSize: this._fontSize
                });

                this.addChild(labelScene1);   
            }    
        }
    });

    var ArrowSprite = BaseSprite.extend({
        init: function(x, y, color, direct){
            this._super();
            var drawNode = cc.DrawNode.create(); 
            if(!direct){
                drawNode.drawSegment( 
                    cc.p(0, 0), cc.p(0, y), 1, color );
                drawNode.drawSegment( 
                    cc.p(0, y), cc.p(x, y), 1, color );
                drawNode.drawSegment(
                    cc.p(x, y), cc.p(x-5, y-5), 1, color);
                drawNode.drawSegment(
                    cc.p(x, y), cc.p(x-5, y+5), 1, color);
            }else{
                drawNode.drawSegment( 
                    cc.p(0, 0), cc.p(x, 0), 1, color );
                drawNode.drawSegment( 
                    cc.p(x, 0), cc.p(x, y), 1, color );   
                drawNode.drawSegment(
                    cc.p(x, y), cc.p(x-5, y-5), 1, color);
                drawNode.drawSegment(
                    cc.p(x, y), cc.p(x+5, y-5), 1, color);             
            }           
            this.addChild(drawNode);            
        }
    });

    module.exports = {
        PPTLayer: PPTLayer,
        RectSprite: RectSprite,
        ArrowSprite: ArrowSprite   
    };    
});