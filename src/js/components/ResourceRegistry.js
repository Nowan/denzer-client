"use strict";

class ResourceRegistry {
    constructor() {

    }
    
    store(alias, resource) {
        this[alias] = this._parseResource(resource);
    }

    contains(alias) {
        return !!this[alias];
    }

    _parseResource(resource) {
        switch (resource.type) {
            case PIXI.loaders.Resource.TYPE.IMAGE:
                return resource.texture;
        }
    }
}

export default ResourceRegistry;