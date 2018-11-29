"use strict";

import Terrain from "./Terrain";
import Vehicle from "./actors/Vehicle";
import PhysicsSandbox from "./physics/PhysicsSandbox";

class WorldContainer extends PIXI.Container {
    constructor(mapData, playersData, resources) {
        super();
        this._terrain = this._createTerrain(mapData.terrain, resources);
        this._actors = this._createActors(playersData);
    
        this._physics = this._initPhysics();
        this._elapsedTime = 0;
    }

    getActorByID(actorID) {
        return this._actors[actorID];
    }

    spawnActor(playerData) {
        const vehicle = this._createVehicle();
        vehicle.position.set(playerData.position.x, playerData.position.y);
        vehicle.body = this._physics.addBody(vehicle);
        this._actors[playerData.id] = vehicle;
    }

    removeActorByID(actorID) {
        this.removeChild(this._actors[actorID]);
        delete this._actors[actorID];
    }

    update(dt) {
        this._elapsedTime += dt;
        this._physics.step(this._elapsedTime);
        for (const actorID in this._actors) {
            const actor = this._actors[actorID];
            actor.position.set(actor.body.x, actor.body.y);
        }
    }

    _initPhysics() {
        const physics = new PhysicsSandbox();
        for (const actorID in this._actors) {
            const actor = this._actors[actorID];
            actor.body = physics.addBody(actor);
        }
        return physics;
    };

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