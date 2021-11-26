import { clock } from './timer.js'
import { canvas, discover, builder, showCanvas } from './canvas.js'

const cellNb = 10;
const bombNb = 4;

export function Discover(e) {
    
    let id = e.target.parentElement.id;
    let tab = id.split("-");

    if(clock.timerInterval == null) {
        clock.startTimer();
    }

    discover(tab[0], tab[1]);
    showCanvas();
}

function placeBombs() {

    let x = 0;
    let y = 0;

    for(let i = 0; i < bombNb; i++) {

        do {
        x = Math.floor(Math.random() * cellNb);
        y = Math.floor(Math.random() * cellNb);
            
        } while(canvas[x][y].type == "b");

        canvas[x][y].type = "b";
        givePlus(x, y);
    }
}

function givePlus(x, y) {

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < canvas.length && j >= 0 && j < canvas[x].length && (i != x || j != y)) {
                if (canvas[i][j].type != "f" && canvas[i][j].type != "b") {
                    
                    canvas[i][j].type++;
                    console.log(x + " " + y);
                }
            }
        }
    }
}

builder(cellNb);
showCanvas();
placeBombs();
