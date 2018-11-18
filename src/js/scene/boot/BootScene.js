"use strict";

import Scene from "../../components/scene/Scene";

class BootScene extends Scene {
    constructor() {
        super();
    }

    async load() {
        await this.loader.load(
            "/assets/images/shaman.jpg", 
            "/assets/images/barbarian.jpg", 
            "/assets/images/dwarf.jpg", 
            "/assets/images/ninja.jpg"
        );
    }

    init() {
        this._sprite = new PIXI.Sprite(this.resources["/assets/images/shaman.jpg"]);
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(this.renderer.width * 0.5, this.renderer.height * 0.5);
        this.addChild(this._sprite);
    }

    resize(width, height) {
        this._sprite.position.set(width * 0.5, height * 0.5);
    }
}

export default BootScene;