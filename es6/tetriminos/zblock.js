import Block from './block';

export default class ZBlock extends Block{
    constructor(x, y){
        super(x, y);

        this.shape = [
            [8,8,0],
            [0,8,8],
            [0,0,0]
        ]
    }
}