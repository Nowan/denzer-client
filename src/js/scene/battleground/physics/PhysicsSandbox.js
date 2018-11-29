"use strict";

import PhysicsBody from "./PhysicsBody";

class PhysicsSandbox {
    static DELTA_TIME = 1 / 120;
    
    constructor() {
        this._bodies = [];
        this._previousTimestamp = 0;
    }

    step(timestamp) {
        const deltaTime = timestamp - this._previousTimestamp;
        const framesCount = deltaTime / PhysicsSandbox.DELTA_TIME;

        for (let i = 0; i < framesCount; i++) {
            this._bodies.forEach((body) => {
                this._updateState(body, PhysicsSandbox.DELTA_TIME);
            }, this);
        }

        this._bodies.forEach((body) => {
            this._updateState(body, deltaTime % PhysicsSandbox.DELTA_TIME);
        }, this);

        this._previousTimestamp = timestamp;
    }

    addBody(object) {
        const body = new PhysicsBody();
        body.x = object.x;
        body.y = object.y;
        this._bodies.push(body);
        return body;
    }

    _updateState(body, dt) {
        body.x += body.velocity.x * dt;
        body.y += body.velocity.y * dt;
    }
}

export default PhysicsSandbox;