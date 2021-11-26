import { Discover } from './demineur.js';

export const imgSize = 25;

const cell = {
    x : 0,
    y : 0,
    type : 0,
    hide : true
}

export const canvas = [];

export function builder(size) {

    for(let i = 0; i < size; i++) {

        canvas[i] = [];

        for(let j = 0; j < size; j++) {

            canvas[i][j] = Object.create(cell);
            canvas[i][j].x = i;
            canvas[i][j].y = j;
        }
    }
}

export function showCanvas() {

    let htmlStr = "";
    let startStr = "<button id=\""
    let midOneStr = "\"><img src=\"./"
    let endStr = ".png\" height=\"" + imgSize + "\" width=\"" + imgSize + "\"></button>";

    for(let i = 0; i < canvas.length; i++) {

        htmlStr += "<div>";

        for(let j = 0; j < canvas[i].length; j++) {
            if (!canvas[i][j].hide) {
                switch(canvas[i][j].type) {

                    case 0 :
                        htmlStr += startStr + i + "-" + j + midOneStr + "0" + endStr;
                        break;
                    case "b" :
                        htmlStr += startStr + i + "-" + j + midOneStr + "Bomb" + endStr;
                        break;
                    case "f" :
                        htmlStr += startStr + i + "-" + j + midOneStr + "Flag" + endStr;
                        break;
                    default :
                    htmlStr += startStr + i + "-" + j + "\"\"><div style=\"font-size:32\">" + canvas[i][j].type + "</div></button>";
                        break;
                }
            }
            else {

                htmlStr += startStr + i + "-" + j + midOneStr + "Square" + endStr;
            }
        }

        htmlStr += "</div>";
    }

    document.getElementById("grid").innerHTML = `${htmlStr}`;
    
    for(let i = 0; i < canvas.length; i++) {
        for(let j = 0; j < canvas[i].length; j++) {

            document.getElementById(i + "-" + j).addEventListener("click", Discover);
        }
    }
}

export function discover(x, y) {

    if (x >= 0 && x < canvas.length && y >= 0 && y < canvas[x].length) {
        if(canvas[x][y].hide && canvas[x][y].type != "b") {

            canvas[x][y].hide = false;

            for (let i = x - 1; i <= x + 1; i++) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (i != x || j != y) {

                        discover(i, j);
                    }
                }
            }
        }
    }
}