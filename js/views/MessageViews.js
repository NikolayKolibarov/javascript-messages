class MessageViews {
    showMyMessagesPage(selector, data) {
        $.get('templates/my-messages.html', function (templ) {
            let renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }

    showMessagesArchivePage(selector, data) {
        $.get('templates/messages-archive.html', function (templ) {
            let renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);

            $('.messageDeleteButton').on('click', function () {
                let messageId = $(this).attr('data-id');

                let data = {
                    messageId: messageId
                };


                triggerEvent('deleteMessage', data)
            });
        })
    }

    showSendMessagePage(selector, data) {
        $.get('templates/send-message.html', function (templ) {
            let renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);

            $('#sendMessageButton').on('click', () => {
                let recipient = $("#msgRecipientUsername").find("option:selected").text();
                let recipientUsername = recipient.split(' ');
                let message = $('#msgText').val();

                let data = {
                    sender_username: sessionStorage['username'],
                    sender_name: sessionStorage['name'],
                    recipient_username: recipientUsername.length > 0 ? recipientUsername[0] : recipient,
                    text: message
                };

                console.log(data);

                triggerEvent('sendMessage', data);
            });

        })
    }
}