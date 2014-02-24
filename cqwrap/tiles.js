define(function(require, exports, module){

var BaseNode = require('cqwrap/nodes').BaseNode;

var TileNode = BaseNode.extend({
    init: function(width, height){
        height = height || width;
        this.width = width;
        this.height = height;
    },
    addChild: function(sprite, x, y) {
        this.setXY(sprite, x, y);
        this._super(sprite);
    },
    setXY: function(sprite, x, y) {
        if(!sprite._pos){
            var pos = sprite.getStyle('xy'); 
            sprite._pos = cc.p(pos.x, pos.y);         
        }
        sprite.setStyle({
            xy: [x * this.width + sprite._pos.x, y * this.height + sprite._pos.y],
        });        
    },
    setPoint: function(sprite, point){
        this.setXY(sprite, point.x, point.y);
    },
    locationToPoint: function(location) {
        var pos = this.getPosition();
        var x = 0 | (location.x - pos.x) / this.width,
            y = 0 | (location.y - pos.y) / this.height;

        return cc.p(x, y);
    },
    pointToLocation: function(point, anchor) {
        anchor = anchor || cc.p(0.5, 0.5);
        var pos = this.getPosition();

        return cc.p(pos.x + (point.x + anchor.x) * this.width,
            pos.y + (point.y + anchor.y) * this.height);
    }
});

module.exports = {
    TileNode: TileNode
};

});