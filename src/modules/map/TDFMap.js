/*
* Map object, holds all terrains, enemies. etc/
* */

var TDFMap = cc.Node.extend({
    _instance: null,
    _cells: [[]],
    _movePath: [],
    _width: 0,
    _height: 0,
    _pathFinder: null,

    ctor: function () {
        this._super();
        if (this._instance === null) {
            this._instance = this;
        }

        this._cells = new Array(TDF.MAP_HEIGHT_TILES);
        for (let i = 0; i < this._cells.length; i++) {
            this._cells[i] = new Array(TDF.MAP_WIDTH_TILES);
        }

        this._pathFinder = new Pathfinder(this);
        this.generateMap();
    },

    initiate: function () {
        this._cells = new Array(TDF.MAP_HEIGHT_TILES);

        let i, j;
        for (i = 0; i < this._cells.length; i++) {
            this._cells[i] = new Array(TDF.MAP_WIDTH_TILES);
        }

        for (i = 0; i < TDF.MAP_HEIGHT_TILES; i++ ) {
            for (j = 0; j < TDF.MAP_WIDTH_TILES; j++) {
                this._cells[i][j] = new Terrain(TDF.TERRAINS.NONE);
            }
        }
        this._movePath = [];
        this._width = TDF.MAP_WIDTH_TILES * TDF.TILE_SIZE;
        this._height = TDF.MAP_HEIGHT_TILES * TDF.TILE_SIZE;
    },

    generateMap: function () {
        this.initiate();
        this.generateRandomPath(0, 0, 6, 6);

        let obstacleCount = 0, i, j;

        for (i = 0; i < TDF.MAP_HEIGHT_TILES; i++ ) {
            for (j = 0; j < TDF.MAP_WIDTH_TILES; j++) {
                if (this._cells[i][j]._type.Type !== -1) continue;

                let terrain = null;
                // Adding obstacles or base
                if (this.hasObstacleNearby(i, j) || obstacleCount >= TDF.MAX_OBSTACLE_NUMBER) {
                    terrain = new Terrain(TDF.TERRAIN_INDEX[1]);
                } else {
                    // able to add obstacle, but still random since obstacle should be rare
                    let chance = Math.random();
                    if (chance < 0.2) {
                        let index = 2 + Math.floor(Math.random() * 2);
                        terrain = new Obstacle(TDF.TERRAIN_INDEX[index]);
                        obstacleCount++;
                    } else {
                        terrain = new Terrain(TDF.TERRAIN_INDEX[1]);
                    }
                }
                this.addTerrainToCell(i, j, terrain);
            }
        }
    },

    generateRandomPath: function (sx, sy, tx, ty) {
        this._movePath = this._pathFinder.randomPath(sx, sy, tx, ty);
        for (let i = 0; i < this._movePath.length; i++) {
            let terrain = new Terrain(TDF.TERRAIN_INDEX[0]);
            this.addTerrainToCell(this._movePath[i].x, this._movePath[i].y, terrain);
        }
    },

    hasObstacleNearby: function (i, j) {
        let nearby = this.getNearbyCellNonDiagonal(i, j);
        for (let i = 0; i < nearby.length; i++) {
            if (nearby[i]._type.IsDestroyable) return true;
        }
        return false;
    },

    getNearbyCellNonDiagonal: function (i, j) {
        let nearby = [];
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                if (x !== 0 && y !== 0) continue;
                if (x === 0 && y === 0) continue;
                if (i + x < 0 || i + x >= TDF.MAP_WIDTH_TILES || j + y < 0 || j + y >= TDF.MAP_HEIGHT_TILES) continue;
                nearby.push(this._cells[i + x][j + y]);
            }
        }
        return nearby;
    },

    addTerrainToCell: function (x, y, terrain) {
        this._cells[x][y] = terrain;
        this.addChild(terrain);
        terrain.setPosition(x * TDF.TILE_SIZE, (TDF.MAP_HEIGHT_TILES - 1 - y) * TDF.TILE_SIZE);
    },

    getPointFromCell: function (x, y) {
        let xp = x * TDF.TILE_SIZE + TDF.TILE_SIZE / 2;
        let yp = (TDF.MAP_HEIGHT_TILES - 1 - y) * TDF.TILE_SIZE + TDF.TILE_SIZE / 2;
        return cc.p(xp, yp)
    },

    spawnEnemy: function (type) {
        let enemy = new Enemy(type);
        this.addChild(enemy);
        enemy.setPosition(TDF.TILE_SIZE / 2, (TDF.MAP_HEIGHT_TILES - 1) * TDF.TILE_SIZE + TDF.TILE_SIZE * 0.85);
        return enemy;
    }
});