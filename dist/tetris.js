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

var _colors = require('../const/colors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function () {
    function Field() {
        _classCallCheck(this, Field);
    }

    _createClass(Field, [{
        key: 'draw',

        /*
         Draw everything to the canvas.
         */
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
            //for(let i = 0; i < this.mergeFields.length; i++){
            this.renderBlock(tempField, this.currentBlock);
            //}

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

    return Field;
}();

exports.default = Field;

},{"../const/colors":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Holdfield = function (_Field) {
    _inherits(Holdfield, _Field);

    function Holdfield() {
        _classCallCheck(this, Holdfield);

        var _this = _possibleConstructorReturn(this, (Holdfield.__proto__ || Object.getPrototypeOf(Holdfield)).call(this));

        _this.canvas = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]];
        _this.currentBlock = null;
        _this.canHold = true;
        _this.mergeFields = [_this.currentBlock];

        _this.registerListeners();
        return _this;
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

            document.addEventListener('TetrisHold', function () {
                self.sendHoldBlock();
            });

            document.addEventListener('TetrisNewNextBlock', function () {
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
            while (this.currentBlock.rotation != 0) {
                this.currentBlock.rotateLeft();
            }
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
    }]);

    return Holdfield;
}(_field2.default);

exports.default = Holdfield;

},{"./field":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nextfield = function (_Field) {
    _inherits(Nextfield, _Field);

    function Nextfield() {
        _classCallCheck(this, Nextfield);

        var _this = _possibleConstructorReturn(this, (Nextfield.__proto__ || Object.getPrototypeOf(Nextfield)).call(this));

        _this.canvas = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]];
        _this.currentBlock = null;
        _this.mergeFields = [_this.currentBlock];

        _this.registerListeners();
        return _this;
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
            var blockType = e.detail.nextBlock;
            this.currentBlock = new blockType(0, 2);
        }
    }]);

    return Nextfield;
}(_field2.default);

exports.default = Nextfield;

},{"./field":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('../const/colors');

var _iblock = require('../tetriminos/iblock');

var _iblock2 = _interopRequireDefault(_iblock);

var _jblock = require('../tetriminos/jblock');

var _jblock2 = _interopRequireDefault(_jblock);

var _lblock = require('../tetriminos/lblock');

var _lblock2 = _interopRequireDefault(_lblock);

var _oblock = require('../tetriminos/oblock');

var _oblock2 = _interopRequireDefault(_oblock);

var _sblock = require('../tetriminos/sblock');

var _sblock2 = _interopRequireDefault(_sblock);

var _tblock = require('../tetriminos/tblock');

var _tblock2 = _interopRequireDefault(_tblock);

var _zblock = require('../tetriminos/zblock');

var _zblock2 = _interopRequireDefault(_zblock);

var _block = require('../tetriminos/block');

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

            document.addEventListener('TetrisArrowLeft', function () {
                self.moveCurrentBlockLeft();
            });

            document.addEventListener('TetrisArrowRight', function () {
                self.moveCurrentBlockRight();
            });

            document.addEventListener('TetrisArrowUp', function () {
                self.rotateCurrentBlock();
            });

            document.addEventListener('TetrisArrowDown', function () {
                self.moveCurrentBlockDown();
            });

            document.addEventListener('TetrisSpace', function () {
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

},{"../const/colors":1,"../tetriminos/block":7,"../tetriminos/iblock":8,"../tetriminos/jblock":9,"../tetriminos/lblock":10,"../tetriminos/oblock":11,"../tetriminos/sblock":12,"../tetriminos/tblock":13,"../tetriminos/zblock":14}],7:[function(require,module,exports){
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
        this.rotation = 0;
    }

    _createClass(Block, [{
        key: "rotateRight",
        value: function rotateRight() {
            this.transpose();
            this.rowReverse();

            this.rotation++;
            if (this.rotation > 3) {
                this.rotation = 0;
            }
        }
    }, {
        key: "rotateLeft",
        value: function rotateLeft() {
            this.transpose();
            this.columnReverse();

            this.rotation--;
            if (this.rotation < 0) {
                this.rotation = 3;
            }
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

},{}],8:[function(require,module,exports){
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

},{"./block":7}],9:[function(require,module,exports){
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

},{"./block":7}],10:[function(require,module,exports){
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

},{"./block":7}],11:[function(require,module,exports){
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

},{"./block":7}],12:[function(require,module,exports){
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

},{"./block":7}],13:[function(require,module,exports){
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

},{"./block":7}],14:[function(require,module,exports){
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

},{"./block":7}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playfield = require('./fields/playfield');

var _playfield2 = _interopRequireDefault(_playfield);

var _holdfield = require('./fields/holdfield');

var _holdfield2 = _interopRequireDefault(_holdfield);

var _nextfield = require('./fields/nextfield');

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

            document.addEventListener("TetrisGameOver", function () {
                self.endGame();
            });

            document.addEventListener("TetrisPause", function () {
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

},{"./const/keys":2,"./fields/holdfield":4,"./fields/nextfield":5,"./fields/playfield":6}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxmaWVsZHNcXGZpZWxkLmpzIiwiZXM2XFxmaWVsZHNcXGhvbGRmaWVsZC5qcyIsImVzNlxcZmllbGRzXFxuZXh0ZmllbGQuanMiLCJlczZcXGZpZWxkc1xccGxheWZpZWxkLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcaWJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxqYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcb2Jsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxzYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHRibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcemJsb2NrLmpzIiwiZXM2XFx0ZXRyaXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FPLElBQU0sMEJBQVM7QUFDbEIsT0FBRyxTQURlO0FBRWxCLE9BQUcsU0FGZTtBQUdsQixPQUFHLFNBSGU7QUFJbEIsT0FBRyxTQUplO0FBS2xCLE9BQUcsU0FMZTtBQU1sQixPQUFHLFNBTmU7QUFPbEIsT0FBRyxTQVBlO0FBUWxCLE9BQUcsU0FSZTtBQVNsQixPQUFHLFNBVGU7QUFVbEIsT0FBRztBQVZlLENBQWY7Ozs7Ozs7O0FDQUEsSUFBTSxzQkFBTztBQUNoQixhQUFZLEVBREk7QUFFaEIsZUFBWSxFQUZJO0FBR2hCLGVBQVksRUFISTtBQUloQixnQkFBWSxFQUpJO0FBS2hCLFdBQVksRUFMSTtBQU1oQixVQUFZLEVBTkk7QUFPaEIsVUFBWTtBQVBJLENBQWI7Ozs7Ozs7Ozs7O0FDQVA7Ozs7SUFFcUIsSzs7Ozs7Ozs7QUFDakI7Ozs2QkFHSyxHLEVBQUk7QUFDTCxnQkFBTSxZQUFZLEtBQUssZUFB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RVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUZVLEVBR1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUhVLEVBSVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUpVLEVBS1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUxVLEVBTVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQU5VLEVBT1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVBVLEVBUVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVJVLEVBU1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVRVLEVBVVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVZVLEVBV1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVhVLEVBWVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVpVLEVBYVYsQ0FBQyxDQUFELEVBQUcs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LEtBQUosQ0FBVSxhQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssSUFBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxZQUFWLENBQVI7QUFDQTtBQTVCUjs7QUErQkEsZ0JBQUcsS0FBSCxFQUFTO0FBQ0wseUJBQVMsYUFBVCxDQUF1QixLQUF2QjtBQUNIO0FBQ0o7Ozs7OztBQUdMLElBQUksTUFBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgY29sb3JzID0ge1xyXG4gICAgMDogJyNDQ0NDQ0MnLFxyXG4gICAgMTogJyM4ODg4ODgnLFxyXG4gICAgMjogJyMzMUM3RUYnLFxyXG4gICAgMzogJyM1QTY1QUQnLFxyXG4gICAgNDogJyNFRjc5MjEnLFxyXG4gICAgNTogJyNGN0QzMDgnLFxyXG4gICAgNjogJyM0MkI2NDInLFxyXG4gICAgNzogJyNBRDREOUMnLFxyXG4gICAgODogJyNFRjIwMjknLFxyXG4gICAgOTogJyNCQkJCQkInXHJcbn07IiwiZXhwb3J0IGNvbnN0IGtleXMgPSB7XHJcbiAgICBBcnJvd1VwICAgOiAzOCxcclxuICAgIEFycm93RG93biA6IDQwLFxyXG4gICAgQXJyb3dMZWZ0IDogMzcsXHJcbiAgICBBcnJvd1JpZ2h0OiAzOSxcclxuICAgIFNwYWNlICAgICA6IDMyLFxyXG4gICAgS2V5UCAgICAgIDogODAsXHJcbiAgICBLZXlIICAgICAgOiA3MlxyXG59OyIsImltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4uL2NvbnN0L2NvbG9ycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZHtcclxuICAgIC8qXHJcbiAgICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBjb25zdCB0ZW1wRmllbGQgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xyXG5cclxuICAgICAgICB0ZW1wRmllbGQubWFwKGZ1bmN0aW9uKHZhbCwgeSl7XHJcbiAgICAgICAgICAgIHZhbC5tYXAoZnVuY3Rpb24odmFsLCB4KXtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcnNbdmFsXTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4KjIwLCB5KjIwLCAyMCwgMjApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmV0dXJucyBhIG5ldyBwbGF5ZmllbGQgd2l0aCB0aGUgY3VycmVudGJsb2NrIGFuZCBnaG9zdGJsb2NrIG1lcmdlZCBpbnRvIHRoZW0uXHJcbiAgICAgKi9cclxuICAgIHJlbmRlclRlbXBGaWVsZCgpe1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIENyZWF0ZSBhIG5ldyBkZXJlZmZlcmVuY2VkIHBsYXlmaWVsZCBmcm9tIHRoZSBjdXJyZW50IHBsYXlmaWVsZFxyXG4gICAgICAgICBieSBzcGxpY2luZyB0aGUgcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IHRlbXBGaWVsZCA9IHRoaXMuY2FudmFzLm1hcChmdW5jdGlvbihhcnIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLnNsaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vTWVyZ2UgdGhlIGJsb2NrcyB3aXRoIHRoZSBwbGF5ZmllbGRcclxuICAgICAgICAvL2ZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm1lcmdlRmllbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJCbG9jayh0ZW1wRmllbGQsIHRoaXMuY3VycmVudEJsb2NrKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcmV0dXJuIHRlbXBGaWVsZDtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1lcmdlcyBhIGJsb2NrIHdpdGggYSBmaWVsZFxyXG4gICAgICovXHJcbiAgICByZW5kZXJCbG9jayhmaWVsZCwgdGV0cmltaW5vKXtcclxuICAgICAgICBpZighdGV0cmltaW5vKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV0cmltaW5vLnNoYXBlLm1hcChmdW5jdGlvbihhcnIsIGope1xyXG4gICAgICAgICAgICBhcnIubWFwKGZ1bmN0aW9uKHZhbCwgaSl7XHJcbiAgICAgICAgICAgICAgICBpZih2YWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkW2ogKyB0ZXRyaW1pbm8ueV1baSArIHRldHJpbWluby54ICsgMl0gPSB2YWw7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi9maWVsZCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb2xkZmllbGQgZXh0ZW5kcyBGaWVsZHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBbXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhbkhvbGQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWVyZ2VGaWVsZHMgPSBbdGhpcy5jdXJyZW50QmxvY2tdO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld0hvbGRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNIb2xkJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5zZW5kSG9sZEJsb2NrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld05leHRCbG9jaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYucmVzZXRIb2xkKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFNldCB0aGUgYmxvY2sgdG8gYSBsb2NhbCB2YXJpYWJsZVxyXG4gICAgICovXHJcbiAgICBzZXRCbG9jayhlKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IGUuZGV0YWlsLmhvbGRCbG9jaztcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54ID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay55ID0gMjtcclxuICAgICAgICB3aGlsZSh0aGlzLmN1cnJlbnRCbG9jay5yb3RhdGlvbiAhPSAwKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sucm90YXRlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlc2V0cyB0aGUgaG9sZFxyXG4gICAgICovXHJcbiAgICByZXNldEhvbGQoKXtcclxuICAgICAgICB0aGlzLmNhbkhvbGQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2VuZHMgdGhlIGhvbGQgYmxvY2sgYmFjayB0byB0aGUgcGxheWZpZWxkXHJcbiAgICAgKi9cclxuICAgIHNlbmRIb2xkQmxvY2soKXtcclxuICAgICAgICBpZighdGhpcy5jYW5Ib2xkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc1RyYW5zZmVySG9sZEJsb2NrJywge2RldGFpbDoge2hvbGRCbG9jazogdGhpcy5jdXJyZW50QmxvY2t9fSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgdGhpcy5jYW5Ib2xkID0gZmFsc2VcclxuICAgIH1cclxufSIsImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5leHRmaWVsZCBleHRlbmRzIEZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubWVyZ2VGaWVsZHMgPSBbdGhpcy5jdXJyZW50QmxvY2tdO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld05leHRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXHJcbiAgICAgKi9cclxuICAgIHNldEJsb2NrKGUpe1xyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IGUuZGV0YWlsLm5leHRCbG9jaztcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IG5ldyBibG9ja1R5cGUoMCwgMik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9jb25zdC9jb2xvcnMnO1xyXG5pbXBvcnQgSUJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvaWJsb2NrJztcclxuaW1wb3J0IEpCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL2pibG9jayc7XHJcbmltcG9ydCBMQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9sYmxvY2snO1xyXG5pbXBvcnQgT0Jsb2NrIGZyb20gJy4uL3RldHJpbWlub3Mvb2Jsb2NrJztcclxuaW1wb3J0IFNCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL3NibG9jayc7XHJcbmltcG9ydCBUQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy90YmxvY2snO1xyXG5pbXBvcnQgWkJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvemJsb2NrJztcclxuaW1wb3J0IEJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdob3N0QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYmFnID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgR2VuZXJhdGVzIGEgbmV3IHJhbmRvbSBiYWcgb2YgNyB0ZXRyaW1pbm9zLlxyXG4gICAgIGh0dHBzOi8vdGV0cmlzLndpa2kvUmFuZG9tX0dlbmVyYXRvclxyXG4gICAgICovXHJcbiAgICBnZW5lcmF0ZU5ld0JhZygpe1xyXG4gICAgICAgIHRoaXMuYmFnID0gW0lCbG9jaywgSkJsb2NrLCBMQmxvY2ssIE9CbG9jaywgU0Jsb2NrLCBUQmxvY2ssIFpCbG9ja107XHJcbiAgICAgICAgdGhpcy5zaHVmZmxlQmFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBUYWtlcyB0aGUgZmlyc3QgYmxvY2sgZnJvbSB0aGUgYmFnIGFuZCBhc3NpZ24gaXQgdG8gdGhlIGN1cnJlbnQgYmxvY2suXHJcbiAgICAgSWYgdGhlIGJhZyBpcyBlbXB0eSwgZ2VuZXJhdGUgYSBuZXcgb25lLlxyXG4gICAgICovXHJcbiAgICBuZXdCbG9ja0Zyb21CYWcoKXtcclxuICAgICAgICBpZih0aGlzLmJhZy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVOZXdCYWcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IHRoaXMuYmFnLnNoaWZ0KCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBuZXcgYmxvY2tUeXBlKDMsIDApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG5cclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzTmV3TmV4dEJsb2NrJywge2RldGFpbDoge25leHRCbG9jazogdGhpcy5iYWdbMF19fSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0dhbWVPdmVyJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFNodWZmbGVzIHRoZSB0ZXJ0cmltaW5vc1xyXG4gICAgICovXHJcbiAgICBzaHVmZmxlQmFnKCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuYmFnLmxlbmd0aDsgaTsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XHJcbiAgICAgICAgICAgIFt0aGlzLmJhZ1tpIC0gMV0sIHRoaXMuYmFnW2pdXSA9IFt0aGlzLmJhZ1tqXSwgdGhpcy5iYWdbaSAtIDFdXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIE1vdmUgdGhlIGN1cnJlbnQgYmxvY2sgdG8gaG9sZFxyXG4gICAgICovXHJcbiAgICBob2xkQmxvY2soZSl7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc05ld0hvbGRCbG9jaycsIHtkZXRhaWw6IHtob2xkQmxvY2s6IHRoaXMuY3VycmVudEJsb2NrfX0pO1xyXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cclxuICAgICAgICBpZighZS5kZXRhaWwuaG9sZEJsb2NrKXtcclxuICAgICAgICAgICAgdGhpcy5uZXdCbG9ja0Zyb21CYWcoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IGUuZGV0YWlsLmhvbGRCbG9jaztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNb3ZlcyB0aGUgY3VycmVudCBibG9jayB0byB0aGUgcmlnaHQuIElmIGNvbGxpc2lvbiBpcyBkZXRlY3RlZFxyXG4gICAgIHJlc3RvcmUgaXQncyBvbGQgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIG1vdmVDdXJyZW50QmxvY2tSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLngrKztcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54LS07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSBsZWZ0LiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcclxuICAgICByZXN0b3JlIGl0J3Mgb2xkIHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICBtb3ZlQ3VycmVudEJsb2NrTGVmdCgpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLngtLTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIGRvd253YXJkcy4gSWYgY29sbGlzaW9uIGlzIGRldGVjdGVkXHJcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbiBhbmQgc2F2ZSBpdCB0byB0aGUgcGxheWZpZWxkLlxyXG4gICAgIENoZWNrIGlmIGFueSBsaW5lcyBhcmUgZm9ybWVkIGFuZCBjcmVhdGVkIGEgbmV3IGJsb2NrLlxyXG4gICAgICovXHJcbiAgICBtb3ZlQ3VycmVudEJsb2NrRG93bigpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnkrKztcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay55LS07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNhdmVCbG9jaygpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrTGluZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXdCbG9ja0Zyb21CYWcoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJvdGF0ZUN1cnJlbnRCbG9jaygpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnJvdGF0ZVJpZ2h0KCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sucm90YXRlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdG9yZXMgdGhlIGN1cnJlbnRibG9jayBpbnRvIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgKi9cclxuICAgIHNhdmVCbG9jaygpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIENoZWNrIGlmIHRoZXJlIGFyZSBuZXcgbGluZXMgZm9ybWVkLlxyXG4gICAgICovXHJcbiAgICBjaGVja0xpbmVzKCl7XHJcbiAgICAgICAgbGV0IGNsZWFyZWRSb3dzID0gMDtcclxuXHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMuY2FudmFzLmxlbmd0aDsgeSsrKXtcclxuICAgICAgICAgICAgbGV0IHN1bVJvdyA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGhpcy5jYW52YXNbeV0ubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgLy9JZiB0aGUgcm93IGNvbnRhaW5zIGEgMCwgc2tpcCB0aGUgcm93XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNhbnZhc1t5XVt4XSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1Sb3cgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN1bVJvdyArPSB0aGlzLmNhbnZhc1t5XVt4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9JZiB0aGUgc3VtIG9mIHRoZSByb3cgaXMgaGlnaGVyIHRoYW4gMTQsIGl0IG1lYW5zIGEgYmxvY2sgaXMgcHJlc2VudCBzaW5jZSBpdCdzIGJpZ2dlciB0aGFuIDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMVxyXG4gICAgICAgICAgICBpZihzdW1Sb3cgPiAxNCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5zcGxpY2UoeSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE5ld1JvdygpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJlZFJvd3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY2xlYXJlZFJvd3MgPiAwKXtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc1Jvd3NDbGVhcmVkJywge2RldGFpbDoge2NsZWFyZWRSb3dzOiBjbGVhcmVkUm93c319KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQWRkcyBhIG5ldyByb3cgb24gdG9wIG9mIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgKi9cclxuICAgIGFkZE5ld1Jvdygpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzLnVuc2hpZnQoWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTG93ZXJzIHRoZSBjdXJyZW50YmxvY2sgdW50aWwgdGhlcmUgaXMgY29sbGlzaW9uIGRldGVjdGVkLlxyXG4gICAgICovXHJcbiAgICBkcm9wQmxvY2soKXtcclxuICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5tb3ZlQ3VycmVudEJsb2NrRG93bigpXHJcbiAgICAgICAgfXdoaWxlKHJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDbG9uZXMgdGhlIGN1cnJlbnRibG9jayBpbiBwb3NpdGlvbiBhbmQgc2hhcGUuIEdpdmUgaXQgYSBncmF5IGNvbG9yIGFuZFxyXG4gICAgIGxvd2VyIGl0IHVudGlsIGNvbGxpc2lvbiBpcyBkZXRlY3RlZC5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlR2hvc3RCbG9jaygpe1xyXG4gICAgICAgIGxldCBjb2xpc3Npb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5naG9zdEJsb2NrID0gbmV3IEJsb2NrKHRoaXMuY3VycmVudEJsb2NrLngsIHRoaXMuY3VycmVudEJsb2NrLnkpO1xyXG4gICAgICAgIC8vQmVjYXVzZSB0aGUgc2hhcGUgaXMgYSBtdWx0aS1kaW1lbnNpb25hbCBhcnJheSB3ZSBuZWVkIHRvIGRlcmVmZmVyZW5jZSBpdCB3aGVuIGNvcHlpbmcuXHJcbiAgICAgICAgdGhpcy5naG9zdEJsb2NrLnNoYXBlID0gdGhpcy5jdXJyZW50QmxvY2suc2hhcGUubWFwKGZ1bmN0aW9uKHJvdyl7XHJcbiAgICAgICAgICAgIHJldHVybiByb3cuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdob3N0QmxvY2subWFrZUdob3N0KCk7XHJcblxyXG4gICAgICAgIGRve1xyXG4gICAgICAgICAgICB0aGlzLmdob3N0QmxvY2sueSArPSAxO1xyXG5cclxuICAgICAgICAgICAgY29saXNzaW9uID0gdGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmdob3N0QmxvY2spO1xyXG4gICAgICAgICAgICBpZihjb2xpc3Npb24pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naG9zdEJsb2NrLnkgLT0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH13aGlsZSghY29saXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIENoZWNrIGlmIHRoZXJlIGlzIGNvbGxpc2lvbi5cclxuICAgICAqL1xyXG4gICAgY2hlY2tDb2xsaXNpb24oYmxvY2spe1xyXG4gICAgICAgIGxldCBjb2xsaXNpb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbG9vcDE6XHJcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCBibG9jay5zaGFwZS5sZW5ndGg7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgYmxvY2suc2hhcGVbeV0ubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vV2hlbiB0aGUgdmFsdWUgb2YgdGhlIGJsb2NrIGlzIG5vdCAwIGFuZCBvbiB0aGF0IHBsYWNlIGluIHRoZSBwbGF5ZmllbGQgdGhlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vZiB0aGUgcGxheWZpZWxkIGlzIGFsc28gbm90IDAsIHdlIGhhdmUgY29sbGlzaW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJsb2NrLnNoYXBlW3ldW3hdICE9PSAwICYmIHRoaXMuY2FudmFzW3kgKyBibG9jay55XVt4ICsgYmxvY2sueCArIDJdICE9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgbG9vcDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBEcmF3IGV2ZXJ5dGhpbmcgdG8gdGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgpe1xyXG4gICAgICAgIGNvbnN0IHRlbXBGaWVsZCA9IHRoaXMucmVuZGVyVGVtcEZpZWxkKCk7XHJcblxyXG4gICAgICAgIHRlbXBGaWVsZC5tYXAoZnVuY3Rpb24odmFsLCB5KXtcclxuICAgICAgICAgICAgdmFsLm1hcChmdW5jdGlvbih2YWwsIHgpe1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yc1t2YWxdO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgqMjAsIHkqMjAsIDIwLCAyMCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93TGVmdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja0xlZnQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dSaWdodCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja1JpZ2h0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93VXAnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJvdGF0ZUN1cnJlbnRCbG9jaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd0Rvd24nLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tEb3duKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc1NwYWNlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5kcm9wQmxvY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzVHJhbnNmZXJIb2xkQmxvY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5ob2xkQmxvY2soZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZXR1cm5zIGEgbmV3IHBsYXlmaWVsZCB3aXRoIHRoZSBjdXJyZW50YmxvY2sgYW5kIGdob3N0YmxvY2sgbWVyZ2VkIGludG8gdGhlbS5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyVGVtcEZpZWxkKCl7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgQ3JlYXRlIGEgbmV3IGRlcmVmZmVyZW5jZWQgcGxheWZpZWxkIGZyb20gdGhlIGN1cnJlbnQgcGxheWZpZWxkXHJcbiAgICAgICAgIGJ5IHNwbGljaW5nIHRoZSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgdGVtcEZpZWxkID0gdGhpcy5jYW52YXMubWFwKGZ1bmN0aW9uKGFycil7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnIuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9NZXJnZSB0aGUgYmxvY2tzIHdpdGggdGhlIHBsYXlmaWVsZFxyXG4gICAgICAgIHRoaXMucmVuZGVyQmxvY2sodGVtcEZpZWxkLCB0aGlzLmdob3N0QmxvY2spO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQmxvY2sodGVtcEZpZWxkLCB0aGlzLmN1cnJlbnRCbG9jayk7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZW1wRmllbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIE1lcmdlcyBhIGJsb2NrIHdpdGggYSBmaWVsZFxyXG4gICAgICovXHJcbiAgICByZW5kZXJCbG9jayhmaWVsZCwgdGV0cmltaW5vKXtcclxuICAgICAgICB0ZXRyaW1pbm8uc2hhcGUubWFwKGZ1bmN0aW9uKGFyciwgail7XHJcbiAgICAgICAgICAgIGFyci5tYXAoZnVuY3Rpb24odmFsLCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKHZhbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRbaiArIHRldHJpbWluby55XVtpICsgdGV0cmltaW5vLnggKyAyXSA9IHZhbDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgdGhpcy54ICAgICAgICA9IHg7XHJcbiAgICAgICAgdGhpcy55ICAgICAgICA9IHk7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlUmlnaHQoKXtcclxuICAgICAgICB0aGlzLnRyYW5zcG9zZSgpO1xyXG4gICAgICAgIHRoaXMucm93UmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnJvdGF0aW9uKys7XHJcbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbiA+IDMpe1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5SZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMucm90YXRpb24tLTtcclxuICAgICAgICBpZih0aGlzLnJvdGF0aW9uIDwgMCl7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cmFuc3Bvc2UoKXtcclxuICAgICAgICBsZXQgb2xkU2hhcGUgPSB0aGlzLnNoYXBlO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gb2xkU2hhcGVbMF0ubWFwKGZ1bmN0aW9uKGNvbCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2xkU2hhcGUubWFwKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvd1tpXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJvd1JldmVyc2UoKXtcclxuICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5zaGFwZS5tYXAoZnVuY3Rpb24ocm93KXtcclxuICAgICAgICAgICAgcmV0dXJuIHJvdy5yZXZlcnNlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb2x1bW5SZXZlcnNlKCl7XHJcbiAgICAgICAgdGhpcy5zaGFwZS5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUdob3N0KCl7XHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMuc2hhcGUubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGhpcy5zaGFwZVt5XS5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNoYXBlW3ldW3hdID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbeV1beF0gPSA5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSUJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsMCwwLDBdLFxyXG4gICAgICAgICAgICBbMiwyLDIsMl0sXHJcbiAgICAgICAgICAgIFswLDAsMCwwXSxcclxuICAgICAgICAgICAgWzAsMCwwLDBdXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFszLDAsMF0sXHJcbiAgICAgICAgICAgIFszLDMsM10sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCwwLDRdLFxyXG4gICAgICAgICAgICBbNCw0LDRdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0Jsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzUsNV0sXHJcbiAgICAgICAgICAgIFs1LDVdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0Jsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsNiw2XSxcclxuICAgICAgICAgICAgWzYsNiwwXSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDcsMF0sXHJcbiAgICAgICAgICAgIFs3LDcsN10sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbOCw4LDBdLFxyXG4gICAgICAgICAgICBbMCw4LDhdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXlmaWVsZCBmcm9tICcuL2ZpZWxkcy9wbGF5ZmllbGQnO1xyXG5pbXBvcnQgSG9sZGZpZWxkIGZyb20gJy4vZmllbGRzL2hvbGRmaWVsZCc7XHJcbmltcG9ydCBOZXh0ZmllbGQgZnJvbSAnLi9maWVsZHMvbmV4dGZpZWxkJztcclxuaW1wb3J0IHsga2V5cyB9IGZyb20gJy4vY29uc3Qva2V5cyc7XHJcblxyXG5jbGFzcyBUZXRyaXN7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JzID0ge1xyXG4gICAgICAgICAgICB0ZXRyaXM6ICd0ZXRyaXMnLFxyXG4gICAgICAgICAgICBzY29yZSA6ICdzY29yZScsXHJcbiAgICAgICAgICAgIHJvd3MgIDogJ3Jvd3MnLFxyXG4gICAgICAgICAgICBsZXZlbCA6ICdsZXZlbCcsXHJcbiAgICAgICAgICAgIGhvbGQgIDogJ2hvbGQnLFxyXG4gICAgICAgICAgICBuZXh0ICA6ICduZXh0J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50ZXRyaXNDbnZzPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy50ZXRyaXMpO1xyXG4gICAgICAgIHRoaXMuaG9sZENudnMgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMuaG9sZCk7XHJcbiAgICAgICAgdGhpcy5uZXh0Q252cyAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5uZXh0KTtcclxuICAgICAgICB0aGlzLmhvbGRmaWVsZCA9IG5ldyBIb2xkZmllbGQoKTtcclxuICAgICAgICB0aGlzLm5leHRmaWVsZCA9IG5ldyBOZXh0ZmllbGQoKTtcclxuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoKTtcclxuICAgICAgICB0aGlzLmZwcyAgICAgICA9IDYwO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgICAgID0gMTtcclxuICAgICAgICB0aGlzLnJvd3MgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5zY29yZSAgICAgPSAwO1xyXG4gICAgICAgIHRoaXMubG9vcENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmdhbWVPdmVyICA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGF1c2UgICAgID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0ICAgPSAxMDAwL3RoaXMuZnBzO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlZ2lzdGVyIGFsbCBsaXN0ZW5lcnMuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleUV2ZW50cyhlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc0dhbWVPdmVyXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuZW5kR2FtZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiVGV0cmlzUGF1c2VcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5wYXVzZUdhbWUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc1Jvd3NDbGVhcmVkXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVNjb3JlcyhlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUGF1c2VzIHRoZSBnYW1lXHJcbiAgICAgKi9cclxuICAgIHBhdXNlR2FtZSgpe1xyXG4gICAgICAgIGlmKCF0aGlzLnBhdXNlKXtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEdhbWUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFN0YXJ0cyB0aGUgZ2FtZWxvb3BcclxuICAgICAqL1xyXG4gICAgc3RhcnRHYW1lKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiAgICA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5nYW1lTG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7c2VsZi5sb29wKHNlbGYpfSwgdGhpcy50aW1lb3V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFN0b3BzIHRoZSBnYW1lbG9vcFxyXG4gICAgICovXHJcbiAgICBzdG9wR2FtZSgpe1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5nYW1lTG9vcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBFbmQncyB0aGUgZ2FtZVxyXG4gICAgICovXHJcbiAgICBlbmRHYW1lKCl7XHJcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBVcGRhdGUgdGhlIHZpc3VhbCBzY29yZXNcclxuICAgICAqL1xyXG4gICAgdXBkYXRlU2NvcmVzKGUpe1xyXG4gICAgICAgIGNvbnN0IGNsZWFyZWRSb3dzID0gZS5kZXRhaWwuY2xlYXJlZFJvd3M7XHJcbiAgICAgICAgdGhpcy5yb3dzICs9IGNsZWFyZWRSb3dzO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gTWF0aC5mbG9vcig1MCAqIE1hdGgucG93KDEuMSwgY2xlYXJlZFJvd3MpICogY2xlYXJlZFJvd3MpO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSBNYXRoLmZsb29yKHRoaXMucm93cyAvIDUwKSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBUaGUgZ2FtZSBsb29wIGl0c2VsZi5cclxuICAgICAqL1xyXG4gICAgbG9vcChzZWxmKXtcclxuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xyXG4gICAgICAgIHNlbGYuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgVXBkYXRlIGFsbCB2YWx1ZXMgb2YgdGhlIGdhbWUuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGlmKCF0aGlzLmdhbWVPdmVyKXtcclxuICAgICAgICAgICAgdGhpcy5sb29wQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgIGlmKCh0aGlzLmxvb3BDb3VudCAlICgodGhpcy5mcHMgKiAyKSAtICh0aGlzLmxldmVsICogNSkpKSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLm1vdmVDdXJyZW50QmxvY2tEb3duKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBEcmF3IGV2ZXJ5dGhpbmcgdG8gdGhlIHNjcmVlbi5cclxuICAgICAqL1xyXG4gICAgZHJhdygpe1xyXG4gICAgICAgIGNvbnN0IHRldHJpc0N0eCA9IHRoaXMudGV0cmlzQ252cy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY29uc3QgaG9sZEN0eCA9IHRoaXMuaG9sZENudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNvbnN0IG5leHRDdHggPSB0aGlzLm5leHRDbnZzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuZ2FtZU92ZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5kcmF3KHRldHJpc0N0eCk7XHJcbiAgICAgICAgICAgIHRoaXMuaG9sZGZpZWxkLmRyYXcoaG9sZEN0eCk7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dGZpZWxkLmRyYXcobmV4dEN0eCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0dhbWVPdmVyKHRldHJpc0N0eCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5zY29yZSkuaW5uZXJUZXh0ID0gdGhpcy5zY29yZTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5yb3dzKS5pbm5lclRleHQgID0gdGhpcy5yb3dzO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLmxldmVsKS5pbm5lclRleHQgPSB0aGlzLmxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdHYW1lT3ZlcihjdHgpe1xyXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCA2MDApO1xyXG4gICAgICAgIGN0eC5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIDUwLCAyNTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgV2hlbiBhIGtleSBpcyBwcmVzc2VkLCBmaXJlIGEgY3VzdG9tIGV2ZW50IHNvIGRpZmZlcmVudCBjb21wb25lbnRzIGNhbiBoYW5kbGVcclxuICAgICB0aGUgZXZlbnRzIHRoZW1zZWxmLlxyXG4gICAgICovXHJcbiAgICBoYW5kbGVLZXlFdmVudHMoZSl7XHJcbiAgICAgICAgbGV0IGV2ZW50O1xyXG5cclxuICAgICAgICBpZih0aGlzLnBhdXNlKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoKGUua2V5Q29kZSl7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd1VwOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93VXAnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dEb3duOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93RG93bicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd0xlZnQ6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dMZWZ0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93UmlnaHQ6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dSaWdodCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5TcGFjZTpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNTcGFjZScpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5LZXlQOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc1BhdXNlJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLktleUg6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzSG9sZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihldmVudCl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmV3IFRldHJpcygpOyJdfQ==
