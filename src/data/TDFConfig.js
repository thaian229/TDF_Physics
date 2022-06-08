var TDF = TDF || {};

// Map config
TDF.MAP_WIDTH_TILES = 7;
TDF.MAP_HEIGHT_TILES = 7;
TDF.TILE_SIZE = 100;

TDF.MAX_OBSTACLE_NUMBER = 7;

// Terrain config
TDF.TERRAINS = {
    NONE: {
        Type: -1,
        IsWalkable: true,
        IsDestroyable: false,
        BaseSpritePath: "sprite/terrain/map_background_0001.png",
        MoveCost: 10,
    },
    DIRT: {
        Type: 0,
        IsWalkable: true,
        IsDestroyable: false,
        BaseSpritePath: "sprite/terrain/map_background_0001.png",
        MoveCost: 25,
    },
    BASE: {
        Type: 1,
        IsWalkable: false,
        IsDestroyable: false,
        BaseSpritePath: "sprite/terrain/map_cell_0002.png",
        MoveCost: 1000,
    },
    STONE: {
        Type: 2,
        IsWalkable: false,
        IsDestroyable: true,
        BaseHP: 100,
        BaseSpritePath: "sprite/terrain/map_cell_0000.png",
        DecorationSpritePath: "sprite/terrain/map_decoration_rock_0001.png",
        MoveCost: 3000,
    },
    TREE: {
        Type: 3,
        IsWalkable: false,
        IsDestroyable: true,
        BaseHP: 35,
        BaseSpritePath: "sprite/terrain/map_cell_0003.png",
        DecorationSpritePath: "sprite/terrain/map_forest_obstacle_1.png",
        MoveCost: 2000,
    }
};

TDF.TERRAIN_INDEX = [
    TDF.TERRAINS.DIRT,
    TDF.TERRAINS.BASE,
    TDF.TERRAINS.STONE,
    TDF.TERRAINS.TREE
];

TDF.TERRAIN_RECT = 35;

// Enemy
TDF.MIN_SPAWN_INTERVAL = 1.0;
TDF.MAX_SPAWN_INTERVAL = 2.0;

let fileName = "res/Monster.json"
let monsterConfig = cc.loader.getRes(fileName);

TDF.ENEMIES = {
    LESSER: {
        name: "lesser",
        BaseHP: monsterConfig["monster"]["1"]["hp"],
        MoveSpeed: monsterConfig["monster"]["1"]["speed"] * TDF.TILE_SIZE,
        BaseDamage: 1,
        SPRITE_BASE: "monster_assassin_run_",
        ANI_FRAME: 10,
    },

    ELITE: {
        name: "elite",
        BaseHP: monsterConfig["monster"]["0"]["hp"],
        MoveSpeed: monsterConfig["monster"]["0"]["speed"] * TDF.TILE_SIZE,
        BaseDamage: 2,
        SPRITE_BASE: "monster_dragon_run_",
        ANI_FRAME: 10,
    },

    CAPTAIN: {
        name: "captain",
        BaseHP: monsterConfig["monster"]["2"]["hp"],
        MoveSpeed: monsterConfig["monster"]["2"]["speed"] * TDF.TILE_SIZE,
        BaseDamage: 5,
        SPRITE_BASE: "monster_giant_run_",
        ANI_FRAME: 16,
    }
};

TDF.ENEMY_INDEX = [
    TDF.ENEMIES.LESSER,
    TDF.ENEMIES.ELITE,
    TDF.ENEMIES.CAPTAIN
];

// Draw order
TDF.ZORDERS = {
    BACKGROUND: 0,
    CELL_BASE: 1,
    CELL_DECOR: 2,
    ENEMY: 1,
    UI: 10
};

TDF.TAGS = {
    CELL: 0,
    ENEMY: 1,
    UI: 2
};

// Animation Config
TDF.DIRECTIONS = {
    DOWN: {
        name: "_down",
        startFrameMultiplier: 0,
        isFlipped: false,
        velocityX: 0.0,
        velocityY: -1.0,
    },
    DOWN_RIGHT: {
        name: "_down_right",
        startFrameMultiplier: 1,
        isFlipped: false,
        velocityX: 0.7,
        velocityY: -0.7,
    },
    DOWN_LEFT: {
        name: "_down_left",
        startFrameMultiplier: 1,
        isFlipped: true,
        velocityX: -0.7,
        velocityY: -0.7,
    },
    RIGHT: {
        name: "_right",
        startFrameMultiplier: 2,
        isFlipped: false,
        velocityX: 1.0,
        velocityY: 0.0,
    },
    LEFT: {
        name: "_left",
        startFrameMultiplier: 2,
        isFlipped: true,
        velocityX: -1.0,
        velocityY: 0.0,
    },
    UP_RIGHT: {
        name: "_up_right",
        startFrameMultiplier: 3,
        isFlipped: false,
        velocityX: 0.7,
        velocityY: 0.7,
    },
    UP_LEFT: {
        name: "_up_left",
        startFrameMultiplier: 3,
        isFlipped: true,
        velocityX: -0.7,
        velocityY: 0.7,
    },
    UP: {
        name: "_up",
        startFrameMultiplier: 4,
        isFlipped: false,
        velocityX: 0.0,
        velocityY: 1.0,
    },
};

TDF.DIRECTIONS_INDEX = [
    TDF.DIRECTIONS.DOWN,
    TDF.DIRECTIONS.DOWN_RIGHT,
    TDF.DIRECTIONS.DOWN_LEFT,
    TDF.DIRECTIONS.RIGHT,
    TDF.DIRECTIONS.LEFT,
    TDF.DIRECTIONS.UP_RIGHT,
    TDF.DIRECTIONS.UP_LEFT,
    TDF.DIRECTIONS.UP,
];