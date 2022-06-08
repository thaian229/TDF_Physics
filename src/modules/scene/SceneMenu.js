/**
 * Created by GSN on 7/6/2015.
 */

var SceneMenu = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,

    ctor: function () {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = 3 * size.height / 5;

        var btnPlay = gv.commonButton(200, 64, cc.winSize.width / 2, yBtn / 2, "Play");
        this.addChild(btnPlay);
        btnPlay.addClickEventListener(this.onSelectPlatformer.bind(this));

    },

    onEnter: function () {
        this._super();
    },

    onSelectPlatformer: function (sender) {
        fr.view(ScenePlay);
    }
});