"use strict";

import EventDispatcher from "./structure/EventDispatcher";

class SceneDirector {
    constructor(stage) {
        this._stage = stage;
        this._sceneConstructors = {};
        this._activeScene = null;
        this._nextScene = null;
    }

    register(alias, SceneConstructor) {
        this._sceneConstructors[alias] = SceneConstructor;
    }

    goTo(alias, args) {
        const Scene = this._sceneConstructors[alias];
        if (Scene) {
            const scene = new Scene();
            this.emit("sceneCreate", [scene]);

            const director = this;
            scene.load().then(() => { 
                if (director._activeScene) {
                    director._activeScene.destroy();
                    director._stage.removeChild(director._activeScene);
                }

                scene.init.apply(scene, args);
                director._stage.addChild(scene);
                director._activeScene = scene;
            });
        }
        else {
            console.error("Scene alias \"" + alias + "\" is not registered.")
        }
    }

    resize(width, height) {
        if (this._activeScene) {
            this._activeScene.resize(width, height);
        }
    }
}

EventDispatcher.embedInto(SceneDirector);

export default SceneDirector;