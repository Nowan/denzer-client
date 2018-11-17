"use strict";

import SceneDirector from "./components/SceneDirector";
import BootScene from "./scene/boot/BootScene";
import BattlegroundScene from "./scene/battleground/BattlegroundScene";

class Game extends PIXI.Application {
    constructor() {
        super({ width: 800, height: 600 });
        
        this._sceneDirector = new SceneDirector(this.stage);
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