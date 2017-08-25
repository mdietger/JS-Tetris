import Block from './block';

export default class TBlock extends Block{
    constructor(x, y){
        super(x, y);

        this.shape = [
            [0,7,0],
            [7,7,7],
            [0,0,0]
        ]
    }
}