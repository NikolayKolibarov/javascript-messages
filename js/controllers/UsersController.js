class UsersController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    loadRegisterPage(selector) {
        this.view.showRegisterPage(selector);
    }

    loadLoginPage(selector) {
        this.view.showLoginPage(selector);
    }

    loadProfilePage(selector) {
        let data = {
            username: sessionStorage['username'],
            fullName: sessionStorage['fullName']
        };

        this.view.showProfilePage(selector, data);
    }

    login(data) {
        return this.model.login(data)
            .then((success) => {
                showInfo('Logged in successfully');
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['name'] = success.name;
                sessionStorage['userId'] = success._id;

                redirectUrl('#/home');
            })
            .catch((error) => {
                console.log(error);
                handleAjaxError(error);
            })
            .done();
    };

    register(data) {
        return this.model.register(data)
            .then((success) => {
                showInfo('Registered successfully');
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['name'] = success.name;
                sessionStorage['userId'] = success._id;

               redirectUrl('#/home');
            })
            .catch((error) => {
                console.log(error);
                handleAjaxError(error);
            })
            .done();
    }

    logout() {
        this.model.logout()
            .then( () => {
                showInfo('Logged out successfully');
                sessionStorage.clear();
                redirectUrl('#/');
            })
            .catch((error) => {
                console.log(error);
                handleAjaxError(error);
            });
    };
}


