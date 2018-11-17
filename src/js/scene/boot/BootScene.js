"use strict";

import Scene from "../../components/Scene";

class BootScene extends Scene {
    constructor() {
        super();
    }

    async load() {
        return new Promise((resolve, reject) => {
            // TODO: implement assets loading
            resolve();
        });
    }

    init() {
        console.log("init scene");
        this.director.goTo("Battleground");
    }

    destroy() {
        console.log("destroy scene");
    }
}

export default BootScene;