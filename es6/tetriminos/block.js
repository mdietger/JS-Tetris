export default class Block{
    constructor(x, y){
        this.x        = x;
        this.y        = y;
        this.rotation = 0;
    }

    rotateRight(){
        this.transpose();
        this.rowReverse();

        this.rotation++;
        if(this.rotation > 3){
            this.rotation = 0;
        }
    }

    rotateLeft(){
        this.transpose();
        this.columnReverse();

        this.rotation--;
        if(this.rotation < 0){
            this.rotation = 3;
        }
    }

    transpose(){
        let oldShape = this.shape;

        this.shape = oldShape[0].map(function(col, i) {
            return oldShape.map(function(row) {
                return row[i]
            })
        });
    }

    rowReverse(){
        this.shape = this.shape.map(function(row){
            return row.reverse();
        })
    }

    columnReverse(){
        this.shape.reverse();
    }

    makeGhost(){
        for(let y = 0; y < this.shape.length; y++){
            for(let x = 0; x < this.shape[y].length; x++){
                if(this.shape[y][x] == 0){
                    continue;
                }

                this.shape[y][x] = 9;
            }
        }
    }
}