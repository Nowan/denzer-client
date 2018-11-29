"use strict";

const xSym = Symbol("x");
const ySym = Symbol("y");
const zoomSym = Symbol("zoom");
const viewportSym = Symbol("viewport");
const worldBoundsSym = Symbol("worldBounds");

class Camera {
    static VIEWPORT_WIDTH = 800;
	static VIEWPORT_HEIGHT = 600;

    constructor(world) {
        this[xSym] = 0;
        this[ySym] = 0;
        this[zoomSym] = 1.0;
        this[viewportSym] = {
            width: Camera.VIEWPORT_WIDTH, 
            height: Camera.VIEWPORT_HEIGHT,
            scale: {
                fill: 1.0,
                fit: 1.0
            }
        };
        this[worldBoundsSym] = {
            width: world.width,
            height: world.height
        }

        Object.defineProperties(this, {
            x: {
				get: (() =>  {
					return this[xSym];
				}).bind(this),
				set: ((value) =>  {
					this[xSym] = value;
					updateWorldX(this, world);
				}).bind(this)
            },
            y: {
				get: (() =>  {
					return this[ySym];
				}).bind(this),
				set: ((value) =>  {
					this[ySym] = value;
					updateWorldY(this, world);
				}).bind(this)
            },
            zoom: {
                get: (() =>  {
					return this[zoomSym];
				}).bind(this),
				set: ((value) =>  {
					this[zoomSym] = value;
					updateWorldScale(this, world);
				}).bind(this)
            },
            viewport: {value: {}},
            position: {value: {}}
        });

        Object.defineProperties(this.viewport, {
            width: {
				get: (() =>  {
					return this[viewportSym].width;
				}).bind(this),
				set: ((value) =>  {
					this[viewportSym].width = value;
					updateCameraViewport(this, world);
				}).bind(this)
            },
            height: {
				get: (() => {
					return this[viewportSym].height;
				}).bind(this),
				set: ((value) =>  {
					this[viewportSym].height = value;
					updateCameraViewport(this, world);
				}).bind(this)
            },
            scale: {
                get: (() => {
					return this[viewportSym].scale;
				}).bind(this)
            }
        });

        Object.defineProperties(this.position, {
            get: {
                value: (() => {
                    return new PIXI.Point(this[xSym], this[ySym]);
                }).bind(this)
            },
            set: {
				value: ((x, y) => {
                    this[xSym] = x;
                    this[ySym] = y;
                    updateWorldX(this, world);
                    updateWorldY(this, world);
                }).bind(this)
            }
        });
    }
}

function updateCameraViewport(camera, world) {
    camera.viewport.scale.fill = Math.max(camera.viewport.width / Camera.VIEWPORT_WIDTH, camera.viewport.height / Camera.VIEWPORT_HEIGHT);
	camera.viewport.scale.fit = Math.min(Camera.VIEWPORT_WIDTH / camera.viewport.width, Camera.VIEWPORT_HEIGHT / camera.viewport.height);
	updateWorldScale(camera, world);
}

function updateWorldScale(camera, world) {
    world.scale.set(camera.zoom * camera.viewport.scale.fill);
    updateWorldX(camera, world);
    updateWorldY(camera, world);
}

function updateWorldX(camera, world) {
    world.x = camera.viewport.width * 0.5 - camera.x * camera.zoom * camera.viewport.scale.fill;
}

function updateWorldY(camera, world) {
    world.y = camera.viewport.height * 0.5 - camera.y * camera.zoom * camera.viewport.scale.fill;
}

export default Camera;