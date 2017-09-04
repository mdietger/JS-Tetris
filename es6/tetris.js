import Playfield from './fields/playfield';
import Holdfield from './fields/holdfield';
import Nextfield from './fields/nextfield';
import { keys } from './const/keys';

class Tetris{
    constructor(){
        this.selectors = {
            tetris: 'tetris',
            score : 'score',
            rows  : 'rows',
            level : 'level',
            hold  : 'hold',
            next  : 'next',
            time  : 'time'
        };
        this.tetrisCnvs= document.getElementById(this.selectors.tetris);
        this.holdCnvs  = document.getElementById(this.selectors.hold);
        this.nextCnvs  = document.getElementById(this.selectors.next);
        this.holdfield = new Holdfield();
        this.nextfield = new Nextfield();
        this.playfield = new Playfield();
        this.fps       = 50;
        this.level     = 1;
        this.rows      = 0;
        this.score     = 0;
        this.loopCount = 0;
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

        document.addEventListener("TetrisGameOver", function(){
            self.gameOver();
        });

        document.addEventListener("TetrisPause", function(){
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
            this.drawText("Pause");
        }else{
            this.pause = false;

            this.startGame();
        }
    }

    /*
     Starts the gameloop
     */
    startGame(){
        const self = this;

        this.gameLoop = setInterval(function(){
            self.loop(self)
        }, this.timeout);
    }

    /*
     Stops the gameloop
     */
    stopGame(){
        clearInterval(this.gameLoop);
    }

    /*
     Handles the game over
     */
    gameOver(){
        this.stopGame();
        this.drawText("Game Over");
    }

    /*
     Update the visual scores
     */
    updateScores(e){
        const clearedRows = e.detail.clearedRows;

        this.rows  += clearedRows;
        this.score += Math.floor(50 * Math.pow(1.1, clearedRows) * clearedRows);
        this.level  = Math.floor(this.rows / 20) + 1;

        if(this.level > 9){
            this.level = 9;
        }
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
        this.loopCount++;

        if((this.loopCount % ((this.fps * 2) - (this.level * 10))) === 0){
            this.playfield.moveCurrentBlockDown();
        }
    }

    /*
     Draw everything to the screen.
     */
    draw(){
        const tetrisCtx = this.tetrisCnvs.getContext("2d");
        const holdCtx   = this.holdCnvs.getContext("2d");
        const nextCtx   = this.nextCnvs.getContext("2d");

        this.playfield.draw(tetrisCtx);
        this.holdfield.draw(holdCtx);
        this.nextfield.draw(nextCtx);

        document.getElementById(this.selectors.score).innerText = this.score;
        document.getElementById(this.selectors.rows).innerText  = this.rows;
        document.getElementById(this.selectors.level).innerText = this.level;
        document.getElementById(this.selectors.time).innerText  = this.getTime();
    }

    /*
     Writes text on the main canvas
     */
    drawText(text){
        const ctx = this.tetrisCnvs.getContext("2d");

        ctx.font      = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

        ctx.fillRect(0, 0, 300, 600);

        ctx.fillStyle = "#666666";

        ctx.fillText(text, 150, 250);
    }

    /*
    Returns a time string
     */
    getTime(){
        return new Date(Math.floor(this.loopCount / this.fps) * 1000).toISOString().substr(11, 8);
    }

    /*
     When a key is pressed, fire a custom event so different components can handle
     the events themself.
     */
    handleKeyEvents(e){
        let event;

        if(this.pause && e.keyCode !== keys.KeyP){
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
            case keys.KeyH:
                e.preventDefault();
                event = new Event('TetrisHold');
                break;
        }

        if(event){
            document.dispatchEvent(event);
        }
    }
}

new Tetris();