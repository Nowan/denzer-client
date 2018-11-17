"use strict";

class ResourceLoader extends PIXI.loaders.Loader {
    constructor(resourceRegistry) {
        super();

        this._resourceRegistry = resourceRegistry;
    }

    async load(...urls) {
        return new Promise((resolve, reject) => {
            for (const url of urls) {
                if (!this._resourceRegistry.contains(url)) {
                    this.add(url);
                }
            }

            this.onError.add(reject);
            
            PIXI.loaders.Loader.prototype.load.call(this, (loader, resources) => {
                for (const alias in resources) {
                    if (resources.hasOwnProperty(alias)) {
                        this._resourceRegistry.store(alias, resources[alias]);
                    }
                }
                resolve();
            });
        });
    }
}

export default ResourceLoader;