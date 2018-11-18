"use strict";

class Scene extends PIXI.Container {
    constructor() {
        super();
        
        // References inserted to scene immediately after its creation
        this.renderer = null; // PIXI renderer
        this.resources = null; // ResourceRegistry
        this.loader = null; // ResourceLoader
        this.director = null; // SceneDirector
    }

    async load() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    init() {
        
    }

    destroy() {

    }

    resize(width, height) {

    }
}

export default Scene;