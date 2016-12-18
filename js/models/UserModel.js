class UserModel {
    constructor(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.authorizationService.baseServiceUrl + 'user/' + this.requester.authorizationService.appKey + '/';
    }

    login(data) {
        let requestUrl = this.serviceUrl + 'login';
        return this.requester.post(requestUrl, data, false);
    };

    register(data) {
        return this.requester.post(this.serviceUrl, data, false);
    };

    logout() {
        let requestUrl = this.serviceUrl + '_logout';
        return this.requester.post(requestUrl, null, true);
    };

    getAllUsers() {
        return this.requester.get(this.serviceUrl, true);
    }
}