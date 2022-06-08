/*
* A cell on TDFMap, has position and sprite
* */

var Terrain = cc.Node.extend({
    _pos: {
        x: 0,
        y: 0
    },
    _sprite: null,
    _type: null,

    ctor: function (type) {
        this._super();
        this._type = type;
        this.initiate();
    },

    initiate: function () {
        if (!this._type) {
            return;
        }

        // add base cell sprite
        this._sprite = cc.Sprite.create(this._type.BaseSpritePath);
        this.addChild(this._sprite, TDF.ZORDERS.CELL_BASE, TDF.TAGS.CELL);
        this.rescaleSprite(this._sprite);
    },

    rescaleSprite: function (sprite) {
        let scaleX = TDF.TILE_SIZE / sprite.width;
        let scaleY = TDF.TILE_SIZE / sprite.height;
        sprite.setScale(scaleX, scaleY);
        sprite.setPosition(TDF.TILE_SIZE / 2, TDF.TILE_SIZE / 2);
    },

});