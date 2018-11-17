import * as PIXI from 'pixi.js';
import * as io from 'socket.io';
import Game from './js/Game';

window.PIXI = PIXI;

window.Socket = function() {
    return io();
}

window.Game = Game;