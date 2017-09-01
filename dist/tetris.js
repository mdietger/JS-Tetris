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
            while (this.blocks.currentBlock.rotation != 0) {
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

            if (this.level > 23) {
                this.level = 23;
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

            if (this.loopCount % (this.fps * 2 - this.level * 5) == 0) {
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
        }

        /*
         Writes text on a given canvas
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxmaWVsZHNcXGZpZWxkLmpzIiwiZXM2XFxmaWVsZHNcXGhvbGRmaWVsZC5qcyIsImVzNlxcZmllbGRzXFxuZXh0ZmllbGQuanMiLCJlczZcXGZpZWxkc1xccGxheWZpZWxkLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcaWJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxqYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGxibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcb2Jsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxzYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHRibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcemJsb2NrLmpzIiwiZXM2XFx0ZXRyaXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FPLElBQU0sMEJBQVM7QUFDbEIsT0FBRyxTQURlO0FBRWxCLE9BQUcsU0FGZTtBQUdsQixPQUFHLFNBSGU7QUFJbEIsT0FBRyxTQUplO0FBS2xCLE9BQUcsU0FMZTtBQU1sQixPQUFHLFNBTmU7QUFPbEIsT0FBRyxTQVBlO0FBUWxCLE9BQUcsU0FSZTtBQVNsQixPQUFHLFNBVGU7QUFVbEIsT0FBRztBQVZlLENBQWY7Ozs7Ozs7O0FDQUEsSUFBTSxzQkFBTztBQUNoQixhQUFZLEVBREk7QUFFaEIsZUFBWSxFQUZJO0FBR2hCLGVBQVksRUFISTtBQUloQixnQkFBWSxFQUpJO0FBS2hCLFdBQVksRUFMSTtBQU1oQixVQUFZLEVBTkk7QUFPaEIsVUFBWTtBQVBJLENBQWI7Ozs7Ozs7Ozs7O0FDQVA7Ozs7SUFFcUIsSzs7Ozs7Ozs7QUFDakI7Ozs2QkFHSyxHLEVBQUk7QUFDTCxnQkFBTSxZQUFZLEtBQUssZUFB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VCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQURVLEVBRVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUZVLEVBR1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUhVLEVBSVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUpVLEVBS1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUxVLEVBTVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQU5VLEVBT1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVBVLEVBUVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVJVLEVBU1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVRVLEVBVVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVZVLEVBV1YsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQVhVLEVBWVYsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxD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SixxQkFBSyxXQUFLLElBQVY7QUFDSSxzQkFBRSxjQUFGO0FBQ0EsNEJBQVEsSUFBSSxLQUFKLENBQVUsWUFBVixDQUFSO0FBQ0E7QUE1QlI7O0FBK0JBLGdCQUFHLEtBQUgsRUFBUztBQUNMLHlCQUFTLGFBQVQsQ0FBdUIsS0FBdkI7QUFDSDtBQUNKOzs7Ozs7QUFHTCxJQUFJLE1BQUoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNvbnN0IGNvbG9ycyA9IHtcclxuICAgIDA6ICcjQ0NDQ0NDJyxcclxuICAgIDE6ICcjODg4ODg4JyxcclxuICAgIDI6ICcjMzFDN0VGJyxcclxuICAgIDM6ICcjNUE2NUFEJyxcclxuICAgIDQ6ICcjRUY3OTIxJyxcclxuICAgIDU6ICcjRjdEMzA4JyxcclxuICAgIDY6ICcjNDJCNjQyJyxcclxuICAgIDc6ICcjQUQ0RDlDJyxcclxuICAgIDg6ICcjRUYyMDI5JyxcclxuICAgIDk6ICcjQkJCQkJCJ1xyXG59OyIsImV4cG9ydCBjb25zdCBrZXlzID0ge1xyXG4gICAgQXJyb3dVcCAgIDogMzgsXHJcbiAgICBBcnJvd0Rvd24gOiA0MCxcclxuICAgIEFycm93TGVmdCA6IDM3LFxyXG4gICAgQXJyb3dSaWdodDogMzksXHJcbiAgICBTcGFjZSAgICAgOiAzMixcclxuICAgIEtleVAgICAgICA6IDgwLFxyXG4gICAgS2V5SCAgICAgIDogNzJcclxufTsiLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9jb25zdC9jb2xvcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmllbGR7XHJcbiAgICAvKlxyXG4gICAgIERyYXcgZXZlcnl0aGluZyB0byB0aGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCl7XHJcbiAgICAgICAgY29uc3QgdGVtcEZpZWxkID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcclxuXHJcbiAgICAgICAgdGVtcEZpZWxkLm1hcChmdW5jdGlvbih2YWwsIHkpe1xyXG4gICAgICAgICAgICB2YWwubWFwKGZ1bmN0aW9uKHZhbCwgeCl7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JzW3ZhbF07XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCoyMCwgeSoyMCwgMjAsIDIwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJldHVybnMgYSBuZXcgcGxheWZpZWxkIHdpdGggdGhlIGN1cnJlbnRibG9jayBhbmQgZ2hvc3RibG9jayBtZXJnZWQgaW50byB0aGVtLlxyXG4gICAgICovXHJcbiAgICByZW5kZXJUZW1wRmllbGQoKXtcclxuICAgICAgICAvKlxyXG4gICAgICAgICBDcmVhdGUgYSBuZXcgZGVyZWZmZXJlbmNlZCBwbGF5ZmllbGQgZnJvbSB0aGUgY3VycmVudCBwbGF5ZmllbGRcclxuICAgICAgICAgYnkgc3BsaWNpbmcgdGhlIHJvd3NcclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgdGVtcEZpZWxkID0gdGhpcy5jYW52YXMubWFwKGZ1bmN0aW9uKGFycil7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnIuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9NZXJnZSB0aGUgYmxvY2tzIHdpdGggdGhlIHBsYXlmaWVsZFxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYmxvY2tzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQmxvY2sodGVtcEZpZWxkLCB0aGlzLmJsb2Nrc1trZXldKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGVtcEZpZWxkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTWVyZ2VzIGEgYmxvY2sgd2l0aCBhIGZpZWxkXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckJsb2NrKGZpZWxkLCB0ZXRyaW1pbm8pe1xyXG4gICAgICAgIGlmKCF0ZXRyaW1pbm8pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXRyaW1pbm8uc2hhcGUubWFwKGZ1bmN0aW9uKGFyciwgail7XHJcbiAgICAgICAgICAgIGFyci5tYXAoZnVuY3Rpb24odmFsLCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKHZhbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRbaiArIHRldHJpbWluby55XVtpICsgdGV0cmltaW5vLnggKyAyXSA9IHZhbDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbGRmaWVsZCBleHRlbmRzIEZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5jYW5Ib2xkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJsb2NrcyA9IHtcclxuICAgICAgICAgICAgY3VycmVudEJsb2NrOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVnaXN0ZXJzIHRoZSBldmVudHMgYW5kIGFkZCBhY3Rpb25zIGFjY29yZGluZ2x5LlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNOZXdIb2xkQmxvY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5zZXRCbG9jayhlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzSG9sZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuc2VuZEhvbGRCbG9jaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNOZXdOZXh0QmxvY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJlc2V0SG9sZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTZXQgdGhlIGJsb2NrIHRvIGEgbG9jYWwgdmFyaWFibGVcclxuICAgICAqL1xyXG4gICAgc2V0QmxvY2soZSl7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrID0gZS5kZXRhaWwuaG9sZEJsb2NrO1xyXG4gICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay54ID0gMDtcclxuICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueSA9IDI7XHJcbiAgICAgICAgd2hpbGUodGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnJvdGF0aW9uICE9IDApe1xyXG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sucm90YXRlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlc2V0cyB0aGUgaG9sZFxyXG4gICAgICovXHJcbiAgICByZXNldEhvbGQoKXtcclxuICAgICAgICB0aGlzLmNhbkhvbGQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2VuZHMgdGhlIGhvbGQgYmxvY2sgYmFjayB0byB0aGUgcGxheWZpZWxkXHJcbiAgICAgKi9cclxuICAgIHNlbmRIb2xkQmxvY2soKXtcclxuICAgICAgICBpZighdGhpcy5jYW5Ib2xkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ1RldHJpc1RyYW5zZmVySG9sZEJsb2NrJywge2RldGFpbDoge2hvbGRCbG9jazogdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrfX0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB0aGlzLmNhbkhvbGQgPSBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5leHRmaWVsZCBleHRlbmRzIEZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwwLDAsMCwwLDAsMCwxXSxcclxuICAgICAgICAgICAgWzEsMCwwLDAsMCwwLDAsMV0sXHJcbiAgICAgICAgICAgIFsxLDAsMCwwLDAsMCwwLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxXVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMuYmxvY2tzID0ge1xyXG4gICAgICAgICAgICBjdXJyZW50QmxvY2s6IG51bGxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc05ld05leHRCbG9jaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnNldEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2V0IHRoZSBibG9jayB0byBhIGxvY2FsIHZhcmlhYmxlXHJcbiAgICAgKi9cclxuICAgIHNldEJsb2NrKGUpe1xyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IGUuZGV0YWlsLm5leHRCbG9jaztcclxuXHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrID0gbmV3IGJsb2NrVHlwZSgwLCAyKTtcclxuICAgIH1cclxufSIsImltcG9ydCBJQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9pYmxvY2snO1xyXG5pbXBvcnQgSkJsb2NrIGZyb20gJy4uL3RldHJpbWlub3MvamJsb2NrJztcclxuaW1wb3J0IExCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL2xibG9jayc7XHJcbmltcG9ydCBPQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9vYmxvY2snO1xyXG5pbXBvcnQgU0Jsb2NrIGZyb20gJy4uL3RldHJpbWlub3Mvc2Jsb2NrJztcclxuaW1wb3J0IFRCbG9jayBmcm9tICcuLi90ZXRyaW1pbm9zL3RibG9jayc7XHJcbmltcG9ydCBaQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy96YmxvY2snO1xyXG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vdGV0cmltaW5vcy9ibG9jayc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlmaWVsZCBleHRlbmRzIEZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IFtcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuYmFnID0gW107XHJcbiAgICAgICAgdGhpcy5ibG9ja3MgPSB7XHJcbiAgICAgICAgICAgIGdob3N0QmxvY2s6IG51bGwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRCbG9jazogbnVsbFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlTmV3QmFnKHRydWUpO1xyXG4gICAgICAgIHRoaXMubmV3QmxvY2tGcm9tQmFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBHZW5lcmF0ZXMgYSBuZXcgcmFuZG9tIGJhZyBvZiA3IHRldHJpbWlub3MuXHJcbiAgICAgaHR0cHM6Ly90ZXRyaXMud2lraS9SYW5kb21fR2VuZXJhdG9yXHJcbiAgICAgKi9cclxuICAgIGdlbmVyYXRlTmV3QmFnKGZyb21Db25zdHJ1Y3Rvcil7XHJcbiAgICAgICAgdGhpcy5iYWcgPSBbSUJsb2NrLCBKQmxvY2ssIExCbG9jaywgT0Jsb2NrLCBTQmxvY2ssIFRCbG9jaywgWkJsb2NrXTtcclxuICAgICAgICB0aGlzLnNodWZmbGVCYWcoZnJvbUNvbnN0cnVjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFRha2VzIHRoZSBmaXJzdCBibG9jayBmcm9tIHRoZSBiYWcgYW5kIGFzc2lnbiBpdCB0byB0aGUgY3VycmVudCBibG9jay5cclxuICAgICBJZiB0aGUgYmFnIGlzIGVtcHR5LCBnZW5lcmF0ZSBhIG5ldyBvbmUuXHJcbiAgICAgKi9cclxuICAgIG5ld0Jsb2NrRnJvbUJhZygpe1xyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IHRoaXMuYmFnLnNoaWZ0KCk7XHJcbiAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrID0gbmV3IGJsb2NrVHlwZSgzLCAwKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5iYWcubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU5ld0JhZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnVGV0cmlzTmV3TmV4dEJsb2NrJywge2RldGFpbDoge25leHRCbG9jazogdGhpcy5iYWdbMF19fSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5ibG9ja3MuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNHYW1lT3ZlcicpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTaHVmZmxlcyB0aGUgdGVydHJpbWlub3NcclxuICAgICAqL1xyXG4gICAgc2h1ZmZsZUJhZyhmaXJzdEJhZyl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuYmFnLmxlbmd0aDsgaTsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XHJcbiAgICAgICAgICAgIFt0aGlzLmJhZ1tpIC0gMV0sIHRoaXMuYmFnW2pdXSA9IFt0aGlzLmJhZ1tqXSwgdGhpcy5iYWdbaSAtIDFdXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGZpcnN0QmFnKXtcclxuICAgICAgICAgICAgaWYodGhpcy5iYWdbMF0gPT0gU0Jsb2NrIHx8IHRoaXMuYmFnWzBdID09IFpCbG9jayB8fCB0aGlzLmJhZ1swXSA9PSBPQmxvY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaHVmZmxlQmFnKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBNb3ZlIHRoZSBjdXJyZW50IGJsb2NrIHRvIGhvbGRcclxuICAgICAqL1xyXG4gICAgaG9sZEJsb2NrKGUpe1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNOZXdIb2xkQmxvY2snLCB7ZGV0YWlsOiB7aG9sZEJsb2NrOiB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2t9fSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG4gICAgICAgIGlmKCFlLmRldGFpbC5ob2xkQmxvY2spe1xyXG4gICAgICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jayAgID0gZS5kZXRhaWwuaG9sZEJsb2NrO1xyXG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueCA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay55ID0gMDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgdG8gdGhlIHJpZ2h0LiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcclxuICAgICByZXN0b3JlIGl0J3Mgb2xkIHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICBtb3ZlQ3VycmVudEJsb2NrUmlnaHQoKXtcclxuICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueCsrO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueC0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNb3ZlcyB0aGUgY3VycmVudCBibG9jayB0byB0aGUgbGVmdC4gSWYgY29sbGlzaW9uIGlzIGRldGVjdGVkXHJcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgbW92ZUN1cnJlbnRCbG9ja0xlZnQoKXtcclxuICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueC0tO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNb3ZlcyB0aGUgY3VycmVudCBibG9jayBkb3dud2FyZHMuIElmIGNvbGxpc2lvbiBpcyBkZXRlY3RlZFxyXG4gICAgIHJlc3RvcmUgaXQncyBvbGQgcG9zaXRpb24gYW5kIHNhdmUgaXQgdG8gdGhlIHBsYXlmaWVsZC5cclxuICAgICBDaGVjayBpZiBhbnkgbGluZXMgYXJlIGZvcm1lZCBhbmQgY3JlYXRlZCBhIG5ldyBibG9jay5cclxuICAgICAqL1xyXG4gICAgbW92ZUN1cnJlbnRCbG9ja0Rvd24oKXtcclxuICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueSsrO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sueS0tO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYXZlQmxvY2soKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0xpbmVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmV3QmxvY2tGcm9tQmFnKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVDdXJyZW50QmxvY2soKXtcclxuICAgICAgICB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2sucm90YXRlUmlnaHQoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLnJvdGF0ZUxlZnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU3RvcmVzIHRoZSBjdXJyZW50YmxvY2sgaW50byB0aGUgcGxheWZpZWxkLlxyXG4gICAgICovXHJcbiAgICBzYXZlQmxvY2soKXtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IHRoaXMucmVuZGVyVGVtcEZpZWxkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDaGVjayBpZiB0aGVyZSBhcmUgbmV3IGxpbmVzIGZvcm1lZC5cclxuICAgICAqL1xyXG4gICAgY2hlY2tMaW5lcygpe1xyXG4gICAgICAgIGxldCBjbGVhcmVkUm93cyA9IDA7XHJcblxyXG4gICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCB0aGlzLmNhbnZhcy5sZW5ndGg7IHkrKyl7XHJcbiAgICAgICAgICAgIGxldCBzdW1Sb3cgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IHRoaXMuY2FudmFzW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIHJvdyBjb250YWlucyBhIDAsIHNraXAgdGhlIHJvd1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jYW52YXNbeV1beF0gPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtUm93ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdW1Sb3cgKz0gdGhpcy5jYW52YXNbeV1beF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSWYgdGhlIHN1bSBvZiB0aGUgcm93IGlzIGhpZ2hlciB0aGFuIDE0LCBpdCBtZWFucyBhIGJsb2NrIGlzIHByZXNlbnQgc2luY2UgaXQncyBiaWdnZXIgdGhhbiAxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFcclxuICAgICAgICAgICAgaWYoc3VtUm93ID4gMTQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuc3BsaWNlKHksIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGROZXdSb3coKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyZWRSb3dzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNsZWFyZWRSb3dzID4gMCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNSb3dzQ2xlYXJlZCcsIHtkZXRhaWw6IHtjbGVhcmVkUm93czogY2xlYXJlZFJvd3N9fSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIEFkZHMgYSBuZXcgcm93IG9uIHRvcCBvZiB0aGUgcGxheWZpZWxkLlxyXG4gICAgICovXHJcbiAgICBhZGROZXdSb3coKXtcclxuICAgICAgICB0aGlzLmNhbnZhcy51bnNoaWZ0KFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIExvd2VycyB0aGUgY3VycmVudGJsb2NrIHVudGlsIHRoZXJlIGlzIGNvbGxpc2lvbiBkZXRlY3RlZC5cclxuICAgICAqL1xyXG4gICAgZHJvcEJsb2NrKCl7XHJcbiAgICAgICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICAgICAgZG97XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMubW92ZUN1cnJlbnRCbG9ja0Rvd24oKVxyXG4gICAgICAgIH13aGlsZShyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQ2xvbmVzIHRoZSBjdXJyZW50YmxvY2sgaW4gcG9zaXRpb24gYW5kIHNoYXBlLiBHaXZlIGl0IGEgZ3JheSBjb2xvciBhbmRcclxuICAgICBsb3dlciBpdCB1bnRpbCBjb2xsaXNpb24gaXMgZGV0ZWN0ZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUdob3N0QmxvY2soKXtcclxuICAgICAgICBsZXQgY29saXNzaW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuYmxvY2tzLmdob3N0QmxvY2sgICAgICAgPSBuZXcgQmxvY2sodGhpcy5ibG9ja3MuY3VycmVudEJsb2NrLngsIHRoaXMuYmxvY2tzLmN1cnJlbnRCbG9jay55KTtcclxuICAgICAgICAvL0JlY2F1c2UgdGhlIHNoYXBlIGlzIGEgbXVsdGktZGltZW5zaW9uYWwgYXJyYXkgd2UgbmVlZCB0byBkZXJlZmZlcmVuY2UgaXQgd2hlbiBjb3B5aW5nLlxyXG4gICAgICAgIHRoaXMuYmxvY2tzLmdob3N0QmxvY2suc2hhcGUgPSB0aGlzLmJsb2Nrcy5jdXJyZW50QmxvY2suc2hhcGUubWFwKGZ1bmN0aW9uKHJvdyl7XHJcbiAgICAgICAgICAgIHJldHVybiByb3cuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJsb2Nrcy5naG9zdEJsb2NrLm1ha2VHaG9zdCgpO1xyXG5cclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgdGhpcy5ibG9ja3MuZ2hvc3RCbG9jay55ICs9IDE7XHJcblxyXG4gICAgICAgICAgICBjb2xpc3Npb24gPSB0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuYmxvY2tzLmdob3N0QmxvY2spO1xyXG4gICAgICAgICAgICBpZihjb2xpc3Npb24pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MuZ2hvc3RCbG9jay55IC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9d2hpbGUoIWNvbGlzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDaGVjayBpZiB0aGVyZSBpcyBjb2xsaXNpb24uXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQ29sbGlzaW9uKGJsb2NrKXtcclxuICAgICAgICBsZXQgY29sbGlzaW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxvb3AxOlxyXG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgYmxvY2suc2hhcGUubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IGJsb2NrLnNoYXBlW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAvL1doZW4gdGhlIHZhbHVlIG9mIHRoZSBibG9jayBpcyBub3QgMCBhbmQgb24gdGhhdCBwbGFjZSBpbiB0aGUgcGxheWZpZWxkIHRoZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vb2YgdGhlIHBsYXlmaWVsZCBpcyBhbHNvIG5vdCAwLCB3ZSBoYXZlIGNvbGxpc2lvbi5cclxuICAgICAgICAgICAgICAgICAgICBpZihibG9jay5zaGFwZVt5XVt4XSAhPT0gMCAmJiB0aGlzLmNhbnZhc1t5ICsgYmxvY2sueV1beCArIGJsb2NrLnggKyAyXSAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvb3AxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVnaXN0ZXJzIHRoZSBldmVudHMgYW5kIGFkZCBhY3Rpb25zIGFjY29yZGluZ2x5LlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd0xlZnQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tMZWZ0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93UmlnaHQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tSaWdodCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd1VwJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5yb3RhdGVDdXJyZW50QmxvY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dEb3duJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrRG93bigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNTcGFjZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuZHJvcEJsb2NrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc1RyYW5zZmVySG9sZEJsb2NrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYuaG9sZEJsb2NrKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICB0aGlzLnggICAgICAgID0geDtcclxuICAgICAgICB0aGlzLnkgICAgICAgID0geTtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5yb3dSZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMucm90YXRpb24rKztcclxuICAgICAgICBpZih0aGlzLnJvdGF0aW9uID4gMyl7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy50cmFuc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmNvbHVtblJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbi0tO1xyXG4gICAgICAgIGlmKHRoaXMucm90YXRpb24gPCAwKXtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zcG9zZSgpe1xyXG4gICAgICAgIGxldCBvbGRTaGFwZSA9IHRoaXMuc2hhcGU7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvbGRTaGFwZVswXS5tYXAoZnVuY3Rpb24oY29sLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbGRTaGFwZS5tYXAoZnVuY3Rpb24ocm93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93W2ldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcm93UmV2ZXJzZSgpe1xyXG4gICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnNoYXBlLm1hcChmdW5jdGlvbihyb3cpe1xyXG4gICAgICAgICAgICByZXR1cm4gcm93LnJldmVyc2UoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbHVtblJldmVyc2UoKXtcclxuICAgICAgICB0aGlzLnNoYXBlLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlR2hvc3QoKXtcclxuICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgdGhpcy5zaGFwZS5sZW5ndGg7IHkrKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCB0aGlzLnNoYXBlW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hhcGVbeV1beF0gPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFwZVt5XVt4XSA9IDk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCwwLDAsMF0sXHJcbiAgICAgICAgICAgIFsyLDIsMiwyXSxcclxuICAgICAgICAgICAgWzAsMCwwLDBdLFxyXG4gICAgICAgICAgICBbMCwwLDAsMF1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSkJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzMsMCwwXSxcclxuICAgICAgICAgICAgWzMsMywzXSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDAsNF0sXHJcbiAgICAgICAgICAgIFs0LDQsNF0sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbNSw1XSxcclxuICAgICAgICAgICAgWzUsNV1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCw2LDZdLFxyXG4gICAgICAgICAgICBbNiw2LDBdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVEJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsNywwXSxcclxuICAgICAgICAgICAgWzcsNyw3XSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFs4LDgsMF0sXHJcbiAgICAgICAgICAgIFswLDgsOF0sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWZpZWxkIGZyb20gJy4vZmllbGRzL3BsYXlmaWVsZCc7XHJcbmltcG9ydCBIb2xkZmllbGQgZnJvbSAnLi9maWVsZHMvaG9sZGZpZWxkJztcclxuaW1wb3J0IE5leHRmaWVsZCBmcm9tICcuL2ZpZWxkcy9uZXh0ZmllbGQnO1xyXG5pbXBvcnQgeyBrZXlzIH0gZnJvbSAnLi9jb25zdC9rZXlzJztcclxuXHJcbmNsYXNzIFRldHJpc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSB7XHJcbiAgICAgICAgICAgIHRldHJpczogJ3RldHJpcycsXHJcbiAgICAgICAgICAgIHNjb3JlIDogJ3Njb3JlJyxcclxuICAgICAgICAgICAgcm93cyAgOiAncm93cycsXHJcbiAgICAgICAgICAgIGxldmVsIDogJ2xldmVsJyxcclxuICAgICAgICAgICAgaG9sZCAgOiAnaG9sZCcsXHJcbiAgICAgICAgICAgIG5leHQgIDogJ25leHQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRldHJpc0NudnM9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnRldHJpcyk7XHJcbiAgICAgICAgdGhpcy5ob2xkQ252cyAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5ob2xkKTtcclxuICAgICAgICB0aGlzLm5leHRDbnZzICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLm5leHQpO1xyXG4gICAgICAgIHRoaXMuaG9sZGZpZWxkID0gbmV3IEhvbGRmaWVsZCgpO1xyXG4gICAgICAgIHRoaXMubmV4dGZpZWxkID0gbmV3IE5leHRmaWVsZCgpO1xyXG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gbmV3IFBsYXlmaWVsZCgpO1xyXG4gICAgICAgIHRoaXMuZnBzICAgICAgID0gNjA7XHJcbiAgICAgICAgdGhpcy5sZXZlbCAgICAgPSAxO1xyXG4gICAgICAgIHRoaXMucm93cyAgICAgID0gMDtcclxuICAgICAgICB0aGlzLnNjb3JlICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5sb29wQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMucGF1c2UgICAgID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0ICAgPSAxMDAwL3RoaXMuZnBzO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFJlZ2lzdGVyIGFsbCBsaXN0ZW5lcnMuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleUV2ZW50cyhlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc0dhbWVPdmVyXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuZ2FtZU92ZXIoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIlRldHJpc1BhdXNlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYucGF1c2VHYW1lKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJUZXRyaXNSb3dzQ2xlYXJlZFwiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi51cGRhdGVTY29yZXMoZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFBhdXNlcyB0aGUgZ2FtZVxyXG4gICAgICovXHJcbiAgICBwYXVzZUdhbWUoKXtcclxuICAgICAgICBpZighdGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BHYW1lKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdUZXh0KFwiUGF1c2VcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdGFydHMgdGhlIGdhbWVsb29wXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0R2FtZSgpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgICAgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZ2FtZUxvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe3NlbGYubG9vcChzZWxmKX0sIHRoaXMudGltZW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdG9wcyB0aGUgZ2FtZWxvb3BcclxuICAgICAqL1xyXG4gICAgc3RvcEdhbWUoKXtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZ2FtZUxvb3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgSGFuZGxlcyB0aGUgZ2FtZSBvdmVyXHJcbiAgICAgKi9cclxuICAgIGdhbWVPdmVyKCl7XHJcbiAgICAgICAgdGhpcy5zdG9wR2FtZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdUZXh0KFwiR2FtZSBPdmVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgVXBkYXRlIHRoZSB2aXN1YWwgc2NvcmVzXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVNjb3JlcyhlKXtcclxuICAgICAgICBjb25zdCBjbGVhcmVkUm93cyA9IGUuZGV0YWlsLmNsZWFyZWRSb3dzO1xyXG5cclxuICAgICAgICB0aGlzLnJvd3MgICs9IGNsZWFyZWRSb3dzO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gTWF0aC5mbG9vcig1MCAqIE1hdGgucG93KDEuMSwgY2xlYXJlZFJvd3MpICogY2xlYXJlZFJvd3MpO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgID0gTWF0aC5mbG9vcih0aGlzLnJvd3MgLyAyMCkgKyAxO1xyXG5cclxuICAgICAgICBpZih0aGlzLmxldmVsID4gMjMpe1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsID0gMjM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgVGhlIGdhbWUgbG9vcCBpdHNlbGYuXHJcbiAgICAgKi9cclxuICAgIGxvb3Aoc2VsZil7XHJcbiAgICAgICAgc2VsZi51cGRhdGUoKTtcclxuICAgICAgICBzZWxmLmRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFVwZGF0ZSBhbGwgdmFsdWVzIG9mIHRoZSBnYW1lLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICB0aGlzLmxvb3BDb3VudCsrO1xyXG5cclxuICAgICAgICBpZigodGhpcy5sb29wQ291bnQgJSAoKHRoaXMuZnBzICogMikgLSAodGhpcy5sZXZlbCAqIDUpKSkgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLm1vdmVDdXJyZW50QmxvY2tEb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBzY3JlZW4uXHJcbiAgICAgKi9cclxuICAgIGRyYXcoKXtcclxuICAgICAgICBjb25zdCB0ZXRyaXNDdHggPSB0aGlzLnRldHJpc0NudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNvbnN0IGhvbGRDdHggICA9IHRoaXMuaG9sZENudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNvbnN0IG5leHRDdHggICA9IHRoaXMubmV4dENudnMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXlmaWVsZC5kcmF3KHRldHJpc0N0eCk7XHJcbiAgICAgICAgdGhpcy5ob2xkZmllbGQuZHJhdyhob2xkQ3R4KTtcclxuICAgICAgICB0aGlzLm5leHRmaWVsZC5kcmF3KG5leHRDdHgpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5zY29yZSkuaW5uZXJUZXh0ID0gdGhpcy5zY29yZTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy5yb3dzKS5pbm5lclRleHQgID0gdGhpcy5yb3dzO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLmxldmVsKS5pbm5lclRleHQgPSB0aGlzLmxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgV3JpdGVzIHRleHQgb24gYSBnaXZlbiBjYW52YXNcclxuICAgICAqL1xyXG4gICAgZHJhd1RleHQodGV4dCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy50ZXRyaXNDbnZzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgY3R4LmZvbnQgICAgICA9IFwiMzBweCBBcmlhbFwiO1xyXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKVwiO1xyXG5cclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCA2MDApO1xyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjNjY2NjY2XCI7XHJcblxyXG4gICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCAxNTAsIDI1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBXaGVuIGEga2V5IGlzIHByZXNzZWQsIGZpcmUgYSBjdXN0b20gZXZlbnQgc28gZGlmZmVyZW50IGNvbXBvbmVudHMgY2FuIGhhbmRsZVxyXG4gICAgIHRoZSBldmVudHMgdGhlbXNlbGYuXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUtleUV2ZW50cyhlKXtcclxuICAgICAgICBsZXQgZXZlbnQ7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucGF1c2UgJiYgZS5rZXlDb2RlICE9PSBrZXlzLktleVApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2goZS5rZXlDb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93VXA6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dVcCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd0Rvd246XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dEb3duJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93TGVmdDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd0xlZnQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dSaWdodDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd1JpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLlNwYWNlOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc1NwYWNlJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLktleVA6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzUGF1c2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuS2V5SDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNIb2xkJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGV2ZW50KXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgVGV0cmlzKCk7Il19
