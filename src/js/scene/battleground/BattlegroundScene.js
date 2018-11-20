"use strict";

import Scene from "../../components/structure/Scene";
import Socket from "../../components/socket/Socket";
import Terrain from "./Terrain";

class BattlegroundScene extends Scene {
    constructor() {
        super();
    }

    init(mapData) {
        this._terrain = this._createTerrain(mapData.terrain);

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

        this.resize(this.renderer.width, this.renderer.height);
    }

    resize(width, height) {
        this._terrain.scale.set(Math.max(width / this._terrain.bounds.width, height / this._terrain.bounds.height));
    }

    _createTerrain(terrainData) {
        return this.addChild(new Terrain(terrainData, this.resources["/assets/images/grassfield.json"]));
    }
}

export default BattlegroundScene;