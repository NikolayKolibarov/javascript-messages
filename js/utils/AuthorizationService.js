class AuthorizationService {
    constructor(appKey, appSecret, baseServiceUrl) {
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.baseServiceUrl = baseServiceUrl;
    }

    static getCurrentUser() {
        return sessionStorage['sessionId'];
    }



    static isLoggedIn() {
        return AuthorizationService.getCurrentUser() != undefined;
    }

    getAuthorizationHeaders(isJSON, useSession) {
        let headers = {},
            token;

        if (isJSON) {
            headers['Content-Type'] = 'application/json';
        }

        if (useSession) {
            token = sessionStorage['sessionId'];
            headers['Authorization'] = 'Kinvey ' + token;
        } else {
            token = this.appKey + ':' + this.appSecret;
            headers['Authorization'] = 'Basic ' + btoa(token);
        }

        return headers;
    }
}
