"use strict";

import * as io from "socket.io";
import SOCKET_EVENT from "./Events"

class Socket {
    constructor() {
        return io();
    }

    static EVENT = SOCKET_EVENT;
}

export default Socket;