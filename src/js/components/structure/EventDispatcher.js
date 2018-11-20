"use strict";

import Interface from "./Interface";

class EventDispatcher extends Interface {
    static embedInto(Class) {
        Interface.embedInto.call(this, Class);
        Class.prototype._handlers = [];
    }
    
    on(eventKey, callback, scope) {
        this._registerEvent(eventKey, callback, scope);
    }

    once(eventKey, callback, scope) {
        this._registerEvent(eventKey, callback, scope, 1);
    }

    emit(eventKey, args = []) {
        const eventHandlers = this._handlers[eventKey];
        if (eventHandlers) {
            for (let i = eventHandlers.length - 1; i >= 0; i--) {
                const handler = eventHandlers[i];
                
                if (handler.scope) {
                    handler.callback.call(handler.scope, ...args);
                }
                else {
                    handler.callback(...args);
                }

                if (--handler.counter === 0) {
                    eventHandlers.splice(i, 1);
                }
            }
        }
    }

    off(eventKey, callback) {
        const eventHandlers = this._handlers[eventKey];
        if (eventHandlers) {
            for (const handler of eventHandlers) {
                if (handler.callback === callback) {
                    eventHandlers.splice(eventHandlers.indexOf(handler), 1);
                    break;
                }
            }
        }
    }

    _registerEvent(eventKey, callback, scope, counter = -1) {
        this._handlers[eventKey] = this._handlers[eventKey] || [];
        this._handlers[eventKey].push({callback, scope, counter});
    }
}

export default EventDispatcher;