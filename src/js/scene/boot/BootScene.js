"use strict";

import Scene from "../../components/Scene";

class BootScene extends Scene {
    constructor() {
        super();
    }

    async load() {
        return new Promise((resolve, reject) => {
            PIXI.loader.add("/assets/images/shaman.jpg");
            PIXI.loader.add("/assets/images/barbarian.jpg");
            PIXI.loader.add("/assets/images/dwarf.jpg");
            PIXI.loader.add("/assets/images/ninja.jpg");
            PIXI.loader.load();

            PIXI.loader.onComplete.add(resolve);
            PIXI.loader.onError.add(reject);
        });
    }

    init() {
        this.addChild(new PIXI.Sprite.fromImage("/assets/images/barbarian.jpg"));
    }
}

export default BootScene;