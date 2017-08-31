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
        this.generateNewBag();
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
            var blockType = this.bag.shift();
            this.currentBlock = new blockType(3, 0);
            this.updateGhostBlock();

            if (this.bag.length === 0) {
                this.generateNewBag();
            }

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

            if (this.pause && e.keyCode !== _keys.keys.KeyP) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxmaWVsZHNcXGZpZWxkLmpzIiwiZXM2XFxmaWVsZHNcXGhvbGRmaWVsZC5qcyIsImVzNlxcZmllbGRzXFxuZXh0ZmllbGQuanMiLCJlczZcXGZpZWxkc1xccGxheWZpZWxkLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcaWJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxqYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcb2Jsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxzYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHRibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcemJsb2NrLmpzIiwiZXM2XFx0ZXRyaXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FPLElBQU0sMEJBQVM7QUFDbEIsT0FBRyxTQURlO0FBRWxCLE9BQUcsU0FGZTtBQUdsQixPQUFHLFNBSGU7QUFJbEIsT0FBRyxTQUplO0FBS2xCLE9BQUcsU0FMZTtBQU1sQixPQUFHLFNBTmU7QUFPbEIsT0FBRyxTQVBlO0FBUWxCLE9BQUcsU0FSZTtBQVNsQixPQUFHLFNBVGU7QUFVbEIsT0FBRztBQVZlLENBQWY7Ozs7Ozs7O0FDQUEsSUFBTSxzQkFBTztBQUNoQixhQUFZLEVBREk7QUFFaEIsZUFBWSxFQUZJO0FBR2hCLGVBQVksRUFISTtBQUloQixnQkFBWSxFQUpJO0FBS2hCLFdBQVksRUFMSTtBQU1oQixVQUFZLEVBTkk7QUFPaEIsVUFBWTtBQVBJLENBQWI7Ozs7Ozs7Ozs7O0FDQVA7Ozs7SUFFcUIsSzs7Ozs7Ozs7QUFDakI7Ozs2QkFHSyxHLEVBQUk7QUFDTCxnQkFBTSxZQUFZLEtBQUssZUFB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RVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUZVLEVBR1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUhVLEVBSVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUpVLEVBS1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUxVLEVBTVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQU5VLEVBT1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVBVLEVBUVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVJVLEVBU1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVRVLEVBVVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVZVLEVBV1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVhVLEVBWVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVpVLEVBYVYsQ0FBQyxDQUFELEVBQUcs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LHFCQUFLLFdBQUssSUFBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxhQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssSUFBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxZQUFWLENBQVI7QUFDQTtBQTVCUjs7QUErQkEsZ0JBQUcsS0FBSCxFQUFTO0FBQ0wseUJBQVMsYUFBVCxDQUF1QixLQUF2QjtBQUNIO0FBQ0o7Ozs7OztBQUdMLElBQUksTUFBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgY29sb3JzID0ge1xyXG4gICAgMDogJyNDQ0NDQ0MnLFxyXG4gICAgMTogJyM4ODg4ODgnLFxyXG4gICAgMjogJyMzMUM3RUYnLFxyXG4gICAgMzogJyM1QTY1QUQnLFxyXG4gICAgNDogJyNFRjc5MjEnLFxyXG4gICAgNTogJyNGN0QzMDgnLFxyXG4gICAgNjogJyM0MkI2NDInLFxyXG4gICAgNzogJyNBRDREOUMnLFxyXG4gICAgODogJyNFRjIwMjknLFxyXG4gICAgOTogJyNCQkJCQkInXHJcbn07IiwiZXhwb3J0IGNvbnN0IGtleXMgPSB7XHJcbiAgICBBcnJvd1VwICAgOiAzOCxcclxuICAgIEFycm93RG93biA6IDQwLFxyXG4gICAgQXJyb3dMZWZ0IDogMzcsXHJcbiAgICBBcnJvd1JpZ2h0OiAzOSxcclxuICAgIFNwYWNlICAgICA6IDMyLFxyXG4gICAgS2V5UCAgICAgIDogODAsXHJcbiAgICBLZXlIICAgICAgOiA3MlxyXG59OyIsImltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4uL2NvbnN0L2NvbG9ycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZHtcclxuICAgIC8qXHJcbiAgICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBjb25zdCB0ZW1wRmllbGQgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xyXG5cclxuICAgICAgICB0ZW1wRmllbGQubWFwKGZ1bmN0aW9uKHZhbCwgeSl7XHJcbiAgICAgICAgICAgIHZhbC5tYXAoZnVuY3Rpb24odmFsLCB4KXtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcnNbdmFsXTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4KjIwLCB5KjIwLCAyMCwgMjApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmV0dXJucyBhIG5ldyBwbGF5ZmllbGQgd2l0aCB0aGUgY3VycmVudGJsb2NrIGFuZCBnaG9zdGJsb2NrIG1lcmdlZCBpbnRvIHRoZW0uXHJcbiAgICAgKi9cclxuICAgIHJlbmRlclRlbXBGaWVsZCgpe1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIENyZWF0ZSBhIG5ldyBkZXJlZmZlcmVuY2VkIHBsYXlmaWVsZCBmcm9tIHRoZSBjdXJyZW50IHBsYXlmaWVsZFxyXG4gICAgICAgICBieSBzcGxpY2luZyB0aGUgcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IHRlbXBGaWVsZCA9IHRoaXMuY2FudmFzLm1hcChmdW5jdGlvbihhcnIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLnNsaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vTWVyZ2UgdGhlIGJsb2NrcyB3aXRoIHRoZSBwbGF5ZmllbGRcclxuICAgICAgICAvL2ZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm1lcmdlRmllbGRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJCbG9jayh0ZW1wRmllbGQsIHRoaXMuY3VycmVudEJsb2NrKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcmV0dXJuIHRlbXBGaWVsZDtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1lcmdlcyBhIGJsb2NrIHdpdGggYSBmaWVsZFxyXG4gICAgICovXHJcbiAgICByZW5kZXJCbG9jayhmaWVsZCwgdGV0cmltaW5vKXtcclxuICAgICAgICBpZighdGV0cmltaW5vKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV0cmltaW5vLnNoYXBlLm1hcChmdW5jdGlvbihhcnIsIGope1xyXG4gICAgICAgICAgICBhcnIubWFwKGZ1bmN0aW9uKHZhbCwgaSl7XHJcbiAgICAgICAgICAgICAgICBpZih2YWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkW2ogKyB0ZXRyaW1pbm8ueV1baSArIHRldHJpbWluby54ICsgMl0gPSB2YWw7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi9maWVsZCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb2xkZmllbGQgZXh0ZW5kcyBGaWVsZHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBbXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhbkhvbGQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWVyZ2VGaWVsZHMgPSBbdGhpcy5jdXJyZW50QmxvY2tdO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld0hvbGRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNIb2xkJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5zZW5kSG9sZEJsb2NrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld05leHRCbG9jaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYucmVzZXRIb2xkKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFNldCB0aGUgYmxvY2sgdG8gYSBsb2NhbCB2YXJpYWJsZVxyXG4gICAgICovXHJcbiAgICBzZXRCbG9jayhlKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IGUuZGV0YWlsLmhvbGRCbG9jaztcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54ID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay55ID0gMjtcclxuICAgICAgICB3aGlsZSh0aGlzLmN1cnJlbnRCbG9jay5yb3RhdGlvbiAhPSAwKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sucm90YXRlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlc2V0cyB0aGUgaG9sZFxyXG4gICAgICovXHJcbiAgICByZXNldEhvbGQoKXtcclxuICAgICAgICB0aGlzLmNhbkhvbGQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2VuZHMgdGhlIGhvbGQgYmxvY2sgYmFjayB0byB0aGUgcGxheWZpZWxkXHJcbiAgICAgKi9cclxuICAgIHNlbmRIb2xkQmxvY2soKXtcclxuICAgICAgICBpZighdGhpcy5jYW5Ib2xkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc1RyYW5zZmVySG9sZEJsb2NrJywge2RldGFpbDoge2hvbGRCbG9jazogdGhpcy5jdXJyZW50QmxvY2t9fSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgdGhpcy5jYW5Ib2xkID0gZmFsc2VcclxuICAgIH1cclxufSIsImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5leHRmaWVsZCBleHRlbmRzIEZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubWVyZ2VGaWVsZHMgPSBbdGhpcy5jdXJyZW50QmxvY2tdO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld05leHRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXHJcbiAgICAgKi9cclxuICAgIHNldEJsb2NrKGUpe1xyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IGUuZGV0YWlsLm5leHRCbG9jaztcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IG5ldyBibG9ja1R5cGUoMCwgMik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9jb25zdC9jb2xvcnMnO1xyXG5pbXBvcnQgSUJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvaWJsb2NrJztcclxuaW1wb3J0IEpCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL2pibG9jayc7XHJcbmltcG9ydCBMQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9sYmxvY2snO1xyXG5pbXBvcnQgT0Jsb2NrIGZyb20gJy4uL3RldHJpbWlub3Mvb2Jsb2NrJztcclxuaW1wb3J0IFNCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL3NibG9jayc7XHJcbmltcG9ydCBUQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy90YmxvY2snO1xyXG5pbXBvcnQgWkJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvemJsb2NrJztcclxuaW1wb3J0IEJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdob3N0QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYmFnID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlTmV3QmFnKCk7XHJcbiAgICAgICAgdGhpcy5uZXdCbG9ja0Zyb21CYWcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIEdlbmVyYXRlcyBhIG5ldyByYW5kb20gYmFnIG9mIDcgdGV0cmltaW5vcy5cclxuICAgICBodHRwczovL3RldHJpcy53aWtpL1JhbmRvbV9HZW5lcmF0b3JcclxuICAgICAqL1xyXG4gICAgZ2VuZXJhdGVOZXdCYWcoKXtcclxuICAgICAgICB0aGlzLmJhZyA9IFtJQmxvY2ssIEpCbG9jaywgTEJsb2NrLCBPQmxvY2ssIFNCbG9jaywgVEJsb2NrLCBaQmxvY2tdO1xyXG4gICAgICAgIHRoaXMuc2h1ZmZsZUJhZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgVGFrZXMgdGhlIGZpcnN0IGJsb2NrIGZyb20gdGhlIGJhZyBhbmQgYXNzaWduIGl0IHRvIHRoZSBjdXJyZW50IGJsb2NrLlxyXG4gICAgIElmIHRoZSBiYWcgaXMgZW1wdHksIGdlbmVyYXRlIGEgbmV3IG9uZS5cclxuICAgICAqL1xyXG4gICAgbmV3QmxvY2tGcm9tQmFnKCl7XHJcbiAgICAgICAgY29uc3QgYmxvY2tUeXBlID0gdGhpcy5iYWcuc2hpZnQoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IG5ldyBibG9ja1R5cGUoMywgMCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYmFnLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVOZXdCYWcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNOZXdOZXh0QmxvY2snLCB7ZGV0YWlsOiB7bmV4dEJsb2NrOiB0aGlzLmJhZ1swXX19KTtcclxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzR2FtZU92ZXInKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2h1ZmZsZXMgdGhlIHRlcnRyaW1pbm9zXHJcbiAgICAgKi9cclxuICAgIHNodWZmbGVCYWcoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5iYWcubGVuZ3RoOyBpOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKTtcclxuICAgICAgICAgICAgW3RoaXMuYmFnW2kgLSAxXSwgdGhpcy5iYWdbal1dID0gW3RoaXMuYmFnW2pdLCB0aGlzLmJhZ1tpIC0gMV1dO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgTW92ZSB0aGUgY3VycmVudCBibG9jayB0byBob2xkXHJcbiAgICAgKi9cclxuICAgIGhvbGRCbG9jayhlKXtcclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzTmV3SG9sZEJsb2NrJywge2RldGFpbDoge2hvbGRCbG9jazogdGhpcy5jdXJyZW50QmxvY2t9fSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgIGlmKCFlLmRldGFpbC5ob2xkQmxvY2spe1xyXG4gICAgICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gZS5kZXRhaWwuaG9sZEJsb2NrO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54ID0gMztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSByaWdodC4gSWYgY29sbGlzaW9uIGlzIGRldGVjdGVkXHJcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgbW92ZUN1cnJlbnRCbG9ja1JpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCsrO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLngtLTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgdG8gdGhlIGxlZnQuIElmIGNvbGxpc2lvbiBpcyBkZXRlY3RlZFxyXG4gICAgIHJlc3RvcmUgaXQncyBvbGQgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIG1vdmVDdXJyZW50QmxvY2tMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueC0tO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLngrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgZG93bndhcmRzLiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcclxuICAgICByZXN0b3JlIGl0J3Mgb2xkIHBvc2l0aW9uIGFuZCBzYXZlIGl0IHRvIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgQ2hlY2sgaWYgYW55IGxpbmVzIGFyZSBmb3JtZWQgYW5kIGNyZWF0ZWQgYSBuZXcgYmxvY2suXHJcbiAgICAgKi9cclxuICAgIG1vdmVDdXJyZW50QmxvY2tEb3duKCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueSsrO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnktLTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUJsb2NrKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tMaW5lcygpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlQ3VycmVudEJsb2NrKCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sucm90YXRlUmlnaHQoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay5yb3RhdGVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFN0b3JlcyB0aGUgY3VycmVudGJsb2NrIGludG8gdGhlIHBsYXlmaWVsZC5cclxuICAgICAqL1xyXG4gICAgc2F2ZUJsb2NrKCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQ2hlY2sgaWYgdGhlcmUgYXJlIG5ldyBsaW5lcyBmb3JtZWQuXHJcbiAgICAgKi9cclxuICAgIGNoZWNrTGluZXMoKXtcclxuICAgICAgICBsZXQgY2xlYXJlZFJvd3MgPSAwO1xyXG5cclxuICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgdGhpcy5jYW52YXMubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICBsZXQgc3VtUm93ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCB0aGlzLmNhbnZhc1t5XS5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZSByb3cgY29udGFpbnMgYSAwLCBza2lwIHRoZSByb3dcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2FudmFzW3ldW3hdID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bVJvdyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3VtUm93ICs9IHRoaXMuY2FudmFzW3ldW3hdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0lmIHRoZSBzdW0gb2YgdGhlIHJvdyBpcyBoaWdoZXIgdGhhbiAxNCwgaXQgbWVhbnMgYSBibG9jayBpcyBwcmVzZW50IHNpbmNlIGl0J3MgYmlnZ2VyIHRoYW4gMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXHJcbiAgICAgICAgICAgIGlmKHN1bVJvdyA+IDE0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnNwbGljZSh5LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3Um93KCk7XHJcbiAgICAgICAgICAgICAgICBjbGVhcmVkUm93cysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjbGVhcmVkUm93cyA+IDApe1xyXG4gICAgICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzUm93c0NsZWFyZWQnLCB7ZGV0YWlsOiB7Y2xlYXJlZFJvd3M6IGNsZWFyZWRSb3dzfX0pO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBBZGRzIGEgbmV3IHJvdyBvbiB0b3Agb2YgdGhlIHBsYXlmaWVsZC5cclxuICAgICAqL1xyXG4gICAgYWRkTmV3Um93KCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMudW5zaGlmdChbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBMb3dlcnMgdGhlIGN1cnJlbnRibG9jayB1bnRpbCB0aGVyZSBpcyBjb2xsaXNpb24gZGV0ZWN0ZWQuXHJcbiAgICAgKi9cclxuICAgIGRyb3BCbG9jaygpe1xyXG4gICAgICAgIGxldCByZXN1bHQ7XHJcblxyXG4gICAgICAgIGRve1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm1vdmVDdXJyZW50QmxvY2tEb3duKClcclxuICAgICAgICB9d2hpbGUocmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIENsb25lcyB0aGUgY3VycmVudGJsb2NrIGluIHBvc2l0aW9uIGFuZCBzaGFwZS4gR2l2ZSBpdCBhIGdyYXkgY29sb3IgYW5kXHJcbiAgICAgbG93ZXIgaXQgdW50aWwgY29sbGlzaW9uIGlzIGRldGVjdGVkLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVHaG9zdEJsb2NrKCl7XHJcbiAgICAgICAgbGV0IGNvbGlzc2lvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmdob3N0QmxvY2sgPSBuZXcgQmxvY2sodGhpcy5jdXJyZW50QmxvY2sueCwgdGhpcy5jdXJyZW50QmxvY2sueSk7XHJcbiAgICAgICAgLy9CZWNhdXNlIHRoZSBzaGFwZSBpcyBhIG11bHRpLWRpbWVuc2lvbmFsIGFycmF5IHdlIG5lZWQgdG8gZGVyZWZmZXJlbmNlIGl0IHdoZW4gY29weWluZy5cclxuICAgICAgICB0aGlzLmdob3N0QmxvY2suc2hhcGUgPSB0aGlzLmN1cnJlbnRCbG9jay5zaGFwZS5tYXAoZnVuY3Rpb24ocm93KXtcclxuICAgICAgICAgICAgcmV0dXJuIHJvdy5zbGljZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2hvc3RCbG9jay5tYWtlR2hvc3QoKTtcclxuXHJcbiAgICAgICAgZG97XHJcbiAgICAgICAgICAgIHRoaXMuZ2hvc3RCbG9jay55ICs9IDE7XHJcblxyXG4gICAgICAgICAgICBjb2xpc3Npb24gPSB0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuZ2hvc3RCbG9jayk7XHJcbiAgICAgICAgICAgIGlmKGNvbGlzc2lvbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdob3N0QmxvY2sueSAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfXdoaWxlKCFjb2xpc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQ2hlY2sgaWYgdGhlcmUgaXMgY29sbGlzaW9uLlxyXG4gICAgICovXHJcbiAgICBjaGVja0NvbGxpc2lvbihibG9jayl7XHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsb29wMTpcclxuICAgICAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IGJsb2NrLnNoYXBlLmxlbmd0aDsgeSsrKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBibG9jay5zaGFwZVt5XS5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9XaGVuIHRoZSB2YWx1ZSBvZiB0aGUgYmxvY2sgaXMgbm90IDAgYW5kIG9uIHRoYXQgcGxhY2UgaW4gdGhlIHBsYXlmaWVsZCB0aGUgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAvL29mIHRoZSBwbGF5ZmllbGQgaXMgYWxzbyBub3QgMCwgd2UgaGF2ZSBjb2xsaXNpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYmxvY2suc2hhcGVbeV1beF0gIT09IDAgJiYgdGhpcy5jYW52YXNbeSArIGJsb2NrLnldW3ggKyBibG9jay54ICsgMl0gIT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBsb29wMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIERyYXcgZXZlcnl0aGluZyB0byB0aGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCl7XHJcbiAgICAgICAgY29uc3QgdGVtcEZpZWxkID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcclxuXHJcbiAgICAgICAgdGVtcEZpZWxkLm1hcChmdW5jdGlvbih2YWwsIHkpe1xyXG4gICAgICAgICAgICB2YWwubWFwKGZ1bmN0aW9uKHZhbCwgeCl7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JzW3ZhbF07XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCoyMCwgeSoyMCwgMjAsIDIwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlZ2lzdGVycyB0aGUgZXZlbnRzIGFuZCBhZGQgYWN0aW9ucyBhY2NvcmRpbmdseS5cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoKXtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dMZWZ0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrTGVmdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd1JpZ2h0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrUmlnaHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dVcCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYucm90YXRlQ3VycmVudEJsb2NrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93RG93bicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzU3BhY2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLmRyb3BCbG9jaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNUcmFuc2ZlckhvbGRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLmhvbGRCbG9jayhlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJldHVybnMgYSBuZXcgcGxheWZpZWxkIHdpdGggdGhlIGN1cnJlbnRibG9jayBhbmQgZ2hvc3RibG9jayBtZXJnZWQgaW50byB0aGVtLlxyXG4gICAgICovXHJcbiAgICByZW5kZXJUZW1wRmllbGQoKXtcclxuICAgICAgICAvKlxyXG4gICAgICAgICBDcmVhdGUgYSBuZXcgZGVyZWZmZXJlbmNlZCBwbGF5ZmllbGQgZnJvbSB0aGUgY3VycmVudCBwbGF5ZmllbGRcclxuICAgICAgICAgYnkgc3BsaWNpbmcgdGhlIHJvd1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCB0ZW1wRmllbGQgPSB0aGlzLmNhbnZhcy5tYXAoZnVuY3Rpb24oYXJyKXtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5zbGljZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL01lcmdlIHRoZSBibG9ja3Mgd2l0aCB0aGUgcGxheWZpZWxkXHJcbiAgICAgICAgdGhpcy5yZW5kZXJCbG9jayh0ZW1wRmllbGQsIHRoaXMuZ2hvc3RCbG9jayk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJCbG9jayh0ZW1wRmllbGQsIHRoaXMuY3VycmVudEJsb2NrKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRlbXBGaWVsZDtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgTWVyZ2VzIGEgYmxvY2sgd2l0aCBhIGZpZWxkXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckJsb2NrKGZpZWxkLCB0ZXRyaW1pbm8pe1xyXG4gICAgICAgIHRldHJpbWluby5zaGFwZS5tYXAoZnVuY3Rpb24oYXJyLCBqKXtcclxuICAgICAgICAgICAgYXJyLm1hcChmdW5jdGlvbih2YWwsIGkpe1xyXG4gICAgICAgICAgICAgICAgaWYodmFsID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZFtqICsgdGV0cmltaW5vLnldW2kgKyB0ZXRyaW1pbm8ueCArIDJdID0gdmFsO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICB0aGlzLnggICAgICAgID0geDtcclxuICAgICAgICB0aGlzLnkgICAgICAgID0geTtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5yb3dSZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMucm90YXRpb24rKztcclxuICAgICAgICBpZih0aGlzLnJvdGF0aW9uID4gMyl7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy50cmFuc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmNvbHVtblJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbi0tO1xyXG4gICAgICAgIGlmKHRoaXMucm90YXRpb24gPCAwKXtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zcG9zZSgpe1xyXG4gICAgICAgIGxldCBvbGRTaGFwZSA9IHRoaXMuc2hhcGU7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvbGRTaGFwZVswXS5tYXAoZnVuY3Rpb24oY29sLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbGRTaGFwZS5tYXAoZnVuY3Rpb24ocm93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93W2ldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcm93UmV2ZXJzZSgpe1xyXG4gICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnNoYXBlLm1hcChmdW5jdGlvbihyb3cpe1xyXG4gICAgICAgICAgICByZXR1cm4gcm93LnJldmVyc2UoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbHVtblJldmVyc2UoKXtcclxuICAgICAgICB0aGlzLnNoYXBlLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlR2hvc3QoKXtcclxuICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgdGhpcy5zaGFwZS5sZW5ndGg7IHkrKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCB0aGlzLnNoYXBlW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hhcGVbeV1beF0gPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFwZVt5XVt4XSA9IDk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCwwLDAsMF0sXHJcbiAgICAgICAgICAgIFsyLDIsMiwyXSxcclxuICAgICAgICAgICAgWzAsMCwwLDBdLFxyXG4gICAgICAgICAgICBbMCwwLDAsMF1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzMsMCwwXSxcclxuICAgICAgICAgICAgWzMsMywzXSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDAsNF0sXHJcbiAgICAgICAgICAgIFs0LDQsNF0sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbNSw1XSxcclxuICAgICAgICAgICAgWzUsNV1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCw2LDZdLFxyXG4gICAgICAgICAgICBbNiw2LDBdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVEJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsNywwXSxcclxuICAgICAgICAgICAgWzcsNyw3XSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFs4LDgsMF0sXHJcbiAgICAgICAgICAgIFswLDgsOF0sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWZpZWxkIGZyb20gJy4vZmllbGRzL3BsYXlmaWVsZCc7XHJcbmltcG9ydCBIb2xkZmllbGQgZnJvbSAnLi9maWVsZHMvaG9sZGZpZWxkJztcclxuaW1wb3J0IE5leHRmaWVsZCBmcm9tICcuL2ZpZWxkcy9uZXh0ZmllbGQnO1xyXG5pbXBvcnQgeyBrZXlzIH0gZnJvbSAnLi9jb25zdC9rZXlzJztcclxuXHJcbmNsYXNzIFRldHJpc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSB7XHJcbiAgICAgICAgICAgIHRldHJpczogJ3RldHJpcycsXHJcbiAgICAgICAgICAgIHNjb3JlIDogJ3Njb3JlJyxcclxuICAgICAgICAgICAgcm93cyAgOiAncm93cycsXHJcbiAgICAgICAgICAgIGxldmVsIDogJ2xldmVsJyxcclxuICAgICAgICAgICAgaG9sZCAgOiAnaG9sZCcsXHJcbiAgICAgICAgICAgIG5leHQgIDogJ25leHQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRldHJpc0NudnM9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnRldHJpcyk7XHJcbiAgICAgICAgdGhpcy5ob2xkQ252cyAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5ob2xkKTtcclxuICAgICAgICB0aGlzLm5leHRDbnZzICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLm5leHQpO1xyXG4gICAgICAgIHRoaXMuaG9sZGZpZWxkID0gbmV3IEhvbGRmaWVsZCgpO1xyXG4gICAgICAgIHRoaXMubmV4dGZpZWxkID0gbmV3IE5leHRmaWVsZCgpO1xyXG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gbmV3IFBsYXlmaWVsZCgpO1xyXG4gICAgICAgIHRoaXMuZnBzICAgICAgID0gNjA7XHJcbiAgICAgICAgdGhpcy5sZXZlbCAgICAgPSAxO1xyXG4gICAgICAgIHRoaXMucm93cyAgICAgID0gMDtcclxuICAgICAgICB0aGlzLnNjb3JlICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5sb29wQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYXVzZSAgICAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpbWVvdXQgICA9IDEwMDAvdGhpcy5mcHM7XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVnaXN0ZXIgYWxsIGxpc3RlbmVycy5cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoKXtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlS2V5RXZlbnRzKGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiVGV0cmlzR2FtZU92ZXJcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5lbmRHYW1lKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJUZXRyaXNQYXVzZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnBhdXNlR2FtZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiVGV0cmlzUm93c0NsZWFyZWRcIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYudXBkYXRlU2NvcmVzKGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBQYXVzZXMgdGhlIGdhbWVcclxuICAgICAqL1xyXG4gICAgcGF1c2VHYW1lKCl7XHJcbiAgICAgICAgaWYoIXRoaXMucGF1c2Upe1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU3RhcnRzIHRoZSBnYW1lbG9vcFxyXG4gICAgICovXHJcbiAgICBzdGFydEdhbWUoKXtcclxuICAgICAgICBjb25zdCBzZWxmICAgID0gdGhpcztcclxuICAgICAgICB0aGlzLmdhbWVMb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtzZWxmLmxvb3Aoc2VsZil9LCB0aGlzLnRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU3RvcHMgdGhlIGdhbWVsb29wXHJcbiAgICAgKi9cclxuICAgIHN0b3BHYW1lKCl7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVMb29wKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIEVuZCdzIHRoZSBnYW1lXHJcbiAgICAgKi9cclxuICAgIGVuZEdhbWUoKXtcclxuICAgICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFVwZGF0ZSB0aGUgdmlzdWFsIHNjb3Jlc1xyXG4gICAgICovXHJcbiAgICB1cGRhdGVTY29yZXMoZSl7XHJcbiAgICAgICAgY29uc3QgY2xlYXJlZFJvd3MgPSBlLmRldGFpbC5jbGVhcmVkUm93cztcclxuICAgICAgICB0aGlzLnJvd3MgKz0gY2xlYXJlZFJvd3M7XHJcbiAgICAgICAgdGhpcy5zY29yZSArPSBNYXRoLmZsb29yKDUwICogTWF0aC5wb3coMS4xLCBjbGVhcmVkUm93cykgKiBjbGVhcmVkUm93cyk7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IE1hdGguZmxvb3IodGhpcy5yb3dzIC8gNTApICsgMTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFRoZSBnYW1lIGxvb3AgaXRzZWxmLlxyXG4gICAgICovXHJcbiAgICBsb29wKHNlbGYpe1xyXG4gICAgICAgIHNlbGYudXBkYXRlKCk7XHJcbiAgICAgICAgc2VsZi5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBVcGRhdGUgYWxsIHZhbHVlcyBvZiB0aGUgZ2FtZS5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuZ2FtZU92ZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb3BDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgaWYoKHRoaXMubG9vcENvdW50ICUgKCh0aGlzLmZwcyAqIDIpIC0gKHRoaXMubGV2ZWwgKiA1KSkpID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIERyYXcgZXZlcnl0aGluZyB0byB0aGUgc2NyZWVuLlxyXG4gICAgICovXHJcbiAgICBkcmF3KCl7XHJcbiAgICAgICAgY29uc3QgdGV0cmlzQ3R4ID0gdGhpcy50ZXRyaXNDbnZzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBjb25zdCBob2xkQ3R4ID0gdGhpcy5ob2xkQ252cy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY29uc3QgbmV4dEN0eCA9IHRoaXMubmV4dENudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5nYW1lT3Zlcil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLmRyYXcodGV0cmlzQ3R4KTtcclxuICAgICAgICAgICAgdGhpcy5ob2xkZmllbGQuZHJhdyhob2xkQ3R4KTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0ZmllbGQuZHJhdyhuZXh0Q3R4KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kcmF3R2FtZU92ZXIodGV0cmlzQ3R4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnNjb3JlKS5pbm5lclRleHQgPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnJvd3MpLmlubmVyVGV4dCAgPSB0aGlzLnJvd3M7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMubGV2ZWwpLmlubmVyVGV4dCA9IHRoaXMubGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0dhbWVPdmVyKGN0eCl7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICBjdHguZmlsbFRleHQoXCJHYW1lIE92ZXJcIiwgNTAsIDI1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBXaGVuIGEga2V5IGlzIHByZXNzZWQsIGZpcmUgYSBjdXN0b20gZXZlbnQgc28gZGlmZmVyZW50IGNvbXBvbmVudHMgY2FuIGhhbmRsZVxyXG4gICAgIHRoZSBldmVudHMgdGhlbXNlbGYuXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUtleUV2ZW50cyhlKXtcclxuICAgICAgICBsZXQgZXZlbnQ7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucGF1c2UgJiYgZS5rZXlDb2RlICE9PSBrZXlzLktleVApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2goZS5rZXlDb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93VXA6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dVcCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd0Rvd246XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dEb3duJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93TGVmdDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd0xlZnQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dSaWdodDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd1JpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLlNwYWNlOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc1NwYWNlJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLktleVA6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzUGF1c2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuS2V5SDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNIb2xkJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGV2ZW50KXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgVGV0cmlzKCk7Il19
