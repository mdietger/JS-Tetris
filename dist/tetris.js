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

        this.canvas = document.getElementById('tetris');
        this.fps = 60;
        this.playfield = new _playfield2.default();
        this.level = 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczZcXGNvbnN0XFxjb2xvcnMuanMiLCJlczZcXGNvbnN0XFxrZXlzLmpzIiwiZXM2XFxwbGF5ZmllbGQuanMiLCJlczZcXHRldHJpbWlub3NcXGJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxpYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXGpibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcbGJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFxvYmxvY2suanMiLCJlczZcXHRldHJpbWlub3NcXHNibG9jay5qcyIsImVzNlxcdGV0cmltaW5vc1xcdGJsb2NrLmpzIiwiZXM2XFx0ZXRyaW1pbm9zXFx6YmxvY2suanMiLCJlczZcXHRldHJpcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQU8sSUFBTSwwQkFBUztBQUNsQixPQUFHLFNBRGU7QUFFbEIsT0FBRyxTQUZlO0FBR2xCLE9BQUcsU0FIZTtBQUlsQixPQUFHLFNBSmU7QUFLbEIsT0FBRyxTQUxlO0FBTWxCLE9BQUcsU0FOZTtBQU9sQixPQUFHLFNBUGU7QUFRbEIsT0FBRyxTQVJlO0FBU2xCLE9BQUcsU0FUZTtBQVVsQixPQUFHO0FBVmUsQ0FBZjs7Ozs7Ozs7QUNBQSxJQUFNLHNCQUFPO0FBQ2hCLGFBQVksRUFESTtBQUVoQixlQUFZLEVBRkk7QUFHaEIsZUFBWSxFQUhJO0FBSWhCLGdCQUFZLEVBSkk7QUFLaEIsV0FBWSxFQUxJO0FBTWhCLFVBQVk7QUFOSSxDQUFiOzs7Ozs7Ozs7OztBQ0FQOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLFM7QUFDakIseUJBQWE7QUFBQTs7QUFDVCxhQUFLLFNBQUwsR0FBaUIsQ0FDYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBRGEsRUFFYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBRmEsRUFHYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBSGEsRUFJYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBSmEsRUFLYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBTGEsRUFNYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBTmEsRUFPYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBUGEsRUFRYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBUmEsRUFTYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBVGEsRUFVYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBVmEsRUFXYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLENBWGEsRUFZYixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFh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TCx5QkFBUyxhQUFULENBQXVCLEtBQXZCO0FBQ0g7QUFDSjs7Ozs7O0FBR0wsSUFBSSxNQUFKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjb25zdCBjb2xvcnMgPSB7XHJcbiAgICAwOiAnI0NDQ0NDQycsXHJcbiAgICAxOiAnIzg4ODg4OCcsXHJcbiAgICAyOiAnIzMxQzdFRicsXHJcbiAgICAzOiAnIzVBNjVBRCcsXHJcbiAgICA0OiAnI0VGNzkyMScsXHJcbiAgICA1OiAnI0Y3RDMwOCcsXHJcbiAgICA2OiAnIzQyQjY0MicsXHJcbiAgICA3OiAnI0FENEQ5QycsXHJcbiAgICA4OiAnI0VGMjAyOScsXHJcbiAgICA5OiAnI0JCQkJCQidcclxufTsiLCJleHBvcnQgY29uc3Qga2V5cyA9IHtcclxuICAgIEFycm93VXAgICA6IDM4LFxyXG4gICAgQXJyb3dEb3duIDogNDAsXHJcbiAgICBBcnJvd0xlZnQgOiAzNyxcclxuICAgIEFycm93UmlnaHQ6IDM5LFxyXG4gICAgU3BhY2UgICAgIDogMzIsXHJcbiAgICBLZXlQICAgICAgOiA4MFxyXG59OyIsImltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4vY29uc3QvY29sb3JzJztcclxuaW1wb3J0IElCbG9jayBmcm9tICcuL3RldHJpbWlub3MvaWJsb2NrJztcclxuaW1wb3J0IEpCbG9jayBmcm9tICcuL3RldHJpbWlub3MvamJsb2NrJztcclxuaW1wb3J0IExCbG9jayBmcm9tICcuL3RldHJpbWlub3MvbGJsb2NrJztcclxuaW1wb3J0IE9CbG9jayBmcm9tICcuL3RldHJpbWlub3Mvb2Jsb2NrJztcclxuaW1wb3J0IFNCbG9jayBmcm9tICcuL3RldHJpbWlub3Mvc2Jsb2NrJztcclxuaW1wb3J0IFRCbG9jayBmcm9tICcuL3RldHJpbWlub3MvdGJsb2NrJztcclxuaW1wb3J0IFpCbG9jayBmcm9tICcuL3RldHJpbWlub3MvemJsb2NrJztcclxuaW1wb3J0IEJsb2NrIGZyb20gJy4vdGV0cmltaW5vcy9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZmllbGR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gW1xyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDFdLFxyXG4gICAgICAgICAgICBbMSwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwxXSxcclxuICAgICAgICAgICAgWzEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgICAgIFsxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2hvc3RCbG9jayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iYWcgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgICAgIHRoaXMubmV3QmxvY2tGcm9tQmFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBHZW5lcmF0ZXMgYSBuZXcgcmFuZG9tIGJhZyBvZiA3IHRldHJpbWlub3MuXHJcbiAgICAgaHR0cHM6Ly90ZXRyaXMud2lraS9SYW5kb21fR2VuZXJhdG9yXHJcbiAgICAgKi9cclxuICAgIGdlbmVyYXRlTmV3QmFnKCl7XHJcbiAgICAgICAgdGhpcy5iYWcgPSBbSUJsb2NrLCBKQmxvY2ssIExCbG9jaywgT0Jsb2NrLCBTQmxvY2ssIFRCbG9jaywgWkJsb2NrXTtcclxuICAgICAgICB0aGlzLnNodWZmbGVCYWcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFRha2VzIHRoZSBmaXJzdCBibG9jayBmcm9tIHRoZSBiYWcgYW5kIGFzc2lnbiBpdCB0byB0aGUgY3VycmVudCBibG9jay5cclxuICAgICBJZiB0aGUgYmFnIGlzIGVtcHR5LCBnZW5lcmF0ZSBhIG5ldyBvbmUuXHJcbiAgICAgKi9cclxuICAgIG5ld0Jsb2NrRnJvbUJhZygpe1xyXG4gICAgICAgIGlmKHRoaXMuYmFnLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU5ld0JhZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYmxvY2tUeXBlID0gdGhpcy5iYWcuc2hpZnQoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IG5ldyBibG9ja1R5cGUoMywgMCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0dhbWVPdmVyJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFNodWZmbGVzIHRoZSB0ZXJ0cmltaW5vc1xyXG4gICAgICovXHJcbiAgICBzaHVmZmxlQmFnKCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuYmFnLmxlbmd0aDsgaTsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XHJcbiAgICAgICAgICAgIFt0aGlzLmJhZ1tpIC0gMV0sIHRoaXMuYmFnW2pdXSA9IFt0aGlzLmJhZ1tqXSwgdGhpcy5iYWdbaSAtIDFdXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBNb3ZlcyB0aGUgY3VycmVudCBibG9jayB0byB0aGUgcmlnaHQuIElmIGNvbGxpc2lvbiBpcyBkZXRlY3RlZFxyXG4gICAgIHJlc3RvcmUgaXQncyBvbGQgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIG1vdmVDdXJyZW50QmxvY2tSaWdodCgpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnggKz0gMTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54IC09IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSBsZWZ0LiBJZiBjb2xsaXNpb24gaXMgZGV0ZWN0ZWRcclxuICAgICByZXN0b3JlIGl0J3Mgb2xkIHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICBtb3ZlQ3VycmVudEJsb2NrTGVmdCgpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnggLT0gMTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay54ICs9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUdob3N0QmxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIE1vdmVzIHRoZSBjdXJyZW50IGJsb2NrIGRvd253YXJkcy4gSWYgY29sbGlzaW9uIGlzIGRldGVjdGVkXHJcbiAgICAgcmVzdG9yZSBpdCdzIG9sZCBwb3NpdGlvbiBhbmQgc2F2ZSBpdCB0byB0aGUgcGxheWZpZWxkLlxyXG4gICAgIENoZWNrIGlmIGFueSBsaW5lcyBhcmUgZm9ybWVkIGFuZCBjcmVhdGVkIGEgbmV3IGJsb2NrLlxyXG4gICAgICovXHJcbiAgICBtb3ZlQ3VycmVudEJsb2NrRG93bigpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnkgKz0gMTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmN1cnJlbnRCbG9jaykpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRCbG9jay55IC09IDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNhdmVCbG9jaygpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrTGluZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXdCbG9ja0Zyb21CYWcoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJvdGF0ZUN1cnJlbnRCbG9jaygpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrLnJvdGF0ZVJpZ2h0KCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tDb2xsaXNpb24odGhpcy5jdXJyZW50QmxvY2spKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2sucm90YXRlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVHaG9zdEJsb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdG9yZXMgdGhlIGN1cnJlbnRibG9jayBpbnRvIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgKi9cclxuICAgIHNhdmVCbG9jaygpe1xyXG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gdGhpcy5yZW5kZXJUZW1wRmllbGQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIENoZWNrIGlmIHRoZXJlIGFyZSBuZXcgbGluZXMgZm9ybWVkLlxyXG4gICAgICovXHJcbiAgICBjaGVja0xpbmVzKCl7XHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMucGxheWZpZWxkLmxlbmd0aDsgeSsrKXtcclxuICAgICAgICAgICAgbGV0IHN1bVJvdyA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGhpcy5wbGF5ZmllbGRbeV0ubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgLy9JZiB0aGUgcm93IGNvbnRhaW5zIGEgMCwgc2tpcCB0aGUgcm93XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXlmaWVsZFt5XVt4XSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1Sb3cgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN1bVJvdyArPSB0aGlzLnBsYXlmaWVsZFt5XVt4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9JZiB0aGUgc3VtIG9mIHRoZSByb3cgaXMgaGlnaGVyIHRoYW4gMTQsIGl0IG1lYW5zIGEgYmxvY2sgaXMgcHJlc2VudCBzaW5jZSBpdCdzIGJpZ2dlciB0aGFuIDEsMSwxLDEsMSwxLDEsMSwxLDEsMSwxLDEsMVxyXG4gICAgICAgICAgICBpZihzdW1Sb3cgPiAxNCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5zcGxpY2UoeSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE5ld1JvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgQWRkcyBhIG5ldyByb3cgb24gdG9wIG9mIHRoZSBwbGF5ZmllbGQuXHJcbiAgICAgKi9cclxuICAgIGFkZE5ld1Jvdygpe1xyXG4gICAgICAgIHRoaXMucGxheWZpZWxkLnVuc2hpZnQoWzEsMSwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgTG93ZXJzIHRoZSBjdXJyZW50YmxvY2sgdW50aWwgdGhlcmUgaXMgY29sbGlzaW9uIGRldGVjdGVkLlxyXG4gICAgICovXHJcbiAgICBkcm9wQmxvY2soKXtcclxuICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5tb3ZlQ3VycmVudEJsb2NrRG93bigpXHJcbiAgICAgICAgfXdoaWxlKHJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBDbG9uZXMgdGhlIGN1cnJlbnRibG9jayBpbiBwb3NpdGlvbiBhbmQgc2hhcGUuIEdpdmUgaXQgYSBncmF5IGNvbG9yIGFuZFxyXG4gICAgIGxvd2VyIGl0IHVudGlsIGNvbGxpc2lvbiBpcyBkZXRlY3RlZC5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlR2hvc3RCbG9jaygpe1xyXG4gICAgICAgIGxldCBjb2xpc3Npb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5naG9zdEJsb2NrID0gbmV3IEJsb2NrKHRoaXMuY3VycmVudEJsb2NrLngsIHRoaXMuY3VycmVudEJsb2NrLnkpO1xyXG4gICAgICAgIC8vQmVjYXVzZSB0aGUgc2hhcGUgaXMgYSBtdWx0aS1kaW1lbnNpb25hbCBhcnJheSB3ZSBuZWVkIHRvIGRlcmVmZmVyZW5jZSBpdCB3aGVuIGNvcHlpbmcuXHJcbiAgICAgICAgdGhpcy5naG9zdEJsb2NrLnNoYXBlID0gdGhpcy5jdXJyZW50QmxvY2suc2hhcGUubWFwKGZ1bmN0aW9uKHJvdyl7XHJcbiAgICAgICAgICAgIHJldHVybiByb3cuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdob3N0QmxvY2subWFrZUdob3N0KCk7XHJcblxyXG4gICAgICAgIGRve1xyXG4gICAgICAgICAgICB0aGlzLmdob3N0QmxvY2sueSArPSAxO1xyXG5cclxuICAgICAgICAgICAgY29saXNzaW9uID0gdGhpcy5jaGVja0NvbGxpc2lvbih0aGlzLmdob3N0QmxvY2spO1xyXG4gICAgICAgICAgICBpZihjb2xpc3Npb24pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naG9zdEJsb2NrLnkgLT0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH13aGlsZSghY29saXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIENoZWNrIGlmIHRoZXJlIGlzIGNvbGxpc2lvbi5cclxuICAgICAqL1xyXG4gICAgY2hlY2tDb2xsaXNpb24oYmxvY2spe1xyXG4gICAgICAgIGxldCBjb2xsaXNpb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbG9vcDE6XHJcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCBibG9jay5zaGFwZS5sZW5ndGg7IHkrKyl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgYmxvY2suc2hhcGVbeV0ubGVuZ3RoOyB4Kyspe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vV2hlbiB0aGUgdmFsdWUgb2YgdGhlIGJsb2NrIGlzIG5vdCAwIGFuZCBvbiB0aGF0IHBsYWNlIGluIHRoZSBwbGF5ZmllbGQgdGhlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vZiB0aGUgcGxheWZpZWxkIGlzIGFsc28gbm90IDAsIHdlIGhhdmUgY29sbGlzaW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJsb2NrLnNoYXBlW3ldW3hdICE9PSAwICYmIHRoaXMucGxheWZpZWxkW3kgKyBibG9jay55XVt4ICsgYmxvY2sueCArIDJdICE9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgbG9vcDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBEcmF3IGV2ZXJ5dGhpbmcgdG8gdGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgpe1xyXG4gICAgICAgIGNvbnN0IHRlbXBGaWVsZCA9IHRoaXMucmVuZGVyVGVtcEZpZWxkKCk7XHJcblxyXG4gICAgICAgIHRlbXBGaWVsZC5tYXAoZnVuY3Rpb24odmFsLCB5KXtcclxuICAgICAgICAgICAgdmFsLm1hcChmdW5jdGlvbih2YWwsIHgpe1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yc1t2YWxdO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgqMjAsIHkqMjAsIDIwLCAyMCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlcnMgdGhlIGV2ZW50cyBhbmQgYWRkIGFjdGlvbnMgYWNjb3JkaW5nbHkuXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93TGVmdCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLm1vdmVDdXJyZW50QmxvY2tMZWZ0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1RldHJpc0Fycm93UmlnaHQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrUmlnaHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignVGV0cmlzQXJyb3dVcCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLnJvdGF0ZUN1cnJlbnRCbG9jaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNBcnJvd0Rvd24nLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQ3VycmVudEJsb2NrRG93bigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdUZXRyaXNTcGFjZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBzZWxmLmRyb3BCbG9jaygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZXR1cm5zIGEgbmV3IHBsYXlmaWVsZCB3aXRoIHRoZSBjdXJyZW50YmxvY2sgYW5kIGdob3N0YmxvY2sgbWVyZ2VkIGludG8gdGhlbS5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyVGVtcEZpZWxkKCl7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgQ3JlYXRlIGEgbmV3IGRlcmVmZmVyZW5jZWQgcGxheWZpZWxkIGZyb20gdGhlIGN1cnJlbnQgcGxheWZpZWxkXHJcbiAgICAgICAgIGJ5IHNwbGljaW5nIHRoZSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgdGVtcEZpZWxkID0gdGhpcy5wbGF5ZmllbGQubWFwKGZ1bmN0aW9uKGFycil7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnIuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9NZXJnZSB0aGUgYmxvY2tzIHdpdGggdGhlIHBsYXlmaWVsZFxyXG4gICAgICAgIHRoaXMucmVuZGVyQmxvY2sodGVtcEZpZWxkLCB0aGlzLmdob3N0QmxvY2spO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQmxvY2sodGVtcEZpZWxkLCB0aGlzLmN1cnJlbnRCbG9jayk7XHJcblxyXG4gICAgICAgIHJldHVybiB0ZW1wRmllbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIE1lcmdlcyBhIGJsb2NrIHdpdGggYSBmaWVsZFxyXG4gICAgICovXHJcbiAgICByZW5kZXJCbG9jayhmaWVsZCwgdGV0cmltaW5vKXtcclxuICAgICAgICB0ZXRyaW1pbm8uc2hhcGUubWFwKGZ1bmN0aW9uKGFyciwgail7XHJcbiAgICAgICAgICAgIGFyci5tYXAoZnVuY3Rpb24odmFsLCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKHZhbCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRbaiArIHRldHJpbWluby55XVtpICsgdGV0cmltaW5vLnggKyAyXSA9IHZhbDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHJvdGF0ZVJpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy50cmFuc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLnJvd1JldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGVMZWZ0KCl7XHJcbiAgICAgICAgdGhpcy50cmFuc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmNvbHVtblJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc3Bvc2UoKXtcclxuICAgICAgICBsZXQgb2xkU2hhcGUgPSB0aGlzLnNoYXBlO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gb2xkU2hhcGVbMF0ubWFwKGZ1bmN0aW9uKGNvbCwgaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2xkU2hhcGUubWFwKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvd1tpXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJvd1JldmVyc2UoKXtcclxuICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5zaGFwZS5tYXAoZnVuY3Rpb24ocm93KXtcclxuICAgICAgICAgICAgcmV0dXJuIHJvdy5yZXZlcnNlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb2x1bW5SZXZlcnNlKCl7XHJcbiAgICAgICAgdGhpcy5zaGFwZS5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUdob3N0KCl7XHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHRoaXMuc2hhcGUubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGhpcy5zaGFwZVt5XS5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNoYXBlW3ldW3hdID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbeV1beF0gPSA5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSUJsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsMCwwLDBdLFxyXG4gICAgICAgICAgICBbMiwyLDIsMl0sXHJcbiAgICAgICAgICAgIFswLDAsMCwwXSxcclxuICAgICAgICAgICAgWzAsMCwwLDBdXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFszLDAsMF0sXHJcbiAgICAgICAgICAgIFszLDMsM10sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbMCwwLDRdLFxyXG4gICAgICAgICAgICBbNCw0LDRdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0Jsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzUsNV0sXHJcbiAgICAgICAgICAgIFs1LDVdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2snO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0Jsb2NrIGV4dGVuZHMgQmxvY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IFtcclxuICAgICAgICAgICAgWzAsNiw2XSxcclxuICAgICAgICAgICAgWzYsNiwwXSxcclxuICAgICAgICAgICAgWzAsMCwwXVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufSIsImltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRCbG9jayBleHRlbmRzIEJsb2Nre1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBbXHJcbiAgICAgICAgICAgIFswLDcsMF0sXHJcbiAgICAgICAgICAgIFs3LDcsN10sXHJcbiAgICAgICAgICAgIFswLDAsMF1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9jayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaQmxvY2sgZXh0ZW5kcyBCbG9ja3tcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXBlID0gW1xyXG4gICAgICAgICAgICBbOCw4LDBdLFxyXG4gICAgICAgICAgICBbMCw4LDhdLFxyXG4gICAgICAgICAgICBbMCwwLDBdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXlmaWVsZCBmcm9tICcuL3BsYXlmaWVsZCc7XHJcbmltcG9ydCB7IGtleXMgfSBmcm9tICcuL2NvbnN0L2tleXMnO1xyXG5cclxuY2xhc3MgVGV0cmlze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmNhbnZhcyAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXRyaXMnKTtcclxuICAgICAgICB0aGlzLmZwcyAgICAgICA9IDYwO1xyXG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gbmV3IFBsYXlmaWVsZCgpO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgICAgID0gMTtcclxuICAgICAgICB0aGlzLmxvb3BDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5nYW1lT3ZlciAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhdXNlICAgICA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGltZW91dCAgID0gMTAwMC90aGlzLmZwcztcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBSZWdpc3RlciBhbGwgbGlzdGVuZXJzLlxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlckxpc3RlbmVycygpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5oYW5kbGVLZXlFdmVudHMoZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJUZXRyaXNHYW1lT3ZlclwiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5lbmRHYW1lKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJUZXRyaXNQYXVzZVwiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5wYXVzZUdhbWUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFBhdXNlcyB0aGUgZ2FtZVxyXG4gICAgICovXHJcbiAgICBwYXVzZUdhbWUoKXtcclxuICAgICAgICBpZighdGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BHYW1lKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdGFydHMgdGhlIGdhbWVsb29wXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0R2FtZSgpe1xyXG4gICAgICAgIGNvbnN0IHNlbGYgICAgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZ2FtZUxvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe3NlbGYubG9vcChzZWxmKX0sIHRoaXMudGltZW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBTdG9wcyB0aGUgZ2FtZWxvb3BcclxuICAgICAqL1xyXG4gICAgc3RvcEdhbWUoKXtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZ2FtZUxvb3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBFbmQncyB0aGUgZ2FtZVxyXG4gICAgICovXHJcbiAgICBlbmRHYW1lKCl7XHJcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBUaGUgZ2FtZSBsb29wIGl0c2VsZi5cclxuICAgICAqL1xyXG4gICAgbG9vcChzZWxmKXtcclxuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xyXG4gICAgICAgIHNlbGYuZHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgVXBkYXRlIGFsbCB2YWx1ZXMgb2YgdGhlIGdhbWUuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGlmKCF0aGlzLmdhbWVPdmVyKXtcclxuICAgICAgICAgICAgdGhpcy5sb29wQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgIGlmKCh0aGlzLmxvb3BDb3VudCAlICgodGhpcy5mcHMgKiAyKSAtICh0aGlzLmxldmVsICogNSkpKSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLm1vdmVDdXJyZW50QmxvY2tEb3duKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBEcmF3IGV2ZXJ5dGhpbmcgdG8gdGhlIHNjcmVlbi5cclxuICAgICAqL1xyXG4gICAgZHJhdygpe1xyXG4gICAgICAgIHZhciBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmdhbWVPdmVyKXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQuZHJhdyhjdHgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdHYW1lT3ZlcihjdHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmF3R2FtZU92ZXIoY3R4KXtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDMwMCwgNjAwKTtcclxuICAgICAgICBjdHguZm9udCA9IFwiMzBweCBBcmlhbFwiO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChcIkdhbWUgT3ZlclwiLCA1MCwgMjUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIFdoZW4gYSBrZXkgaXMgcHJlc3NlZCwgZmlyZSBhIGN1c3RvbSBldmVudCBzbyBkaWZmZXJlbnQgY29tcG9uZW50cyBjYW4gaGFuZGxlXHJcbiAgICAgdGhlIGV2ZW50cyB0aGVtc2VsZi5cclxuICAgICAqL1xyXG4gICAgaGFuZGxlS2V5RXZlbnRzKGUpe1xyXG4gICAgICAgIGxldCBldmVudDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5wYXVzZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaChlLmtleUNvZGUpe1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dVcDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd1VwJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBrZXlzLkFycm93RG93bjpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNBcnJvd0Rvd24nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuQXJyb3dMZWZ0OlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93TGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2Uga2V5cy5BcnJvd1JpZ2h0OlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ1RldHJpc0Fycm93UmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuU3BhY2U6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBFdmVudCgnVGV0cmlzU3BhY2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGtleXMuS2V5UDpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCdUZXRyaXNQYXVzZScpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihldmVudCl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmV3IFRldHJpcygpOyJdfQ==
