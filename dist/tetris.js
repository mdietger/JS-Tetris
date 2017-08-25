(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var colors = exports.colors = {
    0: '#CCCCCC',
    1: '#888888',
    2: '#31C7EF',
    3: '#5A65AD',
    4: '#EF7921',
    5: '#F7D308',
    6: '#42B642',
    7: '#AD4D9C',
    8: '#EF2029',
    9: '#BBBBBB'
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var keys = exports.keys = {
    ArrowUp: 38,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    Space: 32,
    KeyP: 80,
    KeyH: 72
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('./const/colors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Holdfield = function () {
    function Holdfield() {
        _classCallCheck(this, Holdfield);

        this.canvas = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]];

        this.currentBlock = null;
        this.canHold = true;
        this.registerListeners();
    }

    /*
     Registers the events and add actions accordingly.
     */


    _createClass(Holdfield, [{
        key: 'registerListeners',
        value: function registerListeners() {
            var self = this;

            document.addEventListener('TetrisNewHoldBlock', function (e) {
                self.setBlock(e);
            });

            document.addEventListener('TetrisHold', function (e) {
                self.sendHoldBlock();
            });

            document.addEventListener('TetrisNewNextBlock', function (e) {
                self.resetHold();
            });
        }

        /*
         Set the block to a local variable
         */

    }, {
        key: 'setBlock',
        value: function setBlock(e) {
            this.currentBlock = e.detail.holdBlock;
            this.currentBlock.x = 0;
            this.currentBlock.y = 2;
        }

        /*
         Resets the hold
         */

    }, {
        key: 'resetHold',
        value: function resetHold() {
            this.canHold = true;
        }

        /*
         Sends the hold block back to the playfield
         */

    }, {
        key: 'sendHoldBlock',
        value: function sendHoldBlock() {
            if (!this.canHold) {
                return;
            }

            var event = new CustomEvent('TetrisTransferHoldBlock', { detail: { holdBlock: this.currentBlock } });
            document.dispatchEvent(event);
            this.canHold = false;
        }

        /*
         Draw everything to the canvas.
         */

    }, {
        key: 'draw',
        value: function draw(ctx) {
            var tempField = this.renderTempField();

            tempField.map(function (val, y) {
                val.map(function (val, x) {
                    ctx.fillStyle = _colors.colors[val];
                    ctx.fillRect(x * 20, y * 20, 20, 20);
                });
            });
        }

        /*
         Returns a new playfield with the currentblock and ghostblock merged into them.
         */

    }, {
        key: 'renderTempField',
        value: function renderTempField() {
            /*
             Create a new derefferenced playfield from the current playfield
             by splicing the row
             */
            var tempField = this.canvas.map(function (arr) {
                return arr.slice();
            });

            //Merge the blocks with the playfield
            this.renderBlock(tempField, this.currentBlock);

            return tempField;
        }

        /*
         Merges a block with a field
         */

    }, {
        key: 'renderBlock',
        value: function renderBlock(field, tetrimino) {
            if (!tetrimino) {
                return;
            }

            tetrimino.shape.map(function (arr, j) {
                arr.map(function (val, i) {
                    if (val == 0) {
                        return;
                    }

                    field[j + tetrimino.y][i + tetrimino.x + 2] = val;
                });
            });
        }
    }]);

    return Holdfield;
}();

exports.default = Holdfield;

},{"./const/colors":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('./const/colors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nextfield = function () {
    function Nextfield() {
        _classCallCheck(this, Nextfield);

        this.canvas = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]];

        this.block = null;
        this.registerListeners();
    }

    /*
     Registers the events and add actions accordingly.
     */


    _createClass(Nextfield, [{
        key: 'registerListeners',
        value: function registerListeners() {
            var self = this;

            document.addEventListener('TetrisNewNextBlock', function (e) {
                self.setBlock(e);
            });
        }

        /*
         Set the block to a local variable
         */

    }, {
        key: 'setBlock',
        value: function setBlock(e) {
            console.log(e);
            var blockType = e.detail.nextBlock;
            this.block = new blockType(0, 2);
        }

        /*
         Draw everything to the canvas.
         */

    }, {
        key: 'draw',
        value: function draw(ctx) {
            var tempField = this.renderTempField();

            tempField.map(function (val, y) {
                val.map(function (val, x) {
                    ctx.fillStyle = _colors.colors[val];
                    ctx.fillRect(x * 20, y * 20, 20, 20);
                });
            });
        }

        /*
         Returns a new playfield with the currentblock and ghostblock merged into them.
         */

    }, {
        key: 'renderTempField',
        value: function renderTempField() {
            /*
             Create a new derefferenced playfield from the current playfield
             by splicing the row
             */
            var tempField = this.canvas.map(function (arr) {
                return arr.slice();
            });

            //Merge the blocks with the playfield
            this.renderBlock(tempField, this.block);

            return tempField;
        }

        /*
         Merges a block with a field
         */

    }, {
        key: 'renderBlock',
        value: function renderBlock(field, tetrimino) {
            if (!tetrimino) {
                return;
            }

            tetrimino.shape.map(function (arr, j) {
                arr.map(function (val, i) {
                    if (val == 0) {
                        return;
                    }

                    field[j + tetrimino.y][i + tetrimino.x + 2] = val;
                });
            });
        }
    }]);

    return Nextfield;
}();

exports.default = Nextfield;

},{"./const/colors":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('./const/colors');

var _iblock = require('./tetriminos/iblock');

var _iblock2 = _interopRequireDefault(_iblock);

var _jblock = require('./tetriminos/jblock');

var _jblock2 = _interopRequireDefault(_jblock);

var _lblock = require('./tetriminos/lblock');

var _lblock2 = _interopRequireDefault(_lblock);

var _oblock = require('./tetriminos/oblock');

var _oblock2 = _interopRequireDefault(_oblock);

var _sblock = require('./tetriminos/sblock');

var _sblock2 = _interopRequireDefault(_sblock);

var _tblock = require('./tetriminos/tblock');

var _tblock2 = _interopRequireDefault(_tblock);

var _zblock = require('./tetriminos/zblock');

var _zblock2 = _interopRequireDefault(_zblock);

var _block = require('./tetriminos/block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Playfield = function () {
    function Playfield() {
        _classCallCheck(this, Playfield);

        this.canvas = [[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
        this.currentBlock = null;
        this.ghostBlock = null;
        this.bag = [];

        this.registerListeners();
        this.newBlockFromBag();
    }

    /*
     Generates a new random bag of 7 tetriminos.
     https://tetris.wiki/Random_Generator
     */


    _createClass(Playfield, [{
        key: 'generateNewBag',
        value: function generateNewBag() {
            this.bag = [_iblock2.default, _jblock2.default, _lblock2.default, _oblock2.default, _sblock2.default, _tblock2.default, _zblock2.default];
            this.shuffleBag();
        }

        /*
         Takes the first block from the bag and assign it to the current block.
         If the bag is empty, generate a new one.
         */

    }, {
        key: 'newBlockFromBag',
        value: function newBlockFromBag() {
            if (this.bag.length == 0) {
                this.generateNewBag();
            }

            var blockType = this.bag.shift();
            this.currentBlock = new blockType(3, 0);
            this.updateGhostBlock();

            console.log(this.bag[0]);
            var event = new CustomEvent('TetrisNewNextBlock', { detail: { nextBlock: this.bag[0] } });
            document.dispatchEvent(event);

            if (this.checkCollision(this.currentBlock)) {
                var _event = new Event('TetrisGameOver');
                document.dispatchEvent(_event);
            }
        }

        /*
         Shuffles the tertriminos
         */

    }, {
        key: 'shuffleBag',
        value: function shuffleBag() {
            for (var i = this.bag.length; i; i--) {
                var j = Math.floor(Math.random() * i);
                var _ref = [this.bag[j], this.bag[i - 1]];
                this.bag[i - 1] = _ref[0];
                this.bag[j] = _ref[1];
            }
        }

        /*
        Move the current block to hold
         */

    }, {
        key: 'holdBlock',
        value: function holdBlock(e) {
            var event = new CustomEvent('TetrisNewHoldBlock', { detail: { holdBlock: this.currentBlock } });
            document.dispatchEvent(event);

            if (!e.detail.holdBlock) {
                this.newBlockFromBag();
            } else {
                this.currentBlock = e.detail.holdBlock;
                this.currentBlock.x = 3;
                this.currentBlock.y = 0;
                this.updateGhostBlock();
            }
        }

        /*
         Moves the current block to the right. If collision is detected
         restore it's old position.
         */

    }, {
        key: 'moveCurrentBlockRight',
        value: function moveCurrentBlockRight() {
            this.currentBlock.x++;

            if (this.checkCollision(this.currentBlock)) {
                this.currentBlock.x--;
            }

            this.updateGhostBlock();
        }

        /*
         Moves the current block to the left. If collision is detected
         restore it's old position.
         */

    }, {
        key: 'moveCurrentBlockLeft',
        value: function moveCurrentBlockLeft() {
            this.currentBlock.x--;

            if (this.checkCollision(this.currentBlock)) {
                this.currentBlock.x++;
            }

            this.updateGhostBlock();
        }

        /*
         Moves the current block downwards. If collision is detected
         restore it's old position and save it to the playfield.
         Check if any lines are formed and created a new block.
         */

    }, {
        key: 'moveCurrentBlockDown',
        value: function moveCurrentBlockDown() {
            this.currentBlock.y++;

            if (this.checkCollision(this.currentBlock)) {
                this.currentBlock.y--;

                this.saveBlock();
                this.checkLines();
                this.newBlockFromBag();

                return false;
            }

            return true;
        }
    }, {
        key: 'rotateCurrentBlock',
        value: function rotateCurrentBlock() {
            this.currentBlock.rotateRight();

            if (this.checkCollision(this.currentBlock)) {
                this.currentBlock.rotateLeft();
            }

            this.updateGhostBlock();
        }

        /*
         Stores the currentblock into the playfield.
         */

    }, {
        key: 'saveBlock',
        value: function saveBlock() {
            this.canvas = this.renderTempField();
        }

        /*
         Check if there are new lines formed.
         */

    }, {
        key: 'checkLines',
        value: function checkLines() {
            var clearedRows = 0;

            for (var y = 0; y < this.canvas.length; y++) {
                var sumRow = 0;

                for (var x = 0; x < this.canvas[y].length; x++) {
                    //If the row contains a 0, skip the row
                    if (this.canvas[y][x] == 0) {
                        sumRow = 0;
                        break;
                    }

                    sumRow += this.canvas[y][x];
                }

                //If the sum of the row is higher than 14, it means a block is present since it's bigger than 1,1,1,1,1,1,1,1,1,1,1,1,1,1
                if (sumRow > 14) {
                    this.canvas.splice(y, 1);
                    this.addNewRow();
                    clearedRows++;
                }
            }

            if (clearedRows > 0) {
                var event = new CustomEvent('TetrisRowsCleared', { detail: { clearedRows: clearedRows } });
                document.dispatchEvent(event);
            }
        }

        /*
         Adds a new row on top of the playfield.
         */

    }, {
        key: 'addNewRow',
        value: function addNewRow() {
            this.canvas.unshift([1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
        }

        /*
         Lowers the currentblock until there is collision detected.
         */

    }, {
        key: 'dropBlock',
        value: function dropBlock() {
            var result = void 0;

            do {
                result = this.moveCurrentBlockDown();
            } while (result);
        }

        /*
         Clones the currentblock in position and shape. Give it a gray color and
         lower it until collision is detected.
         */

    }, {
        key: 'updateGhostBlock',
        value: function updateGhostBlock() {
            var colission = false;

            this.ghostBlock = new _block2.default(this.currentBlock.x, this.currentBlock.y);
            //Because the shape is a multi-dimensional array we need to derefference it when copying.
            this.ghostBlock.shape = this.currentBlock.shape.map(function (row) {
                return row.slice();
            });
            this.ghostBlock.makeGhost();

            do {
                this.ghostBlock.y += 1;

                colission = this.checkCollision(this.ghostBlock);
                if (colission) {
                    this.ghostBlock.y -= 1;
                }
            } while (!colission);
        }

        /*
         Check if there is collision.
         */

    }, {
        key: 'checkCollision',
        value: function checkCollision(block) {
            var collision = false;

            loop1: for (var y = 0; y < block.shape.length; y++) {
                for (var x = 0; x < block.shape[y].length; x++) {
                    //When the value of the block is not 0 and on that place in the playfield the value
                    //of the playfield is also not 0, we have collision.
                    if (block.shape[y][x] !== 0 && this.canvas[y + block.y][x + block.x + 2] !== 0) {
                        collision = true;
                        break loop1;
                    }
                }
            }

            return collision;
        }

        /*
         Draw everything to the canvas.
         */

    }, {
        key: 'draw',
        value: function draw(ctx) {
            var tempField = this.renderTempField();

            tempField.map(function (val, y) {
                val.map(function (val, x) {
                    ctx.fillStyle = _colors.colors[val];
                    ctx.fillRect(x * 20, y * 20, 20, 20);
                });
            });
        }

        /*
         Registers the events and add actions accordingly.
         */

    }, {
        key: 'registerListeners',
        value: function registerListeners() {
            var self = this;

            document.addEventListener('TetrisArrowLeft', function (e) {
                self.moveCurrentBlockLeft();
            });

            document.addEventListener('TetrisArrowRight', function (e) {
                self.moveCurrentBlockRight();
            });

            document.addEventListener('TetrisArrowUp', function (e) {
                self.rotateCurrentBlock();
            });

            document.addEventListener('TetrisArrowDown', function (e) {
                self.moveCurrentBlockDown();
            });

            document.addEventListener('TetrisSpace', function (e) {
                self.dropBlock();
            });

            document.addEventListener('TetrisTransferHoldBlock', function (e) {
                self.holdBlock(e);
            });
        }

        /*
         Returns a new playfield with the currentblock and ghostblock merged into them.
         */

    }, {
        key: 'renderTempField',
        value: function renderTempField() {
            /*
             Create a new derefferenced playfield from the current playfield
             by splicing the row
             */
            var tempField = this.canvas.map(function (arr) {
                return arr.slice();
            });

            //Merge the blocks with the playfield
            this.renderBlock(tempField, this.ghostBlock);
            this.renderBlock(tempField, this.currentBlock);

            return tempField;
        }

        /*
        Merges a block with a field
         */

    }, {
        key: 'renderBlock',
        value: function renderBlock(field, tetrimino) {
            tetrimino.shape.map(function (arr, j) {
                arr.map(function (val, i) {
                    if (val == 0) {
                        return;
                    }

                    field[j + tetrimino.y][i + tetrimino.x + 2] = val;
                });
            });
        }
    }]);

    return Playfield;
}();

exports.default = Playfield;

},{"./const/colors":1,"./tetriminos/block":6,"./tetriminos/iblock":7,"./tetriminos/jblock":8,"./tetriminos/lblock":9,"./tetriminos/oblock":10,"./tetriminos/sblock":11,"./tetriminos/tblock":12,"./tetriminos/zblock":13}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = function () {
    function Block(x, y) {
        _classCallCheck(this, Block);

        this.x = x;
        this.y = y;
    }

    _createClass(Block, [{
        key: "rotateRight",
        value: function rotateRight() {
            this.transpose();
            this.rowReverse();
        }
    }, {
        key: "rotateLeft",
        value: function rotateLeft() {
            this.transpose();
            this.columnReverse();
        }
    }, {
        key: "transpose",
        value: function transpose() {
            var oldShape = this.shape;

            this.shape = oldShape[0].map(function (col, i) {
                return oldShape.map(function (row) {
                    return row[i];
                });
            });
        }
    }, {
        key: "rowReverse",
        value: function rowReverse() {
            this.shape = this.shape.map(function (row) {
                return row.reverse();
            });
        }
    }, {
        key: "columnReverse",
        value: function columnReverse() {
            this.shape.reverse();
        }
    }, {
        key: "makeGhost",
        value: function makeGhost() {
            for (var y = 0; y < this.shape.length; y++) {
                for (var x = 0; x < this.shape[y].length; x++) {
                    if (this.shape[y][x] == 0) {
                        continue;
                    }

                    this.shape[y][x] = 9;
                }
            }
        }
    }]);

    return Block;
}();

exports.default = Block;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IBlock = function (_Block) {
    _inherits(IBlock, _Block);

    function IBlock(x, y) {
        _classCallCheck(this, IBlock);

        var _this = _possibleConstructorReturn(this, (IBlock.__proto__ || Object.getPrototypeOf(IBlock)).call(this, x, y));

        _this.shape = [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]];
        return _this;
    }

    return IBlock;
}(_block2.default);

exports.default = IBlock;

},{"./block":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JBlock = function (_Block) {
    _inherits(JBlock, _Block);

    function JBlock(x, y) {
        _classCallCheck(this, JBlock);

        var _this = _possibleConstructorReturn(this, (JBlock.__proto__ || Object.getPrototypeOf(JBlock)).call(this, x, y));

        _this.shape = [[3, 0, 0], [3, 3, 3], [0, 0, 0]];
        return _this;
    }

    return JBlock;
}(_block2.default);

exports.default = JBlock;

},{"./block":6}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LBlock = function (_Block) {
    _inherits(LBlock, _Block);

    function LBlock(x, y) {
        _classCallCheck(this, LBlock);

        var _this = _possibleConstructorReturn(this, (LBlock.__proto__ || Object.getPrototypeOf(LBlock)).call(this, x, y));

        _this.shape = [[0, 0, 4], [4, 4, 4], [0, 0, 0]];
        return _this;
    }

    return LBlock;
}(_block2.default);

exports.default = LBlock;

},{"./block":6}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OBlock = function (_Block) {
    _inherits(OBlock, _Block);

    function OBlock(x, y) {
        _classCallCheck(this, OBlock);

        var _this = _possibleConstructorReturn(this, (OBlock.__proto__ || Object.getPrototypeOf(OBlock)).call(this, x, y));

        _this.shape = [[5, 5], [5, 5]];
        return _this;
    }

    return OBlock;
}(_block2.default);

exports.default = OBlock;

},{"./block":6}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SBlock = function (_Block) {
    _inherits(SBlock, _Block);

    function SBlock(x, y) {
        _classCallCheck(this, SBlock);

        var _this = _possibleConstructorReturn(this, (SBlock.__proto__ || Object.getPrototypeOf(SBlock)).call(this, x, y));

        _this.shape = [[0, 6, 6], [6, 6, 0], [0, 0, 0]];
        return _this;
    }

    return SBlock;
}(_block2.default);

exports.default = SBlock;

},{"./block":6}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TBlock = function (_Block) {
    _inherits(TBlock, _Block);

    function TBlock(x, y) {
        _classCallCheck(this, TBlock);

        var _this = _possibleConstructorReturn(this, (TBlock.__proto__ || Object.getPrototypeOf(TBlock)).call(this, x, y));

        _this.shape = [[0, 7, 0], [7, 7, 7], [0, 0, 0]];
        return _this;
    }

    return TBlock;
}(_block2.default);

exports.default = TBlock;

},{"./block":6}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZBlock = function (_Block) {
    _inherits(ZBlock, _Block);

    function ZBlock(x, y) {
        _classCallCheck(this, ZBlock);

        var _this = _possibleConstructorReturn(this, (ZBlock.__proto__ || Object.getPrototypeOf(ZBlock)).call(this, x, y));

        _this.shape = [[8, 8, 0], [0, 8, 8], [0, 0, 0]];
        return _this;
    }

    return ZBlock;
}(_block2.default);

exports.default = ZBlock;

},{"./block":6}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playfield = require('./playfield');

var _playfield2 = _interopRequireDefault(_playfield);

var _holdfield = require('./holdfield');

var _holdfield2 = _interopRequireDefault(_holdfield);

var _nextfield = require('./nextfield');

var _nextfield2 = _interopRequireDefault(_nextfield);

var _keys = require('./const/keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tetris = function () {
    function Tetris() {
        _classCallCheck(this, Tetris);

        this.selectors = {
            tetris: 'tetris',
            score: 'score',
            rows: 'rows',
            level: 'level',
            hold: 'hold',
            next: 'next'
        };
        this.tetrisCnvs = document.getElementById(this.selectors.tetris);
        this.holdCnvs = document.getElementById(this.selectors.hold);
        this.nextCnvs = document.getElementById(this.selectors.next);
        this.holdfield = new _holdfield2.default();
        this.nextfield = new _nextfield2.default();
        this.playfield = new _playfield2.default();
        this.fps = 60;
        this.level = 1;
        this.rows = 0;
        this.score = 0;
        this.loopCount = 0;
        this.gameOver = false;
        this.pause = false;
        this.timeout = 1000 / this.fps;

        this.registerListeners();
        this.startGame();
    }

    /*
     Register all listeners.
     */


    _createClass(Tetris, [{
        key: 'registerListeners',
        value: function registerListeners() {
            var self = this;

            document.addEventListener("keydown", function (e) {
                self.handleKeyEvents(e);
            });

            document.addEventListener("TetrisGameOver", function (e) {
                self.endGame();
            });

            document.addEventListener("TetrisPause", function (e) {
                self.pauseGame();
            });

            document.addEventListener("TetrisRowsCleared", function (e) {
                self.updateScores(e);
            });
        }

        /*
         Pauses the game
         */

    }, {
        key: 'pauseGame',
        value: function pauseGame() {
            if (!this.pause) {
                this.pause = true;
                this.stopGame();
            } else {
                this.pause = false;
                this.startGame();
            }
        }

        /*
         Starts the gameloop
         */

    }, {
        key: 'startGame',
        value: function startGame() {
            var self = this;
            this.gameLoop = setInterval(function () {
                self.loop(self);
            }, this.timeout);
        }

        /*
         Stops the gameloop
         */

    }, {
        key: 'stopGame',
        value: function stopGame() {
            clearInterval(this.gameLoop);
        }

        /*
         End's the game
         */

    }, {
        key: 'endGame',
        value: function endGame() {
            this.gameOver = true;
        }

        /*
         Update the visual scores
         */

    }, {
        key: 'updateScores',
        value: function updateScores(e) {
            var clearedRows = e.detail.clearedRows;
            this.rows += clearedRows;
            this.score += Math.floor(50 * Math.pow(1.1, clearedRows) * clearedRows);
            this.level = Math.floor(this.rows / 50) + 1;
        }

        /*
         The game loop itself.
         */

    }, {
        key: 'loop',
        value: function loop(self) {
            self.update();
            self.draw();
        }

        /*
         Update all values of the game.
         */

    }, {
        key: 'update',
        value: function update() {
            if (!this.gameOver) {
                this.loopCount++;

                if (this.loopCount % (this.fps * 2 - this.level * 5) == 0) {
                    this.playfield.moveCurrentBlockDown();
                }
            }
        }

        /*
         Draw everything to the screen.
         */

    }, {
        key: 'draw',
        value: function draw() {
            var tetrisCtx = this.tetrisCnvs.getContext("2d");
            var holdCtx = this.holdCnvs.getContext("2d");
            var nextCtx = this.nextCnvs.getContext("2d");

            if (!this.gameOver) {
                this.playfield.draw(tetrisCtx);
                this.holdfield.draw(holdCtx);
                this.nextfield.draw(nextCtx);
            } else {
                this.drawGameOver(tetrisCtx);
            }

            document.getElementById(this.selectors.score).innerText = this.score;
            document.getElementById(this.selectors.rows).innerText = this.rows;
            document.getElementById(this.selectors.level).innerText = this.level;
        }
    }, {
        key: 'drawGameOver',
        value: function drawGameOver(ctx) {
            ctx.clearRect(0, 0, 300, 600);
            ctx.font = "30px Arial";
            ctx.fillText("Game Over", 50, 250);
        }

        /*
         When a key is pressed, fire a custom event so different components can handle
         the events themself.
         */

    }, {
        key: 'handleKeyEvents',
        value: function handleKeyEvents(e) {
            var event = void 0;

            if (this.pause) {
                return;
            }

            switch (e.keyCode) {
                case _keys.keys.ArrowUp:
                    e.preventDefault();
                    event = new Event('TetrisArrowUp');
                    break;
                case _keys.keys.ArrowDown:
                    e.preventDefault();
                    event = new Event('TetrisArrowDown');
                    break;
                case _keys.keys.ArrowLeft:
                    e.preventDefault();
                    event = new Event('TetrisArrowLeft');
                    break;
                case _keys.keys.ArrowRight:
                    e.preventDefault();
                    event = new Event('TetrisArrowRight');
                    break;
                case _keys.keys.Space:
                    e.preventDefault();
                    event = new Event('TetrisSpace');
                    break;
                case _keys.keys.KeyP:
                    e.preventDefault();
                    event = new Event('TetrisPause');
                    break;
                case _keys.keys.KeyH:
                    e.preventDefault();
                    event = new Event('TetrisHold');
                    break;
            }

            if (event) {
                document.dispatchEvent(event);
            }
        }
    }]);

    return Tetris;
}();

new Tetris();

},{"./const/keys":2,"./holdfield":3,"./nextfield":4,"./playfield":5}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxob2xkZmllbGQuanMiLCJlczZcXG5leHRmaWVsZC5qcyIsImVzNlxccGxheWZpZWxkLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcaWJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxqYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcb2Jsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxzYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHRibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcemJsb2NrLmpzIiwiZXM2XFx0ZXRyaXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FPLElBQU0sMEJBQVM7QUFDbEIsT0FBRyxTQURlO0FBRWxCLE9BQUcsU0FGZTtBQUdsQixPQUFHLFNBSGU7QUFJbEIsT0FBRyxTQUplO0FBS2xCLE9BQUcsU0FMZTtBQU1sQixPQUFHLFNBTmU7QUFPbEIsT0FBRyxTQVBlO0FBUWxCLE9BQUcsU0FSZTtBQVNsQixPQUFHLFNBVGU7QUFVbEIsT0FBRztBQVZlLENBQWY7Ozs7Ozs7O0FDQUEsSUFBTSxzQkFBTztBQUNoQixhQUFZLEVBREk7QUFFaEIsZUFBWSxFQUZJO0FBR2hCLGVBQVksRUFISTtBQUloQixnQkFBWSxFQUpJO0FBS2hCLFdBQVksRUFMSTtBQU1oQixVQUFZLEVBTkk7QUFPaEIsVUFBWTtBQVBJLENBQWI7Ozs7Ozs7Ozs7O0FDQVA7Ozs7SUFFcUIsUztBQUNqQix5QkFBYTtBQUFBOztBQUNULGFBQUssTUFBTCxHQUFjLENBQ1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENB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QUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBSlUsRUFLVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBTFUsRUFNVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBTlUsRUFPVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBUFUsRUFRVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBUlUsRUFTVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBVFUsRUFVVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBVlUsRUFXVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBWFUsRUFZVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBWlUsRUFhVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBYlUsRUFjVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBZFUsRUFlVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFh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QUssT0FBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxlQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssU0FBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxpQkFBVixDQUFSO0FBQ0E7QUFDSixxQkFBSyxXQUFLLFNBQVY7QUFDSSxzQkFBRSxjQUFGO0FBQ0EsNEJBQVEsSUFBSSxLQUFKLENBQVUsaUJBQVYsQ0FBUjtBQUNBO0FBQ0oscUJBQUssV0FBSyxVQUFWO0FBQ0ksc0JBQUUsY0FBRjtBQUNBLDRCQUFRLElBQUksS0FBSixDQUFVLGtCQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssS0FBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxhQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssSUFBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxhQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssSUFBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxZQUFWLENBQVI7QUFDQTtBQTVCUjs7QUErQkEsZ0JBQUcsS0FBSCxFQUFTO0FBQ0wseUJBQVMsYUFBVCxDQUF1QixLQUF2QjtBQUNIO0FBQ0o7Ozs7OztBQUdMLElBQUksTUFBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgY29sb3JzID0ge1xyXG4gICAgMDogJyNDQ0NDQ0MnLFxyXG4gICAgMTogJyM4ODg4ODgnLFxyXG4gICAgMjogJyMzMUM3RUYnLFxyXG4gICAgMzogJyM1QTY1QUQnLFxyXG4gICAgNDogJyNFRjc5MjEnLFxyXG4gICAgNTogJyNGN0QzMDgnLFxyXG4gICAgNjogJyM0MkI2NDInLFxyXG4gICAgNzogJyNBRDREOUMnLFxyXG4gICAgODogJyNFRjIwMjknLFxyXG4gICAgOTogJyNCQkJCQkInXHJcbn07IiwiZXhwb3J0IGNvbnN0IGtleXMgPSB7XHJcbiAgICBBcnJvd1VwICAgOiAzOCxcclxuICAgIEFycm93RG93biA6IDQwLFxyXG4gICAgQXJyb3dMZWZ0IDogMzcsXHJcbiAgICBBcnJvd1JpZ2h0OiAzOSxcclxuICAgIFNwYWNlICAgICA6IDMyLFxyXG4gICAgS2V5UCAgICAgIDogODAsXHJcbiAgICBLZXlIICAgICAgOiA3MlxyXG59OyIsImltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4vY29uc3QvY29sb3JzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbGRmaWVsZHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBbXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jYW5Ib2xkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld0hvbGRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNIb2xkJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYuc2VuZEhvbGRCbG9jaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNOZXdOZXh0QmxvY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5yZXNldEhvbGQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXHJcbiAgICAgKi9cclxuICAgIHNldEJsb2NrKGUpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gZS5kZXRhaWwuaG9sZEJsb2NrO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnggPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnkgPSAyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVzZXRzIHRoZSBob2xkXHJcbiAgICAgKi9cclxuICAgIHJlc2V0SG9sZCgpe1xyXG4gICAgICAgIHRoaXMuY2FuSG9sZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTZW5kcyB0aGUgaG9sZCBibG9jayBiYWNrIHRvIHRoZSBwbGF5ZmllbGRcclxuICAgICAqL1xyXG4gICAgc2VuZEhvbGRCbG9jaygpe1xyXG4gICAgICAgIGlmKCF0aGlzLmNhbkhvbGQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzVHJhbnNmZXJIb2xkQmxvY2snLCB7ZGV0YWlsOiB7aG9sZEJsb2NrOiB0aGlzLmN1cnJlbnRCbG9ja319KTtcclxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB0aGlzLmNhbkhvbGQgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBjb25zdCB0ZW1wRmllbGQgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xyXG5cclxuICAgICAgICB0ZW1wRmllbGQubWFwKGZ1bmN0aW9uKHZhbCwgeSl7XHJcbiAgICAgICAgICAgIHZhbC5tYXAoZnVuY3Rpb24odmFsLCB4KXtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcnNbdmFsXTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4KjIwLCB5KjIwLCAyMCwgMjApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmV0dXJucyBhIG5ldyBwbGF5ZmllbGQgd2l0aCB0aGUgY3VycmVudGJsb2NrIGFuZCBnaG9zdGJsb2NrIG1lcmdlZCBpbnRvIHRoZW0uXHJcbiAgICAgKi9cclxuICAgIHJlbmRlclRlbXBGaWVsZCgpe1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIENyZWF0ZSBhIG5ldyBkZXJlZmZlcmVuY2VkIHBsYXlmaWVsZCBmcm9tIHRoZSBjdXJyZW50IHBsYXlmaWVsZFxyXG4gICAgICAgICBieSBzcGxpY2luZyB0aGUgcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IHRlbXBGaWVsZCA9IHRoaXMuY2FudmFzLm1hcChmdW5jdGlvbihhcnIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLnNsaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vTWVyZ2UgdGhlIGJsb2NrcyB3aXRoIHRoZSBwbGF5ZmllbGRcclxuICAgICAgICB0aGlzLnJlbmRlckJsb2NrKHRlbXBGaWVsZCwgdGhpcy5jdXJyZW50QmxvY2spO1xyXG5cclxuICAgICAgICByZXR1cm4gdGVtcEZpZWxkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTWVyZ2VzIGEgYmxvY2sgd2l0aCBhIGZpZWxkXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckJsb2NrKGZpZWxkLCB0ZXRyaW1pbm8pe1xyXG4gICAgICAgIGlmKCF0ZXRyaW1pbm8pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXRyaW1pbm8uc2hhcGUubWFwKGZ1bmN0aW9uKGFyciwgail7XHJcbiAgICAgICAgICAgIGFyci5tYXAoZnVuY3Rpb24odmFsLCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKHZhbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRbaiArIHRldHJpbWluby55XVtpICsgdGV0cmltaW5vLnggKyAyXSA9IHZhbDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4vY29uc3QvY29sb3JzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5leHRmaWVsZHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBbXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLmJsb2NrID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld05leHRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXHJcbiAgICAgKi9cclxuICAgIHNldEJsb2NrKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IGUuZGV0YWlsLm5leHRCbG9jaztcclxuICAgICAgICB0aGlzLmJsb2NrID0gbmV3IGJsb2NrVHlwZSgwLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIERyYXcgZXZlcnl0aGluZyB0byB0aGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCl7XHJcbiAgICAgICAgY29uc3QgdGVtcEZpZWxkID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcclxuXHJcbiAgICAgICAgdGVtcEZpZWxkLm1hcChmdW5jdGlvbih2YWwsIHkpe1xyXG4gICAgICAgICAgICB2YWwubWFwKGZ1bmN0aW9uKHZhbCwgeCl7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JzW3ZhbF07XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCoyMCwgeSoyMCwgMjAsIDIwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJldHVybnMgYSBuZXcgcGxheWZpZWxkIHdpdGggdGhlIGN1cnJlbnRibG9jayBhbmQgZ2hvc3RibG9jayBtZXJnZWQgaW50byB0aGVtLlxyXG4gICAgICovXHJcbiAgICByZW5kZXJUZW1wRmllbGQoKXtcclxuICAgICAgICAvKlxyXG4gICAgICAgICBDcmVhdGUgYSBuZXcgZGVyZWZmZXJlbmNlZCBwbGF5ZmllbGQgZnJvbSB0aGUgY3VycmVudCBwbGF5ZmllbGRcclxuICAgICAgICAgYnkgc3BsaWNpbmcgdGhlIHJvd1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCB0ZW1wRmllbGQgPSB0aGlzLmNhbnZhcy5tYXAoZnVuY3Rpb24oYXJyKXtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5zbGljZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL01lcmdlIHRoZSBibG9ja3Mgd2l0aCB0aGUgcGxheWZpZWxkXHJcbiAgICAgICAgdGhpcy5yZW5kZXJCbG9jayh0ZW1wRmllbGQsIHRoaXMuYmxvY2spO1xyXG5cclxuICAgICAgICByZXR1cm4gdGVtcEZpZWxkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTWVyZ2VzIGEgYmxvY2sgd2l0aCBhIGZpZWxkXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckJsb2NrKGZpZWxkLCB0ZXRyaW1pbm8pe1xyXG4gICAgICAgIGlmKCF0ZXRyaW1pbm8pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXRyaW1pbm8uc2hhcGUubWFwKGZ1bmN0aW9uKGFyciwgail7XHJcbiAgICAgICAgICAgIGFyci5tYXAoZnVuY3Rpb24odmFsLCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKHZhbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRbaiArIHRldHJpbWluby55XVtpICsgdGV0cmltaW5vLnggKyAyXSA9IHZhbDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4vY29uc3QvY29sb3JzJztcclxuaW1wb3J0IElCbG9jayBmcm9tICcuL3RldHJpbWlub3MvaWJsb2NrJztcclxuaW1wb3J0IEpCbG9jayBmcm9tICcuL3RldHJpbWlub3MvamJsb2NrJztcclxuaW1wb3J0IExCbG9jayBmcm9tICcuL3RldHJpbWlub3MvbGJsb2NrJztcclxuaW1wb3J0IE9CbG9jayBmcm9tICcuL3RldHJpbWlub3Mvb2Jsb2NrJztcclxuaW1wb3J0IFNCbG9jayBmcm9tICcuL3RldHJpbWlub3Mvc2Jsb2NrJztcclxuaW1wb3J0IFRCbG9jayBmcm9tICcuL3RldHJpbWlub3MvdGJsb2NrJztcclxuaW1wb3J0IFpCbG9jayBmcm9tICcuL3RldHJpbWlub3MvemJsb2NrJztcclxuaW1wb3J0IEJsb2NrIGZyb20gJy4vdGV0cmltaW5vcy9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZmllbGR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gW1xyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2hvc3RCbG9jayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iYWcgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgICAgIHRoaXMubmV3QmxvY2tGcm9tQmFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBHZW5lcmF0ZXMgYSBuZXcgcmFuZG9tIGJhZyBvZiA3IHRldHJpbWlub3MuXHJcbiAgICAgaHR0cHM6Ly90ZXRyaXMud2lraS9SYW5kb21fR2VuZXJhdG9yXHJcbiAgICAgKi9cclxuICAgIGdlbmVyYXRlTmV3QmFnKCl7XHJcbiAgICAgICAgdGhpcy5iYWcgPSBbSUJsb2NrLCBKQmxvY2ssIExCbG9jaywgT0Jsb2NrLCBTQmxvY2ssIFRCbG9jaywgWkJsb2NrXTtcclxuICAgICAgICB0aGlzLnNodWZmbGVCYWcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFRha2VzIHRoZSBmaXJzdCBibG9jayBmcm9tIHRoZSBiYWcgYW5kIGFzc2lnbiBpdCB0byB0aGUgY3VycmVudCBibG9jay5cclxuICAgICBJZiB0aGUgYmFnIGlzIGVtcHR5LCBnZW5lcmF0ZSBhIG5ldyBvbmUuXHJcbiAgICAgKi9cclxuICAgIG5ld0Jsb2NrRnJvbUJhZygpe1xyXG4gICAgICAgIGlmKHRoaXMuYmFnLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU5ld0JhZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYmxvY2tUeXBlID0gdGhpcy5iYWcuc2hpZnQoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IG5ldyBibG9ja1R5cGUoMywgMCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYmFnWzBdKTtcclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzTmV3TmV4dEJsb2NrJywge2RldGFpbDoge25leHRCbG9jazogdGhpcy5iYWdbMF19fSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0dhbWVPdmVyJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFNodWZmbGVzIHRoZSB0ZXJ0cmltaW5vc1xyXG4gICAgICovXHJcbiAgICBzaHVmZmxlQmFnKCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuYmFnLmxlbmd0aDsgaTsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XHJcbiAgICAgICAgICAgIFt0aGlzLmJhZ1tpIC0gMV0sIHRoaXMuYmFnW2pdXSA9IFt0aGlzLmJhZ1tqXSwgdGhpcy5iYWdbaSAtIDFdXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIE1vdmUgdGhlIGN1cnJlbnQgYmxvY2sgdG8gaG9sZFxyXG4gICAgICovXHJcbiAgICBob2xkQmxvY2soZSl7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc05ld0hvbGRCbG9jaycsIHtkZXRhaWw6IHtob2xkQmxvY2s6IHRoaXMuY3VycmVudEJsb2NrfX0pO1xyXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cclxuICAgICAgICBpZighZS5kZXRhaWwuaG9sZEJsb2NrKXtcclxuICAgICAgICAgICAgdGhpcy5uZXdCbG9ja0Zyb21CYWcoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IGUuZGV0YWlsLmhvbGRCbG9jaztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgdG8gdGhlIHJpZ2h0LiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcclxuICAgICByZXN0b3JlIGl0J3Mgb2xkIHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICBtb3ZlQ3VycmVudEJsb2NrUmlnaHQoKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54Kys7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueC0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNb3ZlcyB0aGUgY3VycmVudCBibG9jayB0byB0aGUgbGVmdC4gSWYgY29sbGlzaW9uIGlzIGRldGVjdGVkXHJcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgbW92ZUN1cnJlbnRCbG9ja0xlZnQoKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54LS07XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNb3ZlcyB0aGUgY3VycmVudCBibG9jayBkb3dud2FyZHMuIElmIGNvbGxpc2lvbiBpcyBkZXRlY3RlZFxyXG4gICAgIHJlc3RvcmUgaXQncyBvbGQgcG9zaXRpb24gYW5kIHNhdmUgaXQgdG8gdGhlIHBsYXlmaWVsZC5cclxuICAgICBDaGVjayBpZiBhbnkgbGluZXMgYXJlIGZvcm1lZCBhbmQgY3JlYXRlZCBhIG5ldyBibG9jay5cclxuICAgICAqL1xyXG4gICAgbW92ZUN1cnJlbnRCbG9ja0Rvd24oKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay55Kys7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueS0tO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYXZlQmxvY2soKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0xpbmVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmV3QmxvY2tGcm9tQmFnKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVDdXJyZW50QmxvY2soKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay5yb3RhdGVSaWdodCgpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnJvdGF0ZUxlZnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU3RvcmVzIHRoZSBjdXJyZW50YmxvY2sgaW50byB0aGUgcGxheWZpZWxkLlxyXG4gICAgICovXHJcbiAgICBzYXZlQmxvY2soKXtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IHRoaXMucmVuZGVyVGVtcEZpZWxkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDaGVjayBpZiB0aGVyZSBhcmUgbmV3IGxpbmVzIGZvcm1lZC5cclxuICAgICAqL1xyXG4gICAgY2hlY2tMaW5lcygpe1xyXG4gICAgICAgIGxldCBjbGVhcmVkUm93cyA9IDA7XHJcblxyXG4gICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCB0aGlzLmNhbnZhcy5sZW5ndGg7IHkrKyl7XHJcbiAgICAgICAgICAgIGxldCBzdW1Sb3cgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IHRoaXMuY2FudmFzW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIHJvdyBjb250YWlucyBhIDAsIHNraXAgdGhlIHJvd1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jYW52YXNbeV1beF0gPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtUm93ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdW1Sb3cgKz0gdGhpcy5jYW52YXNbeV1beF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSWYgdGhlIHN1bSBvZiB0aGUgcm93IGlzIGhpZ2hlciB0aGFuIDE0LCBpdCBtZWFucyBhIGJsb2NrIGlzIHByZXNlbnQgc2luY2UgaXQncyBiaWdnZXIgdGhhbiAxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFcclxuICAgICAgICAgICAgaWYoc3VtUm93ID4gMTQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuc3BsaWNlKHksIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGROZXdSb3coKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyZWRSb3dzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNsZWFyZWRSb3dzID4gMCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNSb3dzQ2xlYXJlZCcsIHtkZXRhaWw6IHtjbGVhcmVkUm93czogY2xlYXJlZFJvd3N9fSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIEFkZHMgYSBuZXcgcm93IG9uIHRvcCBvZiB0aGUgcGxheWZpZWxkLlxyXG4gICAgICovXHJcbiAgICBhZGROZXdSb3coKXtcclxuICAgICAgICB0aGlzLmNhbnZhcy51bnNoaWZ0KFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIExvd2VycyB0aGUgY3VycmVudGJsb2NrIHVudGlsIHRoZXJlIGlzIGNvbGxpc2lvbiBkZXRlY3RlZC5cclxuICAgICAqL1xyXG4gICAgZHJvcEJsb2NrKCl7XHJcbiAgICAgICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICAgICAgZG97XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMubW92ZUN1cnJlbnRCbG9ja0Rvd24oKVxyXG4gICAgICAgIH13aGlsZShyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQ2xvbmVzIHRoZSBjdXJyZW50YmxvY2sgaW4gcG9zaXRpb24gYW5kIHNoYXBlLiBHaXZlIGl0IGEgZ3JheSBjb2xvciBhbmRcclxuICAgICBsb3dlciBpdCB1bnRpbCBjb2xsaXNpb24gaXMgZGV0ZWN0ZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUdob3N0QmxvY2soKXtcclxuICAgICAgICBsZXQgY29saXNzaW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuZ2hvc3RCbG9jayA9IG5ldyBCbG9jayh0aGlzLmN1cnJlbnRCbG9jay54LCB0aGlzLmN1cnJlbnRCbG9jay55KTtcclxuICAgICAgICAvL0JlY2F1c2UgdGhlIHNoYXBlIGlzIGEgbXVsdGktZGltZW5zaW9uYWwgYXJyYXkgd2UgbmVlZCB0byBkZXJlZmZlcmVuY2UgaXQgd2hlbiBjb3B5aW5nLlxyXG4gICAgICAgIHRoaXMuZ2hvc3RCbG9jay5zaGFwZSA9IHRoaXMuY3VycmVudEJsb2NrLnNoYXBlLm1hcChmdW5jdGlvbihyb3cpe1xyXG4gICAgICAgICAgICByZXR1cm4gcm93LnNsaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5naG9zdEJsb2NrLm1ha2VHaG9zdCgpO1xyXG5cclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgdGhpcy5naG9zdEJsb2NrLnkgKz0gMTtcclxuXHJcbiAgICAgICAgICAgIGNvbGlzc2lvbiA9IHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5naG9zdEJsb2NrKTtcclxuICAgICAgICAgICAgaWYoY29saXNzaW9uKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2hvc3RCbG9jay55IC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9d2hpbGUoIWNvbGlzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDaGVjayBpZiB0aGVyZSBpcyBjb2xsaXNpb24uXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQ29sbGlzaW9uKGJsb2NrKXtcclxuICAgICAgICBsZXQgY29sbGlzaW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxvb3AxOlxyXG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgYmxvY2suc2hhcGUubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IGJsb2NrLnNoYXBlW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAvL1doZW4gdGhlIHZhbHVlIG9mIHRoZSBibG9jayBpcyBub3QgMCBhbmQgb24gdGhhdCBwbGFjZSBpbiB0aGUgcGxheWZpZWxkIHRoZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vb2YgdGhlIHBsYXlmaWVsZCBpcyBhbHNvIG5vdCAwLCB3ZSBoYXZlIGNvbGxpc2lvbi5cclxuICAgICAgICAgICAgICAgICAgICBpZihibG9jay5zaGFwZVt5XVt4XSAhPT0gMCAmJiB0aGlzLmNhbnZhc1t5ICsgYmxvY2sueV1beCArIGJsb2NrLnggKyAyXSAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvb3AxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBjb25zdCB0ZW1wRmllbGQgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xyXG5cclxuICAgICAgICB0ZW1wRmllbGQubWFwKGZ1bmN0aW9uKHZhbCwgeSl7XHJcbiAgICAgICAgICAgIHZhbC5tYXAoZnVuY3Rpb24odmFsLCB4KXtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcnNbdmFsXTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4KjIwLCB5KjIwLCAyMCwgMjApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVnaXN0ZXJzIHRoZSBldmVudHMgYW5kIGFkZCBhY3Rpb25zIGFjY29yZGluZ2x5LlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd0xlZnQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrTGVmdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd1JpZ2h0JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja1JpZ2h0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93VXAnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5yb3RhdGVDdXJyZW50QmxvY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dEb3duJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzU3BhY2UnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5kcm9wQmxvY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzVHJhbnNmZXJIb2xkQmxvY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5ob2xkQmxvY2soZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZXR1cm5zIGEgbmV3IHBsYXlmaWVsZCB3aXRoIHRoZSBjdXJyZW50YmxvY2sgYW5kIGdob3N0YmxvY2sgbWVyZ2VkIGludG8gdGhlbS5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyVGVtcEZpZWxkKCl7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgQ3JlYXRlIGEgbmV3IGRlcmVmZmVyZW5jZWQgcGxheWZpZWxkIGZyb20gdGhlIGN1cnJlbnQgcGxheWZpZWxkXHJcbiAgICAgICAgIGJ5IHNwbGljaW5nIHRoZSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgdGVtcEZpZWxkID0gdGhpcy5jYW52YXMubWFwKGZ1bmN0aW9uKGFycil7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnIuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9NZXJnZSB0aGUgYmxvY2tzIHdpdGggdGhlIHBsYXlmaWVsZFxyXG4gICAgICAgIHRoaXMucmVuZGVyQmxvY2sodGVtcEZpZWxkLCB0aGlzLmdob3N0QmxvY2spO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQmxvY2sodGVtcEZpZWxkLCB0aGlzLmN1cnJlbnRCbG9jayk7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZW1wRmllbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIE1lcmdlcyBhIGJsb2NrIHdpdGggYSBmaWVsZFxyXG4gICAgICovXHJcbiAgICByZW5kZXJCbG9jayhmaWVsZCwgdGV0cmltaW5vKXtcclxuICAgICAgICB0ZXRyaW1pbm8uc2hhcGUubWFwKGZ1bmN0aW9uKGFyciwgail7XHJcbiAgICAgICAgICAgIGFyci5tYXAoZnVuY3Rpb24odmFsLCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKHZhbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRbaiArIHRldHJpbWluby55XVtpICsgdGV0cmltaW5vLnggKyAyXSA9IHZhbDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHJvdGF0ZVJpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy50cmFuc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLnJvd1JldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy50cmFuc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmNvbHVtblJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc3Bvc2UoKXtcclxuICAgICAgICBsZXQgb2xkU2hhcGUgPSB0aGlzLnNoYXBlO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gb2xkU2hhcGVbMF0ubWFwKGZ1bmN0aW9uKGNvbCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2xkU2hhcGUubWFwKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvd1tpXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJvd1JldmVyc2UoKXtcclxuICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5zaGFwZS5tYXAoZnVuY3Rpb24ocm93KXtcclxuICAgICAgICAgICAgcmV0dXJuIHJvdy5yZXZlcnNlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb2x1bW5SZXZlcnNlKCl7XHJcbiAgICAgICAgdGhpcy5zaGFwZS5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUdob3N0KCl7XHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMuc2hhcGUubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGhpcy5zaGFwZVt5XS5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNoYXBlW3ldW3hdID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbeV1beF0gPSA5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSUJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsMCwwLDBdLFxyXG4gICAgICAgICAgICBbMiwyLDIsMl0sXHJcbiAgICAgICAgICAgIFswLDAsMCwwXSxcclxuICAgICAgICAgICAgWzAsMCwwLDBdXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFszLDAsMF0sXHJcbiAgICAgICAgICAgIFszLDMsM10sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCwwLDRdLFxyXG4gICAgICAgICAgICBbNCw0LDRdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0Jsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzUsNV0sXHJcbiAgICAgICAgICAgIFs1LDVdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0Jsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsNiw2XSxcclxuICAgICAgICAgICAgWzYsNiwwXSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDcsMF0sXHJcbiAgICAgICAgICAgIFs3LDcsN10sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbOCw4LDBdLFxyXG4gICAgICAgICAgICBbMCw4LDhdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXlmaWVsZCBmcm9tICcuL3BsYXlmaWVsZCc7XHJcbmltcG9ydCBIb2xkZmllbGQgZnJvbSAnLi9ob2xkZmllbGQnO1xyXG5pbXBvcnQgTmV4dGZpZWxkIGZyb20gJy4vbmV4dGZpZWxkJztcclxuaW1wb3J0IHsga2V5cyB9IGZyb20gJy4vY29uc3Qva2V5cyc7XHJcblxyXG5jbGFzcyBUZXRyaXN7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JzID0ge1xyXG4gICAgICAgICAgICB0ZXRyaXM6ICd0ZXRyaXMnLFxyXG4gICAgICAgICAgICBzY29yZSA6ICdzY29yZScsXHJcbiAgICAgICAgICAgIHJvd3MgIDogJ3Jvd3MnLFxyXG4gICAgICAgICAgICBsZXZlbCA6ICdsZXZlbCcsXHJcbiAgICAgICAgICAgIGhvbGQgIDogJ2hvbGQnLFxyXG4gICAgICAgICAgICBuZXh0ICA6ICduZXh0J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50ZXRyaXNDbnZzPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy50ZXRyaXMpO1xyXG4gICAgICAgIHRoaXMuaG9sZENudnMgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMuaG9sZCk7XHJcbiAgICAgICAgdGhpcy5uZXh0Q252cyAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5uZXh0KTtcclxuICAgICAgICB0aGlzLmhvbGRmaWVsZCA9IG5ldyBIb2xkZmllbGQoKTtcclxuICAgICAgICB0aGlzLm5leHRmaWVsZCA9IG5ldyBOZXh0ZmllbGQoKTtcclxuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoKTtcclxuICAgICAgICB0aGlzLmZwcyAgICAgICA9IDYwO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgICAgID0gMTtcclxuICAgICAgICB0aGlzLnJvd3MgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5zY29yZSAgICAgPSAwO1xyXG4gICAgICAgIHRoaXMubG9vcENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmdhbWVPdmVyICA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGF1c2UgICAgID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0ICAgPSAxMDAwL3RoaXMuZnBzO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlZ2lzdGVyIGFsbCBsaXN0ZW5lcnMuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleUV2ZW50cyhlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc0dhbWVPdmVyXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLmVuZEdhbWUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc1BhdXNlXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnBhdXNlR2FtZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiVGV0cmlzUm93c0NsZWFyZWRcIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYudXBkYXRlU2NvcmVzKGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBQYXVzZXMgdGhlIGdhbWVcclxuICAgICAqL1xyXG4gICAgcGF1c2VHYW1lKCl7XHJcbiAgICAgICAgaWYoIXRoaXMucGF1c2Upe1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU3RhcnRzIHRoZSBnYW1lbG9vcFxyXG4gICAgICovXHJcbiAgICBzdGFydEdhbWUoKXtcclxuICAgICAgICBjb25zdCBzZWxmICAgID0gdGhpcztcclxuICAgICAgICB0aGlzLmdhbWVMb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtzZWxmLmxvb3Aoc2VsZil9LCB0aGlzLnRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU3RvcHMgdGhlIGdhbWVsb29wXHJcbiAgICAgKi9cclxuICAgIHN0b3BHYW1lKCl7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVMb29wKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIEVuZCdzIHRoZSBnYW1lXHJcbiAgICAgKi9cclxuICAgIGVuZEdhbWUoKXtcclxuICAgICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFVwZGF0ZSB0aGUgdmlzdWFsIHNjb3Jlc1xyXG4gICAgICovXHJcbiAgICB1cGRhdGVTY29yZXMoZSl7XHJcbiAgICAgICAgY29uc3QgY2xlYXJlZFJvd3MgPSBlLmRldGFpbC5jbGVhcmVkUm93cztcclxuICAgICAgICB0aGlzLnJvd3MgKz0gY2xlYXJlZFJvd3M7XHJcbiAgICAgICAgdGhpcy5zY29yZSArPSBNYXRoLmZsb29yKDUwICogTWF0aC5wb3coMS4xLCBjbGVhcmVkUm93cykgKiBjbGVhcmVkUm93cyk7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IE1hdGguZmxvb3IodGhpcy5yb3dzIC8gNTApICsgMTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFRoZSBnYW1lIGxvb3AgaXRzZWxmLlxyXG4gICAgICovXHJcbiAgICBsb29wKHNlbGYpe1xyXG4gICAgICAgIHNlbGYudXBkYXRlKCk7XHJcbiAgICAgICAgc2VsZi5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBVcGRhdGUgYWxsIHZhbHVlcyBvZiB0aGUgZ2FtZS5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuZ2FtZU92ZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb3BDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgaWYoKHRoaXMubG9vcENvdW50ICUgKCh0aGlzLmZwcyAqIDIpIC0gKHRoaXMubGV2ZWwgKiA1KSkpID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIERyYXcgZXZlcnl0aGluZyB0byB0aGUgc2NyZWVuLlxyXG4gICAgICovXHJcbiAgICBkcmF3KCl7XHJcbiAgICAgICAgY29uc3QgdGV0cmlzQ3R4ID0gdGhpcy50ZXRyaXNDbnZzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBjb25zdCBob2xkQ3R4ID0gdGhpcy5ob2xkQ252cy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY29uc3QgbmV4dEN0eCA9IHRoaXMubmV4dENudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5nYW1lT3Zlcil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLmRyYXcodGV0cmlzQ3R4KTtcclxuICAgICAgICAgICAgdGhpcy5ob2xkZmllbGQuZHJhdyhob2xkQ3R4KTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0ZmllbGQuZHJhdyhuZXh0Q3R4KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kcmF3R2FtZU92ZXIodGV0cmlzQ3R4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnNjb3JlKS5pbm5lclRleHQgPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnJvd3MpLmlubmVyVGV4dCAgPSB0aGlzLnJvd3M7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMubGV2ZWwpLmlubmVyVGV4dCA9IHRoaXMubGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0dhbWVPdmVyKGN0eCl7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICBjdHguZmlsbFRleHQoXCJHYW1lIE92ZXJcIiwgNTAsIDI1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBXaGVuIGEga2V5IGlzIHByZXNzZWQsIGZpcmUgYSBjdXN0b20gZXZlbnQgc28gZGlmZmVyZW50IGNvbXBvbmVudHMgY2FuIGhhbmRsZVxyXG4gICAgIHRoZSBldmVudHMgdGhlbXNlbGYuXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUtleUV2ZW50cyhlKXtcclxuICAgICAgICBsZXQgZXZlbnQ7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucGF1c2Upe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2goZS5rZXlDb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93VXA6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dVcCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd0Rvd246XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dEb3duJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93TGVmdDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd0xlZnQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dSaWdodDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd1JpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLlNwYWNlOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc1NwYWNlJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLktleVA6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzUGF1c2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuS2V5SDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNIb2xkJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGV2ZW50KXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgVGV0cmlzKCk7Il19
