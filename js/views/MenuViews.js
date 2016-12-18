class MenuViews {
    showMenuGuest(selector) {
        $.get('templates/menu-guest.html', (templ) => {
            $(selector).html(templ);
        });
    }

    showMenuUser(selector, data) {
        $.get('templates/menu-user.html', function(templ) {
            let renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }
}
