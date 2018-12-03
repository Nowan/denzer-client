"use strict";

class Service {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    async get(endpoint) {
        return this._sendRequest("GET", endpoint);
    }

    async post(endpoint) {
        return this._sendRequest("POST", endpoint);
    }

    async _sendRequest(accessMethod, endpoint, body) {
        return new Promise(((resolve, reject) => {
            const request = this._createRequest(accessMethod, this._baseUrl + endpoint);
            request.send(body);
            request.onload  = function() {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.response));
                }
                else {
                    reject(request.response);
                }
            };
        }).bind(this));
    }

    _createRequest = function(accessMethod, url) {
        const request = new XMLHttpRequest();
        request.open(accessMethod, url, true);
        return request;
    };
}

export default Service;