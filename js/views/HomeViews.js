class HomeViews {
    showWelcomePage(selector) {
        $.get('templates/welcome.html', (templ) => {
            $(selector).html(templ);
        });
    }

    showHomePage(selector, data) {
        $.get('templates/home.html', (templ) => {
            let renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        });
    }
}
