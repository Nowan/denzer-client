"use strict";

import Scene from "../../components/scene/Scene";
import Socket from "../../components/socket/Socket";

class BattlegroundScene extends Scene {
    constructor() {
        super();
    }

    init() {
        const circs = {};

        this.socket.on(Socket.EVENT.PLAYER_JOIN, (data) => {
            const pos = new PIXI.Point(Math.random() * this.renderer.width, Math.random() * this.renderer.height);
            circs[data.playerId] = this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(pos.x, pos.y, 20));
            console.log(data.playerId + " connected");
        });

        this.socket.on(Socket.EVENT.PLAYER_LEAVE, (data) => {
            this.removeChild(circs[data.playerId]);
            delete circs[data.playerId];
            console.log(data.playerId + " disconnected");
        });
    }
}

export default BattlegroundScene;