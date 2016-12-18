class Requester {

    constructor(authorizationService) {
        this.authorizationService = authorizationService;
    }

    get(url, useSession) {
        let requestHeaders = this._getHeaders(false, useSession);
        return Requester._makeRequest('GET', url, null, requestHeaders);
    }

    post(url, data, useSession) {
        let requestHeaders = this._getHeaders(data, useSession);
        return Requester._makeRequest('POST', url, data, requestHeaders);
    }

    put(url, data, useSession) {
        let requestHeaders = this._getHeaders(data, useSession);
        return Requester._makeRequest('PUT', url, data, requestHeaders);
    }

    remove(url, data, useSession) {
        let requestHeaders = this._getHeaders(false, useSession);
        return Requester._makeRequest('DELETE', url, data, requestHeaders);
    }

    static _makeRequest(method, url, data, headers) {
        $.ajaxSetup({processData: true});

        let defer = Q.defer();

        $.ajax({
            method: method,
            url: url,
            headers: headers,
            data: JSON.stringify(data) || null,
            success:  (data) => {
                defer.resolve(data);
            },
            error: (error) => {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

    _getHeaders(isJSON, useSession) {
        return this.authorizationService.getAuthorizationHeaders(isJSON, useSession);
    }
}

