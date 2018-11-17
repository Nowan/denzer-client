"use strict";

class Scene extends PIXI.Container {
    constructor() {
        super();
        
        this.director = null; // reference to SceneDirector, inserted by himself on scene instantiation.
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
}

export default Scene;