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
            console.log('generateNewBag');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxmaWVsZHNcXGZpZWxkLmpzIiwiZXM2XFxmaWVsZHNcXGhvbGRmaWVsZC5qcyIsImVzNlxcZmllbGRzXFxuZXh0ZmllbGQuanMiLCJlczZcXGZpZWxkc1xccGxheWZpZWxkLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcaWJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxqYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcb2Jsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxzYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHRibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcemJsb2NrLmpzIiwiZXM2XFx0ZXRyaXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FPLElBQU0sMEJBQVM7QUFDbEIsT0FBRyxTQURlO0FBRWxCLE9BQUcsU0FGZTtBQUdsQixPQUFHLFNBSGU7QUFJbEIsT0FBRyxTQUplO0FBS2xCLE9BQUcsU0FMZTtBQU1sQixPQUFHLFNBTmU7QUFPbEIsT0FBRyxTQVBlO0FBUWxCLE9BQUcsU0FSZTtBQVNsQixPQUFHLFNBVGU7QUFVbEIsT0FBRztBQVZlLENBQWY7Ozs7Ozs7O0FDQUEsSUFBTSxzQkFBTztBQUNoQixhQUFZLEVBREk7QUFFaEIsZUFBWSxFQUZJO0FBR2hCLGVBQVksRUFISTtBQUloQixnQkFBWSxFQUpJO0FBS2hCLFdBQVksRUFMSTtBQU1oQixVQUFZLEVBTkk7QUFPaEIsVUFBWTtBQVBJLENBQWI7Ozs7Ozs7Ozs7O0FDQVA7Ozs7SUFFcUIsSzs7Ozs7Ozs7QUFDakI7Ozs2QkFHSyxHLEVBQUk7QUFDTCxnQkFBTSxZQUFZLEtBQUssZUFB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RVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUZVLEVBR1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUhVLEVBSVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUpVLEVBS1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUxVLEVBTVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQU5VLEVBT1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVBVLEVBUVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVJVLEVBU1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVRVLEVBVVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVZVLEVBV1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVhVLEVBWVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVpVLEVBYVYsQ0FBQyxDQUFELEVBQUcs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LFdBQUssSUFBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxhQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssSUFBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxZQUFWLENBQVI7QUFDQTtBQTVCUjs7QUErQkEsZ0JBQUcsS0FBSCxFQUFTO0FBQ0wseUJBQVMsYUFBVCxDQUF1QixLQUF2QjtBQUNIO0FBQ0o7Ozs7OztBQUdMLElBQUksTUFBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgY29sb3JzID0ge1xuICAgIDA6ICcjQ0NDQ0NDJyxcbiAgICAxOiAnIzg4ODg4OCcsXG4gICAgMjogJyMzMUM3RUYnLFxuICAgIDM6ICcjNUE2NUFEJyxcbiAgICA0OiAnI0VGNzkyMScsXG4gICAgNTogJyNGN0QzMDgnLFxuICAgIDY6ICcjNDJCNjQyJyxcbiAgICA3OiAnI0FENEQ5QycsXG4gICAgODogJyNFRjIwMjknLFxuICAgIDk6ICcjQkJCQkJCJ1xufTsiLCJleHBvcnQgY29uc3Qga2V5cyA9IHtcbiAgICBBcnJvd1VwICAgOiAzOCxcbiAgICBBcnJvd0Rvd24gOiA0MCxcbiAgICBBcnJvd0xlZnQgOiAzNyxcbiAgICBBcnJvd1JpZ2h0OiAzOSxcbiAgICBTcGFjZSAgICAgOiAzMixcbiAgICBLZXlQICAgICAgOiA4MCxcbiAgICBLZXlIICAgICAgOiA3MlxufTsiLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9jb25zdC9jb2xvcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZHtcbiAgICAvKlxuICAgICBEcmF3IGV2ZXJ5dGhpbmcgdG8gdGhlIGNhbnZhcy5cbiAgICAgKi9cbiAgICBkcmF3KGN0eCl7XG4gICAgICAgIGNvbnN0IHRlbXBGaWVsZCA9IHRoaXMucmVuZGVyVGVtcEZpZWxkKCk7XG5cbiAgICAgICAgdGVtcEZpZWxkLm1hcChmdW5jdGlvbih2YWwsIHkpe1xuICAgICAgICAgICAgdmFsLm1hcChmdW5jdGlvbih2YWwsIHgpe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcnNbdmFsXTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCoyMCwgeSoyMCwgMjAsIDIwKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgIFJldHVybnMgYSBuZXcgcGxheWZpZWxkIHdpdGggdGhlIGN1cnJlbnRibG9jayBhbmQgZ2hvc3RibG9jayBtZXJnZWQgaW50byB0aGVtLlxuICAgICAqL1xuICAgIHJlbmRlclRlbXBGaWVsZCgpe1xuICAgICAgICAvKlxuICAgICAgICAgQ3JlYXRlIGEgbmV3IGRlcmVmZmVyZW5jZWQgcGxheWZpZWxkIGZyb20gdGhlIGN1cnJlbnQgcGxheWZpZWxkXG4gICAgICAgICBieSBzcGxpY2luZyB0aGUgcm93XG4gICAgICAgICAqL1xuICAgICAgICBsZXQgdGVtcEZpZWxkID0gdGhpcy5jYW52YXMubWFwKGZ1bmN0aW9uKGFycil7XG4gICAgICAgICAgICByZXR1cm4gYXJyLnNsaWNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vTWVyZ2UgdGhlIGJsb2NrcyB3aXRoIHRoZSBwbGF5ZmllbGRcbiAgICAgICAgLy9mb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5tZXJnZUZpZWxkcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckJsb2NrKHRlbXBGaWVsZCwgdGhpcy5jdXJyZW50QmxvY2spO1xuICAgICAgICAvL31cblxuICAgICAgICByZXR1cm4gdGVtcEZpZWxkO1xuICAgIH1cblxuICAgIC8qXG4gICAgIE1lcmdlcyBhIGJsb2NrIHdpdGggYSBmaWVsZFxuICAgICAqL1xuICAgIHJlbmRlckJsb2NrKGZpZWxkLCB0ZXRyaW1pbm8pe1xuICAgICAgICBpZighdGV0cmltaW5vKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRldHJpbWluby5zaGFwZS5tYXAoZnVuY3Rpb24oYXJyLCBqKXtcbiAgICAgICAgICAgIGFyci5tYXAoZnVuY3Rpb24odmFsLCBpKXtcbiAgICAgICAgICAgICAgICBpZih2YWwgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmaWVsZFtqICsgdGV0cmltaW5vLnldW2kgKyB0ZXRyaW1pbm8ueCArIDJdID0gdmFsO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufSIsImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9sZGZpZWxkIGV4dGVuZHMgRmllbGR7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDFdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxXVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FuSG9sZCA9IHRydWU7XG4gICAgICAgIHRoaXMubWVyZ2VGaWVsZHMgPSBbdGhpcy5jdXJyZW50QmxvY2tdO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXG4gICAgICovXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoKXtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzTmV3SG9sZEJsb2NrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNIb2xkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuc2VuZEhvbGRCbG9jaygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNOZXdOZXh0QmxvY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5yZXNldEhvbGQoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKlxuICAgICBTZXQgdGhlIGJsb2NrIHRvIGEgbG9jYWwgdmFyaWFibGVcbiAgICAgKi9cbiAgICBzZXRCbG9jayhlKXtcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBlLmRldGFpbC5ob2xkQmxvY2s7XG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnggPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay55ID0gMjtcbiAgICAgICAgd2hpbGUodGhpcy5jdXJyZW50QmxvY2sucm90YXRpb24gIT0gMCl7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay5yb3RhdGVMZWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICBSZXNldHMgdGhlIGhvbGRcbiAgICAgKi9cbiAgICByZXNldEhvbGQoKXtcbiAgICAgICAgdGhpcy5jYW5Ib2xkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBTZW5kcyB0aGUgaG9sZCBibG9jayBiYWNrIHRvIHRoZSBwbGF5ZmllbGRcbiAgICAgKi9cbiAgICBzZW5kSG9sZEJsb2NrKCl7XG4gICAgICAgIGlmKCF0aGlzLmNhbkhvbGQpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc1RyYW5zZmVySG9sZEJsb2NrJywge2RldGFpbDoge2hvbGRCbG9jazogdGhpcy5jdXJyZW50QmxvY2t9fSk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB0aGlzLmNhbkhvbGQgPSBmYWxzZVxuICAgIH1cbn0iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi9maWVsZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5leHRmaWVsZCBleHRlbmRzIEZpZWxke1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMgPSBbXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxXSxcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV1cbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBudWxsO1xuICAgICAgICB0aGlzLm1lcmdlRmllbGRzID0gW3RoaXMuY3VycmVudEJsb2NrXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgUmVnaXN0ZXJzIHRoZSBldmVudHMgYW5kIGFkZCBhY3Rpb25zIGFjY29yZGluZ2x5LlxuICAgICAqL1xuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld05leHRCbG9jaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgc2VsZi5zZXRCbG9jayhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXG4gICAgICovXG4gICAgc2V0QmxvY2soZSl7XG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IGUuZGV0YWlsLm5leHRCbG9jaztcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBuZXcgYmxvY2tUeXBlKDAsIDIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9jb25zdC9jb2xvcnMnO1xuaW1wb3J0IElCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL2libG9jayc7XG5pbXBvcnQgSkJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvamJsb2NrJztcbmltcG9ydCBMQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9sYmxvY2snO1xuaW1wb3J0IE9CbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL29ibG9jayc7XG5pbXBvcnQgU0Jsb2NrIGZyb20gJy4uL3RldHJpbWlub3Mvc2Jsb2NrJztcbmltcG9ydCBUQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy90YmxvY2snO1xuaW1wb3J0IFpCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL3pibG9jayc7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9ibG9jayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlmaWVsZHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBudWxsO1xuICAgICAgICB0aGlzLmdob3N0QmxvY2sgPSBudWxsO1xuICAgICAgICB0aGlzLmJhZyA9IFtdO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZU5ld0JhZygpO1xuICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpO1xuICAgIH1cblxuICAgIC8qXG4gICAgIEdlbmVyYXRlcyBhIG5ldyByYW5kb20gYmFnIG9mIDcgdGV0cmltaW5vcy5cbiAgICAgaHR0cHM6Ly90ZXRyaXMud2lraS9SYW5kb21fR2VuZXJhdG9yXG4gICAgICovXG4gICAgZ2VuZXJhdGVOZXdCYWcoKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2dlbmVyYXRlTmV3QmFnJyk7XG4gICAgICAgIHRoaXMuYmFnID0gW0lCbG9jaywgSkJsb2NrLCBMQmxvY2ssIE9CbG9jaywgU0Jsb2NrLCBUQmxvY2ssIFpCbG9ja107XG4gICAgICAgIHRoaXMuc2h1ZmZsZUJhZygpO1xuICAgIH1cblxuICAgIC8qXG4gICAgIFRha2VzIHRoZSBmaXJzdCBibG9jayBmcm9tIHRoZSBiYWcgYW5kIGFzc2lnbiBpdCB0byB0aGUgY3VycmVudCBibG9jay5cbiAgICAgSWYgdGhlIGJhZyBpcyBlbXB0eSwgZ2VuZXJhdGUgYSBuZXcgb25lLlxuICAgICAqL1xuICAgIG5ld0Jsb2NrRnJvbUJhZygpe1xuICAgICAgICBjb25zdCBibG9ja1R5cGUgPSB0aGlzLmJhZy5zaGlmdCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IG5ldyBibG9ja1R5cGUoMywgMCk7XG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xuXG4gICAgICAgIGlmKHRoaXMuYmFnLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlTmV3QmFnKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzTmV3TmV4dEJsb2NrJywge2RldGFpbDoge25leHRCbG9jazogdGhpcy5iYWdbMF19fSk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNHYW1lT3ZlcicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICBTaHVmZmxlcyB0aGUgdGVydHJpbWlub3NcbiAgICAgKi9cbiAgICBzaHVmZmxlQmFnKCl7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmJhZy5sZW5ndGg7IGk7IGktLSkge1xuICAgICAgICAgICAgbGV0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKTtcbiAgICAgICAgICAgIFt0aGlzLmJhZ1tpIC0gMV0sIHRoaXMuYmFnW2pdXSA9IFt0aGlzLmJhZ1tqXSwgdGhpcy5iYWdbaSAtIDFdXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgTW92ZSB0aGUgY3VycmVudCBibG9jayB0byBob2xkXG4gICAgICovXG4gICAgaG9sZEJsb2NrKGUpe1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzTmV3SG9sZEJsb2NrJywge2RldGFpbDoge2hvbGRCbG9jazogdGhpcy5jdXJyZW50QmxvY2t9fSk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG4gICAgICAgIGlmKCFlLmRldGFpbC5ob2xkQmxvY2spe1xuICAgICAgICAgICAgdGhpcy5uZXdCbG9ja0Zyb21CYWcoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gZS5kZXRhaWwuaG9sZEJsb2NrO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCA9IDM7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay55ID0gMDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgdG8gdGhlIHJpZ2h0LiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBtb3ZlQ3VycmVudEJsb2NrUmlnaHQoKXtcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCsrO1xuXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLngtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xuICAgIH1cblxuICAgIC8qXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSBsZWZ0LiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBtb3ZlQ3VycmVudEJsb2NrTGVmdCgpe1xuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54LS07XG5cbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgZG93bndhcmRzLiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbiBhbmQgc2F2ZSBpdCB0byB0aGUgcGxheWZpZWxkLlxuICAgICBDaGVjayBpZiBhbnkgbGluZXMgYXJlIGZvcm1lZCBhbmQgY3JlYXRlZCBhIG5ldyBibG9jay5cbiAgICAgKi9cbiAgICBtb3ZlQ3VycmVudEJsb2NrRG93bigpe1xuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay55Kys7XG5cbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueS0tO1xuXG4gICAgICAgICAgICB0aGlzLnNhdmVCbG9jaygpO1xuICAgICAgICAgICAgdGhpcy5jaGVja0xpbmVzKCk7XG4gICAgICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByb3RhdGVDdXJyZW50QmxvY2soKXtcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sucm90YXRlUmlnaHQoKTtcblxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay5yb3RhdGVMZWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBTdG9yZXMgdGhlIGN1cnJlbnRibG9jayBpbnRvIHRoZSBwbGF5ZmllbGQuXG4gICAgICovXG4gICAgc2F2ZUJsb2NrKCl7XG4gICAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBDaGVjayBpZiB0aGVyZSBhcmUgbmV3IGxpbmVzIGZvcm1lZC5cbiAgICAgKi9cbiAgICBjaGVja0xpbmVzKCl7XG4gICAgICAgIGxldCBjbGVhcmVkUm93cyA9IDA7XG5cbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMuY2FudmFzLmxlbmd0aDsgeSsrKXtcbiAgICAgICAgICAgIGxldCBzdW1Sb3cgPSAwO1xuXG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGhpcy5jYW52YXNbeV0ubGVuZ3RoOyB4Kyspe1xuICAgICAgICAgICAgICAgIC8vSWYgdGhlIHJvdyBjb250YWlucyBhIDAsIHNraXAgdGhlIHJvd1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2FudmFzW3ldW3hdID09IDApe1xuICAgICAgICAgICAgICAgICAgICBzdW1Sb3cgPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdW1Sb3cgKz0gdGhpcy5jYW52YXNbeV1beF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vSWYgdGhlIHN1bSBvZiB0aGUgcm93IGlzIGhpZ2hlciB0aGFuIDE0LCBpdCBtZWFucyBhIGJsb2NrIGlzIHByZXNlbnQgc2luY2UgaXQncyBiaWdnZXIgdGhhbiAxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFcbiAgICAgICAgICAgIGlmKHN1bVJvdyA+IDE0KXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5zcGxpY2UoeSwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGROZXdSb3coKTtcbiAgICAgICAgICAgICAgICBjbGVhcmVkUm93cysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2xlYXJlZFJvd3MgPiAwKXtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNSb3dzQ2xlYXJlZCcsIHtkZXRhaWw6IHtjbGVhcmVkUm93czogY2xlYXJlZFJvd3N9fSk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgIEFkZHMgYSBuZXcgcm93IG9uIHRvcCBvZiB0aGUgcGxheWZpZWxkLlxuICAgICAqL1xuICAgIGFkZE5ld1Jvdygpe1xuICAgICAgICB0aGlzLmNhbnZhcy51bnNoaWZ0KFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBMb3dlcnMgdGhlIGN1cnJlbnRibG9jayB1bnRpbCB0aGVyZSBpcyBjb2xsaXNpb24gZGV0ZWN0ZWQuXG4gICAgICovXG4gICAgZHJvcEJsb2NrKCl7XG4gICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgZG97XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm1vdmVDdXJyZW50QmxvY2tEb3duKClcbiAgICAgICAgfXdoaWxlKHJlc3VsdCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgQ2xvbmVzIHRoZSBjdXJyZW50YmxvY2sgaW4gcG9zaXRpb24gYW5kIHNoYXBlLiBHaXZlIGl0IGEgZ3JheSBjb2xvciBhbmRcbiAgICAgbG93ZXIgaXQgdW50aWwgY29sbGlzaW9uIGlzIGRldGVjdGVkLlxuICAgICAqL1xuICAgIHVwZGF0ZUdob3N0QmxvY2soKXtcbiAgICAgICAgbGV0IGNvbGlzc2lvbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZ2hvc3RCbG9jayA9IG5ldyBCbG9jayh0aGlzLmN1cnJlbnRCbG9jay54LCB0aGlzLmN1cnJlbnRCbG9jay55KTtcbiAgICAgICAgLy9CZWNhdXNlIHRoZSBzaGFwZSBpcyBhIG11bHRpLWRpbWVuc2lvbmFsIGFycmF5IHdlIG5lZWQgdG8gZGVyZWZmZXJlbmNlIGl0IHdoZW4gY29weWluZy5cbiAgICAgICAgdGhpcy5naG9zdEJsb2NrLnNoYXBlID0gdGhpcy5jdXJyZW50QmxvY2suc2hhcGUubWFwKGZ1bmN0aW9uKHJvdyl7XG4gICAgICAgICAgICByZXR1cm4gcm93LnNsaWNlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdob3N0QmxvY2subWFrZUdob3N0KCk7XG5cbiAgICAgICAgZG97XG4gICAgICAgICAgICB0aGlzLmdob3N0QmxvY2sueSArPSAxO1xuXG4gICAgICAgICAgICBjb2xpc3Npb24gPSB0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuZ2hvc3RCbG9jayk7XG4gICAgICAgICAgICBpZihjb2xpc3Npb24pe1xuICAgICAgICAgICAgICAgIHRoaXMuZ2hvc3RCbG9jay55IC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH13aGlsZSghY29saXNzaW9uKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBDaGVjayBpZiB0aGVyZSBpcyBjb2xsaXNpb24uXG4gICAgICovXG4gICAgY2hlY2tDb2xsaXNpb24oYmxvY2spe1xuICAgICAgICBsZXQgY29sbGlzaW9uID0gZmFsc2U7XG5cbiAgICAgICAgbG9vcDE6XG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgYmxvY2suc2hhcGUubGVuZ3RoOyB5Kyspe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBibG9jay5zaGFwZVt5XS5sZW5ndGg7IHgrKyl7XG4gICAgICAgICAgICAgICAgICAgIC8vV2hlbiB0aGUgdmFsdWUgb2YgdGhlIGJsb2NrIGlzIG5vdCAwIGFuZCBvbiB0aGF0IHBsYWNlIGluIHRoZSBwbGF5ZmllbGQgdGhlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC8vb2YgdGhlIHBsYXlmaWVsZCBpcyBhbHNvIG5vdCAwLCB3ZSBoYXZlIGNvbGxpc2lvbi5cbiAgICAgICAgICAgICAgICAgICAgaWYoYmxvY2suc2hhcGVbeV1beF0gIT09IDAgJiYgdGhpcy5jYW52YXNbeSArIGJsb2NrLnldW3ggKyBibG9jay54ICsgMl0gIT09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvb3AxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgfVxuXG4gICAgLypcbiAgICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBjYW52YXMuXG4gICAgICovXG4gICAgZHJhdyhjdHgpe1xuICAgICAgICBjb25zdCB0ZW1wRmllbGQgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xuXG4gICAgICAgIHRlbXBGaWVsZC5tYXAoZnVuY3Rpb24odmFsLCB5KXtcbiAgICAgICAgICAgIHZhbC5tYXAoZnVuY3Rpb24odmFsLCB4KXtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JzW3ZhbF07XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgqMjAsIHkqMjAsIDIwLCAyMCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXG4gICAgICovXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoKXtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dMZWZ0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja0xlZnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dSaWdodCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tSaWdodCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd1VwJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYucm90YXRlQ3VycmVudEJsb2NrKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93RG93bicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tEb3duKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc1NwYWNlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNlbGYuZHJvcEJsb2NrKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc1RyYW5zZmVySG9sZEJsb2NrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBzZWxmLmhvbGRCbG9jayhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgUmV0dXJucyBhIG5ldyBwbGF5ZmllbGQgd2l0aCB0aGUgY3VycmVudGJsb2NrIGFuZCBnaG9zdGJsb2NrIG1lcmdlZCBpbnRvIHRoZW0uXG4gICAgICovXG4gICAgcmVuZGVyVGVtcEZpZWxkKCl7XG4gICAgICAgIC8qXG4gICAgICAgICBDcmVhdGUgYSBuZXcgZGVyZWZmZXJlbmNlZCBwbGF5ZmllbGQgZnJvbSB0aGUgY3VycmVudCBwbGF5ZmllbGRcbiAgICAgICAgIGJ5IHNwbGljaW5nIHRoZSByb3dcbiAgICAgICAgICovXG4gICAgICAgIGxldCB0ZW1wRmllbGQgPSB0aGlzLmNhbnZhcy5tYXAoZnVuY3Rpb24oYXJyKXtcbiAgICAgICAgICAgIHJldHVybiBhcnIuc2xpY2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9NZXJnZSB0aGUgYmxvY2tzIHdpdGggdGhlIHBsYXlmaWVsZFxuICAgICAgICB0aGlzLnJlbmRlckJsb2NrKHRlbXBGaWVsZCwgdGhpcy5naG9zdEJsb2NrKTtcbiAgICAgICAgdGhpcy5yZW5kZXJCbG9jayh0ZW1wRmllbGQsIHRoaXMuY3VycmVudEJsb2NrKTtcblxuICAgICAgICByZXR1cm4gdGVtcEZpZWxkO1xuICAgIH1cblxuICAgIC8qXG4gICAgTWVyZ2VzIGEgYmxvY2sgd2l0aCBhIGZpZWxkXG4gICAgICovXG4gICAgcmVuZGVyQmxvY2soZmllbGQsIHRldHJpbWlubyl7XG4gICAgICAgIHRldHJpbWluby5zaGFwZS5tYXAoZnVuY3Rpb24oYXJyLCBqKXtcbiAgICAgICAgICAgIGFyci5tYXAoZnVuY3Rpb24odmFsLCBpKXtcbiAgICAgICAgICAgICAgICBpZih2YWwgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmaWVsZFtqICsgdGV0cmltaW5vLnldW2kgKyB0ZXRyaW1pbm8ueCArIDJdID0gdmFsO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2Nre1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xuICAgICAgICB0aGlzLnggICAgICAgID0geDtcbiAgICAgICAgdGhpcy55ICAgICAgICA9IHk7XG4gICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIH1cblxuICAgIHJvdGF0ZVJpZ2h0KCl7XG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XG4gICAgICAgIHRoaXMucm93UmV2ZXJzZSgpO1xuXG4gICAgICAgIHRoaXMucm90YXRpb24rKztcbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbiA+IDMpe1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByb3RhdGVMZWZ0KCl7XG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XG4gICAgICAgIHRoaXMuY29sdW1uUmV2ZXJzZSgpO1xuXG4gICAgICAgIHRoaXMucm90YXRpb24tLTtcbiAgICAgICAgaWYodGhpcy5yb3RhdGlvbiA8IDApe1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc3Bvc2UoKXtcbiAgICAgICAgbGV0IG9sZFNoYXBlID0gdGhpcy5zaGFwZTtcblxuICAgICAgICB0aGlzLnNoYXBlID0gb2xkU2hhcGVbMF0ubWFwKGZ1bmN0aW9uKGNvbCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIG9sZFNoYXBlLm1hcChmdW5jdGlvbihyb3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93W2ldXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByb3dSZXZlcnNlKCl7XG4gICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnNoYXBlLm1hcChmdW5jdGlvbihyb3cpe1xuICAgICAgICAgICAgcmV0dXJuIHJvdy5yZXZlcnNlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29sdW1uUmV2ZXJzZSgpe1xuICAgICAgICB0aGlzLnNoYXBlLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBtYWtlR2hvc3QoKXtcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMuc2hhcGUubGVuZ3RoOyB5Kyspe1xuICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IHRoaXMuc2hhcGVbeV0ubGVuZ3RoOyB4Kyspe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hhcGVbeV1beF0gPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbeV1beF0gPSA5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSUJsb2NrIGV4dGVuZHMgQmxvY2t7XG4gICAgY29uc3RydWN0b3IoeCwgeSl7XG4gICAgICAgIHN1cGVyKHgsIHkpO1xuXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXG4gICAgICAgICAgICBbMCwwLDAsMF0sXG4gICAgICAgICAgICBbMiwyLDIsMl0sXG4gICAgICAgICAgICBbMCwwLDAsMF0sXG4gICAgICAgICAgICBbMCwwLDAsMF1cbiAgICAgICAgXTtcbiAgICB9XG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQmxvY2sgZXh0ZW5kcyBCbG9ja3tcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcbiAgICAgICAgICAgIFszLDAsMF0sXG4gICAgICAgICAgICBbMywzLDNdLFxuICAgICAgICAgICAgWzAsMCwwXVxuICAgICAgICBdXG4gICAgfVxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTEJsb2NrIGV4dGVuZHMgQmxvY2t7XG4gICAgY29uc3RydWN0b3IoeCwgeSl7XG4gICAgICAgIHN1cGVyKHgsIHkpO1xuXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXG4gICAgICAgICAgICBbMCwwLDRdLFxuICAgICAgICAgICAgWzQsNCw0XSxcbiAgICAgICAgICAgIFswLDAsMF1cbiAgICAgICAgXVxuICAgIH1cbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9CbG9jayBleHRlbmRzIEJsb2Nre1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xuICAgICAgICBzdXBlcih4LCB5KTtcblxuICAgICAgICB0aGlzLnNoYXBlID0gW1xuICAgICAgICAgICAgWzUsNV0sXG4gICAgICAgICAgICBbNSw1XVxuICAgICAgICBdXG4gICAgfVxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0Jsb2NrIGV4dGVuZHMgQmxvY2t7XG4gICAgY29uc3RydWN0b3IoeCwgeSl7XG4gICAgICAgIHN1cGVyKHgsIHkpO1xuXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXG4gICAgICAgICAgICBbMCw2LDZdLFxuICAgICAgICAgICAgWzYsNiwwXSxcbiAgICAgICAgICAgIFswLDAsMF1cbiAgICAgICAgXVxuICAgIH1cbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRCbG9jayBleHRlbmRzIEJsb2Nre1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xuICAgICAgICBzdXBlcih4LCB5KTtcblxuICAgICAgICB0aGlzLnNoYXBlID0gW1xuICAgICAgICAgICAgWzAsNywwXSxcbiAgICAgICAgICAgIFs3LDcsN10sXG4gICAgICAgICAgICBbMCwwLDBdXG4gICAgICAgIF1cbiAgICB9XG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaQmxvY2sgZXh0ZW5kcyBCbG9ja3tcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcbiAgICAgICAgc3VwZXIoeCwgeSk7XG5cbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcbiAgICAgICAgICAgIFs4LDgsMF0sXG4gICAgICAgICAgICBbMCw4LDhdLFxuICAgICAgICAgICAgWzAsMCwwXVxuICAgICAgICBdXG4gICAgfVxufSIsImltcG9ydCBQbGF5ZmllbGQgZnJvbSAnLi9maWVsZHMvcGxheWZpZWxkJztcbmltcG9ydCBIb2xkZmllbGQgZnJvbSAnLi9maWVsZHMvaG9sZGZpZWxkJztcbmltcG9ydCBOZXh0ZmllbGQgZnJvbSAnLi9maWVsZHMvbmV4dGZpZWxkJztcbmltcG9ydCB7IGtleXMgfSBmcm9tICcuL2NvbnN0L2tleXMnO1xuXG5jbGFzcyBUZXRyaXN7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSB7XG4gICAgICAgICAgICB0ZXRyaXM6ICd0ZXRyaXMnLFxuICAgICAgICAgICAgc2NvcmUgOiAnc2NvcmUnLFxuICAgICAgICAgICAgcm93cyAgOiAncm93cycsXG4gICAgICAgICAgICBsZXZlbCA6ICdsZXZlbCcsXG4gICAgICAgICAgICBob2xkICA6ICdob2xkJyxcbiAgICAgICAgICAgIG5leHQgIDogJ25leHQnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGV0cmlzQ252cz0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMudGV0cmlzKTtcbiAgICAgICAgdGhpcy5ob2xkQ252cyAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5ob2xkKTtcbiAgICAgICAgdGhpcy5uZXh0Q252cyAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5uZXh0KTtcbiAgICAgICAgdGhpcy5ob2xkZmllbGQgPSBuZXcgSG9sZGZpZWxkKCk7XG4gICAgICAgIHRoaXMubmV4dGZpZWxkID0gbmV3IE5leHRmaWVsZCgpO1xuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoKTtcbiAgICAgICAgdGhpcy5mcHMgICAgICAgPSA2MDtcbiAgICAgICAgdGhpcy5sZXZlbCAgICAgPSAxO1xuICAgICAgICB0aGlzLnJvd3MgICAgICA9IDA7XG4gICAgICAgIHRoaXMuc2NvcmUgICAgID0gMDtcbiAgICAgICAgdGhpcy5sb29wQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmdhbWVPdmVyICA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhdXNlICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVvdXQgICA9IDEwMDAvdGhpcy5mcHM7XG5cbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgIFJlZ2lzdGVyIGFsbCBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoKXtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleUV2ZW50cyhlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc0dhbWVPdmVyXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLmVuZEdhbWUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc1BhdXNlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzZWxmLnBhdXNlR2FtZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiVGV0cmlzUm93c0NsZWFyZWRcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVNjb3JlcyhlKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKlxuICAgICBQYXVzZXMgdGhlIGdhbWVcbiAgICAgKi9cbiAgICBwYXVzZUdhbWUoKXtcbiAgICAgICAgaWYoIXRoaXMucGF1c2Upe1xuICAgICAgICAgICAgdGhpcy5wYXVzZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0b3BHYW1lKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgIFN0YXJ0cyB0aGUgZ2FtZWxvb3BcbiAgICAgKi9cbiAgICBzdGFydEdhbWUoKXtcbiAgICAgICAgY29uc3Qgc2VsZiAgICA9IHRoaXM7XG4gICAgICAgIHRoaXMuZ2FtZUxvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe3NlbGYubG9vcChzZWxmKX0sIHRoaXMudGltZW91dCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgU3RvcHMgdGhlIGdhbWVsb29wXG4gICAgICovXG4gICAgc3RvcEdhbWUoKXtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVMb29wKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBFbmQncyB0aGUgZ2FtZVxuICAgICAqL1xuICAgIGVuZEdhbWUoKXtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAgVXBkYXRlIHRoZSB2aXN1YWwgc2NvcmVzXG4gICAgICovXG4gICAgdXBkYXRlU2NvcmVzKGUpe1xuICAgICAgICBjb25zdCBjbGVhcmVkUm93cyA9IGUuZGV0YWlsLmNsZWFyZWRSb3dzO1xuICAgICAgICB0aGlzLnJvd3MgKz0gY2xlYXJlZFJvd3M7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gTWF0aC5mbG9vcig1MCAqIE1hdGgucG93KDEuMSwgY2xlYXJlZFJvd3MpICogY2xlYXJlZFJvd3MpO1xuICAgICAgICB0aGlzLmxldmVsID0gTWF0aC5mbG9vcih0aGlzLnJvd3MgLyA1MCkgKyAxO1xuICAgIH1cblxuICAgIC8qXG4gICAgIFRoZSBnYW1lIGxvb3AgaXRzZWxmLlxuICAgICAqL1xuICAgIGxvb3Aoc2VsZil7XG4gICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgICAgIHNlbGYuZHJhdygpO1xuICAgIH1cblxuICAgIC8qXG4gICAgIFVwZGF0ZSBhbGwgdmFsdWVzIG9mIHRoZSBnYW1lLlxuICAgICAqL1xuICAgIHVwZGF0ZSgpe1xuICAgICAgICBpZighdGhpcy5nYW1lT3Zlcil7XG4gICAgICAgICAgICB0aGlzLmxvb3BDb3VudCsrO1xuXG4gICAgICAgICAgICBpZigodGhpcy5sb29wQ291bnQgJSAoKHRoaXMuZnBzICogMikgLSAodGhpcy5sZXZlbCAqIDUpKSkgPT0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgIERyYXcgZXZlcnl0aGluZyB0byB0aGUgc2NyZWVuLlxuICAgICAqL1xuICAgIGRyYXcoKXtcbiAgICAgICAgY29uc3QgdGV0cmlzQ3R4ID0gdGhpcy50ZXRyaXNDbnZzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgY29uc3QgaG9sZEN0eCA9IHRoaXMuaG9sZENudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBjb25zdCBuZXh0Q3R4ID0gdGhpcy5uZXh0Q252cy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgaWYoIXRoaXMuZ2FtZU92ZXIpe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQuZHJhdyh0ZXRyaXNDdHgpO1xuICAgICAgICAgICAgdGhpcy5ob2xkZmllbGQuZHJhdyhob2xkQ3R4KTtcbiAgICAgICAgICAgIHRoaXMubmV4dGZpZWxkLmRyYXcobmV4dEN0eCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5kcmF3R2FtZU92ZXIodGV0cmlzQ3R4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnNjb3JlKS5pbm5lclRleHQgPSB0aGlzLnNjb3JlO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5yb3dzKS5pbm5lclRleHQgID0gdGhpcy5yb3dzO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5sZXZlbCkuaW5uZXJUZXh0ID0gdGhpcy5sZXZlbDtcbiAgICB9XG5cbiAgICBkcmF3R2FtZU92ZXIoY3R4KXtcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XG4gICAgICAgIGN0eC5mb250ID0gXCIzMHB4IEFyaWFsXCI7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIkdhbWUgT3ZlclwiLCA1MCwgMjUwKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBXaGVuIGEga2V5IGlzIHByZXNzZWQsIGZpcmUgYSBjdXN0b20gZXZlbnQgc28gZGlmZmVyZW50IGNvbXBvbmVudHMgY2FuIGhhbmRsZVxuICAgICB0aGUgZXZlbnRzIHRoZW1zZWxmLlxuICAgICAqL1xuICAgIGhhbmRsZUtleUV2ZW50cyhlKXtcbiAgICAgICAgbGV0IGV2ZW50O1xuXG4gICAgICAgIGlmKHRoaXMucGF1c2Upe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKGUua2V5Q29kZSl7XG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dVcDpcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93VXAnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd0Rvd246XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd0Rvd24nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd0xlZnQ6XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd0xlZnQnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd1JpZ2h0OlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dSaWdodCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBrZXlzLlNwYWNlOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzU3BhY2UnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Uga2V5cy5LZXlQOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzUGF1c2UnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Uga2V5cy5LZXlIOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzSG9sZCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZXZlbnQpe1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm5ldyBUZXRyaXMoKTsiXX0=
