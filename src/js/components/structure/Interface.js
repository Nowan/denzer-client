"use strict";

class Interface {
    static embedInto(Class) {
        Object.assign(Class.prototype, this._filterPrototypeMethods());
    }

    // Credit Pierre Arnaud
    // http://code.fitness/post/2016/01/javascript-enumerate-methods.html
    static _filterPrototypeMethods() {
        const methods = {};
        const proto = this.prototype;

        Object.getOwnPropertyNames(proto).forEach(name => {
            if (name !== 'constructor') {
                if (this._hasOwnMethod(proto, name)) {
                    methods[name] = proto[name];
                }
            }
        });

        return methods;
    }
    
    static _hasOwnMethod(obj, name) {
        const desc = Object.getOwnPropertyDescriptor(obj, name);
        return !!desc && typeof desc.value === 'function';
    }
}

export default Interface;