define(function(require, exports, module){

'use strict';

var BaseNode = require('cqwrap/nodes').BaseNode,
    BaseSprite = require('cqwrap/sprites').BaseSprite;

var EventEmitter = require('cqwrap/events').EventEmitter;

var Button = BaseNode.extend({
    init: function(sprite, event, callback){
        this._super();

        var style;
        var self = this;

        if(typeof event === 'function'){
            callback = event;
            event = 'click';
        }

        if(typeof sprite === 'string'){
            sprite = new BaseSprite(sprite);
        }

        if(typeof sprite === 'object' && 
            !(sprite instanceof cc.Sprite)){
            style = sprite;
            sprite = cc.createSprite(style.texture);
            delete style.texture;
        }

        cc.mixin(this, new EventEmitter);

        if(callback){
            this.on('touchstart', function(){
                if(!self.activated){
                    var scale = self.getScaleY(); 
                    self.setScale(scale * 0.95, scale * 0.95);
                    sprite.setOpacity(sprite.getOpacity() * 0.8);
                    self.activated = true;
                }
            });

            this.on('touchend', function(){
                if(self.activated){
                    var scale = self.getScaleY();
                    self.setScale(scale / 0.95, scale / 0.95);
                    sprite.setOpacity(sprite.getOpacity() / 0.8);
                    self.activated = false;
                }
            });
            
            this.on(event, callback);
        }
        
        function setSprite(){
            sprite.setAnchorPoint(cc.p(0, 0));
            sprite.setPosition(cc.p(0, 0));
            self.addChild(sprite);
            self.setContentSize(sprite.getContentSize());
        }

        setSprite();
        if(style){
            this.setStyle(style);
        }

        this.setContentSprite = function(newSprite){
            sprite.removeFromParent(true);
            sprite = newSprite;
            setSprite();
        }

        this.getContentSprite = function(){
            return sprite;
        }

        this.isEnabled = function(){
            return callback != null;
        }
    }
});

module.exports = {
    Button: Button
}
});