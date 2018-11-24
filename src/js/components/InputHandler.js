"use strict";

import EventDispatcher from "./structure/EventDispatcher";

class InputHandler {
    constructor() {
        window.addEventListener("keydown", (event) => {
            if (!event.repeat) {
                this.emit(event.key.toLowerCase() + "/down");
            }
        });
    }

    onKeyDown(key, callback) {
        this.on(key.toLowerCase() + "/down", callback);
    }
}

EventDispatcher.embedInto(InputHandler);

export default InputHandler;