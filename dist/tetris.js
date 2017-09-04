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
            var _this = this;

            /*
             Create a new derefferenced playfield from the current playfield
             by splicing the rows
             */
            var tempField = this.canvas.map(function (arr) {
                return arr.slice();
            });

            //Merge the blocks with the playfield
            Object.keys(this.blocks).forEach(function (key) {
                _this.renderBlock(tempField, _this.blocks[key]);
            });

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
                    if (val === 0) {
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
        _this.canHold = true;
        _this.blocks = {
            currentBlock: null
        };

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
            this.blocks.currentBlock = e.detail.holdBlock;
            this.blocks.currentBlock.x = 0;
            this.blocks.currentBlock.y = 2;

            while (this.blocks.currentBlock.rotation !== 0) {
                this.blocks.currentBlock.rotateLeft();
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

            var event = new CustomEvent('TetrisTransferHoldBlock', { detail: { holdBlock: this.blocks.currentBlock } });

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

        _this.blocks = {
            currentBlock: null
        };

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

            this.blocks.currentBlock = new blockType(0, 2);
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

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Playfield = function (_Field) {
    _inherits(Playfield, _Field);

    function Playfield() {
        _classCallCheck(this, Playfield);

        var _this = _possibleConstructorReturn(this, (Playfield.__proto__ || Object.getPrototypeOf(Playfield)).call(this));

        _this.canvas = [[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
        _this.bag = [];
        _this.blocks = {
            ghostBlock: null,
            currentBlock: null
        };

        _this.registerListeners();
        _this.generateNewBag(true);
        _this.newBlockFromBag();
        return _this;
    }

    /*
     Generates a new random bag of 7 tetriminos.
     https://tetris.wiki/Random_Generator
     */


    _createClass(Playfield, [{
        key: 'generateNewBag',
        value: function generateNewBag(fromConstructor) {
            this.bag = [_iblock2.default, _jblock2.default, _lblock2.default, _oblock2.default, _sblock2.default, _tblock2.default, _zblock2.default];
            this.shuffleBag(fromConstructor);
        }

        /*
         Takes the first block from the bag and assign it to the current block.
         If the bag is empty, generate a new one.
         */

    }, {
        key: 'newBlockFromBag',
        value: function newBlockFromBag() {
            var blockType = this.bag.shift();

            this.blocks.currentBlock = new blockType(3, 0);
            this.updateGhostBlock();

            if (this.bag.length === 0) {
                this.generateNewBag(false);
            }

            var event = new CustomEvent('TetrisNewNextBlock', { detail: { nextBlock: this.bag[0] } });
            document.dispatchEvent(event);

            if (this.checkCollision(this.blocks.currentBlock)) {
                var _event = new Event('TetrisGameOver');
                document.dispatchEvent(_event);
            }
        }

        /*
         Shuffles the tertriminos
         */

    }, {
        key: 'shuffleBag',
        value: function shuffleBag(firstBag) {
            for (var i = this.bag.length; i; i--) {
                var j = Math.floor(Math.random() * i);
                var _ref = [this.bag[j], this.bag[i - 1]];
                this.bag[i - 1] = _ref[0];
                this.bag[j] = _ref[1];
            }

            if (firstBag) {
                if (this.bag[0] == _sblock2.default || this.bag[0] == _zblock2.default || this.bag[0] == _oblock2.default) {
                    this.shuffleBag(true);
                }
            }
        }

        /*
        Move the current block to hold
         */

    }, {
        key: 'holdBlock',
        value: function holdBlock(e) {
            var event = new CustomEvent('TetrisNewHoldBlock', { detail: { holdBlock: this.blocks.currentBlock } });

            document.dispatchEvent(event);

            if (!e.detail.holdBlock) {
                this.newBlockFromBag();
            } else {
                this.blocks.currentBlock = e.detail.holdBlock;
                this.blocks.currentBlock.x = 3;
                this.blocks.currentBlock.y = 0;
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
            this.blocks.currentBlock.x++;

            if (this.checkCollision(this.blocks.currentBlock)) {
                this.blocks.currentBlock.x--;
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
            this.blocks.currentBlock.x--;

            if (this.checkCollision(this.blocks.currentBlock)) {
                this.blocks.currentBlock.x++;
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
            this.blocks.currentBlock.y++;

            if (this.checkCollision(this.blocks.currentBlock)) {
                this.blocks.currentBlock.y--;

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
            this.blocks.currentBlock.rotateRight();

            if (this.checkCollision(this.blocks.currentBlock)) {
                this.blocks.currentBlock.rotateLeft();
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

            this.blocks.ghostBlock = new _block2.default(this.blocks.currentBlock.x, this.blocks.currentBlock.y);
            //Because the shape is a multi-dimensional array we need to derefference it when copying.
            this.blocks.ghostBlock.shape = this.blocks.currentBlock.shape.map(function (row) {
                return row.slice();
            });
            this.blocks.ghostBlock.makeGhost();

            do {
                this.blocks.ghostBlock.y += 1;

                colission = this.checkCollision(this.blocks.ghostBlock);
                if (colission) {
                    this.blocks.ghostBlock.y -= 1;
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
    }]);

    return Playfield;
}(_field2.default);

exports.default = Playfield;

},{"../tetriminos/block":7,"../tetriminos/iblock":8,"../tetriminos/jblock":9,"../tetriminos/lblock":10,"../tetriminos/oblock":11,"../tetriminos/sblock":12,"../tetriminos/tblock":13,"../tetriminos/zblock":14,"./field":3}],7:[function(require,module,exports){
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
            next: 'next',
            time: 'time'
        };
        this.tetrisCnvs = document.getElementById(this.selectors.tetris);
        this.holdCnvs = document.getElementById(this.selectors.hold);
        this.nextCnvs = document.getElementById(this.selectors.next);
        this.holdfield = new _holdfield2.default();
        this.nextfield = new _nextfield2.default();
        this.playfield = new _playfield2.default();
        this.fps = 50;
        this.level = 1;
        this.rows = 0;
        this.score = 0;
        this.loopCount = 0;
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
                self.gameOver();
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
                this.drawText("Pause");
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
         Handles the game over
         */

    }, {
        key: 'gameOver',
        value: function gameOver() {
            this.stopGame();
            this.drawText("Game Over");
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
            this.level = Math.floor(this.rows / 20) + 1;

            if (this.level > 9) {
                this.level = 9;
            }
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
            this.loopCount++;

            if (this.loopCount % (this.fps * 2 - this.level * 10) === 0) {
                this.playfield.moveCurrentBlockDown();
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

            this.playfield.draw(tetrisCtx);
            this.holdfield.draw(holdCtx);
            this.nextfield.draw(nextCtx);

            document.getElementById(this.selectors.score).innerText = this.score;
            document.getElementById(this.selectors.rows).innerText = this.rows;
            document.getElementById(this.selectors.level).innerText = this.level;
            document.getElementById(this.selectors.time).innerText = this.getTime();
        }

        /*
         Writes text on the main canvas
         */

    }, {
        key: 'drawText',
        value: function drawText(text) {
            var ctx = this.tetrisCnvs.getContext("2d");

            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

            ctx.fillRect(0, 0, 300, 600);

            ctx.fillStyle = "#666666";

            ctx.fillText(text, 150, 250);
        }

        /*
        Returns a time string
         */

    }, {
        key: 'getTime',
        value: function getTime() {
            return new Date(Math.floor(this.loopCount / this.fps) * 1000).toISOString().substr(11, 8);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxmaWVsZHNcXGZpZWxkLmpzIiwiZXM2XFxmaWVsZHNcXGhvbGRmaWVsZC5qcyIsImVzNlxcZmllbGRzXFxuZXh0ZmllbGQuanMiLCJlczZcXGZpZWxkc1xccGxheWZpZWxkLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcaWJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxqYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcb2Jsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxzYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHRibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcemJsb2NrLmpzIiwiZXM2XFx0ZXRyaXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FPLElBQU0sMEJBQVM7QUFDbEIsT0FBRyxTQURlO0FBRWxCLE9BQUcsU0FGZTtBQUdsQixPQUFHLFNBSGU7QUFJbEIsT0FBRyxTQUplO0FBS2xCLE9BQUcsU0FMZTtBQU1sQixPQUFHLFNBTmU7QUFPbEIsT0FBRyxTQVBlO0FBUWxCLE9BQUcsU0FSZTtBQVNsQixPQUFHLFNBVGU7QUFVbEIsT0FBRztBQVZlLENBQWY7Ozs7Ozs7O0FDQUEsSUFBTSxzQkFBTztBQUNoQixhQUFZLEVBREk7QUFFaEIsZUFBWSxFQUZJO0FBR2hCLGVBQVksRUFISTtBQUloQixnQkFBWSxFQUpJO0FBS2hCLFdBQVksRUFMSTtBQU1oQixVQUFZLEVBTkk7QUFPaEIsVUFBWTtBQVBJLENBQWI7Ozs7Ozs7Ozs7O0FDQVA7Ozs7SUFFcUIsSzs7Ozs7Ozs7QUFDakI7Ozs2QkFHSyxHLEVBQUk7QUFDTCxnQkFBTSxZQUFZLEtBQUssZUFB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QUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBRFUsRUFFVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBRlUsRUFHVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBSFUsRUFJVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBSlUsRUFLVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBTFUsRUFNVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBTlUsRUFPVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBUFUsRUFRVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBUlUsRUFTVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBVFUsRUFVVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBVlUsRUFXVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBWFUsRUFZVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBWlUsRUFhVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBYlUsRUFjVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBZFUsRUFlVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBZlUsRUFnQlYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQWhCVSxFQWlCVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBakJVLEVBa0JWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FsQlUsRUFtQlYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQW5CVSxFQW9CVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBcEJVLEVBcUJWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FyQlUsRUFzQlYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQXRCVSxFQXVCVixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBdkJVLEVBd0JWLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0F4QlUsQ0FBZDtBQTBCQSxjQUFLLEdBQUwsR0FBVyxFQUFYO0FBQ0EsY0FBSyxNQUFMLEdBQWM7QUFDVix3QkFBYyxJQURKO0FBRVYsMEJBQWM7QUFGSixTQUFkOztBQUtBLGNBQUssaUJBQUw7QUFDQSxjQUFLLGNBQUwsQ0FBb0IsSUFBcEI7QUFDQSxjQUFLLGVBQUw7QUFyQ1M7QUFzQ1o7O0FBRUQ7Ozs7Ozs7O3VDQUllLGUsRUFBZ0I7QUFDM0IsaUJBQUssR0FBTCxHQUFXLDhIQUFYO0FBQ0EsaUJBQUssVUFBTCxDQUFnQixlQUFoQjtBQUNIOztBQUVEOzs7Ozs7OzBDQUlpQjtBQUNiLGdCQUFNLFlBQVksS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFsQjs7QUFFQSxpQkFBSyxNQUFMLENBQVksWUFBWixHQUEyQixJQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLENBQTNCO0FBQ0EsaUJBQUssZ0JBQUw7O0FBRUEsZ0JBQUcsS0FBSyxHQUFMLENBQVMsTUFBVCxLQUFvQixDQUF2QixFQUF5QjtBQUNyQixxQkFBSyxjQUFMLENBQW9CLEtBQXBCO0FBQ0g7O0FBRUQsZ0JBQU0sUUFBUSxJQUFJLFdBQUosQ0FBZ0Isb0JBQWhCLEVBQXNDLEVBQUMsUUFBUSxFQUFDLFdBQVcsS0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFaLEVBQVQsRUFBdEMsQ0FBZDtBQUNBLHFCQUFTLGFBQVQsQ0FBdUIsS0FBdkI7O0FBRUEsZ0JBQUcsS0FBSyxjQUFMLENBQW9CLEtBQUssTUFBTCxDQUFZLFlBQWhDLENBQUgsRUFBaUQ7QUFDN0Msb0JBQU0sU0FBUSxJQUFJLEtBQUosQ0FBVSxnQkFBVixDQUFkO0FBQ0EseUJBQVMsYUFBVCxDQUF1QixNQUF2QjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7OzttQ0FHVyxRLEVBQVM7QUFDaEIsaUJBQUssSUFBSSxJQUFJLEtBQUssR0FBTCxDQUFTLE1BQXRCLEVBQThCLENBQTlCLEVBQWlDLEdBQWpDLEVBQXNDO0FBQ2xDLG9CQUFJLElBQUksS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLENBQTNCLENBQVI7QUFEa0MsMkJBRUQsQ0FBQyxLQUFLLEdBQUwsQ0FBUyxDQUFULENBQUQsRUFBYyxLQUFLLEdBQUwsQ0FBUyxJQUFJLENBQWIsQ0FBZCxDQUZDO0FBRWpDLHFCQUFLLEdBQUwsQ0FBUyxJQUFJLENBQWIsQ0FGaUM7QUFFaEIscUJBQUssR0FBTCxDQUFTLENBQVQsQ0FGZ0I7QUFHckM7O0FBRUQsZ0JBQUcsUUFBSCxFQUFZO0FBQ1Isb0JBQUcsS0FBSyxHQUFMLENBQVMsQ0FBVCx5QkFBeUIsS0FBSyxHQUFMLENBQVMsQ0FBVCxxQkFBekIsSUFBa0QsS0FBSyxHQUFMLENBQVMsQ0FBVCxxQkFBckQsRUFBMkU7QUFDdkUseUJBQUssVUFBTCxDQUFnQixJQUFoQjtBQUNIO0FBQ0o7QUFDSjs7QUFFRDs7Ozs7O2tDQUdVLEMsRUFBRTtBQUNSLGdCQUFNLFFBQVEsSUFBSSxXQUFKLENBQWdCLG9CQUFoQixFQUFzQyxFQUFDLFFBQVEsRUFBQyxXQUFXLEtBQUssTUFBTCxDQUFZLFlBQXhCLEVBQVQsRUFBdEMsQ0FBZDs7QUFFQSxxQkFBUyxhQUFULENBQXVCLEtBQXZCOztBQUVBLGdCQUFHLENBQUMsRUFBRSxNQUFGLENBQVMsU0FBYixFQUF1QjtBQUNuQixxQkFBSyxlQUFMO0FBQ0gsYUFGRCxNQUVLO0FBQ0QscUJBQUssTUFBTCxDQUFZLFlBQVosR0FBNkIsRUFBRSxNQUFGLENBQVMsU0FBdEM7QUFDQSxxQkFBSyxNQUFMLENBQVksWUFBWixDQUF5QixDQUF6QixHQUE2QixDQUE3QjtBQUNBLHFCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLENBQXpCLEdBQTZCLENBQTdCO0FBQ0EscUJBQUssZ0JBQUw7QUFDSDtBQUNKOztBQUVEOzs7Ozs7O2dEQUl1QjtBQUNuQixpQkFBSyxNQUFMLENBQVksWUFBWixDQUF5QixDQUF6Qjs7QUFFQSxnQkFBRyxLQUFLLGNBQUwsQ0FBb0IsS0FBSyxNQUFMLENBQVksWUFBaEMsQ0FBSCxFQUFpRDtBQUM3QyxxQkFBSyxNQUFMLENBQVksWUFBWixDQUF5QixDQUF6QjtBQUNIOztBQUVELGlCQUFLLGdCQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7K0NBSXNCO0FBQ2xCLGlCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLENBQXpCOztBQUVBLGdCQUFHLEtBQUssY0FBTCxDQUFvQixLQUFLLE1BQUwsQ0FBWSxZQUFoQyxDQUFILEVBQWlEO0FBQzdDLHFCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLENBQXpCO0FBQ0g7O0FBRUQsaUJBQUssZ0JBQUw7QUFDSDs7QUFFRDs7Ozs7Ozs7K0NBS3NCO0FBQ2xCLGlCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLENBQXpCOztBQUVBLGdCQUFHLEtBQUssY0FBTCxDQUFvQixLQUFLLE1BQUwsQ0FBWSxZQUFoQyxDQUFILEVBQWlEO0FBQzdDLHFCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLENBQXpCOztBQUVBLHFCQUFLLFNBQUw7QUFDQSxxQkFBSyxVQUFMO0FBQ0EscUJBQUssZUFBTDs7QUFFQSx1QkFBTyxLQUFQO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7NkNBRW1CO0FBQ2hCLGlCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLFdBQXpCOztBQUVBLGdCQUFHLEtBQUssY0FBTCxDQUFvQixLQUFLLE1BQUwsQ0FBWSxZQUFoQyxDQUFILEVBQWlEO0FBQzdDLHFCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLFVBQXpCO0FBQ0g7O0FBRUQsaUJBQUssZ0JBQUw7QUFDSDs7QUFFRDs7Ozs7O29DQUdXO0FBQ1AsaUJBQUssTUFBTCxHQUFjLEtBQUssZUFBTCxFQUFkO0FBQ0g7O0FBRUQ7Ozs7OztxQ0FHWTtBQUNSLGdCQUFJLGNBQWMsQ0FBbEI7O0FBRUEsaUJBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLEtBQUssTUFBTCxDQUFZLE1BQS9CLEVBQXVDLEdBQXZDLEVBQTJDO0FBQ3ZDLG9CQUFJLFNBQVMsQ0FBYjs7QUFFQSxxQkFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLE1BQWxDLEVBQTBDLEdBQTFDLEVBQThDO0FBQzFDO0FBQ0Esd0JBQUcsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsS0FBcUIsQ0FBeEIsRUFBMEI7QUFDdEIsaUNBQVMsQ0FBVDtBQUNBO0FBQ0g7O0FBRUQsOEJBQVUsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsQ0FBVjtBQUNIOztBQUVEO0FBQ0Esb0JBQUcsU0FBUyxFQUFaLEVBQWU7QUFDWCx5QkFBSyxNQUFMLENBQVksTUFBWixDQUFtQixDQUFuQixFQUFzQixDQUF0QjtBQUNBLHlCQUFLLFNBQUw7O0FBRUE7QUFDSDtBQUNKOztBQUVELGdCQUFHLGNBQWMsQ0FBakIsRUFBbUI7QUFDZixvQkFBTSxRQUFRLElBQUksV0FBSixDQUFnQixtQkFBaEIsRUFBcUMsRUFBQyxRQUFRLEVBQUMsYUFBYSxXQUFkLEVBQVQsRUFBckMsQ0FBZDs7QUFFQSx5QkFBUyxhQUFULENBQXVCLEtBQXZCO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7O29DQUdXO0FBQ1AsaUJBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUFwQjtBQUNIOztBQUVEOzs7Ozs7b0NBR1c7QUFDUCxnQkFBSSxlQUFKOztBQUVBLGVBQUU7QUFDRSx5QkFBUyxLQUFLLG9CQUFMLEVBQVQ7QUFDSCxhQUZELFFBRU8sTUFGUDtBQUdIOztBQUVEOzs7Ozs7OzJDQUlrQjtBQUNkLGdCQUFJLFlBQVksS0FBaEI7O0FBRUEsaUJBQUssTUFBTCxDQUFZLFVBQVosR0FBK0Isb0JBQVUsS0FBSyxNQUFMLENBQVksWUFBWixDQUF5QixDQUFuQyxFQUFzQyxLQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLENBQS9ELENBQS9CO0FBQ0E7QUFDQSxpQkFBSyxNQUFMLENBQVksVUFBWixDQUF1QixLQUF2QixHQUErQixLQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLEtBQXpCLENBQStCLEdBQS9CLENBQW1DLFVBQVMsR0FBVCxFQUFhO0FBQzNFLHVCQUFPLElBQUksS0FBSixFQUFQO0FBQ0gsYUFGOEIsQ0FBL0I7QUFHQSxpQkFBSyxNQUFMLENBQVksVUFBWixDQUF1QixTQUF2Qjs7QUFFQSxlQUFFO0FBQ0UscUJBQUssTUFBTCxDQUFZLFVBQVosQ0FBdUIsQ0FBdkIsSUFBNEIsQ0FBNUI7O0FBRUEsNEJBQVksS0FBSyxjQUFMLENBQW9CLEtBQUssTUFBTCxDQUFZLFVBQWhDLENBQVo7QUFDQSxvQkFBRyxTQUFILEVBQWE7QUFDVCx5QkFBSyxNQUFMLENBQVksVUFBWixDQUF1QixDQUF2QixJQUE0QixDQUE1QjtBQUNIO0FBQ0osYUFQRCxRQU9PLENBQUMsU0FQUjtBQVFIOztBQUVEOzs7Ozs7dUNBR2UsSyxFQUFNO0FBQ2pCLGdCQUFJLFlBQVksS0FBaEI7O0FBRUEsbUJBQ0ksS0FBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksTUFBTSxLQUFOLENBQVksTUFBL0IsRUFBdUMsR0FBdkMsRUFBMkM7QUFDdkMscUJBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLE1BQU0sS0FBTixDQUFZLENBQVosRUFBZSxNQUFsQyxFQUEwQyxHQUExQyxFQUE4QztBQUMxQztBQUNBO0FBQ0Esd0JBQUcsTUFBTSxLQUFOLENBQVksQ0FBWixFQUFlLENBQWYsTUFBc0IsQ0FBdEIsSUFBMkIsS0FBSyxNQUFMLENBQVksSUFBSSxNQUFNLENBQXRCLEVBQXlCLElBQUksTUFBTSxDQUFWLEdBQWMsQ0FBdkMsTUFBOEMsQ0FBNUUsRUFBOEU7QUFDMUUsb0NBQVksSUFBWjtBQUNBLDhCQUFNLEtBQU47QUFDSDtBQUNKO0FBQ0o7O0FBRUwsbUJBQU8sU0FBUDtBQUNIOztBQUVEOzs7Ozs7NENBR21CO0FBQ2YsZ0JBQU0sT0FBTyxJQUFiOztBQUVBLHFCQUFTLGdCQUFULENBQTBCLGlCQUExQixFQUE2QyxZQUFVO0FBQ25ELHFCQUFLLG9CQUFMO0FBQ0gsYUFGRDs7QUFJQSxxQkFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVTtBQUNwRCxxQkFBSyxxQkFBTDtBQUNILGFBRkQ7O0FBSUEscUJBQVMsZ0JBQVQsQ0FBMEIsZUFBMUIsRUFBMkMsWUFBVTtBQUNqRCxxQkFBSyxrQkFBTDtBQUNILGFBRkQ7O0FBSUEscUJBQVMsZ0JBQVQsQ0FBMEIsaUJBQTFCLEVBQTZDLFlBQVU7QUFDbkQscUJBQUssb0JBQUw7QUFDSCxhQUZEOztBQUlBLHFCQUFTLGdCQUFULENBQTBCLGFBQTFCLEVBQXlDLFlBQVU7QUFDL0MscUJBQUssU0FBTDtBQUNILGFBRkQ7O0FBSUEscUJBQVMsZ0JBQVQsQ0FBMEIseUJBQTFCLEVBQXFELFVBQVMsQ0FBVCxFQUFXO0FBQzVELHFCQUFLLFNBQUwsQ0FBZSxDQUFmO0FBQ0gsYUFGRDtBQUdIOzs7Ozs7a0JBNVNnQixTOzs7Ozs7Ozs7Ozs7O0lDVkEsSztBQUNqQixtQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFpQjtBQUFBOztBQUNiLGFBQUssQ0FBTCxHQUFnQixDQUFoQjtBQUNBLGFBQUssQ0FBTCxHQUFnQixDQUFoQjtBQUNBLGFBQUssUUFBTCxHQUFnQixDQUFoQjtBQUNIOzs7O3NDQUVZO0FBQ1QsaUJBQUssU0FBTDtBQUNBLGlCQUFLLFVBQUw7O0FBRUEsaUJBQUssUUFBTDtBQUNBLGdCQUFHLEtBQUssUUFBTCxHQUFnQixDQUFuQixFQUFxQjtBQUNqQixxQkFBSyxRQUFMLEdBQWdCLENBQWhCO0FBQ0g7QUFDSjs7O3FDQUVXO0FBQ1IsaUJBQUssU0FBTDtBQUNBLGlCQUFLLGFBQUw7O0FBRUEsaUJBQUssUUFBTDtBQUNBLGdCQUFHLEtBQUssUUFBTCxHQUFnQixDQUFuQixFQUFxQjtBQUNqQixxQkFBSyxRQUFMLEdBQWdCLENBQWhCO0FBQ0g7QUFDSjs7O29DQUVVO0FBQ1AsZ0JBQUksV0FBVyxLQUFLLEtBQXBCOztBQUVBLGlCQUFLLEtBQUwsR0FBYSxTQUFTLENBQVQsRUFBWSxHQUFaLENBQWdCLFVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUI7QUFDMUMsdUJBQU8sU0FBUyxHQUFULENBQWEsVUFBUyxHQUFULEVBQWM7QUFDOUIsMkJBQU8sSUFBSSxDQUFKLENBQVA7QUFDSCxpQkFGTSxDQUFQO0FBR0gsYUFKWSxDQUFiO0FBS0g7OztxQ0FFVztBQUNSLGlCQUFLLEtBQUwsR0FBYSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsVUFBUyxHQUFULEVBQWE7QUFDckMsdUJBQU8sSUFBSSxPQUFKLEVBQVA7QUFDSCxhQUZZLENBQWI7QUFHSDs7O3dDQUVjO0FBQ1gsaUJBQUssS0FBTCxDQUFXLE9BQVg7QUFDSDs7O29DQUVVO0FBQ1AsaUJBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLEtBQUssS0FBTCxDQUFXLE1BQTlCLEVBQXNDLEdBQXRDLEVBQTBDO0FBQ3RDLHFCQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsTUFBakMsRUFBeUMsR0FBekMsRUFBNkM7QUFDekMsd0JBQUcsS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQsS0FBb0IsQ0FBdkIsRUFBeUI7QUFDckI7QUFDSDs7QUFFRCx5QkFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQsSUFBbUIsQ0FBbkI7QUFDSDtBQUNKO0FBQ0o7Ozs7OztrQkF6RGdCLEs7Ozs7Ozs7OztBQ0FyQjs7Ozs7Ozs7Ozs7O0lBRXFCLE07OztBQUNqQixvQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFpQjtBQUFBOztBQUFBLG9IQUNQLENBRE8sRUFDSixDQURJOztBQUdiLGNBQUssS0FBTCxHQUFhLENBQ1QsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLENBRFMsRUFFVCxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsQ0FGUyxFQUdULENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUhTLEVBSVQsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLENBSlMsQ0FBYjtBQUhhO0FBU2hCOzs7OztrQkFWZ0IsTTs7Ozs7Ozs7O0FDRnJCOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ2pCLG9CQUFZLENBQVosRUFBZSxDQUFmLEVBQWlCO0FBQUE7O0FBQUEsb0hBQ1AsQ0FETyxFQUNKLENBREk7O0FBR2IsY0FBSyxLQUFMLEdBQWEsQ0FDVCxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQURTLEVBRVQsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FGUyxFQUdULENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBSFMsQ0FBYjtBQUhhO0FBUWhCOzs7OztrQkFUZ0IsTTs7Ozs7Ozs7O0FDRnJCOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ2pCLG9CQUFZLENBQVosRUFBZSxDQUFmLEVBQWlCO0FBQUE7O0FBQUEsb0hBQ1AsQ0FETyxFQUNKLENBREk7O0FBR2IsY0FBSyxLQUFMLEdBQWEsQ0FDVCxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQURTLEVBRVQsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FGUyxFQUdULENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBSFMsQ0FBYjtBQUhhO0FBUWhCOzs7OztrQkFUZ0IsTTs7Ozs7Ozs7O0FDRnJCOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ2pCLG9CQUFZLENBQVosRUFBZSxDQUFmLEVBQWlCO0FBQUE7O0FBQUEsb0hBQ1AsQ0FETyxFQUNKLENBREk7O0FBR2IsY0FBSyxLQUFMLEdBQWEsQ0FDVCxDQUFDLENBQUQsRUFBRyxDQUFILENBRFMsRUFFVCxDQUFDLENBQUQsRUFBRyxDQUFILENBRlMsQ0FBYjtBQUhhO0FBT2hCOzs7OztrQkFSZ0IsTTs7Ozs7Ozs7O0FDRnJCOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ2pCLG9CQUFZLENBQVosRUFBZSxDQUFmLEVBQWlCO0FBQUE7O0FBQUEsb0hBQ1AsQ0FETyxFQUNKLENBREk7O0FBR2IsY0FBSyxLQUFMLEdBQWEsQ0FDVCxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQURTLEVBRVQsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FGUyxFQUdULENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBSFMsQ0FBYjtBQUhhO0FBUWhCOzs7OztrQkFUZ0IsTTs7Ozs7Ozs7O0FDRnJCOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ2pCLG9CQUFZLENBQVosRUFBZSxDQUFmLEVBQWlCO0FBQUE7O0FBQUEsb0hBQ1AsQ0FETyxFQUNKLENBREk7O0FBR2IsY0FBSyxLQUFMLEdBQWEsQ0FDVCxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQURTLEVBRVQsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FGUyxFQUdULENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBSFMsQ0FBYjtBQUhhO0FBUWhCOzs7OztrQkFUZ0IsTTs7Ozs7Ozs7O0FDRnJCOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ2pCLG9CQUFZLENBQVosRUFBZSxDQUFmLEVBQWlCO0FBQUE7O0FBQUEsb0hBQ1AsQ0FETyxFQUNKLENBREk7O0FBR2IsY0FBSyxLQUFMLEdBQWEsQ0FDVCxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQURTLEVBRVQsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FGUyxFQUdULENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBSFMsQ0FBYjtBQUhhO0FBUWhCOzs7OztrQkFUZ0IsTTs7Ozs7OztBQ0ZyQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU0sTTtBQUNGLHNCQUFhO0FBQUE7O0FBQ1QsYUFBSyxTQUFMLEdBQWlCO0FBQ2Isb0JBQVEsUUFESztBQUViLG1CQUFRLE9BRks7QUFHYixrQkFBUSxNQUhLO0FBSWIsbUJBQVEsT0FKSztBQUtiLGtCQUFRLE1BTEs7QUFNYixrQkFBUSxNQU5LO0FBT2Isa0JBQVE7QUFQSyxTQUFqQjtBQVNBLGFBQUssVUFBTCxHQUFpQixTQUFTLGNBQVQsQ0FBd0IsS0FBSyxTQUFMLENBQWUsTUFBdkMsQ0FBakI7QUFDQSxhQUFLLFFBQUwsR0FBaUIsU0FBUyxjQUFULENBQXdCLEtBQUssU0FBTCxDQUFlLElBQXZDLENBQWpCO0FBQ0EsYUFBSyxRQUFMLEdBQWlCLFNBQVMsY0FBVCxDQUF3QixLQUFLLFNBQUwsQ0FBZSxJQUF2QyxDQUFqQjtBQUNBLGFBQUssU0FBTCxHQUFpQix5QkFBakI7QUFDQSxhQUFLLFNBQUwsR0FBaUIseUJBQWpCO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLHlCQUFqQjtBQUNBLGFBQUssR0FBTCxHQUFpQixFQUFqQjtBQUNBLGFBQUssS0FBTCxHQUFpQixDQUFqQjtBQUNBLGFBQUssSUFBTCxHQUFpQixDQUFqQjtBQUNBLGFBQUssS0FBTCxHQUFpQixDQUFqQjtBQUNBLGFBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNBLGFBQUssS0FBTCxHQUFpQixLQUFqQjtBQUNBLGFBQUssT0FBTCxHQUFpQixPQUFLLEtBQUssR0FBM0I7O0FBRUEsYUFBSyxpQkFBTDtBQUNBLGFBQUssU0FBTDtBQUNIOztBQUVEOzs7Ozs7OzRDQUdtQjtBQUNmLGdCQUFNLE9BQU8sSUFBYjs7QUFFQSxxQkFBUyxnQkFBVCxDQUEwQixTQUExQixFQUFxQyxVQUFTLENBQVQsRUFBVztBQUM1QyxxQkFBSyxlQUFMLENBQXFCLENBQXJCO0FBQ0gsYUFGRDs7QUFJQSxxQkFBUyxnQkFBVCxDQUEwQixnQkFBMUIsRUFBNEMsWUFBVTtBQUNsRCxxQkFBSyxRQUFMO0FBQ0gsYUFGRDs7QUFJQSxxQkFBUyxnQkFBVCxDQUEwQixhQUExQixFQUF5QyxZQUFVO0FBQy9DLHFCQUFLLFNBQUw7QUFDSCxhQUZEOztBQUlBLHFCQUFTLGdCQUFULENBQTBCLG1CQUExQixFQUErQyxVQUFTLENBQVQsRUFBVztBQUN0RCxxQkFBSyxZQUFMLENBQWtCLENBQWxCO0FBQ0gsYUFGRDtBQUdIOztBQUVEOzs7Ozs7b0NBR1c7QUFDUCxnQkFBRyxDQUFDLEtBQUssS0FBVCxFQUFlO0FBQ1gscUJBQUssS0FBTCxHQUFhLElBQWI7O0FBRUEscUJBQUssUUFBTDtBQUNBLHFCQUFLLFFBQUwsQ0FBYyxPQUFkO0FBQ0gsYUFMRCxNQUtLO0FBQ0QscUJBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUEscUJBQUssU0FBTDtBQUNIO0FBQ0o7O0FBRUQ7Ozs7OztvQ0FHVztBQUNQLGdCQUFNLE9BQU8sSUFBYjs7QUFFQSxpQkFBSyxRQUFMLEdBQWdCLFlBQVksWUFBVTtBQUNsQyxxQkFBSyxJQUFMLENBQVUsSUFBVjtBQUNILGFBRmUsRUFFYixLQUFLLE9BRlEsQ0FBaEI7QUFHSDs7QUFFRDs7Ozs7O21DQUdVO0FBQ04sMEJBQWMsS0FBSyxRQUFuQjtBQUNIOztBQUVEOzs7Ozs7bUNBR1U7QUFDTixpQkFBSyxRQUFMO0FBQ0EsaUJBQUssUUFBTCxDQUFjLFdBQWQ7QUFDSDs7QUFFRDs7Ozs7O3FDQUdhLEMsRUFBRTtBQUNYLGdCQUFNLGNBQWMsRUFBRSxNQUFGLENBQVMsV0FBN0I7O0FBRUEsaUJBQUssSUFBTCxJQUFjLFdBQWQ7QUFDQSxpQkFBSyxLQUFMLElBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsV0FBZCxDQUFMLEdBQWtDLFdBQTdDLENBQWQ7QUFDQSxpQkFBSyxLQUFMLEdBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxJQUFMLEdBQVksRUFBdkIsSUFBNkIsQ0FBM0M7O0FBRUEsZ0JBQUcsS0FBSyxLQUFMLEdBQWEsQ0FBaEIsRUFBa0I7QUFDZCxxQkFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs2QkFHSyxJLEVBQUs7QUFDTixpQkFBSyxNQUFMO0FBQ0EsaUJBQUssSUFBTDtBQUNIOztBQUVEOzs7Ozs7aUNBR1E7QUFDSixpQkFBSyxTQUFMOztBQUVBLGdCQUFJLEtBQUssU0FBTCxJQUFtQixLQUFLLEdBQUwsR0FBVyxDQUFaLEdBQWtCLEtBQUssS0FBTCxHQUFhLEVBQWpELENBQUQsS0FBNEQsQ0FBL0QsRUFBaUU7QUFDN0QscUJBQUssU0FBTCxDQUFlLG9CQUFmO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7OytCQUdNO0FBQ0YsZ0JBQU0sWUFBWSxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FBbEI7QUFDQSxnQkFBTSxVQUFZLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsSUFBekIsQ0FBbEI7QUFDQSxnQkFBTSxVQUFZLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsSUFBekIsQ0FBbEI7O0FBRUEsaUJBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsU0FBcEI7QUFDQSxpQkFBSyxTQUFMLENBQWUsSUFBZixDQUFvQixPQUFwQjtBQUNBLGlCQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLE9BQXBCOztBQUVBLHFCQUFTLGNBQVQsQ0FBd0IsS0FBSyxTQUFMLENBQWUsS0FBdkMsRUFBOEMsU0FBOUMsR0FBMEQsS0FBSyxLQUEvRDtBQUNBLHFCQUFTLGNBQVQsQ0FBd0IsS0FBSyxTQUFMLENBQWUsSUFBdkMsRUFBNkMsU0FBN0MsR0FBMEQsS0FBSyxJQUEvRDtBQUNBLHFCQUFTLGNBQVQsQ0FBd0IsS0FBSyxTQUFMLENBQWUsS0FBdkMsRUFBOEMsU0FBOUMsR0FBMEQsS0FBSyxLQUEvRDtBQUNBLHFCQUFTLGNBQVQsQ0FBd0IsS0FBSyxTQUFMLENBQWUsSUFBdkMsRUFBNkMsU0FBN0MsR0FBMEQsS0FBSyxPQUFMLEVBQTFEO0FBQ0g7O0FBRUQ7Ozs7OztpQ0FHUyxJLEVBQUs7QUFDVixnQkFBTSxNQUFNLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixJQUEzQixDQUFaOztBQUVBLGdCQUFJLElBQUosR0FBZ0IsWUFBaEI7QUFDQSxnQkFBSSxTQUFKLEdBQWdCLFFBQWhCO0FBQ0EsZ0JBQUksU0FBSixHQUFnQiwwQkFBaEI7O0FBRUEsZ0JBQUksUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEI7O0FBRUEsZ0JBQUksU0FBSixHQUFnQixTQUFoQjs7QUFFQSxnQkFBSSxRQUFKLENBQWEsSUFBYixFQUFtQixHQUFuQixFQUF3QixHQUF4QjtBQUNIOztBQUVEOzs7Ozs7a0NBR1M7QUFDTCxtQkFBTyxJQUFJLElBQUosQ0FBUyxLQUFLLEtBQUwsQ0FBVyxLQUFLLFNBQUwsR0FBaUIsS0FBSyxHQUFqQyxJQUF3QyxJQUFqRCxFQUF1RCxXQUF2RCxHQUFxRSxNQUFyRSxDQUE0RSxFQUE1RSxFQUFnRixDQUFoRixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7d0NBSWdCLEMsRUFBRTtBQUNkLGdCQUFJLGNBQUo7O0FBRUEsZ0JBQUcsS0FBSyxLQUFMLElBQWMsRUFBRSxPQUFGLEtBQWMsV0FBSyxJQUFwQyxFQUF5QztBQUNyQztBQUNIOztBQUVELG9CQUFPLEVBQUUsT0FBVDtBQUNJLHFCQUFLLFdBQUssT0FBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxlQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssU0FBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxpQkFBVixDQUFSO0FBQ0E7QUFDSixxQkFBSyxXQUFLLFNBQVY7QUFDSSxzQkFBRSxjQUFGO0FBQ0EsNEJBQVEsSUFBSSxLQUFKLENBQVUsaUJBQVYsQ0FBUjtBQUNBO0FBQ0oscUJBQUssV0FBSyxVQUFWO0FBQ0ksc0JBQUUsY0FBRjtBQUNBLDRCQUFRLElBQUksS0FBSixDQUFVLGtCQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssS0FBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxhQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssSUFBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxhQUFWLENBQVI7QUFDQTtBQUNKLHFCQUFLLFdBQUssSUFBVjtBQUNJLHNCQUFFLGNBQUY7QUFDQSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxZQUFWLENBQVI7QUFDQTtBQTVCUjs7QUErQkEsZ0JBQUcsS0FBSCxFQUFTO0FBQ0wseUJBQVMsYUFBVCxDQUF1QixLQUF2QjtBQUNIO0FBQ0o7Ozs7OztBQUdMLElBQUksTUFBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgY29sb3JzID0ge1xyXG4gICAgMDogJyNDQ0NDQ0MnLFxyXG4gICAgMTogJyM4ODg4ODgnLFxyXG4gICAgMjogJyMzMUM3RUYnLFxyXG4gICAgMzogJyM1QTY1QUQnLFxyXG4gICAgNDogJyNFRjc5MjEnLFxyXG4gICAgNTogJyNGN0QzMDgnLFxyXG4gICAgNjogJyM0MkI2NDInLFxyXG4gICAgNzogJyNBRDREOUMnLFxyXG4gICAgODogJyNFRjIwMjknLFxyXG4gICAgOTogJyNCQkJCQkInXHJcbn07IiwiZXhwb3J0IGNvbnN0IGtleXMgPSB7XHJcbiAgICBBcnJvd1VwICAgOiAzOCxcclxuICAgIEFycm93RG93biA6IDQwLFxyXG4gICAgQXJyb3dMZWZ0IDogMzcsXHJcbiAgICBBcnJvd1JpZ2h0OiAzOSxcclxuICAgIFNwYWNlICAgICA6IDMyLFxyXG4gICAgS2V5UCAgICAgIDogODAsXHJcbiAgICBLZXlIICAgICAgOiA3MlxyXG59OyIsImltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4uL2NvbnN0L2NvbG9ycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZHtcclxuICAgIC8qXHJcbiAgICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBjb25zdCB0ZW1wRmllbGQgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xyXG5cclxuICAgICAgICB0ZW1wRmllbGQubWFwKGZ1bmN0aW9uKHZhbCwgeSl7XHJcbiAgICAgICAgICAgIHZhbC5tYXAoZnVuY3Rpb24odmFsLCB4KXtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcnNbdmFsXTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4KjIwLCB5KjIwLCAyMCwgMjApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmV0dXJucyBhIG5ldyBwbGF5ZmllbGQgd2l0aCB0aGUgY3VycmVudGJsb2NrIGFuZCBnaG9zdGJsb2NrIG1lcmdlZCBpbnRvIHRoZW0uXHJcbiAgICAgKi9cclxuICAgIHJlbmRlclRlbXBGaWVsZCgpe1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIENyZWF0ZSBhIG5ldyBkZXJlZmZlcmVuY2VkIHBsYXlmaWVsZCBmcm9tIHRoZSBjdXJyZW50IHBsYXlmaWVsZFxyXG4gICAgICAgICBieSBzcGxpY2luZyB0aGUgcm93c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxldCB0ZW1wRmllbGQgPSB0aGlzLmNhbnZhcy5tYXAoZnVuY3Rpb24oYXJyKXtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5zbGljZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL01lcmdlIHRoZSBibG9ja3Mgd2l0aCB0aGUgcGxheWZpZWxkXHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5ibG9ja3MpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJCbG9jayh0ZW1wRmllbGQsIHRoaXMuYmxvY2tzW2tleV0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZW1wRmllbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNZXJnZXMgYSBibG9jayB3aXRoIGEgZmllbGRcclxuICAgICAqL1xyXG4gICAgcmVuZGVyQmxvY2soZmllbGQsIHRldHJpbWlubyl7XHJcbiAgICAgICAgaWYoIXRldHJpbWlubyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRldHJpbWluby5zaGFwZS5tYXAoZnVuY3Rpb24oYXJyLCBqKXtcclxuICAgICAgICAgICAgYXJyLm1hcChmdW5jdGlvbih2YWwsIGkpe1xyXG4gICAgICAgICAgICAgICAgaWYodmFsID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRbaiArIHRldHJpbWluby55XVtpICsgdGV0cmltaW5vLnggKyAyXSA9IHZhbDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbGRmaWVsZCBleHRlbmRzIEZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5jYW5Ib2xkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJsb2NrcyA9IHtcclxuICAgICAgICAgICAgY3VycmVudEJsb2NrOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVnaXN0ZXJzIHRoZSBldmVudHMgYW5kIGFkZCBhY3Rpb25zIGFjY29yZGluZ2x5LlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNOZXdIb2xkQmxvY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5zZXRCbG9jayhlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzSG9sZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuc2VuZEhvbGRCbG9jaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNOZXdOZXh0QmxvY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJlc2V0SG9sZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTZXQgdGhlIGJsb2NrIHRvIGEgbG9jYWwgdmFyaWFibGVcclxuICAgICAqL1xyXG4gICAgc2V0QmxvY2soZSl7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrID0gZS5kZXRhaWwuaG9sZEJsb2NrO1xyXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54ID0gMDtcclxuICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueSA9IDI7XHJcblxyXG4gICAgICAgIHdoaWxlKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay5yb3RhdGlvbiAhPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay5yb3RhdGVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVzZXRzIHRoZSBob2xkXHJcbiAgICAgKi9cclxuICAgIHJlc2V0SG9sZCgpe1xyXG4gICAgICAgIHRoaXMuY2FuSG9sZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTZW5kcyB0aGUgaG9sZCBibG9jayBiYWNrIHRvIHRoZSBwbGF5ZmllbGRcclxuICAgICAqL1xyXG4gICAgc2VuZEhvbGRCbG9jaygpe1xyXG4gICAgICAgIGlmKCF0aGlzLmNhbkhvbGQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzVHJhbnNmZXJIb2xkQmxvY2snLCB7ZGV0YWlsOiB7aG9sZEJsb2NrOiB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2t9fSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbkhvbGQgPSBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5leHRmaWVsZCBleHRlbmRzIEZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxXVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMuYmxvY2tzID0ge1xyXG4gICAgICAgICAgICBjdXJyZW50QmxvY2s6IG51bGxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld05leHRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXHJcbiAgICAgKi9cclxuICAgIHNldEJsb2NrKGUpe1xyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IGUuZGV0YWlsLm5leHRCbG9jaztcclxuXHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrID0gbmV3IGJsb2NrVHlwZSgwLCAyKTtcclxuICAgIH1cclxufSIsImltcG9ydCBJQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9pYmxvY2snO1xyXG5pbXBvcnQgSkJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvamJsb2NrJztcclxuaW1wb3J0IExCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL2xibG9jayc7XHJcbmltcG9ydCBPQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9vYmxvY2snO1xyXG5pbXBvcnQgU0Jsb2NrIGZyb20gJy4uL3RldHJpbWlub3Mvc2Jsb2NrJztcclxuaW1wb3J0IFRCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL3RibG9jayc7XHJcbmltcG9ydCBaQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy96YmxvY2snO1xyXG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9ibG9jayc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlmaWVsZCBleHRlbmRzIEZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuYmFnID0gW107XHJcbiAgICAgICAgdGhpcy5ibG9ja3MgPSB7XHJcbiAgICAgICAgICAgIGdob3N0QmxvY2sgIDogbnVsbCxcclxuICAgICAgICAgICAgY3VycmVudEJsb2NrOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVOZXdCYWcodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5uZXdCbG9ja0Zyb21CYWcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIEdlbmVyYXRlcyBhIG5ldyByYW5kb20gYmFnIG9mIDcgdGV0cmltaW5vcy5cclxuICAgICBodHRwczovL3RldHJpcy53aWtpL1JhbmRvbV9HZW5lcmF0b3JcclxuICAgICAqL1xyXG4gICAgZ2VuZXJhdGVOZXdCYWcoZnJvbUNvbnN0cnVjdG9yKXtcclxuICAgICAgICB0aGlzLmJhZyA9IFtJQmxvY2ssIEpCbG9jaywgTEJsb2NrLCBPQmxvY2ssIFNCbG9jaywgVEJsb2NrLCBaQmxvY2tdO1xyXG4gICAgICAgIHRoaXMuc2h1ZmZsZUJhZyhmcm9tQ29uc3RydWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgVGFrZXMgdGhlIGZpcnN0IGJsb2NrIGZyb20gdGhlIGJhZyBhbmQgYXNzaWduIGl0IHRvIHRoZSBjdXJyZW50IGJsb2NrLlxyXG4gICAgIElmIHRoZSBiYWcgaXMgZW1wdHksIGdlbmVyYXRlIGEgbmV3IG9uZS5cclxuICAgICAqL1xyXG4gICAgbmV3QmxvY2tGcm9tQmFnKCl7XHJcbiAgICAgICAgY29uc3QgYmxvY2tUeXBlID0gdGhpcy5iYWcuc2hpZnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrID0gbmV3IGJsb2NrVHlwZSgzLCAwKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5iYWcubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU5ld0JhZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzTmV3TmV4dEJsb2NrJywge2RldGFpbDoge25leHRCbG9jazogdGhpcy5iYWdbMF19fSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNHYW1lT3ZlcicpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTaHVmZmxlcyB0aGUgdGVydHJpbWlub3NcclxuICAgICAqL1xyXG4gICAgc2h1ZmZsZUJhZyhmaXJzdEJhZyl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuYmFnLmxlbmd0aDsgaTsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XHJcbiAgICAgICAgICAgIFt0aGlzLmJhZ1tpIC0gMV0sIHRoaXMuYmFnW2pdXSA9IFt0aGlzLmJhZ1tqXSwgdGhpcy5iYWdbaSAtIDFdXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGZpcnN0QmFnKXtcclxuICAgICAgICAgICAgaWYodGhpcy5iYWdbMF0gPT0gU0Jsb2NrIHx8IHRoaXMuYmFnWzBdID09IFpCbG9jayB8fCB0aGlzLmJhZ1swXSA9PSBPQmxvY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaHVmZmxlQmFnKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBNb3ZlIHRoZSBjdXJyZW50IGJsb2NrIHRvIGhvbGRcclxuICAgICAqL1xyXG4gICAgaG9sZEJsb2NrKGUpe1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNOZXdIb2xkQmxvY2snLCB7ZGV0YWlsOiB7aG9sZEJsb2NrOiB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2t9fSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cclxuICAgICAgICBpZighZS5kZXRhaWwuaG9sZEJsb2NrKXtcclxuICAgICAgICAgICAgdGhpcy5uZXdCbG9ja0Zyb21CYWcoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sgICA9IGUuZGV0YWlsLmhvbGRCbG9jaztcclxuICAgICAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnggPSAzO1xyXG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSByaWdodC4gSWYgY29sbGlzaW9uIGlzIGRldGVjdGVkXHJcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgbW92ZUN1cnJlbnRCbG9ja1JpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLngrKztcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLngtLTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgdG8gdGhlIGxlZnQuIElmIGNvbGxpc2lvbiBpcyBkZXRlY3RlZFxyXG4gICAgIHJlc3RvcmUgaXQncyBvbGQgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIG1vdmVDdXJyZW50QmxvY2tMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLngtLTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLngrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgZG93bndhcmRzLiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcclxuICAgICByZXN0b3JlIGl0J3Mgb2xkIHBvc2l0aW9uIGFuZCBzYXZlIGl0IHRvIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgQ2hlY2sgaWYgYW55IGxpbmVzIGFyZSBmb3JtZWQgYW5kIGNyZWF0ZWQgYSBuZXcgYmxvY2suXHJcbiAgICAgKi9cclxuICAgIG1vdmVDdXJyZW50QmxvY2tEb3duKCl7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnkrKztcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnktLTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUJsb2NrKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tMaW5lcygpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlQ3VycmVudEJsb2NrKCl7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnJvdGF0ZVJpZ2h0KCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay5yb3RhdGVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFN0b3JlcyB0aGUgY3VycmVudGJsb2NrIGludG8gdGhlIHBsYXlmaWVsZC5cclxuICAgICAqL1xyXG4gICAgc2F2ZUJsb2NrKCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQ2hlY2sgaWYgdGhlcmUgYXJlIG5ldyBsaW5lcyBmb3JtZWQuXHJcbiAgICAgKi9cclxuICAgIGNoZWNrTGluZXMoKXtcclxuICAgICAgICBsZXQgY2xlYXJlZFJvd3MgPSAwO1xyXG5cclxuICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgdGhpcy5jYW52YXMubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICBsZXQgc3VtUm93ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCB0aGlzLmNhbnZhc1t5XS5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZSByb3cgY29udGFpbnMgYSAwLCBza2lwIHRoZSByb3dcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2FudmFzW3ldW3hdID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bVJvdyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3VtUm93ICs9IHRoaXMuY2FudmFzW3ldW3hdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0lmIHRoZSBzdW0gb2YgdGhlIHJvdyBpcyBoaWdoZXIgdGhhbiAxNCwgaXQgbWVhbnMgYSBibG9jayBpcyBwcmVzZW50IHNpbmNlIGl0J3MgYmlnZ2VyIHRoYW4gMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXHJcbiAgICAgICAgICAgIGlmKHN1bVJvdyA+IDE0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLnNwbGljZSh5LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3Um93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJlZFJvd3MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY2xlYXJlZFJvd3MgPiAwKXtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc1Jvd3NDbGVhcmVkJywge2RldGFpbDoge2NsZWFyZWRSb3dzOiBjbGVhcmVkUm93c319KTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIEFkZHMgYSBuZXcgcm93IG9uIHRvcCBvZiB0aGUgcGxheWZpZWxkLlxyXG4gICAgICovXHJcbiAgICBhZGROZXdSb3coKXtcclxuICAgICAgICB0aGlzLmNhbnZhcy51bnNoaWZ0KFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIExvd2VycyB0aGUgY3VycmVudGJsb2NrIHVudGlsIHRoZXJlIGlzIGNvbGxpc2lvbiBkZXRlY3RlZC5cclxuICAgICAqL1xyXG4gICAgZHJvcEJsb2NrKCl7XHJcbiAgICAgICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICAgICAgZG97XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMubW92ZUN1cnJlbnRCbG9ja0Rvd24oKVxyXG4gICAgICAgIH13aGlsZShyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQ2xvbmVzIHRoZSBjdXJyZW50YmxvY2sgaW4gcG9zaXRpb24gYW5kIHNoYXBlLiBHaXZlIGl0IGEgZ3JheSBjb2xvciBhbmRcclxuICAgICBsb3dlciBpdCB1bnRpbCBjb2xsaXNpb24gaXMgZGV0ZWN0ZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUdob3N0QmxvY2soKXtcclxuICAgICAgICBsZXQgY29saXNzaW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuYmxvY2tzLmdob3N0QmxvY2sgICAgICAgPSBuZXcgQmxvY2sodGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLngsIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay55KTtcclxuICAgICAgICAvL0JlY2F1c2UgdGhlIHNoYXBlIGlzIGEgbXVsdGktZGltZW5zaW9uYWwgYXJyYXkgd2UgbmVlZCB0byBkZXJlZmZlcmVuY2UgaXQgd2hlbiBjb3B5aW5nLlxyXG4gICAgICAgIHRoaXMuYmxvY2tzLmdob3N0QmxvY2suc2hhcGUgPSB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2suc2hhcGUubWFwKGZ1bmN0aW9uKHJvdyl7XHJcbiAgICAgICAgICAgIHJldHVybiByb3cuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJsb2Nrcy5naG9zdEJsb2NrLm1ha2VHaG9zdCgpO1xyXG5cclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgdGhpcy5ibG9ja3MuZ2hvc3RCbG9jay55ICs9IDE7XHJcblxyXG4gICAgICAgICAgICBjb2xpc3Npb24gPSB0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuYmxvY2tzLmdob3N0QmxvY2spO1xyXG4gICAgICAgICAgICBpZihjb2xpc3Npb24pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MuZ2hvc3RCbG9jay55IC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9d2hpbGUoIWNvbGlzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDaGVjayBpZiB0aGVyZSBpcyBjb2xsaXNpb24uXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQ29sbGlzaW9uKGJsb2NrKXtcclxuICAgICAgICBsZXQgY29sbGlzaW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxvb3AxOlxyXG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgYmxvY2suc2hhcGUubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IGJsb2NrLnNoYXBlW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAvL1doZW4gdGhlIHZhbHVlIG9mIHRoZSBibG9jayBpcyBub3QgMCBhbmQgb24gdGhhdCBwbGFjZSBpbiB0aGUgcGxheWZpZWxkIHRoZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vb2YgdGhlIHBsYXlmaWVsZCBpcyBhbHNvIG5vdCAwLCB3ZSBoYXZlIGNvbGxpc2lvbi5cclxuICAgICAgICAgICAgICAgICAgICBpZihibG9jay5zaGFwZVt5XVt4XSAhPT0gMCAmJiB0aGlzLmNhbnZhc1t5ICsgYmxvY2sueV1beCArIGJsb2NrLnggKyAyXSAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvb3AxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVnaXN0ZXJzIHRoZSBldmVudHMgYW5kIGFkZCBhY3Rpb25zIGFjY29yZGluZ2x5LlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd0xlZnQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tMZWZ0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93UmlnaHQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tSaWdodCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd1VwJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5yb3RhdGVDdXJyZW50QmxvY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dEb3duJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrRG93bigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNTcGFjZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuZHJvcEJsb2NrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc1RyYW5zZmVySG9sZEJsb2NrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYuaG9sZEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICB0aGlzLnggICAgICAgID0geDtcclxuICAgICAgICB0aGlzLnkgICAgICAgID0geTtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5yb3dSZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMucm90YXRpb24rKztcclxuICAgICAgICBpZih0aGlzLnJvdGF0aW9uID4gMyl7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy50cmFuc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmNvbHVtblJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbi0tO1xyXG4gICAgICAgIGlmKHRoaXMucm90YXRpb24gPCAwKXtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zcG9zZSgpe1xyXG4gICAgICAgIGxldCBvbGRTaGFwZSA9IHRoaXMuc2hhcGU7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvbGRTaGFwZVswXS5tYXAoZnVuY3Rpb24oY29sLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbGRTaGFwZS5tYXAoZnVuY3Rpb24ocm93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93W2ldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcm93UmV2ZXJzZSgpe1xyXG4gICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnNoYXBlLm1hcChmdW5jdGlvbihyb3cpe1xyXG4gICAgICAgICAgICByZXR1cm4gcm93LnJldmVyc2UoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbHVtblJldmVyc2UoKXtcclxuICAgICAgICB0aGlzLnNoYXBlLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlR2hvc3QoKXtcclxuICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgdGhpcy5zaGFwZS5sZW5ndGg7IHkrKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCB0aGlzLnNoYXBlW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hhcGVbeV1beF0gPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFwZVt5XVt4XSA9IDk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCwwLDAsMF0sXHJcbiAgICAgICAgICAgIFsyLDIsMiwyXSxcclxuICAgICAgICAgICAgWzAsMCwwLDBdLFxyXG4gICAgICAgICAgICBbMCwwLDAsMF1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzMsMCwwXSxcclxuICAgICAgICAgICAgWzMsMywzXSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDAsNF0sXHJcbiAgICAgICAgICAgIFs0LDQsNF0sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbNSw1XSxcclxuICAgICAgICAgICAgWzUsNV1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCw2LDZdLFxyXG4gICAgICAgICAgICBbNiw2LDBdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVEJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsNywwXSxcclxuICAgICAgICAgICAgWzcsNyw3XSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFs4LDgsMF0sXHJcbiAgICAgICAgICAgIFswLDgsOF0sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWZpZWxkIGZyb20gJy4vZmllbGRzL3BsYXlmaWVsZCc7XHJcbmltcG9ydCBIb2xkZmllbGQgZnJvbSAnLi9maWVsZHMvaG9sZGZpZWxkJztcclxuaW1wb3J0IE5leHRmaWVsZCBmcm9tICcuL2ZpZWxkcy9uZXh0ZmllbGQnO1xyXG5pbXBvcnQgeyBrZXlzIH0gZnJvbSAnLi9jb25zdC9rZXlzJztcclxuXHJcbmNsYXNzIFRldHJpc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSB7XHJcbiAgICAgICAgICAgIHRldHJpczogJ3RldHJpcycsXHJcbiAgICAgICAgICAgIHNjb3JlIDogJ3Njb3JlJyxcclxuICAgICAgICAgICAgcm93cyAgOiAncm93cycsXHJcbiAgICAgICAgICAgIGxldmVsIDogJ2xldmVsJyxcclxuICAgICAgICAgICAgaG9sZCAgOiAnaG9sZCcsXHJcbiAgICAgICAgICAgIG5leHQgIDogJ25leHQnLFxyXG4gICAgICAgICAgICB0aW1lICA6ICd0aW1lJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50ZXRyaXNDbnZzPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy50ZXRyaXMpO1xyXG4gICAgICAgIHRoaXMuaG9sZENudnMgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMuaG9sZCk7XHJcbiAgICAgICAgdGhpcy5uZXh0Q252cyAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5uZXh0KTtcclxuICAgICAgICB0aGlzLmhvbGRmaWVsZCA9IG5ldyBIb2xkZmllbGQoKTtcclxuICAgICAgICB0aGlzLm5leHRmaWVsZCA9IG5ldyBOZXh0ZmllbGQoKTtcclxuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoKTtcclxuICAgICAgICB0aGlzLmZwcyAgICAgICA9IDUwO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgICAgID0gMTtcclxuICAgICAgICB0aGlzLnJvd3MgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5zY29yZSAgICAgPSAwO1xyXG4gICAgICAgIHRoaXMubG9vcENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnBhdXNlICAgICA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGltZW91dCAgID0gMTAwMC90aGlzLmZwcztcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlciBhbGwgbGlzdGVuZXJzLlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5oYW5kbGVLZXlFdmVudHMoZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJUZXRyaXNHYW1lT3ZlclwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLmdhbWVPdmVyKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJUZXRyaXNQYXVzZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnBhdXNlR2FtZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiVGV0cmlzUm93c0NsZWFyZWRcIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYudXBkYXRlU2NvcmVzKGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBQYXVzZXMgdGhlIGdhbWVcclxuICAgICAqL1xyXG4gICAgcGF1c2VHYW1lKCl7XHJcbiAgICAgICAgaWYoIXRoaXMucGF1c2Upe1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEdhbWUoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3VGV4dChcIlBhdXNlXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFN0YXJ0cyB0aGUgZ2FtZWxvb3BcclxuICAgICAqL1xyXG4gICAgc3RhcnRHYW1lKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUxvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLmxvb3Aoc2VsZilcclxuICAgICAgICB9LCB0aGlzLnRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU3RvcHMgdGhlIGdhbWVsb29wXHJcbiAgICAgKi9cclxuICAgIHN0b3BHYW1lKCl7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVMb29wKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIEhhbmRsZXMgdGhlIGdhbWUgb3ZlclxyXG4gICAgICovXHJcbiAgICBnYW1lT3Zlcigpe1xyXG4gICAgICAgIHRoaXMuc3RvcEdhbWUoKTtcclxuICAgICAgICB0aGlzLmRyYXdUZXh0KFwiR2FtZSBPdmVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgVXBkYXRlIHRoZSB2aXN1YWwgc2NvcmVzXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVNjb3JlcyhlKXtcclxuICAgICAgICBjb25zdCBjbGVhcmVkUm93cyA9IGUuZGV0YWlsLmNsZWFyZWRSb3dzO1xyXG5cclxuICAgICAgICB0aGlzLnJvd3MgICs9IGNsZWFyZWRSb3dzO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gTWF0aC5mbG9vcig1MCAqIE1hdGgucG93KDEuMSwgY2xlYXJlZFJvd3MpICogY2xlYXJlZFJvd3MpO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgID0gTWF0aC5mbG9vcih0aGlzLnJvd3MgLyAyMCkgKyAxO1xyXG5cclxuICAgICAgICBpZih0aGlzLmxldmVsID4gOSl7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSA5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFRoZSBnYW1lIGxvb3AgaXRzZWxmLlxyXG4gICAgICovXHJcbiAgICBsb29wKHNlbGYpe1xyXG4gICAgICAgIHNlbGYudXBkYXRlKCk7XHJcbiAgICAgICAgc2VsZi5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBVcGRhdGUgYWxsIHZhbHVlcyBvZiB0aGUgZ2FtZS5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgdGhpcy5sb29wQ291bnQrKztcclxuXHJcbiAgICAgICAgaWYoKHRoaXMubG9vcENvdW50ICUgKCh0aGlzLmZwcyAqIDIpIC0gKHRoaXMubGV2ZWwgKiAxMCkpKSA9PT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLm1vdmVDdXJyZW50QmxvY2tEb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBzY3JlZW4uXHJcbiAgICAgKi9cclxuICAgIGRyYXcoKXtcclxuICAgICAgICBjb25zdCB0ZXRyaXNDdHggPSB0aGlzLnRldHJpc0NudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNvbnN0IGhvbGRDdHggICA9IHRoaXMuaG9sZENudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNvbnN0IG5leHRDdHggICA9IHRoaXMubmV4dENudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXlmaWVsZC5kcmF3KHRldHJpc0N0eCk7XHJcbiAgICAgICAgdGhpcy5ob2xkZmllbGQuZHJhdyhob2xkQ3R4KTtcclxuICAgICAgICB0aGlzLm5leHRmaWVsZC5kcmF3KG5leHRDdHgpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5zY29yZSkuaW5uZXJUZXh0ID0gdGhpcy5zY29yZTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5yb3dzKS5pbm5lclRleHQgID0gdGhpcy5yb3dzO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLmxldmVsKS5pbm5lclRleHQgPSB0aGlzLmxldmVsO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnRpbWUpLmlubmVyVGV4dCAgPSB0aGlzLmdldFRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFdyaXRlcyB0ZXh0IG9uIHRoZSBtYWluIGNhbnZhc1xyXG4gICAgICovXHJcbiAgICBkcmF3VGV4dCh0ZXh0KXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLnRldHJpc0NudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICBjdHguZm9udCAgICAgID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpXCI7XHJcblxyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCAzMDAsIDYwMCk7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM2NjY2NjZcIjtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIDE1MCwgMjUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgUmV0dXJucyBhIHRpbWUgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIGdldFRpbWUoKXtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoTWF0aC5mbG9vcih0aGlzLmxvb3BDb3VudCAvIHRoaXMuZnBzKSAqIDEwMDApLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLCA4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFdoZW4gYSBrZXkgaXMgcHJlc3NlZCwgZmlyZSBhIGN1c3RvbSBldmVudCBzbyBkaWZmZXJlbnQgY29tcG9uZW50cyBjYW4gaGFuZGxlXHJcbiAgICAgdGhlIGV2ZW50cyB0aGVtc2VsZi5cclxuICAgICAqL1xyXG4gICAgaGFuZGxlS2V5RXZlbnRzKGUpe1xyXG4gICAgICAgIGxldCBldmVudDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5wYXVzZSAmJiBlLmtleUNvZGUgIT09IGtleXMuS2V5UCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaChlLmtleUNvZGUpe1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dVcDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd1VwJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93RG93bjpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd0Rvd24nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dMZWZ0OlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93TGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd1JpZ2h0OlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93UmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuU3BhY2U6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzU3BhY2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuS2V5UDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNQYXVzZScpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5LZXlIOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0hvbGQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZXZlbnQpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBUZXRyaXMoKTsiXX0=
