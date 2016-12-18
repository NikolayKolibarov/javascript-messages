class MessagesController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    loadMyMessagesPage(selector) {

        this.model.getUserReceivedMessages()
            .then((success) => {
                let messages = success;

                for (let message of messages) {
                    message.sender = formatSender(message.sender_name, message.sender_username);
                    message.date = formatDate(message._kmd.ect);

                }

                let data = {
                    messages: messages,
                    hasMessages: messages.length > 0
                };

                this.view.showMyMessagesPage(selector, data);
            })
            .catch((error) => {
                console.log(error);
                handleAjaxError(error);
            });
    }

    loadMessagesArchivePage(selector) {
        this.model.getUserSentMessages()
            .then((success) => {
                let messages = success;

                for (let message of messages) {
                    message.date = formatDate(message._kmd.ect);
                }

                let data = {
                    messages: messages,
                    hasMessages: messages.length > 0
                };

                this.view.showMessagesArchivePage(selector, data);
            })
            .catch((error) => {
                console.log(error);
                handleAjaxError(error);
            });
    }

    loadSendMessagePage(selector, data) {
        this.view.showSendMessagePage(selector, data);
    }

    sendMessage(data) {
        this.model.sendMessage(data)
            .then((success) => {
                console.log(success);
                showInfo('Message sent.');
                redirectUrl("#/user/messages/archive");
            })
            .catch((error) => {
                console.log(error);
                handleAjaxError(error);
            });
    }

    deleteMessage(data) {
        this.model.deleteMessage(data.messageId)
            .then((success) => {
                showInfo('Message deleted');
                redirectUrl('#/user/messages/archive')
            })
            .catch((error) => {
                console.log(error);
                handleAjaxError(error);
            });
    }
}