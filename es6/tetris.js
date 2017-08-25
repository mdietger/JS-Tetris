import Playfield from './playfield';
import { keys } from './const/keys';

class Tetris{
    constructor(){
        this.selectors = {
            tetris: 'tetris',
            score : 'score',
            rows  : 'rows',
            level : 'level'
        };
        this.canvas    = document.getElementById(this.selectors.tetris);
        this.fps       = 60;
        this.playfield = new Playfield();
        this.level     = 1;
        this.rows      = 0;
        this.score     = 0;
        this.loopCount = 0;
        this.gameOver  = false;
        this.pause     = false;
        this.timeout   = 1000/this.fps;

        this.registerListeners();
        this.startGame();
    }

    /*
     Register all listeners.
     */
    registerListeners(){
        const self = this;

        document.addEventListener("keydown", function(e){
            self.handleKeyEvents(e);
        });

        document.addEventListener("TetrisGameOver", function(e){
            self.endGame();
        });

        document.addEventListener("TetrisPause", function(e){
            self.pauseGame();
        });

        document.addEventListener("TetrisRowsCleared", function(e){
            self.updateScores(e);
        })
    }

    /*
     Pauses the game
     */
    pauseGame(){
        if(!this.pause){
            this.pause = true;
            this.stopGame();
        }else{
            this.pause = false;
            this.startGame();
        }
    }

    /*
     Starts the gameloop
     */
    startGame(){
        const self    = this;
        this.gameLoop = setInterval(function(){self.loop(self)}, this.timeout);
    }

    /*
     Stops the gameloop
     */
    stopGame(){
        clearInterval(this.gameLoop);
    }

    /*
     End's the game
     */
    endGame(){
        this.gameOver = true;
    }

    /*
     Update the visual scores
     */
    updateScores(e){
        const clearedRows = e.detail.clearedRows;
        this.rows += clearedRows;
        this.score += Math.floor(50 * Math.pow(1.1, clearedRows) * clearedRows);
        this.level = Math.floor(this.score / 10000) + 1;
    }

    /*
     The game loop itself.
     */
    loop(self){
        self.update();
        self.draw();
    }

    /*
     Update all values of the game.
     */
    update(){
        if(!this.gameOver){
            this.loopCount++;

            if((this.loopCount % ((this.fps * 2) - (this.level * 5))) == 0){
                this.playfield.moveCurrentBlockDown();
            }
        }
    }

    /*
     Draw everything to the screen.
     */
    draw(){
        const ctx = this.canvas.getContext("2d");

        if(!this.gameOver){
            this.playfield.draw(ctx);
        }else{
            this.drawGameOver(ctx);
        }

        document.getElementById(this.selectors.score).innerText = this.score;
        document.getElementById(this.selectors.rows).innerText  = this.rows;
        document.getElementById(this.selectors.level).innerText = this.level;
    }

    drawGameOver(ctx){
        ctx.clearRect(0, 0, 300, 600);
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 50, 250);
    }

    /*
     When a key is pressed, fire a custom event so different components can handle
     the events themself.
     */
    handleKeyEvents(e){
        let event;

        if(this.pause){
            return;
        }

        switch(e.keyCode){
            case keys.ArrowUp:
                e.preventDefault();
                event = new Event('TetrisArrowUp');
                break;
            case keys.ArrowDown:
                e.preventDefault();
                event = new Event('TetrisArrowDown');
                break;
            case keys.ArrowLeft:
                e.preventDefault();
                event = new Event('TetrisArrowLeft');
                break;
            case keys.ArrowRight:
                e.preventDefault();
                event = new Event('TetrisArrowRight');
                break;
            case keys.Space:
                e.preventDefault();
                event = new Event('TetrisSpace');
                break;
            case keys.KeyP:
                e.preventDefault();
                event = new Event('TetrisPause');
                break;
        }

        if(event){
            document.dispatchEvent(event);
        }
    }
}

new Tetris();