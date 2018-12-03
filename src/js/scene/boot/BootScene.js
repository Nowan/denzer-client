"use strict";

import Scene from "../../components/structure/Scene";
import Socket from "../../components/socket/Socket";

class BootScene extends Scene {
    constructor() {
        super();
    }

    async load() {
        await this.loader.load(
            "/assets/images/shaman.jpg", 
            "/assets/images/barbarian.jpg", 
            "/assets/images/dwarf.jpg", 
            "/assets/images/ninja.jpg",
            "/assets/images/grassfield.json"
        );
    }

    init() {
        this.service.get("/authorize").then((playerData) => {
            const playerID = playerData.id;
            this.service.get("/findRoom?playerID=" + playerID).then((roomData) => {
                const socket = new Socket("/" + roomData.id, {
                    query: {
                        playerID
                    }
                });

                this.director.goTo("Battleground", [roomData, playerID, socket]);
            });
        })
    }
}

export default BootScene;