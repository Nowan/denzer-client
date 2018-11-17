"use strict";

import ResourceRegistry from "./components/ResourceRegistry";
import ResourceLoader from "./components/ResourceLoader";

import SceneDirector from "./components/scene/SceneDirector";
import BootScene from "./scene/boot/BootScene";
import BattlegroundScene from "./scene/battleground/BattlegroundScene";

class Game extends PIXI.Application {
    constructor() {
        super({ width: 800, height: 600 });

        this._resources = new ResourceRegistry();
        this._loader = new ResourceLoader(this._resources);
        this._sceneDirector = new SceneDirector(this.stage);

        const game = this;
        this._sceneDirector.onSceneCreate = (scene) => {
            Object.defineProperty(scene, "resources", {get: () => {return game._resources}});
            Object.defineProperty(scene, "loader", {get: () => {return game._loader}});
            Object.defineProperty(scene, "director", {get: () => {return game._sceneDirector}});
        };
    }

    init() {
        this._sceneDirector.register("Boot", BootScene);
        this._sceneDirector.register("Battleground", BattlegroundScene);
        
        this._sceneDirector.goTo("Boot");
    }

    getCanvas() {
        return this.view;
    }
}

export default Game;