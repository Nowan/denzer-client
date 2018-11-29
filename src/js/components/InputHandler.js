"use strict";

import EventDispatcher from "./EventDispatcher";

class InputHandler {
    constructor() {
        window.addEventListener("keydown", (event) => {
            if (!event.repeat) {
                this.emit(event.key.toLowerCase() + "/down");
            }
        });
    }

    onKeyDown(key, callback) {
        if (Array.isArray(key)) {
            key.forEach((key) => {
                this.on(key.toLowerCase() + "/down", callback);
            }, this);
        }
        else {
            this.on(key.toLowerCase() + "/down", callback);
        }
    }
}

EventDispatcher.embedInto(InputHandler);

export default InputHandler;