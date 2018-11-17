"use strict";

class ResourceRegistry {
    constructor() {

    }
    
    store(alias, resource) {
        if (resource.isImage) {
            this[alias] = resource.texture;
        }
    }

    contains(alias) {
        return !!this[alias];
    }
}

export default ResourceRegistry;