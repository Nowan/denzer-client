"use strict";

import Scene from "../../components/structure/Scene";
import Socket from "../../components/socket/Socket";
import Camera from "../../components/Camera";

import WorldContainer from "./WorldContainer";

class BattlegroundScene extends Scene {
    init(roomData, playerID, socket) {
        this._world = this._createWorld(roomData.map, roomData.players);
        this._camera = this._createCamera(this._world)
        this._avatar = this._world.getActorByID(playerID);
        this._socket = socket;

        this._socket.on(Socket.EVENT.PLAYER_JOIN, this._onPlayerJoin.bind(this));
        this._socket.on(Socket.EVENT.PLAYER_LEAVE, this._onPlayerLeave.bind(this));
        this._socket.on(Socket.EVENT.STATE_RECEIVED, this._onPlayerStateReceived.bind(this));
        this._socket.on(Socket.EVENT.STATE_UPDATE, this._onStateUpdate.bind(this));

        this.input.onKeyDown(["W", "ArrowUp"], () => {
            this._avatar.moveUp();
            this._sendStateChanged();
        });

        this.input.onKeyDown(["A", "ArrowLeft"], () => {
            this._avatar.moveLeft();
            this._sendStateChanged();
        });

        this.input.onKeyDown(["S", "ArrowDown"], () => {
            this._avatar.moveDown();
            this._sendStateChanged();
        });

        this.input.onKeyDown(["D", "ArrowRight"], () => {
            this._avatar.moveRight();
            this._sendStateChanged();
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

    _sendStateChanged() {
        this._socket.emit(Socket.EVENT.STATE_CHANGED, {
            position: {x: this._avatar.x, y: this._avatar.y},
            velocity: {x: this._avatar.body.velocity.x, y: this._avatar.body.velocity.y}
        });
    }

    _onPlayerJoin(playerData) {
        this._world.spawnActor(playerData);
        console.log(playerData[0] + " connected. Spawn on position [" + playerData[1] + ", " + playerData[2] + "].");
    }

    _onPlayerLeave(playerData) {
        this._world.removeActorByID(playerData[0]);
        console.log(playerData[0] + " disconnected");
    }

    _onPlayerStateReceived(playerData) {
        const actor = this._world.getActorByID(playerData[0]);
        actor.body.setPosition(playerData[1], playerData[2]);
        actor.body.setLinearVelocity(playerData[3], playerData[4]);
    }

    _onStateUpdate(data) {
        for (const playerID in data) {
            const playerData = data[playerID];
            const actor = this._world.getActorByID(playerData[0]);
            actor.body.setPosition(playerData[1], playerData[2]);
            actor.body.setLinearVelocity(playerData[3], playerData[4]);
        }
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