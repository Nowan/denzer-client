"use strict";

class PhysicsBody {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.velocity = new Vector(0, 0);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setLinearVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }
}

export default PhysicsBody;