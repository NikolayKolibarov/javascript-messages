class MenuController {

    constructor(view) {
        this.view = view;
    }

    loadMenuGuest (selector) {
        this.view.showMenuGuest(selector);
    };
    loadMenuUser (selector) {
        let data = {
            username: sessionStorage['username']
        };

        this.view.showMenuUser(selector, data);
    };

}


