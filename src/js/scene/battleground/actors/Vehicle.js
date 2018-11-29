"use strict";

class Vehicle extends PIXI.Container {
    constructor() {
        super();

        this.velocity = 1000;
        this.direction = new Vector(-1, 0);

        this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, 20).endFill());
    }

    faceLeft() {
        this.direction = new Vector(-1, 0);
    }

    faceRight() {
        this.direction = new Vector(1, 0);
    }

    faceUp() {
        this.direction = new Vector(0, -1);
    }

    faceDown() {
        this.direction = new Vector(0, 1);
    }
}

export default Vehicle;