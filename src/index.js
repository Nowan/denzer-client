import * as PIXI from 'pixi.js';
import * as io from 'socket.io';

window.PIXI = PIXI;

window.Socket = function() {
    return io();
}