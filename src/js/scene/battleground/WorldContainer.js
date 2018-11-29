"use strict";

import Terrain from "./Terrain";
import Vehicle from "./actors/Vehicle";

class WorldContainer extends PIXI.Container {
    constructor(mapData, playersData, resources) {
        super();

        this._terrain = this._createTerrain(mapData.terrain, resources);
        this._actors = this._createActors(playersData);
    }

    getActorByID(actorID) {
        return this._actors[actorID];
    }

    spawnActor(playerData) {
        const vehicle = this._createVehicle();
        vehicle.position.set(playerData.position.x, playerData.position.y);
        this._actors[playerData.id] = vehicle;
    }

    removeActorByID(actorID) {
        this.removeChild(this._actors[actorID]);
        delete this._actors[actorID];
    }

    _createTerrain(terrainData, resources) {
        return this.addChild(new Terrain(terrainData, resources["/assets/images/grassfield.json"]));
    }

    _createActors(playersData) {
        const actors = {};
        for (const playerData of playersData) {
            const actor = this._createVehicle();
            actor.position.set(playerData.position.x, playerData.position.y);
            actors[playerData.id] = actor;
        }
        return actors;
    }

    _createVehicle() {
        return this.addChild(new Vehicle());
    }
}

export default WorldContainer;