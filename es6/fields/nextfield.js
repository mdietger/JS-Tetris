import Field from './field';

export default class Nextfield extends Field{
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

        document.addEventListener('TetrisNewNextBlock', function(e){
            self.setBlock(e);
        });
    }

    /*
     Set the block to a local variable
     */
    setBlock(e){
        const blockType = e.detail.nextBlock;

        this.blocks.currentBlock = new blockType(0, 2);
    }
}