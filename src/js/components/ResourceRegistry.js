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
                if (resource.spritesheet) {
                    return resource.spritesheet;
                }
                else {
                    return resource.texture;
                }
            case PIXI.loaders.Resource.TYPE.AUDIO:
                return resource;
            case PIXI.loaders.Resource.TYPE.VIDEO:
                return resource;
            case PIXI.loaders.Resource.TYPE.JSON:
                return resource;
            case PIXI.loaders.Resource.TYPE.XML:
                return resource;
            case PIXI.loaders.Resource.TYPE.TEXT:
                return resource;
            default:
                return resource;
        }
    }
}

export default ResourceRegistry;