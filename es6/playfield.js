import { colors } from './const/colors';
import IBlock from './tetriminos/iblock';
import JBlock from './tetriminos/jblock';
import LBlock from './tetriminos/lblock';
import OBlock from './tetriminos/oblock';
import SBlock from './tetriminos/sblock';
import TBlock from './tetriminos/tblock';
import ZBlock from './tetriminos/zblock';
import Block from './tetriminos/block';

export default class Playfield{
    constructor(){
        this.playfield = [
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
    generateNewBag(){
        this.bag = [IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock];
        this.shuffleBag();
    }

    /*
     Takes the first block from the bag and assign it to the current block.
     If the bag is empty, generate a new one.
     */
    newBlockFromBag(){
        if(this.bag.length == 0){
            this.generateNewBag();
        }

        const blockType = this.bag.shift();
        this.currentBlock = new blockType(3, 0);
        this.updateGhostBlock();

        if(this.checkCollision(this.currentBlock)){
            const event = new Event('TetrisGameOver');
            document.dispatchEvent(event);
        }
    }

    /*
     Shuffles the tertriminos
     */
    shuffleBag(){
        for (let i = this.bag.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [this.bag[i - 1], this.bag[j]] = [this.bag[j], this.bag[i - 1]];
        }
    }

    /*
     Moves the current block to the right. If collision is detected
     restore it's old position.
     */
    moveCurrentBlockRight(){
        this.currentBlock.x += 1;

        if(this.checkCollision(this.currentBlock)){
            this.currentBlock.x -= 1;
        }

        this.updateGhostBlock();
    }

    /*
     Moves the current block to the left. If collision is detected
     restore it's old position.
     */
    moveCurrentBlockLeft(){
        this.currentBlock.x -= 1;

        if(this.checkCollision(this.currentBlock)){
            this.currentBlock.x += 1;
        }

        this.updateGhostBlock();
    }

    /*
     Moves the current block downwards. If collision is detected
     restore it's old position and save it to the playfield.
     Check if any lines are formed and created a new block.
     */
    moveCurrentBlockDown(){
        this.currentBlock.y += 1;

        if(this.checkCollision(this.currentBlock)){
            this.currentBlock.y -= 1;

            this.saveBlock();
            this.checkLines();
            this.newBlockFromBag();

            return false;
        }

        return true;
    }

    rotateCurrentBlock(){
        this.currentBlock.rotateRight();

        if(this.checkCollision(this.currentBlock)){
            this.currentBlock.rotateLeft();
        }

        this.updateGhostBlock();
    }

    /*
     Stores the currentblock into the playfield.
     */
    saveBlock(){
        this.playfield = this.renderTempField();
    }

    /*
     Check if there are new lines formed.
     */
    checkLines(){
        for(let y = 0; y < this.playfield.length; y++){
            let sumRow = 0;

            for(let x = 0; x < this.playfield[y].length; x++){
                //If the row contains a 0, skip the row
                if(this.playfield[y][x] == 0){
                    sumRow = 0;
                    break;
                }

                sumRow += this.playfield[y][x];
            }

            //If the sum of the row is higher than 14, it means a block is present since it's bigger than 1,1,1,1,1,1,1,1,1,1,1,1,1,1
            if(sumRow > 14){
                this.playfield.splice(y, 1);
                this.addNewRow();
            }
        }
    }

    /*
     Adds a new row on top of the playfield.
     */
    addNewRow(){
        this.playfield.unshift([1,1,0,0,0,0,0,0,0,0,0,0,1,1]);
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

        this.ghostBlock = new Block(this.currentBlock.x, this.currentBlock.y);
        //Because the shape is a multi-dimensional array we need to derefference it when copying.
        this.ghostBlock.shape = this.currentBlock.shape.map(function(row){
            return row.slice();
        });
        this.ghostBlock.makeGhost();

        do{
            this.ghostBlock.y += 1;

            colission = this.checkCollision(this.ghostBlock);
            if(colission){
                this.ghostBlock.y -= 1;
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
                    if(block.shape[y][x] !== 0 && this.playfield[y + block.y][x + block.x + 2] !== 0){
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
    draw(ctx){
        const tempField = this.renderTempField();

        tempField.map(function(val, y){
            val.map(function(val, x){
                ctx.fillStyle = colors[val];
                ctx.fillRect(x*20, y*20, 20, 20);
            })
        });
    }

    /*
     Registers the events and add actions accordingly.
     */
    registerListeners(){
        const self = this;

        document.addEventListener('TetrisArrowLeft', function(e){
            self.moveCurrentBlockLeft();
        });

        document.addEventListener('TetrisArrowRight', function(e){
            self.moveCurrentBlockRight();
        });

        document.addEventListener('TetrisArrowUp', function(e){
            self.rotateCurrentBlock();
        });

        document.addEventListener('TetrisArrowDown', function(e){
            self.moveCurrentBlockDown();
        });

        document.addEventListener('TetrisSpace', function(e){
            self.dropBlock();
        })
    }

    /*
     Returns a new playfield with the currentblock and ghostblock merged into them.
     */
    renderTempField(){
        /*
         Create a new derefferenced playfield from the current playfield
         by splicing the row
         */
        let tempField = this.playfield.map(function(arr){
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
    renderBlock(field, tetrimino){
        tetrimino.shape.map(function(arr, j){
            arr.map(function(val, i){
                if(val == 0){
                    return;
                }

                field[j + tetrimino.y][i + tetrimino.x + 2] = val;
            })
        });
    }
}