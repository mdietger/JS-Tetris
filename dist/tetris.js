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
    KeyP: 80
};

},{}],3:[function(require,module,exports){
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

        this.playfield = [[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
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

            if (this.checkCollision(this.currentBlock)) {
                var event = new Event('TetrisGameOver');
                document.dispatchEvent(event);
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
            this.playfield = this.renderTempField();
        }

        /*
         Check if there are new lines formed.
         */

    }, {
        key: 'checkLines',
        value: function checkLines() {
            var clearedRows = 0;

            for (var y = 0; y < this.playfield.length; y++) {
                var sumRow = 0;

                for (var x = 0; x < this.playfield[y].length; x++) {
                    //If the row contains a 0, skip the row
                    if (this.playfield[y][x] == 0) {
                        sumRow = 0;
                        break;
                    }

                    sumRow += this.playfield[y][x];
                }

                //If the sum of the row is higher than 14, it means a block is present since it's bigger than 1,1,1,1,1,1,1,1,1,1,1,1,1,1
                if (sumRow > 14) {
                    this.playfield.splice(y, 1);
                    this.addNewRow();
                    clearedRows++;
                }
            }

            if (clearedRows > 0) {
                console.log(clearedRows);

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
            this.playfield.unshift([1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
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
                    if (block.shape[y][x] !== 0 && this.playfield[y + block.y][x + block.x + 2] !== 0) {
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
            var tempField = this.playfield.map(function (arr) {
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

},{"./const/colors":1,"./tetriminos/block":4,"./tetriminos/iblock":5,"./tetriminos/jblock":6,"./tetriminos/lblock":7,"./tetriminos/oblock":8,"./tetriminos/sblock":9,"./tetriminos/tblock":10,"./tetriminos/zblock":11}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./block":4}],6:[function(require,module,exports){
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

},{"./block":4}],7:[function(require,module,exports){
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

},{"./block":4}],8:[function(require,module,exports){
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

},{"./block":4}],9:[function(require,module,exports){
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

},{"./block":4}],10:[function(require,module,exports){
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

},{"./block":4}],11:[function(require,module,exports){
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

},{"./block":4}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playfield = require('./playfield');

var _playfield2 = _interopRequireDefault(_playfield);

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
            level: 'level'
        };
        this.canvas = document.getElementById(this.selectors.tetris);
        this.fps = 60;
        this.playfield = new _playfield2.default();
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
            this.level = Math.floor(this.score / 10000) + 1;
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
            var ctx = this.canvas.getContext("2d");

            if (!this.gameOver) {
                this.playfield.draw(ctx);
            } else {
                this.drawGameOver(ctx);
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
            }

            if (event) {
                document.dispatchEvent(event);
            }
        }
    }]);

    return Tetris;
}();

new Tetris();

},{"./const/keys":2,"./playfield":3}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxwbGF5ZmllbGQuanMiLCJlczZcXHRldHJpbWlub3NcXGJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxpYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGpibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcbGJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxvYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHNibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcdGJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFx6YmxvY2suanMiLCJlczZcXHRldHJpcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSwwQkFBUztBQUNsQixPQUFHLFNBRGU7QUFFbEIsT0FBRyxTQUZlO0FBR2xCLE9BQUcsU0FIZTtBQUlsQixPQUFHLFNBSmU7QUFLbEIsT0FBRyxTQUxlO0FBTWxCLE9BQUcsU0FOZTtBQU9sQixPQUFHLFNBUGU7QUFRbEIsT0FBRyxTQVJlO0FBU2xCLE9BQUcsU0FUZTtBQVVsQixPQUFHO0FBVmUsQ0FBZjs7Ozs7Ozs7QUNBQSxJQUFNLHNCQUFPO0FBQ2hCLGFBQVksRUFESTtBQUVoQixlQUFZLEVBRkk7QUFHaEIsZUFBWSxFQUhJO0FBSWhCLGdCQUFZLEVBSkk7QUFLaEIsV0FBWSxFQUxJO0FBTWhCLFVBQVk7QUFOSSxDQUFiOzs7Ozs7Ozs7OztBQ0FQOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLFM7QUFDakIseUJBQWE7QUFBQTs7QUFDVCxhQUFLLFNBQUwsR0FBaUIsQ0FDYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBRGEsRUFFYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBRmEsRUFHYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBSGEsRUFJYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBSmEsRUFLYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBTGEsRUFNYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBTmEsRUFPYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBUGEsRUFRYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBUmEsRUFTYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBVGEsRUFVYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBVmEsRUFXYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBWGEsRUFZYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFh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QUksTUFBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgY29sb3JzID0ge1xyXG4gICAgMDogJyNDQ0NDQ0MnLFxyXG4gICAgMTogJyM4ODg4ODgnLFxyXG4gICAgMjogJyMzMUM3RUYnLFxyXG4gICAgMzogJyM1QTY1QUQnLFxyXG4gICAgNDogJyNFRjc5MjEnLFxyXG4gICAgNTogJyNGN0QzMDgnLFxyXG4gICAgNjogJyM0MkI2NDInLFxyXG4gICAgNzogJyNBRDREOUMnLFxyXG4gICAgODogJyNFRjIwMjknLFxyXG4gICAgOTogJyNCQkJCQkInXHJcbn07IiwiZXhwb3J0IGNvbnN0IGtleXMgPSB7XHJcbiAgICBBcnJvd1VwICAgOiAzOCxcclxuICAgIEFycm93RG93biA6IDQwLFxyXG4gICAgQXJyb3dMZWZ0IDogMzcsXHJcbiAgICBBcnJvd1JpZ2h0OiAzOSxcclxuICAgIFNwYWNlICAgICA6IDMyLFxyXG4gICAgS2V5UCAgICAgIDogODBcclxufTsiLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuL2NvbnN0L2NvbG9ycyc7XHJcbmltcG9ydCBJQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL2libG9jayc7XHJcbmltcG9ydCBKQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL2pibG9jayc7XHJcbmltcG9ydCBMQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL2xibG9jayc7XHJcbmltcG9ydCBPQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL29ibG9jayc7XHJcbmltcG9ydCBTQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL3NibG9jayc7XHJcbmltcG9ydCBUQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL3RibG9jayc7XHJcbmltcG9ydCBaQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL3pibG9jayc7XHJcbmltcG9ydCBCbG9jayBmcm9tICcuL3RldHJpbWlub3MvYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IFtcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdob3N0QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYmFnID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgR2VuZXJhdGVzIGEgbmV3IHJhbmRvbSBiYWcgb2YgNyB0ZXRyaW1pbm9zLlxyXG4gICAgIGh0dHBzOi8vdGV0cmlzLndpa2kvUmFuZG9tX0dlbmVyYXRvclxyXG4gICAgICovXHJcbiAgICBnZW5lcmF0ZU5ld0JhZygpe1xyXG4gICAgICAgIHRoaXMuYmFnID0gW0lCbG9jaywgSkJsb2NrLCBMQmxvY2ssIE9CbG9jaywgU0Jsb2NrLCBUQmxvY2ssIFpCbG9ja107XHJcbiAgICAgICAgdGhpcy5zaHVmZmxlQmFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBUYWtlcyB0aGUgZmlyc3QgYmxvY2sgZnJvbSB0aGUgYmFnIGFuZCBhc3NpZ24gaXQgdG8gdGhlIGN1cnJlbnQgYmxvY2suXHJcbiAgICAgSWYgdGhlIGJhZyBpcyBlbXB0eSwgZ2VuZXJhdGUgYSBuZXcgb25lLlxyXG4gICAgICovXHJcbiAgICBuZXdCbG9ja0Zyb21CYWcoKXtcclxuICAgICAgICBpZih0aGlzLmJhZy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVOZXdCYWcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IHRoaXMuYmFnLnNoaWZ0KCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBuZXcgYmxvY2tUeXBlKDMsIDApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNHYW1lT3ZlcicpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTaHVmZmxlcyB0aGUgdGVydHJpbWlub3NcclxuICAgICAqL1xyXG4gICAgc2h1ZmZsZUJhZygpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmJhZy5sZW5ndGg7IGk7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpO1xyXG4gICAgICAgICAgICBbdGhpcy5iYWdbaSAtIDFdLCB0aGlzLmJhZ1tqXV0gPSBbdGhpcy5iYWdbal0sIHRoaXMuYmFnW2kgLSAxXV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgdG8gdGhlIHJpZ2h0LiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcclxuICAgICByZXN0b3JlIGl0J3Mgb2xkIHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICBtb3ZlQ3VycmVudEJsb2NrUmlnaHQoKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54Kys7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueC0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNb3ZlcyB0aGUgY3VycmVudCBibG9jayB0byB0aGUgbGVmdC4gSWYgY29sbGlzaW9uIGlzIGRldGVjdGVkXHJcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgbW92ZUN1cnJlbnRCbG9ja0xlZnQoKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54LS07XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNb3ZlcyB0aGUgY3VycmVudCBibG9jayBkb3dud2FyZHMuIElmIGNvbGxpc2lvbiBpcyBkZXRlY3RlZFxyXG4gICAgIHJlc3RvcmUgaXQncyBvbGQgcG9zaXRpb24gYW5kIHNhdmUgaXQgdG8gdGhlIHBsYXlmaWVsZC5cclxuICAgICBDaGVjayBpZiBhbnkgbGluZXMgYXJlIGZvcm1lZCBhbmQgY3JlYXRlZCBhIG5ldyBibG9jay5cclxuICAgICAqL1xyXG4gICAgbW92ZUN1cnJlbnRCbG9ja0Rvd24oKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay55Kys7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueS0tO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYXZlQmxvY2soKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0xpbmVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmV3QmxvY2tGcm9tQmFnKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVDdXJyZW50QmxvY2soKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay5yb3RhdGVSaWdodCgpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnJvdGF0ZUxlZnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU3RvcmVzIHRoZSBjdXJyZW50YmxvY2sgaW50byB0aGUgcGxheWZpZWxkLlxyXG4gICAgICovXHJcbiAgICBzYXZlQmxvY2soKXtcclxuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IHRoaXMucmVuZGVyVGVtcEZpZWxkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDaGVjayBpZiB0aGVyZSBhcmUgbmV3IGxpbmVzIGZvcm1lZC5cclxuICAgICAqL1xyXG4gICAgY2hlY2tMaW5lcygpe1xyXG4gICAgICAgIGxldCBjbGVhcmVkUm93cyA9IDA7XHJcblxyXG4gICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCB0aGlzLnBsYXlmaWVsZC5sZW5ndGg7IHkrKyl7XHJcbiAgICAgICAgICAgIGxldCBzdW1Sb3cgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IHRoaXMucGxheWZpZWxkW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIHJvdyBjb250YWlucyBhIDAsIHNraXAgdGhlIHJvd1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5wbGF5ZmllbGRbeV1beF0gPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtUm93ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdW1Sb3cgKz0gdGhpcy5wbGF5ZmllbGRbeV1beF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSWYgdGhlIHN1bSBvZiB0aGUgcm93IGlzIGhpZ2hlciB0aGFuIDE0LCBpdCBtZWFucyBhIGJsb2NrIGlzIHByZXNlbnQgc2luY2UgaXQncyBiaWdnZXIgdGhhbiAxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFcclxuICAgICAgICAgICAgaWYoc3VtUm93ID4gMTQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQuc3BsaWNlKHksIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGROZXdSb3coKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyZWRSb3dzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNsZWFyZWRSb3dzID4gMCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNsZWFyZWRSb3dzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdUZXRyaXNSb3dzQ2xlYXJlZCcsIHtkZXRhaWw6IHtjbGVhcmVkUm93czogY2xlYXJlZFJvd3N9fSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIEFkZHMgYSBuZXcgcm93IG9uIHRvcCBvZiB0aGUgcGxheWZpZWxkLlxyXG4gICAgICovXHJcbiAgICBhZGROZXdSb3coKXtcclxuICAgICAgICB0aGlzLnBsYXlmaWVsZC51bnNoaWZ0KFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIExvd2VycyB0aGUgY3VycmVudGJsb2NrIHVudGlsIHRoZXJlIGlzIGNvbGxpc2lvbiBkZXRlY3RlZC5cclxuICAgICAqL1xyXG4gICAgZHJvcEJsb2NrKCl7XHJcbiAgICAgICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICAgICAgZG97XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMubW92ZUN1cnJlbnRCbG9ja0Rvd24oKVxyXG4gICAgICAgIH13aGlsZShyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQ2xvbmVzIHRoZSBjdXJyZW50YmxvY2sgaW4gcG9zaXRpb24gYW5kIHNoYXBlLiBHaXZlIGl0IGEgZ3JheSBjb2xvciBhbmRcclxuICAgICBsb3dlciBpdCB1bnRpbCBjb2xsaXNpb24gaXMgZGV0ZWN0ZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUdob3N0QmxvY2soKXtcclxuICAgICAgICBsZXQgY29saXNzaW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuZ2hvc3RCbG9jayA9IG5ldyBCbG9jayh0aGlzLmN1cnJlbnRCbG9jay54LCB0aGlzLmN1cnJlbnRCbG9jay55KTtcclxuICAgICAgICAvL0JlY2F1c2UgdGhlIHNoYXBlIGlzIGEgbXVsdGktZGltZW5zaW9uYWwgYXJyYXkgd2UgbmVlZCB0byBkZXJlZmZlcmVuY2UgaXQgd2hlbiBjb3B5aW5nLlxyXG4gICAgICAgIHRoaXMuZ2hvc3RCbG9jay5zaGFwZSA9IHRoaXMuY3VycmVudEJsb2NrLnNoYXBlLm1hcChmdW5jdGlvbihyb3cpe1xyXG4gICAgICAgICAgICByZXR1cm4gcm93LnNsaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5naG9zdEJsb2NrLm1ha2VHaG9zdCgpO1xyXG5cclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgdGhpcy5naG9zdEJsb2NrLnkgKz0gMTtcclxuXHJcbiAgICAgICAgICAgIGNvbGlzc2lvbiA9IHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5naG9zdEJsb2NrKTtcclxuICAgICAgICAgICAgaWYoY29saXNzaW9uKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2hvc3RCbG9jay55IC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9d2hpbGUoIWNvbGlzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDaGVjayBpZiB0aGVyZSBpcyBjb2xsaXNpb24uXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQ29sbGlzaW9uKGJsb2NrKXtcclxuICAgICAgICBsZXQgY29sbGlzaW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxvb3AxOlxyXG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgYmxvY2suc2hhcGUubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IGJsb2NrLnNoYXBlW3ldLmxlbmd0aDsgeCsrKXtcclxuICAgICAgICAgICAgICAgICAgICAvL1doZW4gdGhlIHZhbHVlIG9mIHRoZSBibG9jayBpcyBub3QgMCBhbmQgb24gdGhhdCBwbGFjZSBpbiB0aGUgcGxheWZpZWxkIHRoZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vb2YgdGhlIHBsYXlmaWVsZCBpcyBhbHNvIG5vdCAwLCB3ZSBoYXZlIGNvbGxpc2lvbi5cclxuICAgICAgICAgICAgICAgICAgICBpZihibG9jay5zaGFwZVt5XVt4XSAhPT0gMCAmJiB0aGlzLnBsYXlmaWVsZFt5ICsgYmxvY2sueV1beCArIGJsb2NrLnggKyAyXSAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvb3AxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBjb25zdCB0ZW1wRmllbGQgPSB0aGlzLnJlbmRlclRlbXBGaWVsZCgpO1xyXG5cclxuICAgICAgICB0ZW1wRmllbGQubWFwKGZ1bmN0aW9uKHZhbCwgeSl7XHJcbiAgICAgICAgICAgIHZhbC5tYXAoZnVuY3Rpb24odmFsLCB4KXtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcnNbdmFsXTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4KjIwLCB5KjIwLCAyMCwgMjApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVnaXN0ZXJzIHRoZSBldmVudHMgYW5kIGFkZCBhY3Rpb25zIGFjY29yZGluZ2x5LlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd0xlZnQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrTGVmdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd1JpZ2h0JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja1JpZ2h0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93VXAnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5yb3RhdGVDdXJyZW50QmxvY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dEb3duJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzU3BhY2UnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5kcm9wQmxvY2soKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmV0dXJucyBhIG5ldyBwbGF5ZmllbGQgd2l0aCB0aGUgY3VycmVudGJsb2NrIGFuZCBnaG9zdGJsb2NrIG1lcmdlZCBpbnRvIHRoZW0uXHJcbiAgICAgKi9cclxuICAgIHJlbmRlclRlbXBGaWVsZCgpe1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIENyZWF0ZSBhIG5ldyBkZXJlZmZlcmVuY2VkIHBsYXlmaWVsZCBmcm9tIHRoZSBjdXJyZW50IHBsYXlmaWVsZFxyXG4gICAgICAgICBieSBzcGxpY2luZyB0aGUgcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IHRlbXBGaWVsZCA9IHRoaXMucGxheWZpZWxkLm1hcChmdW5jdGlvbihhcnIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLnNsaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vTWVyZ2UgdGhlIGJsb2NrcyB3aXRoIHRoZSBwbGF5ZmllbGRcclxuICAgICAgICB0aGlzLnJlbmRlckJsb2NrKHRlbXBGaWVsZCwgdGhpcy5naG9zdEJsb2NrKTtcclxuICAgICAgICB0aGlzLnJlbmRlckJsb2NrKHRlbXBGaWVsZCwgdGhpcy5jdXJyZW50QmxvY2spO1xyXG5cclxuICAgICAgICByZXR1cm4gdGVtcEZpZWxkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBNZXJnZXMgYSBibG9jayB3aXRoIGEgZmllbGRcclxuICAgICAqL1xyXG4gICAgcmVuZGVyQmxvY2soZmllbGQsIHRldHJpbWlubyl7XHJcbiAgICAgICAgdGV0cmltaW5vLnNoYXBlLm1hcChmdW5jdGlvbihhcnIsIGope1xyXG4gICAgICAgICAgICBhcnIubWFwKGZ1bmN0aW9uKHZhbCwgaSl7XHJcbiAgICAgICAgICAgICAgICBpZih2YWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkW2ogKyB0ZXRyaW1pbm8ueV1baSArIHRldHJpbWluby54ICsgMl0gPSB2YWw7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5yb3dSZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5SZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNwb3NlKCl7XHJcbiAgICAgICAgbGV0IG9sZFNoYXBlID0gdGhpcy5zaGFwZTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9sZFNoYXBlWzBdLm1hcChmdW5jdGlvbihjb2wsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9sZFNoYXBlLm1hcChmdW5jdGlvbihyb3cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3dbaV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByb3dSZXZlcnNlKCl7XHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMuc2hhcGUubWFwKGZ1bmN0aW9uKHJvdyl7XHJcbiAgICAgICAgICAgIHJldHVybiByb3cucmV2ZXJzZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29sdW1uUmV2ZXJzZSgpe1xyXG4gICAgICAgIHRoaXMuc2hhcGUucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VHaG9zdCgpe1xyXG4gICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCB0aGlzLnNoYXBlLmxlbmd0aDsgeSsrKXtcclxuICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IHRoaXMuc2hhcGVbeV0ubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zaGFwZVt5XVt4XSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXBlW3ldW3hdID0gOTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDAsMCwwXSxcclxuICAgICAgICAgICAgWzIsMiwyLDJdLFxyXG4gICAgICAgICAgICBbMCwwLDAsMF0sXHJcbiAgICAgICAgICAgIFswLDAsMCwwXVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMywwLDBdLFxyXG4gICAgICAgICAgICBbMywzLDNdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTEJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsMCw0XSxcclxuICAgICAgICAgICAgWzQsNCw0XSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9CbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFs1LDVdLFxyXG4gICAgICAgICAgICBbNSw1XVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDYsNl0sXHJcbiAgICAgICAgICAgIFs2LDYsMF0sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCw3LDBdLFxyXG4gICAgICAgICAgICBbNyw3LDddLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWkJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzgsOCwwXSxcclxuICAgICAgICAgICAgWzAsOCw4XSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZmllbGQgZnJvbSAnLi9wbGF5ZmllbGQnO1xyXG5pbXBvcnQgeyBrZXlzIH0gZnJvbSAnLi9jb25zdC9rZXlzJztcclxuXHJcbmNsYXNzIFRldHJpc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMgPSB7XHJcbiAgICAgICAgICAgIHRldHJpczogJ3RldHJpcycsXHJcbiAgICAgICAgICAgIHNjb3JlIDogJ3Njb3JlJyxcclxuICAgICAgICAgICAgcm93cyAgOiAncm93cycsXHJcbiAgICAgICAgICAgIGxldmVsIDogJ2xldmVsJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jYW52YXMgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdG9ycy50ZXRyaXMpO1xyXG4gICAgICAgIHRoaXMuZnBzICAgICAgID0gNjA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZmllbGQgPSBuZXcgUGxheWZpZWxkKCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbCAgICAgPSAxO1xyXG4gICAgICAgIHRoaXMucm93cyAgICAgID0gMDtcclxuICAgICAgICB0aGlzLnNjb3JlICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5sb29wQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYXVzZSAgICAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpbWVvdXQgICA9IDEwMDAvdGhpcy5mcHM7XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmVnaXN0ZXIgYWxsIGxpc3RlbmVycy5cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoKXtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlS2V5RXZlbnRzKGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiVGV0cmlzR2FtZU92ZXJcIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYuZW5kR2FtZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiVGV0cmlzUGF1c2VcIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYucGF1c2VHYW1lKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJUZXRyaXNSb3dzQ2xlYXJlZFwiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi51cGRhdGVTY29yZXMoZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFBhdXNlcyB0aGUgZ2FtZVxyXG4gICAgICovXHJcbiAgICBwYXVzZUdhbWUoKXtcclxuICAgICAgICBpZighdGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BHYW1lKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdGFydHMgdGhlIGdhbWVsb29wXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0R2FtZSgpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgICAgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZ2FtZUxvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe3NlbGYubG9vcChzZWxmKX0sIHRoaXMudGltZW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdG9wcyB0aGUgZ2FtZWxvb3BcclxuICAgICAqL1xyXG4gICAgc3RvcEdhbWUoKXtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZ2FtZUxvb3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgRW5kJ3MgdGhlIGdhbWVcclxuICAgICAqL1xyXG4gICAgZW5kR2FtZSgpe1xyXG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgVXBkYXRlIHRoZSB2aXN1YWwgc2NvcmVzXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVNjb3JlcyhlKXtcclxuICAgICAgICBjb25zdCBjbGVhcmVkUm93cyA9IGUuZGV0YWlsLmNsZWFyZWRSb3dzO1xyXG4gICAgICAgIHRoaXMucm93cyArPSBjbGVhcmVkUm93cztcclxuICAgICAgICB0aGlzLnNjb3JlICs9IE1hdGguZmxvb3IoNTAgKiBNYXRoLnBvdygxLjEsIGNsZWFyZWRSb3dzKSAqIGNsZWFyZWRSb3dzKTtcclxuICAgICAgICB0aGlzLmxldmVsID0gTWF0aC5mbG9vcih0aGlzLnNjb3JlIC8gMTAwMDApICsgMTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFRoZSBnYW1lIGxvb3AgaXRzZWxmLlxyXG4gICAgICovXHJcbiAgICBsb29wKHNlbGYpe1xyXG4gICAgICAgIHNlbGYudXBkYXRlKCk7XHJcbiAgICAgICAgc2VsZi5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBVcGRhdGUgYWxsIHZhbHVlcyBvZiB0aGUgZ2FtZS5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuZ2FtZU92ZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb3BDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgaWYoKHRoaXMubG9vcENvdW50ICUgKCh0aGlzLmZwcyAqIDIpIC0gKHRoaXMubGV2ZWwgKiA1KSkpID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIERyYXcgZXZlcnl0aGluZyB0byB0aGUgc2NyZWVuLlxyXG4gICAgICovXHJcbiAgICBkcmF3KCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5nYW1lT3Zlcil7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLmRyYXcoY3R4KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kcmF3R2FtZU92ZXIoY3R4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnNjb3JlKS5pbm5lclRleHQgPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0b3JzLnJvd3MpLmlubmVyVGV4dCAgPSB0aGlzLnJvd3M7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3RvcnMubGV2ZWwpLmlubmVyVGV4dCA9IHRoaXMubGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0dhbWVPdmVyKGN0eCl7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAzMDAsIDYwMCk7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICBjdHguZmlsbFRleHQoXCJHYW1lIE92ZXJcIiwgNTAsIDI1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBXaGVuIGEga2V5IGlzIHByZXNzZWQsIGZpcmUgYSBjdXN0b20gZXZlbnQgc28gZGlmZmVyZW50IGNvbXBvbmVudHMgY2FuIGhhbmRsZVxyXG4gICAgIHRoZSBldmVudHMgdGhlbXNlbGYuXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZUtleUV2ZW50cyhlKXtcclxuICAgICAgICBsZXQgZXZlbnQ7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucGF1c2Upe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2goZS5rZXlDb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93VXA6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dVcCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd0Rvd246XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dEb3duJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93TGVmdDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd0xlZnQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dSaWdodDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd1JpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLlNwYWNlOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc1NwYWNlJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLktleVA6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzUGF1c2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZXZlbnQpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBUZXRyaXMoKTsiXX0=
