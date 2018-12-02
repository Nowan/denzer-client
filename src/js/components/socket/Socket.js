"use strict";

import * as io from "socket.io";
import SOCKET_EVENT from "./Events"

class Socket {
    constructor() {
        return io({
            query: {
                timeProbe: Date.now()
            }
        });
    }

    static EVENT = SOCKET_EVENT;
}

export default Socket;