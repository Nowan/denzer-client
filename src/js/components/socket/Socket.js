"use strict";

import * as io from "socket.io";
import SOCKET_EVENT from "./Events"

class Socket {
    constructor(namespace, params) {
        return io(namespace, params);
    }

    static EVENT = SOCKET_EVENT;
}

export default Socket;