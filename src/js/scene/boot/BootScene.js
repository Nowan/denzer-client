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
        this.director.goTo("Battleground");
    }
}

export default BootScene;