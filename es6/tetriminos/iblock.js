import Block from './block';

export default class IBlock extends Block{
    constructor(x, y){
        super(x, y);

        this.shape = [
            [0,0,0,0],
            [2,2,2,2],
            [0,0,0,0],
            [0,0,0,0]
        ];
    }
}