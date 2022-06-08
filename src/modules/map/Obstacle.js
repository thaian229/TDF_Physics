/*
* Obstacle on map, has HP, type, etc.
* */

var Obstacle = Terrain.extend({
    _spriteDecor: null,
    _HP: 1,

    ctor: function (type) {
        this._super(type);
        this._type = type;
        this.initiate();
    },

    initiate: function () {
        if (!this._type) {
            return;
        }

        // add sprite for base and decor
        this._sprite = cc.Sprite.create(this._type.BaseSpritePath);
        this.addChild(this._sprite, TDF.ZORDERS.CELL_BASE, TDF.TAGS.CELL);
        this.rescaleSprite(this._sprite);
        this._spriteDecor = cc.Sprite.create(this._type.DecorationSpritePath);
        this.addChild(this._spriteDecor, TDF.ZORDERS.CELL_DECOR, TDF.TAGS.CELL);
        this.rescaleSprite(this._spriteDecor);
    }
});