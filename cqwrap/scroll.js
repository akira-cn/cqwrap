define(function(require, exports, module){

'use strict';

var GameLayer = require('cqwrap/layers').GameLayer;
var EventEmitter = require('cqwrap/events').EventEmitter;

var ScrollLayer = GameLayer.extend({
    onEnter: function(){
        this._super();
        this.setTouchRect(this.getParent().getBoundingBox());
        this.getParent().setTouchPriority(this.getTouchPriority() - 1);
    }
});

var TouchCaptureLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.init.apply(this, arguments);
        cc.associateWithNative( this, cc.Layer );
        cc.mixin(this, new EventEmitter);
    },
    onEnter: function(){
        this._super();
        cc.registerTargetedDelegate(-999999, false, this);
    },
    onExit: function(){
        cc.unregisterTouchDelegate(this);
        this._super();
    },
    onTouchBegan: function(touch, event){
        this.emit('beforescroll', touch, event);
        return true;
    },
    onTouchMoved: function(touch, event){
        this.emit('scroll', touch, event);
        return true;
    },
    onTouchEnded: function(touch, event){
        this.emit('afterscroll', touch, event);
        return true;
    }
});

var ScrollView = cc.ScrollView.extend({
    ctor: function(viewport, contentSize){
        this._super.apply(this, arguments);
        this.init.apply(this, arguments);
        cc.associateWithNative(this, cc.ScrollView);        
    },
    init: function(viewport, contentSize){
        var scrollLayer = new ScrollLayer();
        scrollLayer.setAnchorPoint(cc.p(0, 0));
        scrollLayer.setPosition(cc.p(0, 0));
        scrollLayer.setContentSize(contentSize);
        scrollLayer.setClickAndMove(false);

        this.initWithViewSize(viewport, scrollLayer);

        this.getContentLayer = function(){
            return scrollLayer;
        }       

        var touchCaptureLayer = new TouchCaptureLayer();
        this.addChild(touchCaptureLayer);

        var self = this;
        var startTime, startOffset;

        touchCaptureLayer.on('startscroll', function(touch, event){
            scrollLayer.stopAllActions();
        });

        touchCaptureLayer.on('scroll', function(touch, event){
            var now = Date.now();
            if(!startTime || now - startTime > 500){
                startOffset = self.getContentOffset();
                startTime = Date.now();
            }
        });

        touchCaptureLayer.on('afterscroll', function(touch, event){
            if(startOffset){
                var dur = Date.now() - startTime;
                var offset = self.getContentOffset();
                cc.log(offset);
                var speed = cc.p((offset.x - startOffset.x)/dur, (offset.y - startOffset.y)/dur);
                var t = 500;
                var minOffset = self.minContainerOffset();
                var maxOffset = self.maxContainerOffset();
                var s = cc.p(0.5 * speed.x * t, 0.5 * speed.y * t);

                s = cc.pAdd(offset, s);
                //s = cc.p(Math.round(s.x), Math.round(s.y));
                if(s.x < minOffset.x || s.y < minOffset.y){
                    return;
                }
                if(s.x > maxOffset.x || s.y > maxOffset.x){
                    return;
                }

                scrollLayer.moveTo(t/1000,s , cc.EaseOut, 2).act();
            }
        });
    },
    onEnter: function(){
        this._super();
        cc.log(this.maxContainerOffset());
    }
});

ScrollView.create = function(viewport, contentSize){
    return new ScrollView(viewport, contentSize);
}

module.exports = {
    ScrollView: ScrollView
};

});