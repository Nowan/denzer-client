"use strict";

class Vehicle extends PIXI.Container {
    constructor() {
        super();

        this.direction = new Vector(-1, 0);

        this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, 20).endFill());
    }

    moveLeft() {
        this.body.setLinearVelocity(-200, 0);
    }

    moveRight() {
        this.body.setLinearVelocity(200, 0);
    }

    moveUp() {
        this.body.setLinearVelocity(0, -200);
    }

    moveDown() {
        this.body.setLinearVelocity(0, 200);
    }
}

export default Vehicle;