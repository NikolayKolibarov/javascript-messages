class UserViews {
    showRegisterPage(selector) {
        $.get('templates/register.html', (templ) => {
            $(selector).html(templ);

            $('#registerButton').on('click',  () => {
                let username = $('#registerUsername').val();
                let password = $('#registerPasswd').val();
                let name = $('#registerName').val();

                let data = {
                    username: username,
                    password: password,
                    name: name,
                };



                triggerEvent('register', data);
            });
        });
    }

    showLoginPage(selector) {
        $.get('templates/login.html', (templ) => {
            $(selector).html(templ);

            $('#loginButton').on('click',  () => {
                let username = $('#loginUsername').val();
                let password = $('#loginPasswd').val();

                let data = {
                    username: username,
                    password: password,
                };

                triggerEvent('login', data);
            });
        });
    }

    showProfilePage(selector, data) {
        $.get('templates/profile.html', (templ) => {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }
}
