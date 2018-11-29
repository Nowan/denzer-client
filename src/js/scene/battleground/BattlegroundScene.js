"use strict";

import Scene from "../../components/structure/Scene";
import Socket from "../../components/socket/Socket";
import Camera from "../../components/Camera";

import WorldContainer from "./WorldContainer";

class BattlegroundScene extends Scene {
    init(mapData, playersData) {
        this._world = this._createWorld(mapData, playersData);
        this._camera = this._createCamera(this._world)
        this._avatar = this._world.getActorByID(this.socket.id);

        this.socket.on(Socket.EVENT.PLAYER_JOIN, this._onPlayerJoin.bind(this));
        this.socket.on(Socket.EVENT.PLAYER_LEAVE, this._onPlayerLeave.bind(this));

        this.input.onKeyDown(["W", "ArrowUp"], () => {
            this._avatar.moveUp();
        });

        this.input.onKeyDown(["A", "ArrowLeft"], () => {
            this._avatar.moveLeft();
        });

        this.input.onKeyDown(["S", "ArrowDown"], () => {
            this._avatar.moveDown();
        });

        this.input.onKeyDown(["D", "ArrowRight"], () => {
            this._avatar.moveRight();
        });

        this._camera.position.set(this._avatar.x, this._avatar.y);
        this.resize(this.renderer.width, this.renderer.height);
    }

    update(dt) {
        this._world.update(dt);
        this._camera.position.set(this._avatar.x, this._avatar.y);
    }

    resize(width, height) {
        this._camera.viewport.width = width;
        this._camera.viewport.height = height;
    }

    _onPlayerJoin(data) {
        this._world.spawnActor(data.player);
        console.log(data.player.id + " connected. Spawn on position [" + data.player.position.x + ", " + data.player.position.y + "].");
    }

    _onPlayerLeave(data) {
        this._world.removeActorByID(data.player.id);
        console.log(data.player.id + " disconnected");
    }

    _createWorld(mapData, playersData) {
        return this.addChild(new WorldContainer(mapData, playersData, this.resources));
    }

    _createCamera(world) {
        const camera = new Camera(world);
        camera.zoom = 0.5;
        return camera;
    }
}

export default BattlegroundScene;