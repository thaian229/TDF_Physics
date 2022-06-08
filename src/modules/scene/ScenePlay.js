/**
 * Simple Scene
 */

var g_shared_layer = null;

var ScenePlay = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,
    _map: null,
    _deltaTimeSpawned: 0.0,
    _spawnInterval: TDF.MIN_SPAWN_INTERVAL,
    _animator: null,

    ctor: function () {
        this._super();
        g_shared_layer = this;
        this.loadGui();
        this.scheduleUpdate();
    },

    loadGui: function () {
        this.removeAllChildren();
        var size = cc.winSize;

        // Add animator
        this._animator = new AnimationManager();

        // Add map
        this._map = new TDFMap();
        this.addChild(this._map);
        this._map.setPosition( (size.width - this._map._width) / 2, (size.height - this._map._height) / 2);

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52, "Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));
    },

    onEnter: function () {
        this._super();
    },

    update: function (dt) {
        this._deltaTimeSpawned += dt;
        if (this._deltaTimeSpawned > this._spawnInterval) {
            // spawn enemy
            let indexType = Math.floor(Math.random() * TDF.ENEMY_INDEX.length);
            this._map.spawnEnemy(TDF.ENEMY_INDEX[indexType]);

            // Choose next randomized spawn interval
            this._deltaTimeSpawned = 0.0;
            this._spawnInterval = TDF.MIN_SPAWN_INTERVAL + (Math.random() * (TDF.MAX_SPAWN_INTERVAL - TDF.MIN_SPAWN_INTERVAL));
        }
    },

    onSelectBack: function (sender) {
        fr.view(SceneMenu);
    }
});