import Field from './field';

export default class Holdfield extends Field{
    constructor(){
        super();

        this.canvas = [
            [1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1]
        ];
        this.canHold = true;
        this.blocks = {
            currentBlock: null
        };

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
        this.blocks.currentBlock = e.detail.holdBlock;
        this.blocks.currentBlock.x = 0;
        this.blocks.currentBlock.y = 2;

        while(this.blocks.currentBlock.rotation !== 0){
            this.blocks.currentBlock.rotateLeft();
        }
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

        const event = new CustomEvent('TetrisTransferHoldBlock', {detail: {holdBlock: this.blocks.currentBlock}});

        document.dispatchEvent(event);

        this.canHold = false;
    }
}