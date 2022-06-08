/*
* Finding a least cost path from 1 point to another
* */

var Pathfinder = cc.Node.extend({
    _openList: [],
    _closedList: [],
    _nodes: null,
    _map: null,
    _maxSearchDistance: 20,
    _randomPCost: null,

    ctor: function (map) {
        this._super();
        this._map = map;
        this.initiate();
    },

    initiate: function () {
        this._openList = [];
        this._closedList = [];
        this._nodes = new Array(TDF.MAP_HEIGHT_TILES);
        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i] = new Array(TDF.MAP_WIDTH_TILES);
        }

        var i, j;
        for (i = 0; i < TDF.MAP_HEIGHT_TILES; i++) {
            for (j = 0; j < TDF.MAP_WIDTH_TILES; j++) {
                this._nodes[i][j] = new PathNode(i, j);
            }
        }
        this.initRandomPCost();
    },

    initRandomPCost: function () {
        this._randomPCost = new Array(TDF.MAP_HEIGHT_TILES);
        for (let i = 0; i < this._randomPCost.length; i++) {
            this._randomPCost[i] = new Array(TDF.MAP_WIDTH_TILES);
            for (let j = 0; j < this._randomPCost[i].length; j++) {
                let r = Math.random();
                if (r < 0.80) {
                    this._randomPCost[i][j] = Math.floor(Math.random() * 2500) + 2500;
                } else {
                    this._randomPCost[i][j] = Math.floor(Math.random() * 100);
                }
            }
        }
    },

    randomPath: function (sx, sy, tx, ty) {
        this.initiate();

        this._nodes[sx][sy]._pCost = 0;
        this._nodes[sx][sy]._depth = 0;
        this._openList.push(this._nodes[sx][sy]);

        this._nodes[tx][ty]._parent = null;

        let maxDepth = 0;
        while ((maxDepth < this._maxSearchDistance) && (this._openList.length !== 0)) {
            let curr = this._openList[0];
            if (curr === this._nodes[tx][ty]) break;

            // remove current out of open
            this._openList.shift();
            // this.removeFromOpen(curr);
            this._closedList.push(curr);
            let x, y;
            for (x = -1; x < 2; x++) {
                for (y = -1; y < 2; y++) {
                    if ((x === 0) && (y === 0)) continue;
                    if ((x !== 0) && (y !== 0)) continue;

                    let xp = x + curr._x;
                    let yp = y + curr._y;
                    if (this.isValidLocation(sx, sy, xp, yp)) {
                        let nextStepCost = curr._pCost + this.getMoveCostRandom(xp, yp);
                        let neighbour = this._nodes[xp][yp];

                        if (nextStepCost < neighbour._pCost) {
                            if (this.inOpenList(neighbour)) this.removeFromOpen(neighbour);
                            if (this.inClosedList(neighbour)) this.removeFromClosed(neighbour);
                        }

                        if (!this.inOpenList(neighbour) && !this.inClosedList(neighbour)) {
                            neighbour._pCost = nextStepCost;
                            neighbour._hCost = Math.abs(this._nodes[tx][ty]._x - neighbour._x) + Math.abs(this._nodes[tx][ty]._y - neighbour._y);
                            maxDepth = Math.max(maxDepth, neighbour.setParentNode(curr));
                            this.addToOpen(neighbour);
                        }
                    }
                }
            }
        }

        if (this._nodes[tx][ty]._parent === null) return null;

        let pathReversed = [], path = [];
        let target = this._nodes[tx][ty];
        while (target !== this._nodes[sx][sy]) {
            pathReversed.push(cc.p(target._x, target._y));
            target = target._parent;
        }
        pathReversed.push(cc.p(target._x, target._y));

        while (pathReversed.length !== 0) {
            path.push(pathReversed.pop());
        }

        return path;
    },

    isValidLocation: function (sx, sy, x, y) {
        if ((x < 0) || (y < 0) || (x >= TDF.MAP_WIDTH_TILES) || (y >= TDF.MAP_HEIGHT_TILES)) {
            return false;
        }
        return this._map._cells[x][y]._type.IsWalkable;
    },

    getMoveCostRandom: function (x, y) {
        return this._randomPCost[x][y];
    },

    getMoveCost: function (x, y) {
        return this._map._cells[x][y]._type.MoveCost;
    },

    inOpenList: function (elem) {
        for (let i = 0; i < this._openList.length; i++) {
            if (this._openList[i] === elem) return true;
        }
        return false;
    },

    removeFromOpen: function (elem) {
        for (let i = 0; i < this._openList.length; i++) {
            if (this._openList[i] === elem) {
                this._openList.slice(i, 1);
                return;
            }
        }
    },

    inClosedList: function (elem) {
        for (let i = 0; i < this._closedList.length; i++) {
            if (this._closedList[i] === elem) return true;
        }
        return false;
    },

    removeFromClosed: function (elem) {
        for (let i = 0; i < this._closedList.length; i++) {
            if (this._closedList[i] === elem) {
                this._closedList.slice(i, 1);
                return;
            }
        }
    },

    addToOpen: function (elem) {
        this._openList.push(elem);
        this._openList.sort((a, b) => {
            return a.compareTo(b);
        });
    }
});

var PathNode = cc.Node.extend({
    _x: 0,
    _y: 0,
    _pCost: 0,
    _hCost: 0,
    _depth: 0,
    _parent: null,

    ctor: function (x, y) {
        this._super();
        this._x = x;
        this._y = y;
    },

    setParentNode: function (p) {
        this._depth = p._depth + 1;
        this._parent = p;

        return this._depth;
    },

    compareTo: function (other) {
        let f = this._hCost + this._pCost;
        let of = other._hCost + other._pCost;

        if (f < of) return -1;
        else if (f > of) return 1;
        else return 0;
    }
});