import * as PIXI from 'pixi.js';
import * as io from 'socket.io';
import Game from './js/Game';
import GameStyle from './css/game.scss';

window.PIXI = PIXI;

window.Socket = function() {
    return io();
}

window.Game = Game;