"use strict";

class ResourceLoader extends PIXI.loaders.Loader {
    constructor(resourceRegistry) {
        super();
    }

    async load(...urls) {
        return new Promise((resolve, reject) => {
            for (const url of urls) {
                // TODO: add only missing from registry resources
                this.add(url);
            }

            this.onError.add(reject);
            
            PIXI.loaders.Loader.prototype.load.call(this, (loader, resources) => {
                // TODO: store resources in registry;
                resolve();
            });
        });
    }
}

export default ResourceLoader;