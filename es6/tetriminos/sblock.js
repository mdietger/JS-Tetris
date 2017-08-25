import Block from './block';

export default class SBlock extends Block{
    constructor(x, y){
        super(x, y);

        this.shape = [
            [0,6,6],
            [6,6,0],
            [0,0,0]
        ]
    }
}