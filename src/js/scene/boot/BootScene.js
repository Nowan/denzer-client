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
        this.socket.on(Socket.EVENT.ROOM_FOUND, ((data) => {
            this.director.goTo("Battleground", [data.map, data.players]);
        }).bind(this));

        this.socket.emit(Socket.EVENT.FIND_ROOM);
    }
}

export default BootScene;