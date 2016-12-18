class MessageModel {
    constructor(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.authorizationService.baseServiceUrl + 'appdata/' + this.requester.authorizationService.appKey + '/messages';
    }

    getUserReceivedMessages() {
        let requestUrl = this.serviceUrl + `?query={"recipient_username":"${sessionStorage.username}"}`;
        return this.requester.get(requestUrl, true);
    }

    getUserSentMessages() {
        let requestUrl = this.serviceUrl + `?query={"sender_username":"${sessionStorage.username}"}`;
        return this.requester.get(requestUrl, true);
    }

    sendMessage(data) {
        return this.requester.post(this.serviceUrl, data, true);
    }

    deleteMessage(messageId) {
        let requestUrl = this.serviceUrl + `?query={"_id":"${messageId}"}`;
        return this.requester.remove(requestUrl, null, true);
    }

}