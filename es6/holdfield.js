import { colors } from './const/colors';

export default class Holdfield{
    constructor(){
        this.canvas = [
            [1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1]
        ];

        this.currentBlock = null;
        this.canHold = true;
        this.registerListeners();
    }

    /*
     Registers the events and add actions accordingly.
     */
    registerListeners(){
        const self = this;

        document.addEventListener('TetrisNewHoldBlock', function(e){
            self.setBlock(e);
        });

        document.addEventListener('TetrisHold', function(){
            self.sendHoldBlock();
        });

        document.addEventListener('TetrisNewNextBlock', function(){
            self.resetHold();
        })
    }

    /*
     Set the block to a local variable
     */
    setBlock(e){
        this.currentBlock = e.detail.holdBlock;
        this.currentBlock.x = 0;
        this.currentBlock.y = 2;
    }

    /*
     Resets the hold
     */
    resetHold(){
        this.canHold = true;
    }

    /*
     Sends the hold block back to the playfield
     */
    sendHoldBlock(){
        if(!this.canHold){
            return;
        }

        const event = new CustomEvent('TetrisTransferHoldBlock', {detail: {holdBlock: this.currentBlock}});
        document.dispatchEvent(event);
        this.canHold = false
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
     Returns a new playfield with the currentblock and ghostblock merged into them.
     */
    renderTempField(){
        /*
         Create a new derefferenced playfield from the current playfield
         by splicing the row
         */
        let tempField = this.canvas.map(function(arr){
            return arr.slice();
        });

        //Merge the blocks with the playfield
        this.renderBlock(tempField, this.currentBlock);

        return tempField;
    }

    /*
     Merges a block with a field
     */
    renderBlock(field, tetrimino){
        if(!tetrimino){
            return;
        }

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