"use strict";

class Terrain extends PIXI.tilemap.CompositeRectTileLayer {
    constructor(terrainData, tileset) {
        super(0, [tileset]);
        
        for (let r = 0; r < 30; r++) {
            for (let c = 0; c < 40; c++) {
                const tileType = terrainData[r * 40 + c];
                this.addFrame(tileset.textures[tileType], c * 128, r * 128);
            }
        }

        this.bounds = new PIXI.Rectangle(0, 0, 128 * 40, 128 * 30);
    }
}

export default Terrain;