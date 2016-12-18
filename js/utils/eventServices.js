
// EVENT SERVICES

let _isInstanced = false;
let _router;

function initEventServices() {
    if (_isInstanced) {
        return;
    }

    _router = Sammy(function () {
        //Here we put all pre-initialized functions, event handlers, and so on...

        //overwrite because of sammy error
        this.notFound = function(){
        };

        this.bind('redirectUrl', function (ev, url) {
            this.redirect(url);
        });

    });

    _isInstanced = true;
}

function redirectUrl(url) {
    Sammy(function () {
        this.trigger('redirectUrl', url);
    });
}

function bindEventHandler(event, eventHandler) {
    Sammy(function () {
        this.bind(event, eventHandler);
    });
}

function onRoute(route, routeHandler) {
    Sammy(function () {
        this.get(route, routeHandler);
    });
}

function triggerEvent(event, data) {
    Sammy(function () {
        this.trigger(event, data);
    })
}


function run(rootUrl) {
    _router.run(rootUrl);
}