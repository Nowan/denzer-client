"use strict";

import ResourceRegistry from "./components/ResourceRegistry";
import ResourceLoader from "./components/ResourceLoader";
import SceneDirector from "./components/SceneDirector";
import Socket from "./components/socket/Socket";

import BootScene from "./scene/boot/BootScene";
import BattlegroundScene from "./scene/battleground/BattlegroundScene";

class Game extends PIXI.Application {
    constructor(canvas) {
        super({ width: canvas.width, height: canvas.height, view: canvas });

        this._resources = new ResourceRegistry();
        this._loader = new ResourceLoader(this._resources);
        this._sceneDirector = new SceneDirector(this.stage);
        this._socket = new Socket();

        this._setUpSceneDecorator();
        this._registerScenes();

        this._socket.on(Socket.EVENT.CONNECTION_ESTABLISHED, () => {
            this._sceneDirector.goTo("Boot");
        });
    }

    refresh() {
        this.renderer.resize(this.view.width, this.view.height);
        this._sceneDirector.resize(this.renderer.width, this.renderer.height);
    }

    _registerScenes() {
        this._sceneDirector.register("Boot", BootScene);
        this._sceneDirector.register("Battleground", BattlegroundScene);
    }

    _setUpSceneDecorator() {
        const game = this;
        this._sceneDirector.on("sceneCreate", (scene) => {
            Object.defineProperty(scene, "renderer", {get: () => {return game.renderer}});
            Object.defineProperty(scene, "resources", {get: () => {return game._resources}});
            Object.defineProperty(scene, "loader", {get: () => {return game._loader}});
            Object.defineProperty(scene, "director", {get: () => {return game._sceneDirector}});
            Object.defineProperty(scene, "socket", {get: () => {return game._socket}});
        });
    }
}

export default Game;