/*
*
* */

var AnimationManager = cc.Node.extend({
    _instance: null,

    ctor: function () {
        this._super();
        if (this._instance === null) {
            this._instance = this;
        }
        this.initiate();
    },

    initiate: function () {
        // Load all sprites
        cc.spriteFrameCache.addSpriteFrames(res.Animation_Lesser);
        cc.spriteFrameCache.addSpriteFrames(res.Animation_Elite);
        cc.spriteFrameCache.addSpriteFrames(res.Animation_Captain);

        // Generate animations for each enemy types
        for (let i = 0; i < TDF.ENEMY_INDEX.length; i++) {
            this.presetAnimationForType(TDF.ENEMY_INDEX[i]);
        }
    },

    presetAnimationForType: function (type) {
        for (let i = 0; i < TDF.DIRECTIONS_INDEX.length; i++) {
            this.presetEnemyAnimation(type, TDF.DIRECTIONS_INDEX[i]);
        }
    },

    presetEnemyAnimation: function (type, direction) {
        let frames = [];
        let startIndex = type.ANI_FRAME * direction.startFrameMultiplier;
        let endIndex = startIndex + type.ANI_FRAME;
        let animationName = type.name + direction.name;

        // get all frames
        for (let i = startIndex; i < endIndex; i++) {
            let f = cc.spriteFrameCache.getSpriteFrame(type.SPRITE_BASE + Utils.intTo4Chars(i) + ".png");
            frames.push(f);
        }

        let animation = new cc.Animation(frames, 0.1);
        cc.AnimationCache.getInstance().addAnimation(animation, animationName);
    },
});