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
    Space: 32
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
            this.currentBlock.x += 1;

            if (this.checkCollision(this.currentBlock)) {
                this.currentBlock.x -= 1;
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
            this.currentBlock.x -= 1;

            if (this.checkCollision(this.currentBlock)) {
                this.currentBlock.x += 1;
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
            this.currentBlock.y += 1;

            if (this.checkCollision(this.currentBlock)) {
                this.currentBlock.y -= 1;

                this.saveBlock();
                this.checkLines();
                this.newBlockFromBag();

                return false;
            }

            return true;
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
                }
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
                self.currentBlock.rotateRight();
                self.updateGhostBlock();
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

        this.canvas = document.getElementById('tetris');
        this.fps = 60;
        this.playfield = new _playfield2.default();
        this.level = 1;
        this.loopCount = 0;

        this.registerListeners();

        var self = this;
        var timeout = 1000 / this.fps;
        this.gameLoop = setInterval(function () {
            self.loop(self);
        }, timeout);
    }

    /*
    Register all listeners.
     */


    _createClass(Tetris, [{
        key: 'registerListeners',
        value: function registerListeners() {
            var self = this;

            document.addEventListener("keydown", function (e) {
                e.preventDefault();
                self.handleKeyEvents(e.keyCode);
            });
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
            var ctx = this.canvas.getContext("2d");

            this.playfield.draw(ctx);
        }

        /*
        When a key is pressed, fire a custom event so different components can handle
        the events themself.
         */

    }, {
        key: 'handleKeyEvents',
        value: function handleKeyEvents(keyCode) {
            var event = void 0;

            switch (keyCode) {
                case _keys.keys.ArrowUp:
                    event = new Event('TetrisArrowUp');
                    break;
                case _keys.keys.ArrowDown:
                    event = new Event('TetrisArrowDown');
                    break;
                case _keys.keys.ArrowLeft:
                    event = new Event('TetrisArrowLeft');
                    break;
                case _keys.keys.ArrowRight:
                    event = new Event('TetrisArrowRight');
                    break;
                case _keys.keys.Space:
                    event = new Event('TetrisSpace');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxwbGF5ZmllbGQuanMiLCJlczZcXHRldHJpbWlub3NcXGJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxpYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGpibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcbGJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxvYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHNibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcdGJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFx6YmxvY2suanMiLCJlczZcXHRldHJpcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSwwQkFBUztBQUNsQixPQUFHLFNBRGU7QUFFbEIsT0FBRyxTQUZlO0FBR2xCLE9BQUcsU0FIZTtBQUlsQixPQUFHLFNBSmU7QUFLbEIsT0FBRyxTQUxlO0FBTWxCLE9BQUcsU0FOZTtBQU9sQixPQUFHLFNBUGU7QUFRbEIsT0FBRyxTQVJlO0FBU2xCLE9BQUcsU0FUZTtBQVVsQixPQUFHO0FBVmUsQ0FBZjs7Ozs7Ozs7QUNBQSxJQUFNLHNCQUFPO0FBQ2hCLGFBQVksRUFESTtBQUVoQixlQUFZLEVBRkk7QUFHaEIsZUFBWSxFQUhJO0FBSWhCLGdCQUFZLEVBSkk7QUFLaEIsV0FBWTtBQUxJLENBQWI7Ozs7Ozs7Ozs7O0FDQVA7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUIsUztBQUNqQix5QkFBYTtBQUFBOztBQUNULGFBQUssU0FBTCxHQUFpQixDQUNiLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FEYSxFQUViLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FGYSxFQUdiLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FIYSxFQUliLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FKYSxFQUtiLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FMYSxFQU1iLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FOYSxFQU9iLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FQYSxFQVFiLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FSYSxFQVNiLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FUYSxFQVViLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FWYSxFQVdiLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FYYSxFQVliLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYs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RCxJQUEwRCxDQUE3RCxFQUErRDtBQUMzRCxxQkFBSyxTQUFMLENBQWUsb0JBQWY7QUFDSDtBQUNKOztBQUVEOzs7Ozs7K0JBR007QUFDRixnQkFBSSxNQUFNLEtBQUssTUFBTCxDQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBVjs7QUFFQSxpQkFBSyxTQUFMLENBQWUsSUFBZixDQUFvQixHQUFwQjtBQUNIOztBQUVEOzs7Ozs7O3dDQUlnQixPLEVBQVE7QUFDcEIsZ0JBQUksY0FBSjs7QUFFQSxvQkFBTyxPQUFQO0FBQ0kscUJBQUssV0FBSyxPQUFWO0FBQ0ksNEJBQVEsSUFBSSxLQUFKLENBQVUsZUFBVixDQUFSO0FBQ0E7QUFDSixxQkFBSyxXQUFLLFNBQVY7QUFDSSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxpQkFBVixDQUFSO0FBQ0E7QUFDSixxQkFBSyxXQUFLLFNBQVY7QUFDSSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxpQkFBVixDQUFSO0FBQ0E7QUFDSixxQkFBSyxXQUFLLFVBQVY7QUFDSSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxrQkFBVixDQUFSO0FBQ0E7QUFDSixxQkFBSyxXQUFLLEtBQVY7QUFDSSw0QkFBUSxJQUFJLEtBQUosQ0FBVSxhQUFWLENBQVI7QUFDQTtBQWZSOztBQWtCQSxnQkFBRyxLQUFILEVBQVM7QUFDTCx5QkFBUyxhQUFULENBQXVCLEtBQXZCO0FBQ0g7QUFDSjs7Ozs7O0FBR0wsSUFBSSxNQUFKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjb25zdCBjb2xvcnMgPSB7XHJcbiAgICAwOiAnI0NDQ0NDQycsXHJcbiAgICAxOiAnIzg4ODg4OCcsXHJcbiAgICAyOiAnIzMxQzdFRicsXHJcbiAgICAzOiAnIzVBNjVBRCcsXHJcbiAgICA0OiAnI0VGNzkyMScsXHJcbiAgICA1OiAnI0Y3RDMwOCcsXHJcbiAgICA2OiAnIzQyQjY0MicsXHJcbiAgICA3OiAnI0FENEQ5QycsXHJcbiAgICA4OiAnI0VGMjAyOScsXHJcbiAgICA5OiAnI0JCQkJCQidcclxufTsiLCJleHBvcnQgY29uc3Qga2V5cyA9IHtcclxuICAgIEFycm93VXAgICA6IDM4LFxyXG4gICAgQXJyb3dEb3duIDogNDAsXHJcbiAgICBBcnJvd0xlZnQgOiAzNyxcclxuICAgIEFycm93UmlnaHQ6IDM5LFxyXG4gICAgU3BhY2UgICAgIDogMzJcclxufTsiLCJpbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuL2NvbnN0L2NvbG9ycyc7XHJcbmltcG9ydCBJQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL2libG9jayc7XHJcbmltcG9ydCBKQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL2pibG9jayc7XHJcbmltcG9ydCBMQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL2xibG9jayc7XHJcbmltcG9ydCBPQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL29ibG9jayc7XHJcbmltcG9ydCBTQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL3NibG9jayc7XHJcbmltcG9ydCBUQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL3RibG9jayc7XHJcbmltcG9ydCBaQmxvY2sgZnJvbSAnLi90ZXRyaW1pbm9zL3pibG9jayc7XHJcbmltcG9ydCBCbG9jayBmcm9tICcuL3RldHJpbWlub3MvYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWZpZWxke1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IFtcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdob3N0QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYmFnID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgR2VuZXJhdGVzIGEgbmV3IHJhbmRvbSBiYWcgb2YgNyB0ZXRyaW1pbm9zLlxyXG4gICAgIGh0dHBzOi8vdGV0cmlzLndpa2kvUmFuZG9tX0dlbmVyYXRvclxyXG4gICAgICovXHJcbiAgICBnZW5lcmF0ZU5ld0JhZygpe1xyXG4gICAgICAgIHRoaXMuYmFnID0gW0lCbG9jaywgSkJsb2NrLCBMQmxvY2ssIE9CbG9jaywgU0Jsb2NrLCBUQmxvY2ssIFpCbG9ja107XHJcbiAgICAgICAgdGhpcy5zaHVmZmxlQmFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBUYWtlcyB0aGUgZmlyc3QgYmxvY2sgZnJvbSB0aGUgYmFnIGFuZCBhc3NpZ24gaXQgdG8gdGhlIGN1cnJlbnQgYmxvY2suXHJcbiAgICAgSWYgdGhlIGJhZyBpcyBlbXB0eSwgZ2VuZXJhdGUgYSBuZXcgb25lLlxyXG4gICAgICovXHJcbiAgICBuZXdCbG9ja0Zyb21CYWcoKXtcclxuICAgICAgICBpZih0aGlzLmJhZy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVOZXdCYWcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9IHRoaXMuYmFnLnNoaWZ0KCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBuZXcgYmxvY2tUeXBlKDMsIDApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgU2h1ZmZsZXMgdGhlIHRlcnRyaW1pbm9zXHJcbiAgICAgKi9cclxuICAgIHNodWZmbGVCYWcoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5iYWcubGVuZ3RoOyBpOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKTtcclxuICAgICAgICAgICAgW3RoaXMuYmFnW2kgLSAxXSwgdGhpcy5iYWdbal1dID0gW3RoaXMuYmFnW2pdLCB0aGlzLmJhZ1tpIC0gMV1dO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSByaWdodC4gSWYgY29sbGlzaW9uIGlzIGRldGVjdGVkXHJcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgbW92ZUN1cnJlbnRCbG9ja1JpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCArPSAxO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnggLT0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgdG8gdGhlIGxlZnQuIElmIGNvbGxpc2lvbiBpcyBkZXRlY3RlZFxyXG4gICAgIHJlc3RvcmUgaXQncyBvbGQgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIG1vdmVDdXJyZW50QmxvY2tMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueCAtPSAxO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnggKz0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlR2hvc3RCbG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTW92ZXMgdGhlIGN1cnJlbnQgYmxvY2sgZG93bndhcmRzLiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcclxuICAgICByZXN0b3JlIGl0J3Mgb2xkIHBvc2l0aW9uIGFuZCBzYXZlIGl0IHRvIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgQ2hlY2sgaWYgYW55IGxpbmVzIGFyZSBmb3JtZWQgYW5kIGNyZWF0ZWQgYSBuZXcgYmxvY2suXHJcbiAgICAgKi9cclxuICAgIG1vdmVDdXJyZW50QmxvY2tEb3duKCl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sueSArPSAxO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNoZWNrQ29sbGlzaW9uKHRoaXMuY3VycmVudEJsb2NrKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnkgLT0gMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUJsb2NrKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tMaW5lcygpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld0Jsb2NrRnJvbUJhZygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdG9yZXMgdGhlIGN1cnJlbnRibG9jayBpbnRvIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgKi9cclxuICAgIHNhdmVCbG9jaygpe1xyXG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIENoZWNrIGlmIHRoZXJlIGFyZSBuZXcgbGluZXMgZm9ybWVkLlxyXG4gICAgICovXHJcbiAgICBjaGVja0xpbmVzKCl7XHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMucGxheWZpZWxkLmxlbmd0aDsgeSsrKXtcclxuICAgICAgICAgICAgbGV0IHN1bVJvdyA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGhpcy5wbGF5ZmllbGRbeV0ubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgLy9JZiB0aGUgcm93IGNvbnRhaW5zIGEgMCwgc2tpcCB0aGUgcm93XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXlmaWVsZFt5XVt4XSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1Sb3cgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN1bVJvdyArPSB0aGlzLnBsYXlmaWVsZFt5XVt4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9JZiB0aGUgc3VtIG9mIHRoZSByb3cgaXMgaGlnaGVyIHRoYW4gMTQsIGl0IG1lYW5zIGEgYmxvY2sgaXMgcHJlc2VudCBzaW5jZSBpdCdzIGJpZ2dlciB0aGFuIDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMVxyXG4gICAgICAgICAgICBpZihzdW1Sb3cgPiAxNCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5zcGxpY2UoeSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE5ld1JvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQWRkcyBhIG5ldyByb3cgb24gdG9wIG9mIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgKi9cclxuICAgIGFkZE5ld1Jvdygpe1xyXG4gICAgICAgIHRoaXMucGxheWZpZWxkLnVuc2hpZnQoWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTG93ZXJzIHRoZSBjdXJyZW50YmxvY2sgdW50aWwgdGhlcmUgaXMgY29sbGlzaW9uIGRldGVjdGVkLlxyXG4gICAgICovXHJcbiAgICBkcm9wQmxvY2soKXtcclxuICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5tb3ZlQ3VycmVudEJsb2NrRG93bigpXHJcbiAgICAgICAgfXdoaWxlKHJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDbG9uZXMgdGhlIGN1cnJlbnRibG9jayBpbiBwb3NpdGlvbiBhbmQgc2hhcGUuIEdpdmUgaXQgYSBncmF5IGNvbG9yIGFuZFxyXG4gICAgIGxvd2VyIGl0IHVudGlsIGNvbGxpc2lvbiBpcyBkZXRlY3RlZC5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlR2hvc3RCbG9jaygpe1xyXG4gICAgICAgIGxldCBjb2xpc3Npb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5naG9zdEJsb2NrID0gbmV3IEJsb2NrKHRoaXMuY3VycmVudEJsb2NrLngsIHRoaXMuY3VycmVudEJsb2NrLnkpO1xyXG4gICAgICAgIC8vQmVjYXVzZSB0aGUgc2hhcGUgaXMgYSBtdWx0aS1kaW1lbnNpb25hbCBhcnJheSB3ZSBuZWVkIHRvIGRlcmVmZmVyZW5jZSBpdCB3aGVuIGNvcHlpbmcuXHJcbiAgICAgICAgdGhpcy5naG9zdEJsb2NrLnNoYXBlID0gdGhpcy5jdXJyZW50QmxvY2suc2hhcGUubWFwKGZ1bmN0aW9uKHJvdyl7XHJcbiAgICAgICAgICAgIHJldHVybiByb3cuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdob3N0QmxvY2subWFrZUdob3N0KCk7XHJcblxyXG4gICAgICAgIGRve1xyXG4gICAgICAgICAgICB0aGlzLmdob3N0QmxvY2sueSArPSAxO1xyXG5cclxuICAgICAgICAgICAgY29saXNzaW9uID0gdGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmdob3N0QmxvY2spO1xyXG4gICAgICAgICAgICBpZihjb2xpc3Npb24pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naG9zdEJsb2NrLnkgLT0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH13aGlsZSghY29saXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIENoZWNrIGlmIHRoZXJlIGlzIGNvbGxpc2lvbi5cclxuICAgICAqL1xyXG4gICAgY2hlY2tDb2xsaXNpb24oYmxvY2spe1xyXG4gICAgICAgIGxldCBjb2xsaXNpb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbG9vcDE6XHJcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCBibG9jay5zaGFwZS5sZW5ndGg7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgYmxvY2suc2hhcGVbeV0ubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vV2hlbiB0aGUgdmFsdWUgb2YgdGhlIGJsb2NrIGlzIG5vdCAwIGFuZCBvbiB0aGF0IHBsYWNlIGluIHRoZSBwbGF5ZmllbGQgdGhlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vZiB0aGUgcGxheWZpZWxkIGlzIGFsc28gbm90IDAsIHdlIGhhdmUgY29sbGlzaW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJsb2NrLnNoYXBlW3ldW3hdICE9PSAwICYmIHRoaXMucGxheWZpZWxkW3kgKyBibG9jay55XVt4ICsgYmxvY2sueCArIDJdICE9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgbG9vcDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBEcmF3IGV2ZXJ5dGhpbmcgdG8gdGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgpe1xyXG4gICAgICAgIGNvbnN0IHRlbXBGaWVsZCA9IHRoaXMucmVuZGVyVGVtcEZpZWxkKCk7XHJcblxyXG4gICAgICAgIHRlbXBGaWVsZC5tYXAoZnVuY3Rpb24odmFsLCB5KXtcclxuICAgICAgICAgICAgdmFsLm1hcChmdW5jdGlvbih2YWwsIHgpe1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yc1t2YWxdO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgqMjAsIHkqMjAsIDIwLCAyMCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93TGVmdCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tMZWZ0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93UmlnaHQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrUmlnaHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dVcCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRCbG9jay5yb3RhdGVSaWdodCgpO1xyXG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dEb3duJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUN1cnJlbnRCbG9ja0Rvd24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzU3BhY2UnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5kcm9wQmxvY2soKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgUmV0dXJucyBhIG5ldyBwbGF5ZmllbGQgd2l0aCB0aGUgY3VycmVudGJsb2NrIGFuZCBnaG9zdGJsb2NrIG1lcmdlZCBpbnRvIHRoZW0uXHJcbiAgICAgKi9cclxuICAgIHJlbmRlclRlbXBGaWVsZCgpe1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIENyZWF0ZSBhIG5ldyBkZXJlZmZlcmVuY2VkIHBsYXlmaWVsZCBmcm9tIHRoZSBjdXJyZW50IHBsYXlmaWVsZFxyXG4gICAgICAgICBieSBzcGxpY2luZyB0aGUgcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IHRlbXBGaWVsZCA9IHRoaXMucGxheWZpZWxkLm1hcChmdW5jdGlvbihhcnIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLnNsaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vTWVyZ2UgdGhlIGJsb2NrcyB3aXRoIHRoZSBwbGF5ZmllbGRcclxuICAgICAgICB0aGlzLnJlbmRlckJsb2NrKHRlbXBGaWVsZCwgdGhpcy5naG9zdEJsb2NrKTtcclxuICAgICAgICB0aGlzLnJlbmRlckJsb2NrKHRlbXBGaWVsZCwgdGhpcy5jdXJyZW50QmxvY2spO1xyXG5cclxuICAgICAgICByZXR1cm4gdGVtcEZpZWxkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBNZXJnZXMgYSBibG9jayB3aXRoIGEgZmllbGRcclxuICAgICAqL1xyXG4gICAgcmVuZGVyQmxvY2soZmllbGQsIHRldHJpbWlubyl7XHJcbiAgICAgICAgdGV0cmltaW5vLnNoYXBlLm1hcChmdW5jdGlvbihhcnIsIGope1xyXG4gICAgICAgICAgICBhcnIubWFwKGZ1bmN0aW9uKHZhbCwgaSl7XHJcbiAgICAgICAgICAgICAgICBpZih2YWwgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkW2ogKyB0ZXRyaW1pbm8ueV1baSArIHRldHJpbWluby54ICsgMl0gPSB2YWw7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVSaWdodCgpe1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5yb3dSZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlTGVmdCgpe1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5SZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNwb3NlKCl7XHJcbiAgICAgICAgbGV0IG9sZFNoYXBlID0gdGhpcy5zaGFwZTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9sZFNoYXBlWzBdLm1hcChmdW5jdGlvbihjb2wsIGkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9sZFNoYXBlLm1hcChmdW5jdGlvbihyb3cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3dbaV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByb3dSZXZlcnNlKCl7XHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMuc2hhcGUubWFwKGZ1bmN0aW9uKHJvdyl7XHJcbiAgICAgICAgICAgIHJldHVybiByb3cucmV2ZXJzZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29sdW1uUmV2ZXJzZSgpe1xyXG4gICAgICAgIHRoaXMuc2hhcGUucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VHaG9zdCgpe1xyXG4gICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCB0aGlzLnNoYXBlLmxlbmd0aDsgeSsrKXtcclxuICAgICAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IHRoaXMuc2hhcGVbeV0ubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zaGFwZVt5XVt4XSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXBlW3ldW3hdID0gOTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDAsMCwwXSxcclxuICAgICAgICAgICAgWzIsMiwyLDJdLFxyXG4gICAgICAgICAgICBbMCwwLDAsMF0sXHJcbiAgICAgICAgICAgIFswLDAsMCwwXVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMywwLDBdLFxyXG4gICAgICAgICAgICBbMywzLDNdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTEJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsMCw0XSxcclxuICAgICAgICAgICAgWzQsNCw0XSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9CbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFs1LDVdLFxyXG4gICAgICAgICAgICBbNSw1XVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDYsNl0sXHJcbiAgICAgICAgICAgIFs2LDYsMF0sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCw3LDBdLFxyXG4gICAgICAgICAgICBbNyw3LDddLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWkJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzgsOCwwXSxcclxuICAgICAgICAgICAgWzAsOCw4XSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZmllbGQgZnJvbSAnLi9wbGF5ZmllbGQnO1xyXG5pbXBvcnQgeyBrZXlzIH0gZnJvbSAnLi9jb25zdC9rZXlzJztcclxuXHJcbmNsYXNzIFRldHJpc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV0cmlzJyk7XHJcbiAgICAgICAgdGhpcy5mcHMgICAgICAgPSA2MDtcclxuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoKTtcclxuICAgICAgICB0aGlzLmxldmVsICAgICA9IDE7XHJcbiAgICAgICAgdGhpcy5sb29wQ291bnQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGYgICAgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSAxMDAwL3RoaXMuZnBzO1xyXG4gICAgICAgIHRoaXMuZ2FtZUxvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe3NlbGYubG9vcChzZWxmKX0sIHRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBSZWdpc3RlciBhbGwgbGlzdGVuZXJzLlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleUV2ZW50cyhlLmtleUNvZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBUaGUgZ2FtZSBsb29wIGl0c2VsZi5cclxuICAgICAqL1xyXG4gICAgbG9vcChzZWxmKXtcclxuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xyXG4gICAgICAgIHNlbGYuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBVcGRhdGUgYWxsIHZhbHVlcyBvZiB0aGUgZ2FtZS5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCl7XHJcbiAgICAgICAgdGhpcy5sb29wQ291bnQrKztcclxuXHJcbiAgICAgICAgaWYoKHRoaXMubG9vcENvdW50ICUgKCh0aGlzLmZwcyAqIDIpIC0gKHRoaXMubGV2ZWwgKiA1KSkpID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5tb3ZlQ3VycmVudEJsb2NrRG93bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgRHJhdyBldmVyeXRoaW5nIHRvIHRoZSBzY3JlZW4uXHJcbiAgICAgKi9cclxuICAgIGRyYXcoKXtcclxuICAgICAgICB2YXIgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXlmaWVsZC5kcmF3KGN0eCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIFdoZW4gYSBrZXkgaXMgcHJlc3NlZCwgZmlyZSBhIGN1c3RvbSBldmVudCBzbyBkaWZmZXJlbnQgY29tcG9uZW50cyBjYW4gaGFuZGxlXHJcbiAgICB0aGUgZXZlbnRzIHRoZW1zZWxmLlxyXG4gICAgICovXHJcbiAgICBoYW5kbGVLZXlFdmVudHMoa2V5Q29kZSl7XHJcbiAgICAgICAgbGV0IGV2ZW50O1xyXG5cclxuICAgICAgICBzd2l0Y2goa2V5Q29kZSl7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd1VwOlxyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93VXAnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dEb3duOlxyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93RG93bicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd0xlZnQ6XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dMZWZ0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93UmlnaHQ6XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzQXJyb3dSaWdodCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5TcGFjZTpcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNTcGFjZScpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihldmVudCl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmV3IFRldHJpcygpOyJdfQ==
