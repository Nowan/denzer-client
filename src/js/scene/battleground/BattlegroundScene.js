"use strict";

import Scene from "../../components/structure/Scene";
import Socket from "../../components/socket/Socket";
import Terrain from "./Terrain";

class BattlegroundScene extends Scene {
    constructor() {
        super();
    }

    init(mapData, playersData) {
        this._terrain = this._createTerrain(mapData.terrain);
        this._playerVisuals = {};

        for (const playerData of playersData) {
            const playerVisual = this._createPlayerVisual();
            playerVisual.position.set(playerData.position.x, playerData.position.y);
            this._playerVisuals[playerData.id] = playerVisual;
        }

        this.socket.on(Socket.EVENT.PLAYER_JOIN, this._onPlayerJoin.bind(this));
        this.socket.on(Socket.EVENT.PLAYER_LEAVE, this._onPlayerLeave.bind(this));

        this.resize(this.renderer.width, this.renderer.height);
    }

    resize(width, height) {
        this.scale.set(Math.max(width / this._terrain.bounds.width, height / this._terrain.bounds.height));
    }

    _onPlayerJoin(data) {
        const playerVisual = this._createPlayerVisual();
        playerVisual.position.set(data.player.position.x, data.player.position.y);
        this._playerVisuals[data.player.id] = playerVisual;

        console.log(data.player.id + " connected. Spawn on position [" + playerVisual.x + ", " + playerVisual.y + "].");
    }

    _onPlayerLeave(data) {
        this.removeChild(this._playerVisuals[data.player.id]);
        delete this._playerVisuals[data.player.id];
        
        console.log(data.player.id + " disconnected");
    }

    _createTerrain(terrainData) {
        return this.addChild(new Terrain(terrainData, this.resources["/assets/images/grassfield.json"]));
    }

    _createPlayerVisual() {
        return this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, 20).endFill());
    }
}

export default BattlegroundScene;