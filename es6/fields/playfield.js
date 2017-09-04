import IBlock from '../tetriminos/iblock';
import JBlock from '../tetriminos/jblock';
import LBlock from '../tetriminos/lblock';
import OBlock from '../tetriminos/oblock';
import SBlock from '../tetriminos/sblock';
import TBlock from '../tetriminos/tblock';
import ZBlock from '../tetriminos/zblock';
import Block from '../tetriminos/block';
import Field from './field';

export default class Playfield extends Field{
    constructor(){
        super();

        this.canvas = [
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ];
        this.bag = [];
        this.blocks = {
            ghostBlock  : null,
            currentBlock: null
        };

        this.registerListeners();
        this.generateNewBag(true);
        this.newBlockFromBag();
    }

    /*
     Generates a new random bag of 7 tetriminos.
     https://tetris.wiki/Random_Generator
     */
    generateNewBag(fromConstructor){
        this.bag = [IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock];
        this.shuffleBag(fromConstructor);
    }

    /*
     Takes the first block from the bag and assign it to the current block.
     If the bag is empty, generate a new one.
     */
    newBlockFromBag(){
        const blockType = this.bag.shift();

        this.blocks.currentBlock = new blockType(3, 0);
        this.updateGhostBlock();

        if(this.bag.length === 0){
            this.generateNewBag(false);
        }

        const event = new CustomEvent('TetrisNewNextBlock', {detail: {nextBlock: this.bag[0]}});
        document.dispatchEvent(event);

        if(this.checkCollision(this.blocks.currentBlock)){
            const event = new Event('TetrisGameOver');
            document.dispatchEvent(event);
        }
    }

    /*
     Shuffles the tertriminos
     */
    shuffleBag(firstBag){
        for (let i = this.bag.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [this.bag[i - 1], this.bag[j]] = [this.bag[j], this.bag[i - 1]];
        }

        if(firstBag){
            if(this.bag[0] == SBlock || this.bag[0] == ZBlock || this.bag[0] == OBlock){
                this.shuffleBag(true);
            }
        }
    }

    /*
    Move the current block to hold
     */
    holdBlock(e){
        const event = new CustomEvent('TetrisNewHoldBlock', {detail: {holdBlock: this.blocks.currentBlock}});

        document.dispatchEvent(event);

        if(!e.detail.holdBlock){
            this.newBlockFromBag()
        }else{
            this.blocks.currentBlock   = e.detail.holdBlock;
            this.blocks.currentBlock.x = 3;
            this.blocks.currentBlock.y = 0;
            this.updateGhostBlock();
        }
    }

    /*
     Moves the current block to the right. If collision is detected
     restore it's old position.
     */
    moveCurrentBlockRight(){
        this.blocks.currentBlock.x++;

        if(this.checkCollision(this.blocks.currentBlock)){
            this.blocks.currentBlock.x--;
        }

        this.updateGhostBlock();
    }

    /*
     Moves the current block to the left. If collision is detected
     restore it's old position.
     */
    moveCurrentBlockLeft(){
        this.blocks.currentBlock.x--;

        if(this.checkCollision(this.blocks.currentBlock)){
            this.blocks.currentBlock.x++;
        }

        this.updateGhostBlock();
    }

    /*
     Moves the current block downwards. If collision is detected
     restore it's old position and save it to the playfield.
     Check if any lines are formed and created a new block.
     */
    moveCurrentBlockDown(){
        this.blocks.currentBlock.y++;

        if(this.checkCollision(this.blocks.currentBlock)){
            this.blocks.currentBlock.y--;

            this.saveBlock();
            this.checkLines();
            this.newBlockFromBag();

            return false;
        }

        return true;
    }

    rotateCurrentBlock(){
        this.blocks.currentBlock.rotateRight();

        if(this.checkCollision(this.blocks.currentBlock)){
            this.blocks.currentBlock.rotateLeft();
        }

        this.updateGhostBlock();
    }

    /*
     Stores the currentblock into the playfield.
     */
    saveBlock(){
        this.canvas = this.renderTempField();
    }

    /*
     Check if there are new lines formed.
     */
    checkLines(){
        let clearedRows = 0;

        for(let y = 0; y < this.canvas.length; y++){
            let sumRow = 0;

            for(let x = 0; x < this.canvas[y].length; x++){
                //If the row contains a 0, skip the row
                if(this.canvas[y][x] == 0){
                    sumRow = 0;
                    break;
                }

                sumRow += this.canvas[y][x];
            }

            //If the sum of the row is higher than 14, it means a block is present since it's bigger than 1,1,1,1,1,1,1,1,1,1,1,1,1,1
            if(sumRow > 14){
                this.canvas.splice(y, 1);
                this.addNewRow();

                clearedRows++;
            }
        }

        if(clearedRows > 0){
            const event = new CustomEvent('TetrisRowsCleared', {detail: {clearedRows: clearedRows}});

            document.dispatchEvent(event);
        }
    }

    /*
     Adds a new row on top of the playfield.
     */
    addNewRow(){
        this.canvas.unshift([1,1,0,0,0,0,0,0,0,0,0,0,1,1]);
    }

    /*
     Lowers the currentblock until there is collision detected.
     */
    dropBlock(){
        let result;

        do{
            result = this.moveCurrentBlockDown()
        }while(result);
    }

    /*
     Clones the currentblock in position and shape. Give it a gray color and
     lower it until collision is detected.
     */
    updateGhostBlock(){
        let colission = false;

        this.blocks.ghostBlock       = new Block(this.blocks.currentBlock.x, this.blocks.currentBlock.y);
        //Because the shape is a multi-dimensional array we need to derefference it when copying.
        this.blocks.ghostBlock.shape = this.blocks.currentBlock.shape.map(function(row){
            return row.slice();
        });
        this.blocks.ghostBlock.makeGhost();

        do{
            this.blocks.ghostBlock.y += 1;

            colission = this.checkCollision(this.blocks.ghostBlock);
            if(colission){
                this.blocks.ghostBlock.y -= 1;
            }
        }while(!colission);
    }

    /*
     Check if there is collision.
     */
    checkCollision(block){
        let collision = false;

        loop1:
            for(let y = 0; y < block.shape.length; y++){
                for(let x = 0; x < block.shape[y].length; x++){
                    //When the value of the block is not 0 and on that place in the playfield the value
                    //of the playfield is also not 0, we have collision.
                    if(block.shape[y][x] !== 0 && this.canvas[y + block.y][x + block.x + 2] !== 0){
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
    registerListeners(){
        const self = this;

        document.addEventListener('TetrisArrowLeft', function(){
            self.moveCurrentBlockLeft();
        });

        document.addEventListener('TetrisArrowRight', function(){
            self.moveCurrentBlockRight();
        });

        document.addEventListener('TetrisArrowUp', function(){
            self.rotateCurrentBlock();
        });

        document.addEventListener('TetrisArrowDown', function(){
            self.moveCurrentBlockDown();
        });

        document.addEventListener('TetrisSpace', function(){
            self.dropBlock();
        });

        document.addEventListener('TetrisTransferHoldBlock', function(e){
            self.holdBlock(e);
        });
    }
}