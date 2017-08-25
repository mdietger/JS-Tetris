import Playfield from './playfield';
import { keys } from './const/keys';

class Tetris{
    constructor(){
        this.canvas    = document.getElementById('tetris');
        this.fps       = 60;
        this.playfield = new Playfield();
        this.level     = 1;
        this.loopCount = 0;

        this.registerListeners();

        const self    = this;
        const timeout = 1000/this.fps;
        this.gameLoop = setInterval(function(){self.loop(self)}, timeout);
    }

    /*
    Register all listeners.
     */
    registerListeners(){
        const self = this;

        document.addEventListener("keydown", function(e){
            e.preventDefault();
            self.handleKeyEvents(e.keyCode);
        });
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

        if((this.loopCount % ((this.fps * 2) - (this.level * 5))) == 0){
            this.playfield.moveCurrentBlockDown();
        }
    }

    /*
    Draw everything to the screen.
     */
    draw(){
        var ctx = this.canvas.getContext("2d");

        this.playfield.draw(ctx);
    }

    /*
    When a key is pressed, fire a custom event so different components can handle
    the events themself.
     */
    handleKeyEvents(keyCode){
        let event;

        switch(keyCode){
            case keys.ArrowUp:
                event = new Event('TetrisArrowUp');
                break;
            case keys.ArrowDown:
                event = new Event('TetrisArrowDown');
                break;
            case keys.ArrowLeft:
                event = new Event('TetrisArrowLeft');
                break;
            case keys.ArrowRight:
                event = new Event('TetrisArrowRight');
                break;
            case keys.Space:
                event = new Event('TetrisSpace');
                break;
        }

        if(event){
            document.dispatchEvent(event);
        }
    }
}

new Tetris();