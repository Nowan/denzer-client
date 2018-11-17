"use strict";

class SceneDirector {
    constructor(stage) {
        this._stage = stage;
        this._sceneConstructors = {};
        this._activeScene = null;
    }

    register(alias, SceneConstructor) {
        this._sceneConstructors[alias] = SceneConstructor;
    }

    goTo(alias) {
        const Scene = this._sceneConstructors[alias];
        if (Scene) {
            const scene = new Scene();
            const director = this;

            Object.defineProperty(scene, "director", {get: () => {return director}});

            scene.load().then(() => { 
                if (director._activeScene) {
                    director._activeScene.destroy();
                    director._stage.removeChild(director._activeScene);
                }

                scene.init();
                director._stage.addChild(scene);
                director._activeScene = scene;
            });
        }
        else {
            console.error("Scene alias \"" + alias + "\" is not registered.")
        }
    }
}

export default SceneDirector;