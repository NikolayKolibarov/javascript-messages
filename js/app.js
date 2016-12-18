(() => {
    const menu = '#menu';
    const wrapper = '#view-wrapper';

    const appKey = 'kid_S17M3dqXl';
    const appSecret = '1a361285824847b2b7574c7a776d0676';
    const baseServiceUrl = 'https://baas.kinvey.com/';

    let authorizationService = new AuthorizationService(appKey, appSecret, baseServiceUrl);
    let requester = new Requester(authorizationService);

    let menuViews = new MenuViews(),
        homeViews = new HomeViews(),
        userViews = new UserViews(),
        messageViews = new MessageViews();

    let userModel = new UserModel(requester);
    let messageModel = new MessageModel(requester);

    let menuController = new MenuController(menuViews),
        homeController = new HomeController(homeViews),
        usersController = new UsersController(userViews, userModel),
        messageController = new MessagesController(messageViews, messageModel);

    initEventServices();

    Sammy(function () {
        this.before({except: {path: '#/route'}}, () => {

            if (AuthorizationService.isLoggedIn()) {
                menuController.loadMenuUser(menu);
            } else {
                menuController.loadMenuGuest(menu);
            }

        });

    });

    $('section').hide();

    onRoute("#/", () => {
        homeController.loadWelcomePage(wrapper);
    });

    onRoute("#/login", () => {
        if (AuthorizationService.isLoggedIn()) {
            redirectUrl('#/home');
        } else {
            usersController.loadLoginPage(wrapper);

        }
    });

    onRoute("#/register", () => {
        if (AuthorizationService.isLoggedIn()) {
            redirectUrl('#/home');
        } else {
            usersController.loadRegisterPage(wrapper);

        }
    });

    onRoute("#/logout", () => {
        if (!AuthorizationService.isLoggedIn()) {
            redirectUrl('#/');
        } else {
            usersController.logout();
        }
    });

    onRoute("#/home", () => {
        homeController.loadHomePage(wrapper);
    });

    onRoute("#/user/messages", () => {
        messageController.loadMyMessagesPage(wrapper);
    });

    onRoute("#/user/messages/archive", () => {
        messageController.loadMessagesArchivePage(wrapper);
    });

    onRoute("#/messages/send", () => {
        userModel.getAllUsers()
            .then((success) => {

                let users = success;

                for(let user of users) {
                    user.sender = formatSender(user.name, user.username)
                }

                let data = {
                    users: users
                };
                messageController.loadSendMessagePage(wrapper, data);

            });
    });


    bindEventHandler('login', (ev, data) => {
        usersController.login(data);
    });

    bindEventHandler('register', (ev, data) => {
        usersController.register(data);
    });

    bindEventHandler('sendMessage', (ev, data) => {
        messageController.sendMessage(data);
    });

    bindEventHandler('deleteMessage', (ev, data) => {
        messageController.deleteMessage(data);
    });

    run('#/');
})();