"use strict";

class Terrain extends PIXI.tilemap.CompositeRectTileLayer {
    constructor(terrainData, tileset) {
        super(0, [tileset]);

        for (let r = 0; r < terrainData.rows; r++) {
            for (let c = 0; c < terrainData.columns; c++) {
                let tileType = terrainData.tiles[r * terrainData.columns + c];
                this.addFrame(tileset.textures[tileType - 1], c * Terrain.TILE_SIZE, r * Terrain.TILE_SIZE);
            }
        }

        this.bounds = new PIXI.Rectangle(0, 0, terrainData.columns * Terrain.TILE_SIZE, terrainData.rows * Terrain.TILE_SIZE);
    }
    
    static TILE_SIZE = 128;
}

export default Terrain;