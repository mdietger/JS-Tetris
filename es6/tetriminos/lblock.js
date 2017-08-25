import Block from './block';

export default class LBlock extends Block{
    constructor(x, y){
        super(x, y);

        this.shape = [
            [0,0,4],
            [4,4,4],
            [0,0,0]
        ]
    }
}